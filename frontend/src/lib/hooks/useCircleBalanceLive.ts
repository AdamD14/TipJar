import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/http';
import { API } from '@/lib/api-routes';

export function useCircleBalanceLive() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['circle-balance'],
    queryFn: async (): Promise<{ balance: number; currency: string }> => {
      const { data } = await api.get(API.CIRCLE.BALANCE);
      return data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    const token = (() => {
      if (typeof window === 'undefined') return '';
      try {
        const raw = sessionStorage.getItem('auth-storage');
        if (raw) {
          const parsed = JSON.parse(raw);
          return parsed?.state?.accessToken || '';
        }
      } catch {}
      return '';
    })();

    const origin =
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
      'http://localhost:3001';

    const eventSource = new EventSource(
      `${origin}/api/v1/circle/balance/stream?token=${token}`
    );

    eventSource.onmessage = (event) => {
      const balance = JSON.parse(event.data);
      queryClient.setQueryData(['circle-balance'], balance);
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => eventSource.close();
  }, [queryClient]);

  return { data, isLoading, error };
}