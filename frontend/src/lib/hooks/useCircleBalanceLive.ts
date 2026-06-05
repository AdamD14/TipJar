import { useEffect, useCallback, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/http';
import { API } from '@/lib/api-routes';

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
  const abortRef = useRef<AbortController | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['circle-balance'],
    queryFn: async (): Promise<{ balance: number; currency: string }> => {
      const { data } = await api.get(API.CIRCLE.BALANCE);
      return data;
    },
    staleTime: Infinity,
  });

  const connect = useCallback(() => {
    const token = getAuthToken();
    if (!token) return;

    const origin =
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
      'http://localhost:3001';

    const controller = new AbortController();
    abortRef.current = controller;

    fetch(`${origin}/api/v1/circle/balance/stream`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok || !response.body) return;
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const balance = JSON.parse(line.slice(6));
                queryClient.setQueryData(['circle-balance'], balance);
              } catch {}
            }
          }
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setTimeout(connect, 3000);
        }
      });
  }, [queryClient]);

  useEffect(() => {
    connect();
    return () => {
      abortRef.current?.abort();
    };
  }, [connect]);

  return { data, isLoading, error };
}
