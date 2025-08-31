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

