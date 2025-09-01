"use client";
import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { publishProfile } from '@/lib/api/onboarding';
import { useRouter } from 'next/navigation';
import { CreatorOnboardingGuard } from '@/components/onboarding/CreatorOnboardingGuard';

export default function StepPublish() {
  const router = useRouter();
  return (
    <>
      <CreatorOnboardingGuard allow={['publish']} />
      <OnboardingCard
        title="Step 5 – Publish & share"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button className="rounded-lg border border-white/15 px-3 py-2" onClick={() => router.back()}>
              Back
            </button>
            <button
              className="rounded-lg bg-[#FFD700] px-4 py-2 font-bold text-[#0d2f3f]"
              onClick={async () => {
                await publishProfile({ publish: true });
                router.push('/creator/overview');
              }}
            >
              Publish
            </button>
          </div>
        }
      >
        <ul className="list-inside list-disc text-sm text-white/80">
          <li>
            Twój profil będzie dostępny pod adresem: <code>tipjar.plus/@username</code>
          </li>
          <li>Udostępnij widget/QR w swoich socialach.</li>
        </ul>
      </OnboardingCard>
    </>
  );
}

