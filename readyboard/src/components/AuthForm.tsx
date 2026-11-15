"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang, useT } from "@/i18n/LangProvider";
import LangSwitch from "./LangSwitch";
import { ArrowRight, Loader2 } from "lucide-react";
import { Logo } from "./Logo";
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
    <main className="min-h-dvh lg:grid lg:grid-cols-[1fr_1.1fr]">
      {/* Form side */}
      <section className="flex min-h-dvh flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <LangSwitch />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-semibold tracking-tight">{signup ? t.auth.signupTitle : t.auth.loginTitle}</h1>
          <p className="mt-2 text-base text-zinc-500">{t.auth.tagline}</p>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
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
            {info && <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">{info}</p>}
            <BigButton type="submit" disabled={busy} className="mt-2 flex items-center justify-center gap-2">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {busy ? t.common.loading : signup ? t.auth.signupButton : t.auth.loginButton}
              {!busy && <ArrowRight className="h-4 w-4" />}
            </BigButton>
          </form>
          <p className="mt-8 text-center text-sm text-zinc-500">
            {signup ? t.auth.haveAccount : t.auth.noAccount}{" "}
            <Link href={signup ? "/login" : "/signup"} className="font-semibold text-ink underline underline-offset-4">
              {signup ? t.auth.toLogin : t.auth.toSignup}
            </Link>
          </p>
        </div>
      </section>

      {/* Preview side (large screens only) */}
      <section className="relative hidden overflow-hidden bg-ink p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.08),transparent_60%)]" />
        <BoardPreview preparing={t.staff.preparing} ready={t.display.ready} />
      </section>
    </main>
  );
}

// A small picture of the customer screen.
function BoardPreview({ preparing, ready }: { preparing: string; ready: string }) {
  return (
    <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl">
      <div className="grid grid-cols-[1fr_1.4fr] gap-3">
        <div className="rounded-2xl border border-white/10 p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">{preparing}</p>
          <div className="num mt-4 flex flex-wrap gap-x-4 gap-y-1 text-3xl font-semibold text-zinc-500">
            <span>47</span><span>48</span><span>51</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.06] p-5">
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />{ready}
          </p>
          <div className="num mt-4 flex flex-wrap gap-x-5 text-5xl font-semibold text-white">
            <span>46</span><span>44</span>
          </div>
        </div>
      </div>
    </div>
  );
}
