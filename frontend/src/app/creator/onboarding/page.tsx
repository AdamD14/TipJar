"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOnboardingStatus } from '@/lib/api/onboarding';

export default function OnboardingIndex() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const st = await getOnboardingStatus();
      const order = ['identity', 'bio', 'tiers', 'payments', 'publish'] as const;
      const target = order.find((k) => !st.steps[k]) ?? 'publish';
      const idx = order.indexOf(target) + 1;
      router.replace(`/creator/onboarding/step-${idx}-${target}`);
    })();
  }, [router]);
  return null;
}

