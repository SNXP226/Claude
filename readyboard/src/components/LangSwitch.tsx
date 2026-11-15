"use client";
import { languages, messages } from "@/i18n";
import { useLang } from "@/i18n/LangProvider";

// Small language buttons shown on the login and sign-up pages.
export default function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex justify-center gap-2">
      {languages.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            l === lang ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-700"
          }`}
        >
          {messages[l].languageName}
        </button>
      ))}
    </div>
  );
}
