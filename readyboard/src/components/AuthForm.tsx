"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang, useT } from "@/i18n/LangProvider";
import LangSwitch from "./LangSwitch";
import { BigButton, ErrorBox, Field } from "./ui";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const t = useT();
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [truckName, setTruckName] = useState("");
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const signup = mode === "signup";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (signup && password.length < 8) return setError(t.auth.weakPassword);
    setBusy(true);
    const supabase = createClient();
    try {
      if (signup) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { truck_name: truckName.trim(), city: city.trim(), language: lang } },
        });
        if (error) {
          setError(/already|registered|exists/i.test(error.message) ? t.auth.emailTaken
            : /password/i.test(error.message) ? t.auth.weakPassword : t.common.error);
        } else if (data.user && data.user.identities?.length === 0) {
          setError(t.auth.emailTaken);
        } else if (data.session) {
          window.location.href = "/staff";
          return;
        } else {
          setInfo(t.auth.checkEmail);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) setError(/invalid/i.test(error.message) ? t.auth.wrongLogin : t.common.error);
        else {
          window.location.href = "/staff";
          return;
        }
      }
    } catch {
      setError(t.common.error);
    }
    setBusy(false);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-5 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight">{t.appName}</h1>
        <p className="mt-2 text-lg text-stone-600">{t.auth.tagline}</p>
      </div>
      <LangSwitch />
      <form onSubmit={submit} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">{signup ? t.auth.signupTitle : t.auth.loginTitle}</h2>
        {signup && (
          <>
            <Field label={t.auth.truckName} value={truckName} onChange={(e) => setTruckName(e.target.value)} required maxLength={80} autoComplete="organization" />
            <Field label={t.auth.city} value={city} onChange={(e) => setCity(e.target.value)} required maxLength={80} autoComplete="address-level2" />
          </>
        )}
        <Field label={t.auth.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" inputMode="email" />
        <Field
          label={t.auth.password}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={signup ? 8 : undefined}
          hint={signup ? t.auth.passwordHint : undefined}
          autoComplete={signup ? "new-password" : "current-password"}
        />
        {error && <ErrorBox>{error}</ErrorBox>}
        {info && <p className="rounded-xl bg-green-100 px-4 py-3 text-base font-medium text-green-800">{info}</p>}
        <BigButton type="submit" disabled={busy}>
          {busy ? t.common.loading : signup ? t.auth.signupButton : t.auth.loginButton}
        </BigButton>
      </form>
      <p className="text-center text-base">
        {signup ? t.auth.haveAccount : t.auth.noAccount}{" "}
        <Link href={signup ? "/login" : "/signup"} className="font-bold underline">
          {signup ? t.auth.toLogin : t.auth.toSignup}
        </Link>
      </p>
    </main>
  );
}
