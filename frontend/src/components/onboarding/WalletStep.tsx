"use client";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import WalletConnect from "@/components/onboarding/WalletConnect";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";

export default function WalletStep() {
  return (
    <OnboardingGuard>
      <OnboardingShell title="Connect your wallet" step={2}>
        <WalletConnect />
      </OnboardingShell>
    </OnboardingGuard>
  );
}
<<<<<<< HEAD

=======
>>>>>>> aacff4d735ea83b0bd34eefd4e7b953f32009701
