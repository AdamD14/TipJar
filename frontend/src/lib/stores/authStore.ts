import { create } from 'zustand';

// Definicje typów
type UserRole = 'FAN' | 'CREATOR' | null;
type OnboardingStep =
  | 'ROLE_SELECTION'
  | 'REGISTER'
  | 'CHOOSE_USERNAME'
  | 'CONSENTS'
  | 'KYC'
  | 'COMPLETED';

interface UserData {
  email?: string;
  walletAddress?: string;
  username?: string;
  avatarUrl?: string;
  // Dodaj więcej jak trzeba (np. social links, opis, itp.)
}

interface Consents {
  ageConfirmed: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  kycDone?: boolean; // opcjonalne
}

interface AuthState {
  step: OnboardingStep;
  role: UserRole;
  accessToken: string | null;
  userData: UserData;
  consents: Consents;
  setStep: (step: OnboardingStep) => void;
  setRole: (role: UserRole) => void;
  setAccessToken: (token: string | null) => void;
  setUserData: (data: Partial<UserData>) => void;
  setConsents: (data: Partial<Consents>) => void;
  reset: () => void;
  nextStep: () => void;
}

// Kolejność kroków w onboardingu
const stepsOrder: OnboardingStep[] = [
  'ROLE_SELECTION',
  'REGISTER', // Email/Wallet
  'CHOOSE_USERNAME',
  'CONSENTS',
  'KYC',
  'COMPLETED',
];

// Store Zustand
export const useAuthStore = create<AuthState>((set, get) => ({
  step: 'ROLE_SELECTION',
  role: null,
  accessToken: null,
  userData: {},
  consents: {
    ageConfirmed: false,
    termsAccepted: false,
    privacyAccepted: false,
  },
  setStep: (step) => set({ step }),
  setRole: (role) => set({ role }),
  setAccessToken: (token) => set({ accessToken: token }),
  setUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data },
    })),
  setConsents: (data) =>
    set((state) => ({
      consents: { ...state.consents, ...data },
    })),
  reset: () =>
    set({
      step: 'ROLE_SELECTION',
      role: null,
      accessToken: null,
      userData: {},
      consents: {
        ageConfirmed: false,
        termsAccepted: false,
        privacyAccepted: false,
      },
    }),
  nextStep: () => {
    const currentStepIndex = stepsOrder.indexOf(get().step);
    let nextStep: OnboardingStep | undefined = stepsOrder[currentStepIndex + 1];
    // Fan pomija KYC
    if (nextStep === 'KYC' && get().role === 'FAN') {
      nextStep = stepsOrder[currentStepIndex + 2];
    }
    if (nextStep) set({ step: nextStep });
  },
}));
