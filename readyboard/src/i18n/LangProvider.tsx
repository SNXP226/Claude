"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultLang, getMessages, isLang, type Lang } from ".";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: defaultLang, setLang: () => {} });
const KEY = "readyboard-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved choice once on load
      if (isLang(saved)) setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch {}
  };
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
export function useT() {
  return getMessages(useContext(LangContext).lang);
}
