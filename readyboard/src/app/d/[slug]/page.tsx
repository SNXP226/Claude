"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Play, WifiOff } from "lucide-react";
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
    <main className="relative flex h-dvh flex-col overflow-hidden bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center gap-[2vmin] px-[3.5vmin] pb-[1.5vmin] pt-[3vmin]">
        {data?.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.logo_url} alt="" className="h-[8vmin] w-[8vmin] rounded-[1.8vmin] bg-white object-contain" />
        ) : (
          <div className="grid h-[8vmin] w-[8vmin] place-items-center rounded-[1.8vmin] bg-white/10 text-[4.2vmin] font-semibold" style={{ color: brand }}>
            {data?.name?.[0]?.toUpperCase() ?? ""}
          </div>
        )}
        <h1 className="min-w-0 flex-1 truncate text-[5vmin] font-semibold tracking-tight">{data?.name ?? ""}</h1>
        {!online && (
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-[2vmin] font-medium text-red-300">
            <WifiOff className="h-[2.6vmin] w-[2.6vmin]" /> {t.offline}
          </div>
        )}
      </header>

      {/* Columns */}
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,1.6fr)] gap-[2vmin] px-[3.5vmin] pb-[3.5vmin] landscape:grid-cols-[1fr_1.6fr] landscape:grid-rows-1">
        <section className="flex min-h-0 flex-col rounded-[2.5vmin] border border-white/10 p-[3.5vmin]">
          <h2 className="flex items-center gap-[1.5vmin] text-[2.6vmin] font-medium uppercase tracking-[0.25em] text-zinc-500">
            <span className="h-[1.4vmin] w-[1.4vmin] rounded-full bg-amber-400" /> {t.preparing}
          </h2>
          <div className={`num mt-[3vmin] flex min-h-0 flex-1 flex-wrap content-start gap-x-[4vmin] gap-y-[1.5vmin] font-semibold leading-none text-zinc-500 ${sizeFor(preparing.length, false)}`}>
            {preparing.map((n) => <span key={n} className="pop-in">{n}</span>)}
          </div>
        </section>

        <section className="flex min-h-0 flex-col rounded-[2.5vmin] bg-white/[0.06] p-[3.5vmin] ring-1 ring-white/10">
          <h2 className="flex items-center gap-[1.5vmin] text-[2.6vmin] font-medium uppercase tracking-[0.25em] text-zinc-300">
            <span className="h-[1.4vmin] w-[1.4vmin] rounded-full bg-green-500 live-dot" /> {t.ready}
          </h2>
          <div className={`num mt-[2.5vmin] flex min-h-0 flex-1 flex-wrap content-start gap-[1.5vmin] font-semibold leading-none ${sizeFor(ready.length, true)}`}>
            {ready.map((n) => (
              <span key={n} className={`pop-in rounded-[2vmin] px-[2vmin] py-[1.2vmin] ${flashing.has(n) ? "ready-flash" : ""}`}>
                {n}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Tap to start (needed for sound and fullscreen) */}
      {!started && (
        <button onClick={start} className="absolute inset-0 z-20 grid place-items-center bg-black/80 backdrop-blur-md">
          <span className="flex flex-col items-center gap-[2vmin] rounded-[3vmin] border border-white/10 bg-zinc-900 px-[7vmin] py-[5vmin] text-white shadow-2xl">
            <span className="grid h-[11vmin] w-[11vmin] place-items-center rounded-full bg-white text-ink">
              <Play className="ml-[0.6vmin] h-[5vmin] w-[5vmin]" fill="currentColor" />
            </span>
            <span className="text-[4.2vmin] font-semibold tracking-tight">{t.tapToStart}</span>
            <span className="text-[2.2vmin] text-zinc-400">{t.tapToStartHint}</span>
          </span>
        </button>
      )}
    </main>
  );
}
