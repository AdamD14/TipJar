import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { EP } from './endpoints';
import type { Stats, CreatorProfile, Goal, Subscription } from './contracts';

const api = apiClient;

export function useStats(range: '7d' | '30d' | '90d' = '30d') {
  return useQuery({
    queryKey: ['stats', range],
    queryFn: async (): Promise<Stats> => (await api.get(EP.stats, { params: { range } })).data,
    retry: 1,
    staleTime: 60_000,
  });
}

export function useCreatorProfile() {
  return useQuery({
    queryKey: ['creator-profile'],
    queryFn: async (): Promise<CreatorProfile> => (await api.get(EP.profile)).data,
    retry: 1,
    staleTime: 60_000,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (payload: Partial<CreatorProfile>) => (await api.patch(EP.profile, payload)).data,
  });
}

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await api.post('/uploads', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data?.url as string;
}

export function useCreatorBalance() {
  return useQuery({
    queryKey: ['creator-balance'],
    queryFn: async (): Promise<{ balance: number }> => (await api.get(EP.balance)).data,
    retry: 1,
    staleTime: 30_000,
  });
}

export function useWithdraw() {
  return useMutation({
    mutationFn: async (payload: { amount: number; address: string }) => (await api.post(EP.withdraw, payload)).data,
  });
}

export function useGoal() {
  return useQuery({
    queryKey: ['creator-goal'],
    queryFn: async (): Promise<Goal | null> => (await api.get(EP.goals)).data ?? null,
    retry: 1,
    staleTime: 60_000,
  });
}

export function useSaveGoal() {
  return useMutation({
    mutationFn: async (payload: Goal) => (await api.post(EP.goals, payload)).data,
  });
}

export function useCreatorSubscriptions(params?: {
  q?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['creator-subscriptions', params],
    queryFn: async (): Promise<Subscription[]> => (await api.get(EP.subscriptions, { params })).data,
    retry: 1,
    staleTime: 30_000,
  });
}

export function useTip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      creatorId: string;
      amount: number;
      message?: string;
      isAnonymous?: boolean;
    }) => (await api.post(EP.tips, { ...payload, amount: String(payload.amount) })).data,
    onSuccess: (_data, variables) => {
      // Keeps GoalBar progress and FanWall in sync right after a tip,
      // instead of waiting for staleTime/remount. No contract change —
      // same POST /api/v1/tips call, just invalidating local caches.
      queryClient.invalidateQueries({ queryKey: ['goal-progress', variables.creatorId] });
      queryClient.invalidateQueries({ queryKey: ['public-tips', variables.creatorId] });
    },
  });
}

export interface PublicTip {
  id: string;
  amount: string;
  message: string | null;
  isAnonymous: boolean;
  createdAt: string;
  fan: {
    id: string;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  } | null;
}

export function usePublicTips(creatorId: string, page = 1, limit = 20) {
  return useQuery({
    queryKey: ['public-tips', creatorId, page, limit],
    queryFn: async (): Promise<{ tips: PublicTip[]; total: number }> =>
      (await api.get(EP.publicTips(creatorId), { params: { page, limit } })).data,
    retry: 1,
    staleTime: 30_000,
  });
}

export function useGoalProgress(creatorId?: string) {
  return useQuery({
    queryKey: ['goal-progress', creatorId],
    queryFn: async (): Promise<{ totalReceived: string; tipCount: number }> =>
      (await api.get(EP.goalProgress(creatorId as string))).data,
    enabled: !!creatorId,
    retry: 1,
    staleTime: 30_000,
  });
}

