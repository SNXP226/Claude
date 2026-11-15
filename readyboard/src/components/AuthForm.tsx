"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang, useT } from "@/i18n/LangProvider";
import LangSwitch from "./LangSwitch";
import { ArrowRight, BellRing, Loader2 } from "lucide-react";
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
    <main className="min-h-dvh lg:grid lg:grid-cols-2">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink px-6 pb-24 pt-8 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <Logo />
          <LangSwitch dark />
        </div>
        <div className="relative mt-10 lg:mt-0">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">{t.auth.tagline}</h1>
          <BoardPreview preparing={t.staff.preparing} ready={t.staff.ready} />
        </div>
        <p className="relative hidden text-sm text-white/50 lg:block">© {new Date().getFullYear()} ReadyBoard</p>
      </section>

      {/* Form */}
      <section className="relative -mt-16 px-4 pb-10 lg:mt-0 lg:flex lg:items-center lg:justify-center lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <form onSubmit={submit} className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.25)] ring-1 ring-stone-900/5 sm:p-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">{signup ? t.auth.signupTitle : t.auth.loginTitle}</h2>
            {signup && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.auth.truckName} value={truckName} onChange={(e) => setTruckName(e.target.value)} required maxLength={80} autoComplete="organization" />
                <Field label={t.auth.city} value={city} onChange={(e) => setCity(e.target.value)} required maxLength={80} autoComplete="address-level2" />
              </div>
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
            {info && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-base font-medium text-emerald-800 ring-1 ring-emerald-200">{info}</p>}
            <BigButton type="submit" disabled={busy} className="mt-1 flex items-center justify-center gap-2">
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {busy ? t.common.loading : signup ? t.auth.signupButton : t.auth.loginButton}
              {!busy && <ArrowRight className="h-5 w-5" />}
            </BigButton>
          </form>
          <p className="mt-6 text-center text-base text-stone-600">
            {signup ? t.auth.haveAccount : t.auth.noAccount}{" "}
            <Link href={signup ? "/login" : "/signup"} className="font-bold text-ink underline decoration-brand decoration-2 underline-offset-4">
              {signup ? t.auth.toLogin : t.auth.toSignup}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-lg shadow-brand/30">
        <BellRing className="h-5 w-5 text-white" />
      </div>
      <span className="font-display text-xl font-extrabold tracking-tight">ReadyBoard</span>
    </div>
  );
}

// A small, animated picture of the customer screen.
function BoardPreview({ preparing, ready }: { preparing: string; ready: string }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 rounded-3xl bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur">
      <div className="rounded-2xl bg-white/[0.04] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">{preparing}</p>
        <div className="num mt-2 flex flex-wrap gap-x-4 text-3xl font-extrabold text-white/80">
          <span>47</span><span>48</span><span>51</span>
        </div>
      </div>
      <div className="rounded-2xl bg-emerald-500 p-4 text-ink">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-950/70">{ready}</p>
        <div className="num mt-2 flex flex-wrap gap-x-4 text-3xl font-extrabold">
          <span className="animate-pulse">46</span><span>44</span>
        </div>
      </div>
    </div>
  );
}
