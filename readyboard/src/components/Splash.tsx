"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Short logo animation shown once each time the app is opened.
// It runs purely on CSS, so the real page loads underneath meanwhile.
export default function Splash() {
  const path = usePathname();
  const skip = path.startsWith("/d/"); // never on the public customer screen
  useEffect(() => {
    try { sessionStorage.setItem("rb-splash", "1"); } catch {}
  }, []);
  if (skip) return null;
  return (
    <div className="splash" aria-hidden>
      <div className="flex flex-col items-center">
        <div className="splash-mark relative">
          <svg width="88" height="88" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="13" fill="#fff" />
            <rect x="11" y="14" width="13" height="4" rx="2" fill="#0a0a0a" opacity="0.35" />
            <rect x="11" y="22" width="9" height="4" rx="2" fill="#0a0a0a" opacity="0.35" />
            <rect x="11" y="30" width="13" height="4" rx="2" fill="#0a0a0a" opacity="0.35" />
            <rect x="28" y="14" width="9" height="20" rx="3" fill="#0a0a0a" />
            <circle cx="37" cy="11" r="5" fill="#22c55e" stroke="#0a0a0a" strokeWidth="2.5" />
          </svg>
          <span className="splash-dot absolute right-[2px] top-[6px] h-[18px] w-[18px] rounded-full bg-green-500" />
        </div>
        <div className="splash-word mt-6 text-3xl font-semibold tracking-tight">ReadyBoard</div>
        <div className="mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
          <div className="splash-bar h-full w-full rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
