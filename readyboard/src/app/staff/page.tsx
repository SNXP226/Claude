"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChefHat, LogOut, MonitorPlay, MoreHorizontal, Plus, RotateCcw, Undo2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLang, useT } from "@/i18n/LangProvider";
import { fill, isLang } from "@/i18n";
import type { Order, Truck } from "@/lib/truck";

const supabase = createClient();
type Toast = { id: number; text: string; undo?: () => void };

export default function StaffPage() {
  const t = useT();
  const { setLang } = useLang();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [nextNumber, setNextNumber] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const loadingRef = useRef(false);
  const toastId = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadOrders = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const [{ data, error }, { data: tr }] = await Promise.all([
      supabase.from("orders").select("id, truck_id, number, status, created_at, ready_at").neq("status", "collected").order("created_at"),
      supabase.from("trucks").select("next_number").single(),
    ]);
    loadingRef.current = false;
    if (!error && data) setOrders(data as Order[]);
    if (tr) setNextNumber(tr.next_number);
  }, []);

  // Load the truck and its orders when the page opens.
  useEffect(() => {
    supabase.from("trucks").select("*").single().then(({ data }) => {
      if (!data) return;
      setTruck(data as Truck);
      if (isLang(data.language)) setLang(data.language);
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    loadOrders();
    const clock = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(clock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live updates: if another staff device changes something, reload.
  useEffect(() => {
    if (!truck) return;
    const channel = supabase
      .channel(`display:${truck.slug}`)
      .on("broadcast", { event: "changed" }, () => loadOrders())
      .subscribe((status) => setLive(status === "SUBSCRIBED"));
    const onFocus = () => loadOrders();
    window.addEventListener("focus", onFocus);
    const timer = setInterval(loadOrders, 15000); // safety net
    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("focus", onFocus);
      clearInterval(timer);
    };
  }, [truck, loadOrders]);

  function showToast(text: string, undo?: () => void) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastId.current += 1;
    setToast({ id: toastId.current, text, undo });
    toastTimer.current = setTimeout(() => setToast(null), undo ? 5000 : 2200);
  }

  async function save(action: () => PromiseLike<{ error: unknown }>) {
    setError(null);
    const { error } = await action();
    if (error) setError(t.common.error);
    await loadOrders();
  }

  async function newOrder() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const { data, error } = await supabase.rpc("new_order");
    if (error) setError(t.common.error);
    else {
      const o = data as Order;
      setOrders((prev) => (prev.some((p) => p.id === o.id) ? prev : [...prev, o]));
      setNextNumber(o.number + 1);
      navigator.vibrate?.(30);
      showToast(fill(t.staff.created, { n: o.number }));
    }
    setBusy(false);
    loadOrders();
  }

  function setStatus(o: Order, status: Order["status"], quiet = false) {
    // Update the screen immediately, then save.
    setOrders((prev) => {
      const without = prev.filter((p) => p.id !== o.id);
      if (status === "collected") return without;
      const updated = { ...o, status, ready_at: status === "ready" ? new Date().toISOString() : o.ready_at };
      return [...without, updated].sort((a, b) => a.created_at.localeCompare(b.created_at));
    });
    navigator.vibrate?.(20);
    save(() => supabase.rpc("set_order_status", { order_id: o.id, new_status: status }));
    if (quiet) return;
    if (status === "ready") showToast(fill(t.staff.markedReady, { n: o.number }), () => setStatus(o, "preparing", true));
    if (status === "collected") showToast(fill(t.staff.collected, { n: o.number }), () => setStatus(o, "ready", true));
  }

  function reset() {
    setMenuOpen(false);
    if (!confirm(t.staff.resetConfirm)) return;
    setOrders([]);
    setNextNumber(1);
    save(() => supabase.rpc("reset_numbers"));
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const preparing = orders.filter((o) => o.status === "preparing");
  const ready = orders.filter((o) => o.status === "ready").sort((a, b) => (a.ready_at ?? "").localeCompare(b.ready_at ?? ""));
  const brand = truck?.brand_color ?? "#E4572E";
  const age = (iso: string) => {
    const m = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60000));
    return m < 1 ? t.staff.justNow : fill(t.staff.minutes, { n: m });
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-5 px-4 pb-28 pt-4 sm:px-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl text-xl font-extrabold text-white shadow-md"
          style={{ backgroundColor: brand }}
        >
          {truck?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={truck.logo_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-display">{truck?.name?.[0]?.toUpperCase() ?? "·"}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-2xl font-extrabold leading-tight tracking-tight">
            {truck?.name ?? t.common.loading}
          </h1>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span className={`h-2 w-2 rounded-full ${live ? "live-dot bg-green-500" : "bg-stone-300"}`} />
            <span>{live ? t.staff.live : t.staff.connecting}</span>
            <span className="text-stone-300">•</span>
            <span>{orders.length} {t.staff.activeOrders}</span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.staff.menu}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-stone-900/5 active:scale-95"
          >
            <MoreHorizontal className="h-6 w-6" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-stone-900/10">
                <MenuItem icon={<MonitorPlay className="h-5 w-5" />} onClick={() => { setMenuOpen(false); if (truck) window.open(`/d/${truck.slug}`, "_blank"); }}>{t.staff.openDisplay}</MenuItem>
                <MenuItem icon={<RotateCcw className="h-5 w-5" />} onClick={reset}>{t.staff.resetNumbers}</MenuItem>
                <MenuItem icon={<LogOut className="h-5 w-5" />} onClick={logout}>{t.common.logout}</MenuItem>
              </div>
            </>
          )}
        </div>
      </header>

      {/* New order */}
      <button
        onClick={newOrder}
        disabled={busy || !truck}
        style={{ backgroundColor: brand, boxShadow: `0 18px 40px -16px ${brand}` }}
        className="group relative flex min-h-32 w-full items-center justify-between overflow-hidden rounded-[28px] px-6 text-left text-white transition active:scale-[0.985] disabled:opacity-60 sm:px-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20" />
        <div className="relative flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30">
            <Plus className="h-9 w-9" strokeWidth={3} />
          </span>
          <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{t.staff.newOrder}</span>
        </div>
        {nextNumber !== null && (
          <div className="relative text-right">
            <div className="text-xs font-bold uppercase tracking-widest text-white/75">{t.staff.nextNumber}</div>
            <div className="num text-5xl font-extrabold leading-none">{nextNumber}</div>
          </div>
        )}
      </button>

      {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-base font-medium text-red-700 ring-1 ring-red-200">{error}</p>}

      {/* Lists */}
      <div className="grid gap-5 md:grid-cols-2">
        <Column
          title={t.staff.preparing}
          hint={t.staff.tapToReady}
          count={preparing.length}
          icon={<ChefHat className="h-5 w-5" />}
          tone="amber"
          empty={t.staff.emptyPreparing}
        >
          {preparing.map((o) => (
            <button
              key={o.id}
              onClick={() => setStatus(o, "ready")}
              className="pop-in group relative flex aspect-square flex-col items-center justify-center rounded-3xl bg-white shadow-[0_6px_16px_-8px_rgb(120_80_0/0.35)] ring-2 ring-amber-200 transition active:scale-95 active:ring-amber-400"
            >
              <span className="num text-5xl font-extrabold sm:text-6xl">{o.number}</span>
              <span className="mt-1 text-xs font-semibold text-amber-700/80">{age(o.created_at)}</span>
            </button>
          ))}
        </Column>

        <Column
          title={t.staff.ready}
          hint={t.staff.tapToCollect}
          count={ready.length}
          icon={<Check className="h-5 w-5" strokeWidth={3} />}
          tone="green"
          empty={t.staff.emptyReady}
        >
          {ready.map((o) => (
            <button
              key={o.id}
              onClick={() => setStatus(o, "collected")}
              className="pop-in relative flex aspect-square flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_10px_24px_-10px_rgb(5_120_60/0.7)] transition active:scale-95"
            >
              <Check className="absolute right-3 top-3 h-5 w-5 text-white/70" strokeWidth={3} />
              <span className="num text-5xl font-extrabold sm:text-6xl">{o.number}</span>
              {o.ready_at && <span className="mt-1 text-xs font-semibold text-white/80">{age(o.ready_at)}</span>}
            </button>
          ))}
        </Column>
      </div>

      {/* Toast with undo */}
      {toast && (
        <div key={toast.id} className="toast-in fixed bottom-6 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-md items-center justify-between gap-3 rounded-2xl bg-ink px-5 py-3 text-white shadow-2xl">
          <span className="text-base font-semibold">{toast.text}</span>
          {toast.undo && (
            <button
              onClick={() => { toast.undo?.(); setToast(null); }}
              className="flex h-11 items-center gap-1.5 rounded-xl bg-white/15 px-4 text-base font-bold active:scale-95"
            >
              <Undo2 className="h-4 w-4" /> {t.staff.undo}
            </button>
          )}
        </div>
      )}
    </main>
  );
}

function MenuItem({ icon, onClick, children }: { icon: React.ReactNode; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex h-14 w-full items-center gap-3 rounded-xl px-3 text-left text-base font-semibold hover:bg-stone-100 active:bg-stone-100">
      <span className="text-stone-500">{icon}</span>
      {children}
    </button>
  );
}

function Column({
  title, hint, count, icon, tone, empty, children,
}: {
  title: string; hint: string; count: number; icon: React.ReactNode; tone: "amber" | "green"; empty: string; children: React.ReactNode;
}) {
  const c = tone === "amber"
    ? { box: "bg-amber-50/80 ring-amber-900/5", badge: "bg-amber-400 text-amber-950", title: "text-amber-950", hint: "text-amber-800/70", icon: "bg-amber-100 text-amber-700" }
    : { box: "bg-emerald-50/80 ring-emerald-900/5", badge: "bg-emerald-500 text-white", title: "text-emerald-950", hint: "text-emerald-800/70", icon: "bg-emerald-100 text-emerald-700" };
  return (
    <section className={`rounded-[28px] p-4 ring-1 sm:p-5 ${c.box}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${c.icon}`}>{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className={`font-display text-xl font-extrabold tracking-tight ${c.title}`}>{title}</h2>
          <p className={`text-sm ${c.hint}`}>{hint}</p>
        </div>
        <span className={`num grid h-10 min-w-10 place-items-center rounded-full px-3 text-lg font-extrabold ${c.badge}`}>{count}</span>
      </div>
      {count === 0 ? (
        <div className={`grid min-h-32 place-items-center rounded-2xl border-2 border-dashed border-current/10 text-center text-base ${c.hint}`}>
          {empty}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">{children}</div>
      )}
    </section>
  );
}
