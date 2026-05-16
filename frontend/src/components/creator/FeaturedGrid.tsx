"use client";

import Link from 'next/link';
import CreatorCard from '@/components/explore/CreatorCard';
import { initials, gradientStyle } from '@/lib/avatar';
import { recordClick } from '@/lib/metrics';

export type FeaturedItem = {
  handle: string;
  score?: number;
  tags?: string[];
  collections?: string[];
  avatarUrl?: string;
  live?: boolean;
};

function FeaturedHero({
  handle,
  score,
  avatarUrl,
  live,
}: {
  handle: string;
  score?: number;
  avatarUrl?: string;
  live?: boolean;
}) {
  return (
    <Link
      href={`/tip/${handle}`}
      onClick={() => recordClick(handle, 'featured')}
      className="group relative block overflow-hidden rounded-2xl border border-white/10"
      aria-label={`Tip @${handle}`}
    >
      <div className="h-40 w-full sm:h-56 md:h-64">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-80"
          />
        ) : (
          <div className="h-full w-full opacity-80" style={gradientStyle(handle)} />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-2 inline-flex items-center gap-2">
        <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] text-text-ds-secondary">
          Featured
        </span>
        {typeof score === 'number' && (
          <span className="rounded-full border border-gold-400 bg-gold-400/20 px-2 py-0.5 text-[11px] font-heading font-semibold text-gold-400">
            ★ {Math.max(0, Math.min(100, Math.round(score)))}
          </span>
        )}
        {live && (
          <span className="inline-flex items-center gap-1 rounded-full bg-error-base px-2 py-0.5 text-[10px] font-heading font-bold text-text-ds-primary">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
          </span>
        )}
      </div>
      <h3 className="font-heading font-semibold text-2xl text-text-ds-primary">@{handle}</h3>
      <p className="text-sm text-text-ds-secondary">Tap to send a quick tip</p>
      </div>
    </Link>
  );
}

export default function FeaturedGrid({ items }: { items: FeaturedItem[] }) {
  if (!items?.length) return null;
  const [first, second, third] = items.slice(0, 3);
  if (!first) return null;

  return (
    <section className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <FeaturedHero
            handle={first.handle}
            score={first.score}
            avatarUrl={first.avatarUrl}
            live={first.live}
          />
        </div>
        <div className="space-y-3">
          {second && (
            <CreatorCard
              alias={second.handle}
              exists={true}
              score={second.score}
              tags={second.tags}
              collections={second.collections}
              avatarUrl={second.avatarUrl}
              live={second.live}
              variant="enhanced"
            />
          )}
          {third && (
            <CreatorCard
              alias={third.handle}
              exists={true}
              score={third.score}
              tags={third.tags}
              collections={third.collections}
              avatarUrl={third.avatarUrl}
              live={third.live}
              variant="enhanced"
            />
          )}
        </div>
      </div>
    </section>
  );
}
