'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

export default function useOnboardingGuard() {
  const router = useRouter();
  const path = usePathname();
  const { step, user } = useOnboardingStore();

  useEffect(() => {
    // Prosty strażnik kroków – pozwala wracać i wznawiać proces
    if (path?.includes('/choose-username') && step === 'REGISTER' && !user) {
      router.replace('/register');
    }
    if (path?.includes('/consents') && (step === 'REGISTER' || step === 'CHOOSE_USERNAME')) {
      router.replace('/register');
    }
  }, [path, router, step, user]);
}

