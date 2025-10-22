'use client';

import { useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { API } from '@/lib/api-routes';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

export default function useHydrateAuth() {
  const hydrated = useRef(false);
  const { setUser } = useOnboardingStore();
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    (async () => {
      try {
         // Jeśli backend ustawił HttpOnly cookies, /api/v1/auth/me zwróci użytkownika
        const me = await api(API.AUTH.ME); // fetch z credentials: 'include'
        if (me) setUser(me as any);
      } catch {
        // brak sesji – ignoruj
      }
    })();
  }, [setUser]);
}

