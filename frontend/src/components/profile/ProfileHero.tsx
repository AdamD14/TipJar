// frontend/src/components/profile/ProfileHero.tsx
'use client';

import Image from 'next/image';
import PrimaryCta from '@/components/cta/PrimaryCta';
import SecondaryCta from '@/components/cta/SecondaryCta';

type Props = {
  name: string;
  handle: string;
  tagline?: string;
  portraitUrl?: string | null;
  bannerUrl?: string | null;
  onPrimaryHref?: string;   // e.g., /tip/[handle]
  onSecondaryHref?: string; // e.g., /follow/[handle]
};

const BRAND_DARK = '#003737';
const GOLD = '#FFD700';
const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';

export default function ProfileHero({
  name,
  handle,
  tagline,
  portraitUrl,
  bannerUrl,
  onPrimaryHref = '#',
  onSecondaryHref = '#',
}: Props) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-[rgba(255,215,0,0.12)]">
      {/* Banner */}
      <div className="relative h-56 w-full sm:h-64">
        {/* Placeholder if missing */}
        {bannerUrl ? (
          <Image src={bannerUrl} alt="" fill sizes="100vw" className="object-cover" priority />
        ) : (
          <div className="h-full w-full bg-[rgba(0,55,55,0.8)]" aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.55)] via-transparent to-[rgba(0,0,0,0.15)]" />
      </div>

      {/* Info row */}
      <div className="relative -mt-10 flex flex-col gap-4 px-5 pb-5 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        {/* Portrait */}
        <div className="flex items-end gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-[rgba(255,215,0,0.16)] bg-[rgba(0,55,55,0.9)]">
            {portraitUrl ? (
              <Image src={portraitUrl} alt={`${name} portrait`} fill sizes="96px" className="object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center" aria-hidden>
                <span className="text-sm" style={{ color: TEXT_SECONDARY }}>—</span>
              </div>
            )}
          </div>
          <div className="pb-2">
            <h1 className="text-2xl font-semibold" style={{ color: TEXT_PRIMARY }}>{name}</h1>
            <p className="text-sm" style={{ color: TEXT_SECONDARY }}>@{handle}</p>
            {tagline && <p className="mt-1 max-w-xl text-sm" style={{ color: TEXT_PRIMARY }}>{tagline}</p>}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 pb-2">
          <PrimaryCta href={onPrimaryHref}>Support Now</PrimaryCta>
          <SecondaryCta href={onSecondaryHref}>Follow</SecondaryCta>
        </div>
      </div>
    </section>
  );
}
