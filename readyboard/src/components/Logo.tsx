// The ReadyBoard logo: a rounded "board" with a green "ready" dot.
export function LogoMark({ size = 36, invert = false, className = "" }: { size?: number; invert?: boolean; className?: string }) {
  const bg = invert ? "#fff" : "#0a0a0a";
  const fg = invert ? "#0a0a0a" : "#fff";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="13" fill={bg} />
      <rect x="11" y="14" width="13" height="4" rx="2" fill={fg} opacity="0.45" />
      <rect x="11" y="22" width="9" height="4" rx="2" fill={fg} opacity="0.45" />
      <rect x="11" y="30" width="13" height="4" rx="2" fill={fg} opacity="0.45" />
      <rect x="28" y="14" width="9" height="20" rx="3" fill={fg} />
      <circle cx="37" cy="11" r="5" fill="#22c55e" stroke={bg} strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={32} invert={invert} />
      <span className={`text-lg font-semibold tracking-tight ${invert ? "text-white" : "text-ink"}`}>ReadyBoard</span>
    </div>
  );
}
