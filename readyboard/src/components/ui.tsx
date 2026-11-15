// Shared building blocks with big, easy-to-tap sizes.
import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Field({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        {...props}
        className="block h-13 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5"
      />
      {hint && <span className="mt-1.5 block text-sm text-zinc-500">{hint}</span>}
    </label>
  );
}

export function BigButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`h-13 w-full rounded-xl bg-ink px-6 text-base font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-50 ${className}`}
    />
  );
}

export function ErrorBox({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{children}</p>;
}
