"use client";
import OnboardingCard from '@/components/onboarding/OnboardingCard';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import { saveBioSocial } from '@/lib/api/onboarding';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreatorOnboardingGuard } from '@/components/onboarding/CreatorOnboardingGuard';

export default function StepBio() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [socials, setSocials] = useState({ x: '', instagram: '', youtube: '', twitch: '', website: '' });

  return (
    <>
      <CreatorOnboardingGuard allow={['bio', 'tiers', 'payments', 'publish']} />
      <OnboardingCard
        title="Step 2 – Bio & Social"
        footer={
          <div className="flex items-center justify-between">
            <button className="rounded-lg border border-white/15 px-3 py-2" onClick={() => router.back()}>
              Back
            </button>
            <button
              className="rounded-lg bg-[#FFD700] px-4 py-2 font-bold text-[#0d2f3f]"
              onClick={async () => {
                await saveBioSocial({ displayName, bio, socials });
                router.push('/creator/onboarding/step-3-tiers');
              }}
            >
              Save & Continue
            </button>
          </div>
        }
      >
        <Input label="Display name" value={displayName} onChange={(e) => setDisplayName(e.currentTarget.value)} />
        <Textarea label="Short bio" rows={4} value={bio} onChange={(e) => setBio(e.currentTarget.value)} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Website" value={socials.website} onChange={(e) => setSocials((p) => ({ ...p, website: e.currentTarget.value }))} />
          <Input label="X (Twitter)" value={socials.x} onChange={(e) => setSocials((p) => ({ ...p, x: e.currentTarget.value }))} />
          <Input label="Instagram" value={socials.instagram} onChange={(e) => setSocials((p) => ({ ...p, instagram: e.currentTarget.value }))} />
          <Input label="YouTube" value={socials.youtube} onChange={(e) => setSocials((p) => ({ ...p, youtube: e.currentTarget.value }))} />
          <Input label="Twitch" value={socials.twitch} onChange={(e) => setSocials((p) => ({ ...p, twitch: e.currentTarget.value }))} />
        </div>
      </OnboardingCard>
    </>
  );
}

