"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Bell, ChefHat, Maximize, WifiOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getMessages } from "@/i18n";
import { playChime, unlockAudio } from "@/lib/chime";

type Display = {
  name: string;
  logo_url: string | null;
  brand_color: string;
  language: string;
  preparing: number[];
  ready: number[];
};

const supabase = createClient();

// Bigger text when there are fewer numbers.
function sizeFor(count: number, big: boolean) {
  if (big) {
    if (count <= 2) return "text-[min(22vw,30vh)]";
    if (count <= 4) return "text-[min(15vw,22vh)]";
    if (count <= 9) return "text-[min(10vw,15vh)]";
    return "text-[min(7vw,10vh)]";
  }
  if (count <= 4) return "text-[min(9vw,13vh)]";
  if (count <= 9) return "text-[min(6.5vw,9vh)]";
  return "text-[min(4.5vw,7vh)]";
}

export default function DisplayPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Display | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [online, setOnline] = useState(true);
  const [started, setStarted] = useState(false);
  const [flashing, setFlashing] = useState<Set<number>>(new Set());
  const prevReady = useRef<Set<number> | null>(null);
  const startedRef = useRef(false);
  const loadingRef = useRef(false);

  const load = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const { data: d, error } = await supabase.rpc("get_display", { display_slug: slug });
    loadingRef.current = false;
    if (error) return setOnline(false);
    setOnline(true);
    if (!d) return setNotFound(true);
    const disp = d as Display;

    // Find numbers that just became ready: flash them and play a sound.
    const now = new Set(disp.ready);
    if (prevReady.current) {
      const fresh = disp.ready.filter((n) => !prevReady.current!.has(n));
      if (fresh.length) {
        if (startedRef.current) playChime();
        setFlashing((f) => new Set([...f, ...fresh]));
        setTimeout(() => setFlashing((f) => {
          const next = new Set(f);
          fresh.forEach((n) => next.delete(n));
          return next;
        }), 6000);
      }
    }
    prevReady.current = now;
    setData(disp);
  }, [slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    load();
    const channel = supabase
      .channel(`display:${slug}`)
      .on("broadcast", { event: "changed" }, () => load())
      .subscribe((status) => {
        if (status === "SUBSCRIBED") load();
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setOnline(false);
      });
    const timer = setInterval(load, 10000); // safety net if live updates drop
    const onOnline = () => load();
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onOnline);
    return () => {
      supabase.removeChannel(channel);
      clearInterval(timer);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onOnline);
    };
  }, [slug, load]);

  // Keep the screen from going to sleep.
  useEffect(() => {
    if (!started) return;
    let lock: WakeLockSentinel | null = null;
    const req = async () => {
      try { lock = await navigator.wakeLock?.request("screen"); } catch {}
    };
    req();
    const onVis = () => document.visibilityState === "visible" && req();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      lock?.release().catch(() => {});
    };
  }, [started]);

  function start() {
    unlockAudio();
    playChime();
    startedRef.current = true;
    setStarted(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }

  const t = getMessages(data?.language).display;

  if (notFound) {
    return (
      <main className="grid min-h-dvh place-items-center bg-ink p-8 text-center text-2xl font-semibold text-white/80">
        {getMessages("sv").display.notFound}
      </main>
    );
  }

  const brand = data?.brand_color ?? "#E4572E";
  const ready = data?.ready ?? [];
  const preparing = data?.preparing ?? [];

  return (
    <main
      className="relative flex h-dvh flex-col overflow-hidden bg-[#0f0d0b] text-white"
      style={{ ["--brand" as string]: brand }}
    >
      {/* Soft brand glow in the background */}
      <div className="pointer-events-none absolute -left-[20%] -top-[30%] h-[80%] w-[60%] rounded-full opacity-25 blur-[120px]" style={{ backgroundColor: brand }} />

      {/* Header */}
      <header className="relative flex items-center gap-[2vmin] px-[3vmin] py-[2vmin]">
        {data?.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.logo_url} alt="" className="h-[9vmin] w-[9vmin] rounded-[2vmin] bg-white object-contain" />
        ) : (
          <div className="grid h-[9vmin] w-[9vmin] place-items-center rounded-[2vmin] font-display text-[5vmin] font-extrabold" style={{ backgroundColor: brand }}>
            {data?.name?.[0]?.toUpperCase() ?? ""}
          </div>
        )}
        <h1 className="min-w-0 flex-1 truncate font-display text-[6vmin] font-extrabold tracking-tight">{data?.name ?? ""}</h1>
        {!online && (
          <div className="flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-[2.2vmin] font-semibold text-red-200">
            <WifiOff className="h-[3vmin] w-[3vmin]" /> {t.offline}
          </div>
        )}
      </header>

      {/* Columns */}
      <div className="relative grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,1.6fr)] gap-[2vmin] px-[3vmin] pb-[3vmin] landscape:grid-cols-[1fr_1.6fr] landscape:grid-rows-1">
        <section className="flex min-h-0 flex-col rounded-[3vmin] bg-white/[0.05] p-[3vmin] ring-1 ring-white/10">
          <h2 className="flex items-center gap-[1.5vmin] text-[3.6vmin] font-bold uppercase tracking-[0.15em] text-amber-300">
            <ChefHat className="h-[4.5vmin] w-[4.5vmin]" /> {t.preparing}
          </h2>
          <div className={`num mt-[2vmin] flex min-h-0 flex-1 flex-wrap content-start gap-x-[4vmin] gap-y-[1vmin] font-extrabold leading-none text-white/75 ${sizeFor(preparing.length, false)}`}>
            {preparing.map((n) => <span key={n} className="pop-in">{n}</span>)}
          </div>
        </section>

        <section
          className="flex min-h-0 flex-col rounded-[3vmin] p-[3vmin] text-white shadow-2xl"
          style={{ background: `linear-gradient(145deg, #10b981, #047857)` }}
        >
          <h2 className="flex items-center gap-[1.5vmin] text-[3.6vmin] font-bold uppercase tracking-[0.15em] text-white/85">
            <Bell className="h-[4.5vmin] w-[4.5vmin]" /> {t.ready}
          </h2>
          <div className={`num mt-[2vmin] flex min-h-0 flex-1 flex-wrap content-start gap-[2.5vmin] font-extrabold leading-none ${sizeFor(ready.length, true)}`}>
            {ready.map((n) => (
              <span
                key={n}
                className={`pop-in rounded-[2.5vmin] px-[2vmin] py-[1vmin] ${flashing.has(n) ? "ready-flash ready-glow bg-white text-emerald-700" : ""}`}
              >
                {n}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Tap to start (needed for sound and fullscreen) */}
      {!started && (
        <button onClick={start} className="absolute inset-0 z-20 grid place-items-center bg-black/70 backdrop-blur-sm">
          <span className="flex flex-col items-center gap-4 rounded-[4vmin] bg-white px-[6vmin] py-[5vmin] text-ink shadow-2xl">
            <Maximize className="h-[8vmin] w-[8vmin]" style={{ color: brand }} />
            <span className="font-display text-[5vmin] font-extrabold">{t.tapToStart}</span>
            <span className="text-[2.6vmin] text-stone-500">{t.tapToStartHint}</span>
          </span>
        </button>
      )}
    </main>
  );
}
