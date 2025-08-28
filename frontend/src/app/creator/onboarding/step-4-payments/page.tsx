"use client";
import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { markPaymentsConnected } from '@/lib/api/onboarding';
import { useRouter } from 'next/navigation';
import { CreatorOnboardingGuard } from '@/components/onboarding/CreatorOnboardingGuard';

export default function StepPayments() {
  const router = useRouter();
  return (
    <>
      <CreatorOnboardingGuard allow={['payments', 'publish']} />
      <OnboardingCard
        title="Step 4 – Payments setup"
        footer={
          <div className="flex items-center justify-between">
            <button className="rounded-lg border border-white/15 px-3 py-2" onClick={() => router.back()}>
              Back
            </button>
            <button className="rounded-lg bg-[#FFD700] px-4 py-2 font-bold text-[#0d2f3f]" onClick={() => router.push('/creator/onboarding/step-5-publish')}>
              Continue
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <button
            className="w-full rounded-lg border border-white/15 px-4 py-2 text-left"
            onClick={async () => {
              // Placeholder: w produkcji otwórz redirect/SDK i po powrocie oznacz connected=true
              await markPaymentsConnected({ connected: true });
              alert('Marked payment as connected');
            }}
          >
            💳 Connect payments (placeholder)
          </button>
          <p className="text-xs text-white/60">Później podmień na realny redirect/SDK do Circle Hosted On‑Ramp / DCW.</p>
        </div>
      </OnboardingCard>
    </>
  );
}

