'use client';

import Image from 'next/image';

type Item = {
  id: string;
  title: string;
  coverUrl?: string | null;
  locked?: boolean;
};

type Props = {
  items: Item[];
};

const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';
const GOLD = '#FFD700';

export default function ContentGrid({ items }: Props) {
  if (!items.length) {
    return <p className="text-sm" style={{ color: TEXT_SECONDARY }}>No posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <article key={it.id} className="overflow-hidden rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.85)]">
          <div className="relative h-40 w-full">
            {it.coverUrl ? (
              <Image src={it.coverUrl} alt="" fill sizes="33vw" className="object-cover" />
            ) : (
              <div className="h-full w-full bg-[rgba(0,55,55,0.6)]" aria-hidden />
            )}
            {it.locked && (
              <span className="absolute right-3 top-3 rounded-full bg-[rgba(255,215,0,0.12)] px-2 py-0.5 text-xs font-semibold" style={{ color: GOLD }}>
                Premium
              </span>
            )}
          </div>
          <h3 className="truncate p-4 text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
            {it.title}
          </h3>
        </article>
      ))}
    </div>
  );
}
