-- ReadyBoard database schema.
-- Safe to run more than once.

create extension if not exists pgcrypto;

-- ============ TRUCKS ============
create table if not exists public.trucks (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null unique references auth.users(id) on delete cascade,
  -- public, hard-to-guess id used in the display link /d/<slug>
  slug         text not null unique default substr(replace(gen_random_uuid()::text, '-', ''), 1, 10),
  name         text not null check (char_length(name) between 1 and 80),
  city         text not null default '' check (char_length(city) <= 80),
  -- reserved for the future public map
  latitude     double precision,
  longitude    double precision,
  is_open      boolean not null default false,
  logo_url     text,
  brand_color  text not null default '#E4572E' check (brand_color ~ '^#[0-9A-Fa-f]{6}$'),
  language     text not null default 'sv' check (language in ('sv','en')),
  next_number  integer not null default 1,
  created_at   timestamptz not null default now()
);

-- ============ ORDERS ============
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  truck_id       uuid not null references public.trucks(id) on delete cascade,
  number         integer not null,
  status         text not null default 'preparing' check (status in ('preparing','ready','collected')),
  -- reserved for future SMS notifications
  customer_phone text,
  created_at     timestamptz not null default now(),
  ready_at       timestamptz,
  collected_at   timestamptz
);
create index if not exists orders_truck_active on public.orders (truck_id, status);

-- ============ ROW LEVEL SECURITY ============
alter table public.trucks enable row level security;
alter table public.orders enable row level security;

-- Lock everything down first, then grant only what is needed.
revoke all on public.trucks from anon, authenticated;
revoke all on public.orders from anon, authenticated;

-- Owners may read their own truck and edit only safe columns.
grant select on public.trucks to authenticated;
grant update (name, city, latitude, longitude, logo_url, brand_color, language) on public.trucks to authenticated;

drop policy if exists trucks_owner_select on public.trucks;
create policy trucks_owner_select on public.trucks for select to authenticated
  using (owner_id = auth.uid());
drop policy if exists trucks_owner_update on public.trucks;
create policy trucks_owner_update on public.trucks for update to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Owners may read their own orders. All order changes go through the functions below.
grant select on public.orders to authenticated;
drop policy if exists orders_owner_select on public.orders;
create policy orders_owner_select on public.orders for select to authenticated
  using (truck_id in (select id from public.trucks where owner_id = auth.uid()));

-- ============ CREATE TRUCK ON SIGN-UP ============
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.trucks (owner_id, name, city, language)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'truck_name'), ''), 'Min foodtruck'),
    coalesce(trim(new.raw_user_meta_data->>'city'), ''),
    case when new.raw_user_meta_data->>'language' = 'en' then 'en' else 'sv' end
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ ORDER FUNCTIONS (only touch the caller's own truck) ============
create or replace function public.my_truck_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.trucks where owner_id = auth.uid()
$$;

create or replace function public.new_order() returns public.orders
language plpgsql security definer set search_path = public as $$
declare t uuid; n integer; o public.orders;
begin
  update public.trucks set next_number = next_number + 1
    where owner_id = auth.uid()
    returning id, next_number - 1 into t, n;
  if t is null then raise exception 'not allowed'; end if;
  insert into public.orders (truck_id, number) values (t, n) returning * into o;
  return o;
end $$;

create or replace function public.set_order_status(order_id uuid, new_status text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if new_status not in ('preparing','ready','collected') then raise exception 'bad status'; end if;
  update public.orders set
      status = new_status,
      ready_at = case when new_status = 'ready' then now() else ready_at end,
      collected_at = case when new_status = 'collected' then now() else collected_at end
    where id = order_id and truck_id = public.my_truck_id();
  if not found then raise exception 'not allowed'; end if;
end $$;

create or replace function public.reset_numbers() returns void
language plpgsql security definer set search_path = public as $$
declare t uuid := public.my_truck_id();
begin
  if t is null then raise exception 'not allowed'; end if;
  update public.orders set status = 'collected', collected_at = now()
    where truck_id = t and status <> 'collected';
  update public.trucks set next_number = 1 where id = t;
end $$;

-- ============ PUBLIC DISPLAY (no login) ============
-- Returns only what the queue screen needs, for one truck, by its public slug.
create or replace function public.get_display(display_slug text) returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'name', t.name, 'logo_url', t.logo_url, 'brand_color', t.brand_color, 'language', t.language,
    'preparing', coalesce((select json_agg(o.number order by o.created_at) from public.orders o
                            where o.truck_id = t.id and o.status = 'preparing'), '[]'::json),
    'ready', coalesce((select json_agg(o.number order by o.ready_at) from public.orders o
                            where o.truck_id = t.id and o.status = 'ready'), '[]'::json)
  )
  from public.trucks t where t.slug = display_slug
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.my_truck_id() from public, anon;
revoke all on function public.new_order() from public, anon;
revoke all on function public.set_order_status(uuid, text) from public, anon;
revoke all on function public.reset_numbers() from public, anon;
grant execute on function public.my_truck_id() to authenticated;
grant execute on function public.new_order() to authenticated;
grant execute on function public.set_order_status(uuid, text) to authenticated;
grant execute on function public.reset_numbers() to authenticated;
grant execute on function public.get_display(text) to anon, authenticated;

-- ============ LIVE UPDATES ============
-- When a truck's orders or look change, send a tiny "changed" signal on that
-- truck's channel. Screens then re-fetch. No order data is sent in the signal.
create or replace function public.notify_display() returns trigger
language plpgsql security definer set search_path = public as $$
declare s text;
begin
  if tg_table_name = 'trucks' then
    s := coalesce(new.slug, old.slug);
  else
    select slug into s from public.trucks where id = coalesce(new.truck_id, old.truck_id);
  end if;
  if s is not null then
    perform realtime.send('{}'::jsonb, 'changed', 'display:' || s, false);
  end if;
  return null;
end $$;

drop trigger if exists orders_notify on public.orders;
create trigger orders_notify after insert or update or delete on public.orders
  for each row execute function public.notify_display();
drop trigger if exists trucks_notify on public.trucks;
create trigger trucks_notify after update on public.trucks
  for each row execute function public.notify_display();

-- ============ LOGO STORAGE ============
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('logos', 'logos', true, 2097152, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152,
  allowed_mime_types = array['image/png','image/jpeg','image/webp'];

drop policy if exists logos_owner_insert on storage.objects;
create policy logos_owner_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists logos_owner_update on storage.objects;
create policy logos_owner_update on storage.objects for update to authenticated
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists logos_owner_delete on storage.objects;
create policy logos_owner_delete on storage.objects for delete to authenticated
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
