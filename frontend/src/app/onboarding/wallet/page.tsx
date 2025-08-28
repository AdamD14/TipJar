"use client";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import WalletConnect from "@/components/onboarding/WalletConnect";
import OnboardingGuard from "@/components/onboarding/OnboardingGuard";

export const metadata = {
  title: "Onboarding — wallet • tipjar+",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding/wallet" },
};

export default function Page() {
  return (
    <OnboardingGuard>
      <OnboardingShell title="Connect your wallet" step={2}>
        <WalletConnect />
      </OnboardingShell>
    </OnboardingGuard>
  );
}

