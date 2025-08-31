import { useState } from 'react';
import ProfileHero from '@/components/creator/ProfileHero';
import SupportButton from '@/components/creator/SupportButton';
import { WalletAddressModal } from '@/components/WalletAddressModal';
import { getPublicProfile } from '@/lib/users';
import { notFound } from 'next/navigation';

export default async function CreatorPublicPage({ params }: { params: { alias: string } }) {
  const profile = await getPublicProfile(params.alias).catch(() => null);
  if (!profile) notFound();

  const name = profile.displayName || profile.username || params.alias;
  const avatarUrl = profile.avatarUrl || undefined;
  const bannerUrl = profile.profile?.bannerUrl || undefined;
  const bio = profile.profile?.bio || undefined;
  const goal = profile.goal; // optional, may be undefined
  const address = (profile as any).walletAddress as string | undefined;

  return (
    <div className="min-h-screen">
      <ProfileHero name={name} avatarUrl={avatarUrl} bannerUrl={bannerUrl} bio={bio} goal={goal} />
      <section className="px-6 py-6 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-3">
          <SupportButton username={params.alias} />
          {address && <WalletButton address={address} />}
        </div>
      </section>
    </div>
  );
}

function WalletButton({ address }: { address: string }) {
  'use client';
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-3 rounded-lg border border-white/15 text-white"
      >
        Adres do wpłaty
      </button>
      <WalletAddressModal isOpen={open} onClose={() => setOpen(false)} address={address} />
    </>
  );
}

