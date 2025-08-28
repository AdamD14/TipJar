"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOnboardingStatus } from '@/lib/api/onboarding';

export function CreatorOnboardingGuard({ allow }: { allow: Array<'identity'|'bio'|'tiers'|'payments'|'publish'> }) {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const st = await getOnboardingStatus();
      const order = ['identity', 'bio', 'tiers', 'payments', 'publish'] as const;
      const firstIncomplete = order.find((k) => !st.steps[k]);
      if (firstIncomplete && !allow.includes(firstIncomplete)) {
        router.replace(`/creator/onboarding/step-${order.indexOf(firstIncomplete) + 1}-${firstIncomplete}`);
      }
    })();
  }, [router, allow]);
  return null;
}

