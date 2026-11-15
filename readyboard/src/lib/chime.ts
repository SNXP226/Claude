// A short, friendly "ding-dong" made in the browser (no sound file needed).
let ctx: AudioContext | null = null;

export function unlockAudio() {
  if (typeof window === "undefined") return;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume();
}

export function playChime() {
  if (!ctx) return;
  const now = ctx.currentTime;
  [
    { f: 1046.5, t: 0 },   // C6
    { f: 784.0, t: 0.22 }, // G5
  ].forEach(({ f, t }) => {
    const osc = ctx!.createOscillator();
    const gain = ctx!.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0, now + t);
    gain.gain.linearRampToValueAtTime(0.5, now + t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + t + 1.2);
    osc.connect(gain).connect(ctx!.destination);
    osc.start(now + t);
    osc.stop(now + t + 1.3);
  });
}
