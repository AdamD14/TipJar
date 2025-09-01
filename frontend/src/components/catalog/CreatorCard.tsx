'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { CreatorCardProps } from './types';
import SecondaryCta from '@/components/cta/SecondaryCta';

const BRAND_DARK = '#003737';
const GOLD = '#FFD700';
const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';

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
        'group relative overflow-hidden rounded-2xl border transition',
        'border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.85)] backdrop-blur-sm',
        'hover:shadow-[0_8px_28px_rgba(255,215,0,0.12)]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-5">
        <Avatar src={avatarUrl} alt={`${name} avatar`} />
        <div className="min-w-0">
          <h3
            id={`creator-${handle}-title`}
            className="truncate text-lg font-semibold"
            style={{ color: TEXT_PRIMARY }}
          >
            {name}
            {verified && (
              <span
                className="ml-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                style={{ borderColor: GOLD, color: GOLD }}
                aria-label="Verified"
                title="Verified"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                Verified
              </span>
            )}
          </h3>
          {tagline ? (
            <p className="truncate text-sm" style={{ color: TEXT_SECONDARY }}>
              {tagline}
            </p>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-wrap items-center gap-3 px-5 pb-5">
        {location ? <MetaPill label={location} /> : null}
        {Number.isFinite(metricValue) && metricLabel ? (
          <MetaPill label={`${metricValue} ${metricLabel}`} />
        ) : null}
        {tags.slice(0, 3).map((t) => (
          <Chip key={t} label={t} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[rgba(255,215,0,0.10)] px-5 py-4">
        <span className="text-sm" style={{ color: TEXT_SECONDARY }}>
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

      {/* Focus ring container for keyboard users */}
      <Link
        href={href}
        aria-label={`Open ${name}'s profile`}
        className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2"
        tabIndex={-1}
      />
    </article>
  );
}

/* ---- Subcomponents (local) ---- */

function Avatar({ src, alt }: { src?: string | null; alt: string }) {
  // Placeholder if missing asset — identical radius/border as card content
  if (!src) {
    return (
      <div
        aria-hidden
        className="grid h-14 w-14 place-items-center rounded-xl border"
        style={{ borderColor: 'rgba(255,215,0,0.12)', backgroundColor: BRAND_DARK }}
      >
        <span className="text-xs" style={{ color: TEXT_SECONDARY }}>
          —
        </span>
      </div>
    );
  }
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(255,215,0,0.12)' }}>
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
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs"
      style={{ borderColor: 'rgba(255,215,0,0.16)', color: TEXT_PRIMARY }}
    >
      {label}
    </span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-[rgba(255,215,0,0.08)] px-2.5 py-1 text-xs"
      style={{ color: GOLD }}
    >
      {label}
    </span>
  );
}
