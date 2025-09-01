'use client';

import { useMemo } from 'react';
import ProfileHero from '@/components/profile/ProfileHero';
import SupportTierCard from '@/components/profile/SupportTierCard';
import TipModule from '@/components/profile/TipModule';
import ContentGrid from '@/components/profile/ContentGrid';
import CommunitySection from '@/components/profile/CommunitySection';
import StickyCtaDock from '@/components/profile/StickyCtaDock';
import data from '@/data/profile.seed.json';

type PageProps = { params: { handle: string } };

export default function CreatorProfilePage({ params }: PageProps) {
  const profile = useMemo(() => (data as any[]).find((p) => p.handle === params.handle), [params.handle]);

  if (!profile) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-xl font-semibold text-[#DDE0DA]">Profile not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <ProfileHero
        name={profile.name}
        handle={profile.handle}
        tagline={profile.tagline}
        portraitUrl={profile.portraitUrl}
        bannerUrl={profile.bannerUrl}
        onPrimaryHref={`/tip/${profile.handle}`}
        onSecondaryHref={`/follow/${profile.handle}`}
      />

      {/* Monetization rows */}
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tiers */}
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-base font-semibold text-[#DDE0DA]">Membership tiers</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.tiers.map((t: any) => (
              <SupportTierCard key={t.id} tier={t} onSelect={() => { /* hook into checkout */ }} />
            ))}
          </div>

          <h2 className="mt-8 mb-3 text-base font-semibold text-[#DDE0DA]">Recent posts</h2>
          <ContentGrid items={profile.posts} />
        </div>

        {/* Tips + community */}
        <aside className="space-y-6">
          <TipModule
            currency={profile.currency || 'USD'}
            onSubmit={(amount) => {
              // Hook point for payments. Demo only:
              alert(`Tipping ${amount} ${profile.currency || 'USD'} to ${profile.name}`);
            }}
          />
          <CommunitySection links={profile.communityLinks} />
        </aside>
      </section>

      {/* Sticky CTA for mobile */}
      <StickyCtaDock href={`/tip/${profile.handle}`} />
    </main>
  );
}
