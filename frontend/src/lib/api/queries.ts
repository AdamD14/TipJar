import { useEffect } from 'react';
import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../api';
import { API as EP } from '../api-routes';

export const queryClient = new QueryClient();

export function useGlobalError() {
  const qc = useQueryClient();
  useEffect(() => {
    const unsub = qc.getQueryCache().subscribe((event) => {
      if (event?.type === 'query' && event.query.state.status === 'error') {
        console.error(event.query.state.error);
      }
    });
    return unsub;
  }, [qc]);
}

export function useCreator(username: string) {
  return useQuery({
    queryKey: ['creator', username],
    queryFn: () =>
      api(
        EP.USERS.PUBLIC_BY_USERNAME.replace(
          ':username',
          encodeURIComponent(username),
        ),
      ),
    retry: 1,
    staleTime: 0,
  });
}

export function useExplore() {
  return useQuery({
    queryKey: ['explore'],
    queryFn: () => api(EP.CREATORS),
    retry: 1,
    staleTime: 0,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => api('/api/v1/stats'),
    retry: 1,
    staleTime: 0,
  });
}

export function useWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => api(EP.CIRCLE.WALLET),
    retry: 1,
    staleTime: 0,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => api(EP.NOTIFICATIONS),
    retry: 1,
    staleTime: 0,
  });
}

export function useSetUsername() {
  return useMutation({
    mutationFn: (username: string) =>
      api(EP.USERS.SET_USERNAME, {
        method: 'POST',
        body: JSON.stringify({ username }),
      }),
    retry: 1,
  });
}

export function useWithdraw() {
  return useMutation({
    mutationFn: (amount: number) =>
      api(EP.CIRCLE.WITHDRAW, {
        method: 'POST',
        body: JSON.stringify({ amount }),
      }),
    retry: 1,
  });
}
