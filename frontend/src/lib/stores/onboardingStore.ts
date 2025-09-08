"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Role = 'FAN' | 'CREATOR';
type Step = 'REGISTER' | 'CHOOSE_USERNAME' | 'CONSENTS' | 'COMPLETED';

export type UserLite = {
  id: string;
  email?: string | null;
  role?: Role | null;
  username?: string | null;
  hasCompletedOnboarding?: boolean;
};

type State = {
  step: Step;
  role: Role;
  tokens: { accessToken: string | null };
  user: UserLite | null;
  drafts: {
    email?: string;
    password?: string;
    username?: string;
    consents?: { termsAccepted: boolean; marketing: boolean };
  };
};

type Actions = {
  setStep: (s: Step) => void;
  setRole: (r: Role) => void;
  setTokens: (t: { accessToken: string | null }) => void;
  setUser: (u: UserLite | null) => void;
  setDraft: (p: Partial<State['drafts']>) => void;
  reset: () => void;
};

const initial: State = {
  step: 'REGISTER',
  role: 'CREATOR',
  tokens: { accessToken: null },
  user: null,
  drafts: {
    consents: { termsAccepted: false, marketing: false },
  },
};

export const useOnboardingStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initial,
      setStep: (s: Step) => set({ step: s }),
      setRole: (r: Role) => set((state) => ({ role: r, user: { ...(state.user ?? {}), role: r } })),
      setTokens: (t: { accessToken: string | null }) => set({ tokens: t }),
      setUser: (u: UserLite | null) => set({ user: u ?? null }),
      setDraft: (p: Partial<State['drafts']>) => set((s) => ({ drafts: { ...s.drafts, ...p } })),
      reset: () => set(initial),
    }),
    {
      name: 'tj+_onboarding_v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (state) => state as any,
      partialize: (s) => s,
    },
  ),
);
