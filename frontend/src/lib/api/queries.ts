

  });
}

export function useStats(range: '7d' | '30d' | '90d' = '30d') {
  return useQuery({
    queryKey: ['stats', range],
    queryFn: async (): Promise<Stats> =>
      (await api.get(EP.stats, { params: { range } })).data,
    retry: 1,
    staleTime: 60_000,
  });
}

export function useCreatorProfile() {
  return useQuery({
    queryKey: ['creator-profile'],
    queryFn: async (): Promise<CreatorProfile> =>
      (await api.get(EP.profile)).data,
    retry: 1,
    staleTime: 60_000,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (payload: Partial<CreatorProfile>) =>
      (await api.patch(EP.profile, payload)).data,
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
    queryFn: async (): Promise<{ balance: number }> =>
      (await api.get(EP.balance)).data,
    retry: 1,
    staleTime: 30_000,
  });
}

export function useWithdraw() {
  return useMutation({
    mutationFn: async (payload: { amount: number; address: string }) =>
      (await api.post(EP.withdraw, payload)).data,
  });
}

export function useGoal() {
  return useQuery({
    queryKey: ['creator-goal'],
    queryFn: async (): Promise<Goal | null> =>
      (await api.get(EP.goals)).data ?? null,
    retry: 1,
    staleTime: 60_000,
  });
}

export function useSaveGoal() {
  return useMutation({
    mutationFn: async (payload: Goal) =>
      (await api.post(EP.goals, payload)).data,
  });
}

export function useCreatorSubscriptions(params?: {
  q?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['creator-subscriptions', params],
    queryFn: async (): Promise<Subscription[]> =>
      (await api.get(EP.subscriptions, { params })).data,
    retry: 1,
    staleTime: 30_000,
  });
}
