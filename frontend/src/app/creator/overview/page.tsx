"use client";
import CreatorShell from "@/components/creator/CreatorShell";
import { useEffect, useState } from "react";
import { getOnboardingStatus } from "@/lib/api/onboarding";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

export default function Page() {
  const [status, setStatus] = useState<any>(null);
  useEffect(() => {
    (async () => setStatus(await getOnboardingStatus()))();
  }, []);

  return (
    <CreatorShell title="Overview">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Onboarding</h2>
          <p className="mt-1 text-sm text-[#BCC1B6]">Complete your profile to go live.</p>
          <div className="mt-4">
            <OnboardingProgress status={status} />
          </div>
        </section>
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#002828] to-[#007474] p-6 text-white">
          <h3 className="text-sm">USDC Balance</h3>
          <p className="mt-2 text-3xl font-bold">$ 0.00</p>
          <div className="mt-4 flex gap-2">
            <a href="/creator/wallet" className="rounded-xl bg-white px-4 py-2 font-semibold text-[#003737]">Wallet</a>
            <a href="/creator/monetization" className="rounded-xl border border-white/20 px-4 py-2 font-semibold text-white/90">Monetization</a>
          </div>
        </section>
      </div>
      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <div className="mt-4 text-sm text-white/80">No activity yet.</div>
      </section>
    </CreatorShell>
  );
}

