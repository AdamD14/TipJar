import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Definicje typów, które już masz, są dobre.
// Zmieniamy tylko `UserData` na bardziej kompletny typ `User`.
type OnboardingStep =
  | "ROLE_SELECTION"
  | "REGISTER"
  | "CHOOSE_USERNAME"
  | "CONSENTS"
  | "KYC"
  | "COMPLETED";

// <<< GŁÓWNA POPRAWKA: Tworzymy jeden, spójny typ dla użytkownika
type User = {
  id?: string;
  email?: string;
  role: "FAN" | "CREATOR" | null;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  country?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
  hasCompletedOnboarding?: boolean;
  consents?: unknown;
};

interface Consents {
  ageConfirmed: boolean;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  kycDone?: boolean;
}

// <<< POPRAWKA: Upraszczamy interfejs AuthState
interface AuthState {
  step: OnboardingStep;
  user: User | null;
  accessToken: string | null;
  consents: Consents;
  _hasHydrated: boolean;
  setStep: (step: OnboardingStep) => void;
  setUser: (user: Partial<User> | null) => void;
  setAccessToken: (token: string | null) => void;
  setConsents: (data: Partial<Consents>) => void;
  reset: () => void;
  nextStep: () => void;
}

const stepsOrder: OnboardingStep[] = [
  "ROLE_SELECTION",
  "REGISTER",
  "CHOOSE_USERNAME",
  "CONSENTS",
  "KYC",
  "COMPLETED",
];

const initialState = {
  step: "ROLE_SELECTION" as OnboardingStep,
  user: null,
  accessToken: null,
  consents: {
    ageConfirmed: false,
    termsAccepted: false,
    privacyAccepted: false,
  },
  _hasHydrated: false, // Add this
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      setUser: (data) =>
        set((state) => ({
          user: data ? ({ ...(state.user || {}), ...data } as User) : null,
        })),

      setAccessToken: (token) => set({ accessToken: token }),

      setConsents: (data) =>
        set((state) => ({
          consents: { ...state.consents, ...data },
        })),

      reset: () => set(initialState),

      nextStep: () => {
        const currentStepIndex = stepsOrder.indexOf(get().step);
        let nextStep: OnboardingStep | undefined =
          stepsOrder[currentStepIndex + 1];

        if (nextStep === "KYC" && get().user?.role === "FAN") {
          nextStep = stepsOrder[currentStepIndex + 2];
        }
        if (nextStep) set({ step: nextStep });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);
