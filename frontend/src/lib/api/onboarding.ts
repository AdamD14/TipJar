import { api } from '@/lib/api/http';
import type { OnboardingStatus } from '@/lib/onboarding';

export async function getOnboardingStatus(): Promise<OnboardingStatus> {
  const { data } = await api.get('/api/v1/creator/onboarding/status');
  return data;
}

export async function saveIdentity(payload: { username?: string; avatarUrl?: string; coverUrl?: string }) {
  const { data } = await api.patch('/api/v1/creator/onboarding/identity', payload);
  return data;
}

export async function saveBioSocial(payload: { displayName: string; bio: string; socials: Partial<Record<'x'|'instagram'|'youtube'|'twitch'|'website', string>> }) {
  const { data } = await api.patch('/api/v1/creator/onboarding/bio', payload);
  return data;
}

export async function createOrUpdateTier(payload: { id?: string; name: string; priceCents: number; perks: string[]; active: boolean }) {
  const { data } = await api.post('/api/v1/creator/onboarding/tier', payload);
  return data;
}

export async function markPaymentsConnected(payload: { connected: boolean }) {
  const { data } = await api.patch('/api/v1/creator/onboarding/payments', payload);
  return data;
}

export async function publishProfile(payload: { publish: boolean }) {
  const { data } = await api.post('/api/v1/creator/onboarding/publish', payload);
  return data;
}

