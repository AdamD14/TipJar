"use client";
import OnboardingCard from '@/components/onboarding/OnboardingCard';
import UploadAvatar from '@/components/forms/UploadAvatar';
import Input from '@/components/forms/Input';
import { useEffect, useState } from 'react';
import { getOnboardingStatus, saveIdentity } from '@/lib/api/onboarding';
import { CreatorOnboardingGuard } from '@/components/onboarding/CreatorOnboardingGuard';
import { useRouter } from 'next/navigation';

export default function StepIdentity() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatar] = useState<string | undefined>(undefined);
  const [coverUrl, setCover] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const st = await getOnboardingStatus();
      setUsername(st.username || '');
      setAvatar(st.avatarUrl);
    })();
  }, []);

  return (
    <>
      <CreatorOnboardingGuard allow={['identity', 'bio', 'tiers', 'payments', 'publish']} />
      <OnboardingCard
        title="Step 1 – Identity"
        footer={
          <div className="flex justify-end">
            <button
              className="rounded-lg bg-[#FFD700] px-4 py-2 font-bold text-[#0d2f3f]"
              onClick={async () => {
                await saveIdentity({ username, avatarUrl, coverUrl });
                router.push('/creator/onboarding/step-2-bio-social');
              }}
            >
              Save & Continue
            </button>
          </div>
        }
      >
        <UploadAvatar value={avatarUrl} onChange={setAvatar} />
        <Input label="Username (readonly jeśli wybrany)" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
        <Input label="Cover image URL (opcjonalne)" value={coverUrl} onChange={(e) => setCover(e.currentTarget.value)} />
      </OnboardingCard>
    </>
  );
}

