// components/landing/ExploreCreators.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import GoalBadge from '@/components/profile/GoalBadge';

export type Creator = {
  id: string;
  displayName: string;
  handle: string; // bez @
  avatarUrl: string;
  industry: string;
  headline?: string;
  goal?: { label: string; amount: number; current: number; currency: 'USDC'|'USD'|'PLN' };
};

export type ExploreItem = { category: string; creator: Creator };

type Props = {
  items: ExploreItem[]; // jeden twórca na kategorię
  onTip?: (c: Creator) => void; // opcjonalny handler do otwarcia Tip Modala
};

export default function ExploreCreators({ items, onTip }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollByView = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.92);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="exploreHeading" className="py-12 md:py-16">
      <div className="mx-auto max-w-[1480px] px-4 text-[#DDE0DA]">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 id="exploreHeading" className="text-2xl md:text-3xl font-semibold">Explore creators</h2>
            <p className="text-[14px] leading-[1.5] text-[#BCC1B6]">Featured by category. Scroll or use arrows.</p>
          </div>
          <Link
            href="/discover"
            className="hidden md:inline-flex rounded-[12px] border border-[#FFD700] px-4 py-2 text-sm font-medium text-[#FFD700] hover:-translate-y-[1px] transition"
          >
            Discover all creators
          </Link>
        </div>

        <div className="relative">
          {/* gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#001414] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#001414] to-transparent" />

          {/* scroller */}
          <div
            ref={scrollerRef}
            role="region"
            aria-label="Creators carousel"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 pb-2"
          >
            {items.map(({ category, creator }) => (
              <CreatorCard key={`${category}-${creator.id}`} category={category} c={creator} onTip={onTip} />
            ))}
          </div>

          {/* arrows */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByView(-1)}
            disabled={atStart}
            className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 px-2 py-2 text-sm backdrop-blur disabled:opacity-40"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByView(1)}
            disabled={atEnd}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 px-2 py-2 text-sm backdrop-blur disabled:opacity-40"
          >
            ›
          </button>
        </div>

        <div className="mt-4 md:hidden">
          <Link
            href="/discover"
            className="inline-flex rounded-[12px] border border-[#FFD700] px-4 py-2 text-sm font-medium text-[#FFD700]"
          >
            Discover all creators
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ===== card ===== */

function CreatorCard({ category, c, onTip }: { category: string; c: Creator; onTip?: (c: Creator) => void }) {
  return (
    <article className="snap-start">
      <div className="w-[288px] sm:w-[300px] lg:w-[320px] h-[420px] overflow-hidden rounded-[16px] border border-white/10 bg-card p-4 flex flex-col">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-[999px] border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-[#DDE0DA]">
            {category}
          </span>
          {c.goal ? (
            <GoalBadge
              percent={Math.min(100, Math.round((c.goal.current / Math.max(c.goal.amount, 0.01)) * 100))}
              amount={c.goal.current}
              goal={c.goal.amount}
              currency={c.goal.currency}
            />
          ) : null}
        </div>

        <div className="relative mx-auto mb-3 h-[140px] w-[140px]">
          <Image
            src={c.avatarUrl || '/avatar-fallback.png'}
            alt={c.displayName}
            fill
            sizes="140px"
            className="rounded-full object-cover"
          />
        </div>

        <div className="mb-1 text-[15px] font-semibold leading-tight">{c.displayName}</div>
        <div className="mb-2 text-[12px] text-[#8F9687]">@{c.handle} · {c.industry}</div>
        {c.headline ? (
          <p className="mb-4 h-[44px] overflow-hidden text-[13px] leading-snug text-[#BCC1B6]">
            {c.headline}
          </p>
        ) : <div className="mb-4 h-[44px]" />}

        <div className="mt-auto flex items-center gap-2">
          <Link
            href={`/@${c.handle}`}
            className="inline-flex flex-1 items-center justify-center rounded-[12px] border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          >
            View profile
          </Link>
          <button
            type="button"
            onClick={() => onTip?.(c)}
            className="inline-flex items-center justify-center rounded-[12px] bg-[#FFD700] px-3 py-2 text-sm font-semibold text-[#003737]"
          >
            Tip
          </button>
        </div>
      </div>
    </article>
  );
}