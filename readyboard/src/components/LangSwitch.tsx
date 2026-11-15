"use client";
import { languages, messages } from "@/i18n";
import { useLang } from "@/i18n/LangProvider";

// Language toggle shown on the login and sign-up pages.
export default function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5">
      {languages.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${l === lang ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}
        >
          {messages[l].languageName}
        </button>
      ))}
    </div>
  );
}
