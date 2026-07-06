"use client";

import { useEffect, useCallback, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/http';
import { API } from '@/lib/api-routes';
import { useAuthStore } from '@/lib/store/authStore';

function getAuthToken(): string {
  if (typeof window === 'undefined') return '';
  try {
    const raw = sessionStorage.getItem('auth-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.state?.accessToken || '';
    }
  } catch {}
  return '';
}

export function useCircleBalanceLive() {
  const queryClient = useQueryClient();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureCountRef = useRef<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['circle-balance'],
    queryFn: async (): Promise<{ balance: number; currency: string }> => {
      const { data } = await api.get(API.CIRCLE.BALANCE);
      return data;
    },
    staleTime: Infinity,
    enabled: hasHydrated && (!!accessToken || !!user),
  });

  const connect = useCallback((signal: AbortSignal) => {
    if (!hasHydrated) return;
    if (signal.aborted) return;

    const token = getAuthToken();
    if (!token && !user) return;

    const origin =
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
      'http://localhost:3001';

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    fetch(`${origin}/api/v1/circle/balance/stream`, {
      headers,
      credentials: 'include',
      signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          if (failureCountRef.current === 0) {
            console.warn(`[useCircleBalanceLive] SSE ${response.status} — retrying in 5s`);
          }
          failureCountRef.current += 1;
          if (!signal.aborted) {
            timeoutRef.current = setTimeout(() => connect(signal), 5000);
          }
          return;
        }
        if (!response.body) {
          if (failureCountRef.current === 0) {
            console.warn('[useCircleBalanceLive] No body — retrying in 5s');
          }
          failureCountRef.current += 1;
          if (!signal.aborted) {
            timeoutRef.current = setTimeout(() => connect(signal), 5000);
          }
          return;
        }

        console.log('[useCircleBalanceLive] SSE connected');
        failureCountRef.current = 0;
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log('[useCircleBalanceLive] SSE stream ended — reconnecting in 3s');
            if (!signal.aborted) {
              timeoutRef.current = setTimeout(() => connect(signal), 3000);
            }
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const balance = JSON.parse(line.slice(6));
                console.log('[useCircleBalanceLive] balance update:', balance);
                queryClient.setQueryData(['circle-balance'], balance);
              } catch {}
            }
          }
        }
      })
      .catch(() => {
        if (!signal.aborted) {
          if (failureCountRef.current === 0) {
            console.warn('[useCircleBalanceLive] SSE connection failed (backend offline), retrying silently...');
          }
          failureCountRef.current += 1;
          timeoutRef.current = setTimeout(() => connect(signal), 5000);
        }
      });
  }, [queryClient, hasHydrated, user]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!accessToken && !user) return;

    const controller = new AbortController();
    abortRef.current = controller;
    connect(controller.signal);

    return () => {
      controller.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [connect, hasHydrated, accessToken, user]);

  return { data, isLoading, error };
}
