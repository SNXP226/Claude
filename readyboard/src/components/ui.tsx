// Shared building blocks with big, easy-to-tap sizes.
import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Field({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-base font-semibold">{label}</span>
      <input
        {...props}
        className="block w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-lg outline-none focus:border-stone-900"
      />
      {hint && <span className="mt-1 block text-sm text-stone-500">{hint}</span>}
    </label>
  );
}

export function BigButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`min-h-14 w-full rounded-2xl bg-stone-900 px-6 py-4 text-lg font-bold text-white active:scale-[0.98] disabled:opacity-50 ${className}`}
    />
  );
}

export function ErrorBox({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="rounded-xl bg-red-100 px-4 py-3 text-base font-medium text-red-800">{children}</p>;
}
