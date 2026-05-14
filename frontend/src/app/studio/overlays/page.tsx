"use client";
import Link from "next/link";
import RequireAuth from "@/components/onboarding/auth/RequireAuth";

export default function StudioOverlaysPage() {
  return (
    <RequireAuth>
      <main className="min-h-screen px-6 py-8">
        <h1 className="text-2xl font-semibold text-[#DDE0DA]">Overlays</h1>
        <p className="mt-2 text-[#BCC1B6] text-sm">Skonfiguruj alerty napiwków i URL do OBS.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p>Przejdź do konfiguratora overlay:</p>
          <Link href="/creator/overlay" className="mt-3 inline-block rounded-lg bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]">Open overlay settings</Link>
        </div>
      </main>
    </RequireAuth>
  );
}

