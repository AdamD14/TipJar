import { useMutation } from '@tanstack/react-query';
import api from './http';
import { EP } from './endpoints';

export function useTip() {
  return useMutation({
    mutationFn: async (p: { creatorId: string; amount: number; message?: string }) =>
      (await api.post(EP.tips, p)).data,
  });
}
