'use client';

import { useEffect, useRef } from 'react';
import apiClient from '@/lib/apiClient';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

export default function useHydrateAuth() {
  const hydrated = useRef(false);
  const { setUser } = useOnboardingStore();
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    (async () => {
      try {
        // Jeśli backend ustawił cookie po OAuth, to /auth/me zwróci użytkownika
        const res = await apiClient.get('/auth/me');
        if (res?.data) setUser(res.data);
      } catch {
        // brak sesji – ignoruj
      }
    })();
  }, [setUser]);
}

