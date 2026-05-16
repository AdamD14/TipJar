import Link from 'next/link';
import Card from '@/components/ui/forms/Card';
import Button from '@/components/ui/buttons/Button';

export type CreatorCardProps = {
  name?: string;
  alias?: string;
  handle?: string;
  avatarUrl?: string;
  category?: string;
  stats?: { tips?: number };
  score?: number;
  tags?: string[];
  collections?: string[];
  live?: boolean;
  exists?: boolean;
  variant?: 'simple' | 'enhanced';
};

import { initials, gradientStyle } from '@/lib/avatar';
import { recordClick } from '@/lib/metrics';

export default function CreatorCard({
  name,
  alias,
  handle,
  avatarUrl,
  category,
  stats,
  score,
  tags,
  collections,
  live,
  exists = true,
  variant = 'simple',
}: CreatorCardProps) {
  const displayHandle = handle ?? alias ?? '';

  if (variant === 'enhanced') {
    const hasMeta = (tags && tags.length > 0) || typeof score === 'number';
    const url = exists ? `/tip/${displayHandle}` : '/register';

    return (
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div className="relative mr-2 h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10">
            {avatarUrl ? (
              <img
                alt={`Avatar of @${displayHandle}`}
                src={avatarUrl}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="grid h-full w-full place-items-center text-sm font-heading font-semibold text-text-ds-primary"
                style={gradientStyle(displayHandle)}
                aria-hidden="true"
              >
                {initials(displayHandle)}
              </div>
            )}
            {live && (
              <span
                title="LIVE"
                className="absolute -right-1 -top-1 inline-flex items-center gap-1 rounded-full bg-error-base px-2 py-0.5 text-[10px] font-heading font-bold text-text-ds-primary shadow"
              >
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                LIVE
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs text-text-ds-tertiary">Creator</p>
            <h3 className="truncate text-lg font-heading font-semibold text-text-ds-primary">@{displayHandle}</h3>

            {hasMeta && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {typeof score === 'number' && (
                  <span
                    className="inline-flex items-center rounded-full border border-gold-400 bg-gold-400/20 px-2 py-0.5 text-[11px] font-heading font-semibold text-gold-400"
                    title="Trending score"
                  >
                    ★ {Math.max(0, Math.min(100, Math.round(score)))}
                  </span>
                )}
                {(tags ?? []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-text-ds-secondary"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {collections && collections.length > 0 && (
              <p className="mt-1 truncate text-[11px] text-text-ds-tertiary">
                in: {collections.slice(0, 3).join(', ')}
                {collections.length > 3 ? '…' : ''}
              </p>
            )}
          </div>

          <Button
            href={url}
            variant="primary"
            size="sm"
            onClick={() => recordClick(displayHandle, 'creator-card')}
            aria-label={exists ? `Tip @${displayHandle}` : `Claim handle @${displayHandle}`}
          >
            {exists ? 'Tip now' : 'Claim @handle'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card interactive>
      <Link
        href={`/creators/${displayHandle}`}
        className="block"
        onClick={() => recordClick(displayHandle, 'creator-card')}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full bg-white/10"
            style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover' } : {}}
          />
          <div>
            <div className="text-text-ds-primary font-heading font-semibold">{name ?? displayHandle}</div>
            <div className="text-xs text-text-ds-tertiary">
              @{displayHandle}
              {category ? ` · ${category}` : ''}
            </div>
          </div>
        </div>
        {typeof stats?.tips === 'number' && (
          <div className="mt-3 text-sm text-text-ds-secondary">Tips received: {stats.tips} USDC</div>
        )}
      </Link>
    </Card>
  );
}
