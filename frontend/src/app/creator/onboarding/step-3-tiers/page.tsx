"use client";
import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { TierForm } from '@/components/forms/TierForm';
import { createOrUpdateTier } from '@/lib/api/onboarding';
import { useRouter } from 'next/navigation';
import { CreatorOnboardingGuard } from '@/components/onboarding/CreatorOnboardingGuard';

export default function StepTiers() {
  const router = useRouter();
  return (
    <>
      <CreatorOnboardingGuard allow={['tiers', 'payments', 'publish']} />
      <OnboardingCard
        title="Step 3 – Create at least one tier"
        footer={
          <div className="flex items-center justify-between">
            <button className="rounded-lg border border-white/15 px-3 py-2" onClick={() => router.back()}>
              Back
            </button>
            <button className="rounded-lg bg-[#FFD700] px-4 py-2 font-bold text-[#0d2f3f]" onClick={() => router.push('/creator/onboarding/step-4-payments')}>
              Continue
            </button>
          </div>
        }
      >
        <TierForm
          onSubmit={async (v) => {
            const res = await createOrUpdateTier(v);
            if ((res as any)?.ok) {
              alert('Tier saved');
            }
          }}
        />
        <p className="text-sm text-white/70">Możesz dodać więcej później w Creator → Tiers.</p>
      </OnboardingCard>
    </>
  );
}

