"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Step = 'STEP_1' | 'STEP_2' | 'STEP_3' | 'STEP_4' | 'STEP_5' | 'COMPLETED';

export type UserOnboardingState = {
  industry?: string;
  avatar?: string;
  displayName?: string;
  urls?: string[]; // Avatars (temporary hold if needed, or just for preview)
  bio?: string;
  socials?: Record<string, string | null | undefined>;
  goal?: { label: string; target: number };
};

type State = {
  step: Step;
  data: UserOnboardingState;
  // Tokens/User might be needed just for context, or we rely on session
  userId?: string; 
};

type Actions = {
  setStep: (s: Step) => void;
  updateData: (d: Partial<UserOnboardingState>) => void;
  setAvatar: (url: string) => void;
  setDisplayName: (name: string) => void;
  reset: () => void;
};

const initial: State = {
  step: 'STEP_1', // Explicitly start at Step 1
  data: {},
};

export const useOnboardingStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initial,
      setStep: (s) => set({ step: s }),
      updateData: (d) => set((state) => ({ data: { ...state.data, ...d } })),
      setAvatar: (url) => set((state) => ({ data: { ...state.data, avatar: url } })),
      setDisplayName: (name) => set((state) => ({ data: { ...state.data, displayName: name } })),
      reset: () => set(initial),
    }),
    {
      name: 'tj+_onboarding_v2', // v2 to avoid conflicts
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ step: s.step, data: s.data }), // Only persist data/step
    },
  ),
);
