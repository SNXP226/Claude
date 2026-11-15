"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLang, useT } from "@/i18n/LangProvider";
import { isLang } from "@/i18n";
import type { Truck } from "@/lib/truck";
import { formatDate } from "@/lib/format";

// Temporary staff page for step 1: shows which truck is logged in.
export default function StaffPage() {
  const t = useT();
  const { setLang } = useLang();
  const [truck, setTruck] = useState<Truck | null>(null);

  useEffect(() => {
    createClient().from("trucks").select("*").single().then(({ data }) => {
      if (data) {
        setTruck(data as Truck);
        if (isLang(data.language)) setLang(data.language);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await createClient().auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-5 text-center">
      {!truck ? (
        <p className="text-lg">{t.common.loading}</p>
      ) : (
        <>
          <h1 className="text-3xl font-black">{truck.name}</h1>
          <p className="text-lg text-stone-600">{truck.city}</p>
          <p className="text-sm text-stone-500">{t.settings.memberSince}: {formatDate(truck.created_at)}</p>
        </>
      )}
      <button onClick={logout} className="mt-6 min-h-14 rounded-2xl bg-stone-200 px-6 text-lg font-bold">{t.common.logout}</button>
    </main>
  );
}
