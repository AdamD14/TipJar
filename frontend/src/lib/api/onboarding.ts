import { http } from '@/lib/http';
import type { OnboardingStatus } from '@/lib/onboarding';

export async function getOnboardingStatus(): Promise<OnboardingStatus> {
  return http('/api/v1/creator/onboarding/status', { method: 'GET' });
}

export async function saveIdentity(payload: { username?: string; avatarUrl?: string; coverUrl?: string }) {
  return http('/api/v1/creator/onboarding/identity', { method: 'PATCH', json: payload });
}

export async function saveBioSocial(payload: { displayName: string; bio: string; socials: Partial<Record<'x'|'instagram'|'youtube'|'twitch'|'website', string>> }) {
  return http('/api/v1/creator/onboarding/bio', { method: 'PATCH', json: payload });
}

export async function createOrUpdateTier(payload: { id?: string; name: string; priceCents: number; perks: string[]; active: boolean }) {
  return http('/api/v1/creator/onboarding/tier', { method: 'POST', json: payload });
}

export async function markPaymentsConnected(payload: { connected: boolean }) {
  return http('/api/v1/creator/onboarding/payments', { method: 'PATCH', json: payload });
}

export async function publishProfile(payload: { publish: boolean }) {
  return http('/api/v1/creator/onboarding/publish', { method: 'POST', json: payload });
}

