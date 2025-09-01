"use client";
import { useEffect, useState } from 'react';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { getOnboardingStatus } from '@/lib/api/onboarding';
import type { OnboardingStatus } from '@/lib/onboarding';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  useEffect(() => {
    (async () => setStatus(await getOnboardingStatus()))();
  }, []);

  return (
    <div className="min-h-screen bg-[#003737] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Creator Onboarding</h1>
        <OnboardingProgress status={status} />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

