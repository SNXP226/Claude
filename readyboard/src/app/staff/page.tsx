"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, MonitorPlay, MoreHorizontal, Plus, RotateCcw, Undo2 } from "lucide-react";
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
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-4 px-4 pb-28 pt-4 sm:px-6 sm:pt-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-white text-lg font-semibold"
        >
          {truck?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={truck.logo_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span style={{ color: brand }}>{truck?.name?.[0]?.toUpperCase() ?? "·"}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold tracking-tight">{truck?.name ?? t.common.loading}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className={`h-1.5 w-1.5 rounded-full ${live ? "live-dot bg-green-500" : "bg-zinc-300"}`} />
            <span>{live ? t.staff.live : t.staff.connecting}</span>
            <span className="text-zinc-300">·</span>
            <span>{orders.length} {t.staff.activeOrders}</span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.staff.menu}
            className="grid h-11 w-11 place-items-center rounded-xl border border-zinc-200 bg-white active:scale-95"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
                <MenuItem icon={<MonitorPlay className="h-4 w-4" />} onClick={() => { setMenuOpen(false); if (truck) window.open(`/d/${truck.slug}`, "_blank"); }}>{t.staff.openDisplay}</MenuItem>
                <MenuItem icon={<RotateCcw className="h-4 w-4" />} onClick={reset}>{t.staff.resetNumbers}</MenuItem>
                <div className="my-1 h-px bg-zinc-100" />
                <MenuItem icon={<LogOut className="h-4 w-4" />} onClick={logout}>{t.common.logout}</MenuItem>
              </div>
            </>
          )}
        </div>
      </header>

      {/* New order */}
      <button
        onClick={newOrder}
        disabled={busy || !truck}
        className="flex min-h-28 w-full items-center justify-between rounded-2xl bg-ink px-6 text-left text-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] transition hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-60 sm:px-8"
      >
        <span className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/10">
            <Plus className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <span className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.staff.newOrder}</span>
        </span>
        {nextNumber !== null && (
          <span className="text-right">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">{t.staff.nextNumber}</span>
            <span className="num block text-4xl font-semibold leading-none">{nextNumber}</span>
          </span>
        )}
      </button>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      {/* Lists */}
      <div className="grid gap-4 md:grid-cols-2">
        <Column title={t.staff.preparing} hint={t.staff.tapToReady} count={preparing.length} dot="bg-amber-400" empty={t.staff.emptyPreparing}>
          {preparing.map((o) => (
            <button
              key={o.id}
              onClick={() => setStatus(o, "ready")}
              className="pop-in flex aspect-square flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white transition hover:border-zinc-300 active:scale-95 active:bg-zinc-50"
            >
              <span className="num text-5xl font-semibold">{o.number}</span>
              <span className="mt-1 text-xs text-zinc-400">{age(o.created_at)}</span>
            </button>
          ))}
        </Column>

        <Column title={t.staff.ready} hint={t.staff.tapToCollect} count={ready.length} dot="bg-green-500" empty={t.staff.emptyReady}>
          {ready.map((o) => (
            <button
              key={o.id}
              onClick={() => setStatus(o, "collected")}
              className="pop-in relative flex aspect-square flex-col items-center justify-center rounded-xl bg-ink text-white transition active:scale-95"
            >
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-green-500" />
              <span className="num text-5xl font-semibold">{o.number}</span>
              {o.ready_at && <span className="mt-1 text-xs text-zinc-400">{age(o.ready_at)}</span>}
            </button>
          ))}
        </Column>
      </div>

      {/* Toast with undo */}
      {toast && (
        <div key={toast.id} className="toast-in fixed bottom-6 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-md items-center justify-between gap-3 rounded-xl bg-ink py-2 pl-5 pr-2 text-white shadow-2xl">
          <span className="text-sm font-medium">{toast.text}</span>
          {toast.undo ? (
            <button
              onClick={() => { toast.undo?.(); setToast(null); }}
              className="flex h-11 items-center gap-1.5 rounded-lg bg-white/10 px-4 text-sm font-semibold active:scale-95"
            >
              <Undo2 className="h-4 w-4" /> {t.staff.undo}
            </button>
          ) : <span className="h-11" />}
        </div>
      )}
    </main>
  );
}

function MenuItem({ icon, onClick, children }: { icon: React.ReactNode; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium hover:bg-zinc-50 active:bg-zinc-100">
      <span className="text-zinc-400">{icon}</span>
      {children}
    </button>
  );
}

function Column({
  title, hint, count, dot, empty, children,
}: {
  title: string; hint: string; count: number; dot: string; empty: string; children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <span className={`h-2 w-2 rounded-full ${dot}`} />
            {title}
            <span className="num rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600">{count}</span>
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500">{hint}</p>
        </div>
      </div>
      {count === 0 ? (
        <div className="grid min-h-28 place-items-center rounded-xl border border-dashed border-zinc-200 text-center text-sm text-zinc-400">
          {empty}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">{children}</div>
      )}
    </section>
  );
}
