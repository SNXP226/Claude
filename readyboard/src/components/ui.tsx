// Shared building blocks with big, easy-to-tap sizes.
import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Field({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-stone-700">{label}</span>
      <input
        {...props}
        className="block h-14 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-lg text-ink outline-none transition placeholder:text-stone-400 focus:border-ink focus:bg-white focus:ring-4 focus:ring-stone-900/5"
      />
      {hint && <span className="mt-1.5 block text-sm text-stone-500">{hint}</span>}
    </label>
  );
}

export function BigButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`h-14 w-full rounded-2xl bg-ink px-6 text-lg font-bold text-white shadow-[0_8px_20px_-8px_rgb(0_0_0/0.5)] transition active:scale-[0.98] disabled:opacity-50 ${className}`}
    />
  );
}

export function ErrorBox({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-base font-medium text-red-700 ring-1 ring-red-200">{children}</p>;
}
