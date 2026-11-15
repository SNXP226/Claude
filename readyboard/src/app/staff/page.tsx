"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang, useT } from "@/i18n/LangProvider";
import { isLang } from "@/i18n";
import type { Order, Truck } from "@/lib/truck";

const supabase = createClient();

export default function StaffPage() {
  const t = useT();
  const { setLang } = useLang();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const loadingRef = useRef(false);

  const loadOrders = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const { data, error } = await supabase
      .from("orders")
      .select("id, truck_id, number, status, created_at, ready_at")
      .neq("status", "collected")
      .order("created_at");
    loadingRef.current = false;
    if (!error && data) setOrders(data as Order[]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live updates: if another staff device changes something, reload.
  useEffect(() => {
    if (!truck) return;
    const channel = supabase
      .channel(`display:${truck.slug}`)
      .on("broadcast", { event: "changed" }, () => loadOrders())
      .subscribe();
    const onFocus = () => loadOrders();
    window.addEventListener("focus", onFocus);
    const timer = setInterval(loadOrders, 15000); // safety net
    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("focus", onFocus);
      clearInterval(timer);
    };
  }, [truck, loadOrders]);

  async function run(action: () => PromiseLike<{ error: unknown }>) {
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
      setLastNumber(o.number);
      setOrders((prev) => (prev.some((p) => p.id === o.id) ? prev : [...prev, o]));
      navigator.vibrate?.(30);
    }
    setBusy(false);
    loadOrders();
  }

  function setStatus(o: Order, status: Order["status"]) {
    // Update the screen immediately, then save.
    setOrders((prev) =>
      status === "collected"
        ? prev.filter((p) => p.id !== o.id)
        : prev.map((p) => (p.id === o.id ? { ...p, status, ready_at: new Date().toISOString() } : p)),
    );
    navigator.vibrate?.(20);
    run(() => supabase.rpc("set_order_status", { order_id: o.id, new_status: status }));
  }

  function reset() {
    if (!confirm(t.staff.resetConfirm)) return;
    setOrders([]);
    setLastNumber(null);
    run(() => supabase.rpc("reset_numbers"));
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const preparing = orders.filter((o) => o.status === "preparing");
  const ready = orders
    .filter((o) => o.status === "ready")
    .sort((a, b) => (a.ready_at ?? "").localeCompare(b.ready_at ?? ""));
  const brand = truck?.brand_color ?? "#E4572E";

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-4 px-4 pb-8 pt-4">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-500">{t.staff.title}</p>
          <h1 className="truncate text-2xl font-black">{truck?.name ?? t.common.loading}</h1>
        </div>
        <button onClick={logout} className="min-h-12 shrink-0 rounded-xl bg-stone-200 px-4 text-base font-bold">
          {t.common.logout}
        </button>
      </header>

      <button
        onClick={newOrder}
        disabled={busy || !truck}
        style={{ backgroundColor: brand }}
        className="min-h-28 w-full rounded-3xl text-4xl font-black text-white shadow-lg active:scale-[0.98] disabled:opacity-60"
      >
        + {t.staff.newOrder}
      </button>
      {lastNumber !== null && (
        <p className="-mt-2 text-center text-lg text-stone-600">
          {t.staff.lastOrder}: <span className="text-2xl font-black text-stone-900">{lastNumber}</span>
        </p>
      )}
      {error && <p role="alert" className="rounded-xl bg-red-100 px-4 py-3 text-base font-medium text-red-800">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-3xl bg-amber-50 p-4">
          <h2 className="text-xl font-black text-amber-900">
            {t.staff.preparing} <span className="font-medium">({preparing.length})</span>
          </h2>
          <p className="mb-3 text-sm text-amber-800">{t.staff.tapToReady}</p>
          {preparing.length === 0 ? (
            <p className="py-6 text-center text-base text-amber-800/70">{t.staff.emptyPreparing}</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {preparing.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setStatus(o, "ready")}
                  className="aspect-square min-h-20 rounded-2xl border-4 border-amber-300 bg-white text-4xl font-black text-stone-900 active:scale-95"
                >
                  {o.number}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-green-50 p-4">
          <h2 className="text-xl font-black text-green-900">
            {t.staff.ready} <span className="font-medium">({ready.length})</span>
          </h2>
          <p className="mb-3 text-sm text-green-800">{t.staff.tapToCollect}</p>
          {ready.length === 0 ? (
            <p className="py-6 text-center text-base text-green-800/70">{t.staff.emptyReady}</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {ready.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setStatus(o, "collected")}
                  className="aspect-square min-h-20 rounded-2xl bg-green-600 text-4xl font-black text-white active:scale-95"
                >
                  {o.number}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      <button
        onClick={reset}
        disabled={!truck}
        className="mt-4 min-h-14 w-full rounded-2xl border-2 border-stone-300 bg-white text-lg font-bold text-stone-700 active:scale-[0.98]"
      >
        ↺ {t.staff.resetNumbers}
      </button>
    </main>
  );
}
