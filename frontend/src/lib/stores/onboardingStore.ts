import { create } from 'zustand';

type OnboardingStep =
  | 'ROLE_SELECTION'
  | 'AUTH_DETAILS'
  | 'CHOOSE_USERNAME'
  | 'CONSENTS'
  | 'CREATOR_SETUP'
  | 'COMPLETED';

interface OnboardingState {
  step: OnboardingStep;
  role: 'FAN' | 'CREATOR' | null;
  tokens: { accessToken: string | null };
  userData: { email?: string; walletAddress?: string; username?: string };
}

interface OnboardingActions {
  setStep: (step: OnboardingStep) => void;
  setRole: (role: 'FAN' | 'CREATOR') => void;
  setTokens: (tokens: { accessToken: string | null }) => void;
  setUserData: (data: Partial<OnboardingState['userData']>) => void;
  nextStep: () => void;
  reset: () => void;
}

const stepsOrder: OnboardingStep[] = [
  'ROLE_SELECTION',
  'AUTH_DETAILS',
  'CHOOSE_USERNAME',
  'CONSENTS',
  'CREATOR_SETUP',
  'COMPLETED',
];

const initialState: OnboardingState = {
  step: 'ROLE_SELECTION',
  role: null,
  tokens: { accessToken: null },
  userData: {},
};

export const useOnboardingStore = create<OnboardingState & { actions: OnboardingActions }>()((set, get) => ({
  ...initialState,
  actions: {
    setStep: (step) => set({ step }),
    setRole: (role) => set({ role }),
    setTokens: (tokens) => set({ tokens }),
    setUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
    nextStep: () => {
      const currentStepIndex = stepsOrder.indexOf(get().step);
      if (currentStepIndex < stepsOrder.length - 1) {
        let nextStep = stepsOrder[currentStepIndex + 1];
        if (nextStep === 'CREATOR_SETUP' && get().role === 'FAN') {
          nextStep = stepsOrder[currentStepIndex + 2];
        }
        set({ step: nextStep });
      }
    },
    reset: () => set(initialState),
  },
}));

