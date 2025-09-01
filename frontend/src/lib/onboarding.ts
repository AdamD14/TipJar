export type OnboardingStepKey = 'identity' | 'bio' | 'tiers' | 'payments' | 'publish';

export type OnboardingStatus = {
  steps: Record<OnboardingStepKey, boolean>;
  completion: number; // 0..100
  nextStep: OnboardingStepKey;
  username?: string;
  avatarUrl?: string;
  paymentConnected?: boolean;
  published?: boolean;
};

export const stepLabels: Record<OnboardingStepKey, string> = {
  identity: 'Identity',
  bio: 'Bio & Social',
  tiers: 'Tiers',
  payments: 'Payments',
  publish: 'Publish',
};

export function stepsToCompletion(steps: Record<OnboardingStepKey, boolean>): number {
  const total = Object.keys(steps).length;
  const done = Object.values(steps).filter(Boolean).length;
  return Math.round((done / total) * 100);
}

