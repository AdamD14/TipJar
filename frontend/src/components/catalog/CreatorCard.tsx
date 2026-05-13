// frontend/src/components/catalog/CreatorCard.tsx
'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { CreatorCardProps } from './types';
import SecondaryCta from '@/components/cta/SecondaryCta';

export default function CreatorCard({ creator, href, className, analyticsId }: CreatorCardProps) {
  const {
    handle,
    name,
    tagline,
    avatarUrl,
    verified,
    metricLabel,
    metricValue,
    location,
    tags = [],
  } = creator;

  return (
    <article
      role="article"
      aria-labelledby={`creator-${handle}-title`}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border transition duration-200',
        'border-gold-400/12 bg-teal-800/85 backdrop-blur-sm',
        'hover:shadow-gold-glow hover:shadow-[0_8px_28px_rgba(255,215,0,0.12)]',
        className
      )}
    >
      <div className="flex items-center gap-4 p-5">
        <Avatar src={avatarUrl} alt={`${name} avatar`} />
        <div className="min-w-0">
          <h3
            id={`creator-${handle}-title`}
            className="truncate text-lg font-semibold text-text-ds-primary font-heading"
          >
            {name}
            {verified && (
              <span
                className="ml-2 inline-flex items-center gap-1 rounded-full border border-gold-400 px-2 py-0.5 text-[11px] font-medium text-gold-400"
                aria-label="Verified"
                title="Verified"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Verified
              </span>
            )}
          </h3>
          {tagline ? (
            <p className="truncate text-sm text-teal-25 font-body">
              {tagline}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-5 pb-5">
        {location ? (
          <MetaPill label={location} />
        ) : null}
        {Number.isFinite(metricValue) && metricLabel ? (
          <MetaPill label={`${metricValue} ${metricLabel}`} />
        ) : null}
        {tags.slice(0, 3).map((t) => (
          <Chip key={t} label={t} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gold-400/10 px-5 py-4">
        <span className="text-sm text-teal-25 font-body">
          @{handle}
        </span>
        <SecondaryCta
          href={href}
          ariaLabel={`View ${name}'s profile`}
          analyticsId={analyticsId || 'creator-card-view-profile'}
        >
          View Profile
        </SecondaryCta>
      </div>

      <Link
        href={href}
        aria-label={`Open ${name}'s profile`}
        className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-900"
        tabIndex={-1}
      />
    </article>
  );
}

function Avatar({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) {
    return (
      <div
        aria-hidden
        className="grid h-14 w-14 place-items-center rounded-xl border border-gold-400/12 bg-teal-800"
      >
        <span className="text-xs text-teal-25 font-body">
          —
        </span>
      </div>
    );
  }
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gold-400/12">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="56px"
        priority={false}
        className="object-cover"
      />
    </div>
  );
}

function MetaPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-gold-400/16 px-2.5 py-1 text-xs text-text-ds-primary font-body"
    >
      {label}
    </span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-gold-400/8 px-2.5 py-1 text-xs text-gold-400 font-body"
    >
      {label}
    </span>
  );
}
