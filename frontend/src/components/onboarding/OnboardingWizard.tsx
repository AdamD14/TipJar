"use client";

import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import RoleStep from "./RoleStep";
import AuthStep from "./AuthStep";

const PlaceholderStep = ({ name }: { name: string }) => (
  <div className="text-white text-center p-8 bg-slate-800 rounded-lg border border-teal-500">
    To jest placeholder dla kroku: <br />
    <strong className="text-xl text-teal-400">{name}</strong>
  </div>
);

const UsernameStep = () => <PlaceholderStep name="CHOOSE_USERNAME" />;
const ConsentsStep = () => <PlaceholderStep name="CONSENTS" />;
const CreatorSetupStep = () => <PlaceholderStep name="CREATOR_SETUP" />;
const CompletionStep = () => <PlaceholderStep name="COMPLETED" />;

export default function OnboardingWizard() {
  const step = useOnboardingStore((state) => state.step);

  const renderCurrentStep = () => {
    switch (step) {
      case 'ROLE_SELECTION':
        return <RoleStep />;
      case 'AUTH_DETAILS':
        return <AuthStep />;
      case 'CHOOSE_USERNAME':
        return <UsernameStep />;
      case 'CONSENTS':
        return <ConsentsStep />;
      case 'CREATOR_SETUP':
        return <CreatorSetupStep />;
      case 'COMPLETED':
        return <CompletionStep />;
      default:
        useOnboardingStore.getState().actions.reset();
        return <RoleStep />;
    }
  };

  return (
    <div className="w-full max-w-lg">
      {renderCurrentStep()}
    </div>
  );
}

