"use client";
import { languages, messages } from "@/i18n";
import { useLang } from "@/i18n/LangProvider";

// Language toggle shown on the login and sign-up pages.
export default function LangSwitch({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex rounded-full p-1 ${dark ? "bg-white/10" : "bg-stone-200/70"}`}>
      {languages.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
            l === lang
              ? dark ? "bg-white text-ink" : "bg-white text-ink shadow-sm"
              : dark ? "text-white/70" : "text-stone-600"
          }`}
        >
          {messages[l].languageName}
        </button>
      ))}
    </div>
  );
}
