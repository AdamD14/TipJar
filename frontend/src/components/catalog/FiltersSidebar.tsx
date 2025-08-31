'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const CATEGORIES = ['Writer', 'Musician', 'Podcaster', 'Illustrator', 'Designer'] as const;
const MONETIZATION = ['Memberships', 'Commissions', 'Tips'] as const;
const ACTIVITY = ['Active', 'Trending', 'New'] as const;

function toggle(value: string, list: string[]) {
  const set = new Set(list);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
}

export default function FiltersSidebar() {
  const sp = useSearchParams();
  const router = useRouter();

  const selected = useMemo(() => {
    const arr = (key: string) => (sp.get(key)?.split(',').filter(Boolean) ?? []);
    return {
      category: arr('category'),
      monetization: arr('monetization'),
      activity: arr('activity'),
    };
  }, [sp]);

  const update = (key: string, next: string[]) => {
    const usp = new URLSearchParams(sp.toString());
    if (next.length) usp.set(key, next.join(','));
    else usp.delete(key);
    usp.delete('page');
    router.push(`/discover?${usp.toString()}`);
  };

  return (
    <aside aria-label="Filters" className="hidden w-72 shrink-0 lg:block">
      <fieldset className="mb-6 rounded-2xl border border-[rgba(255,215,0,0.12)] p-4">
        <legend className="px-1 text-sm font-semibold text-[#DDE0DA]">Category</legend>
        <ul className="mt-2 space-y-2">
          {CATEGORIES.map((v) => {
            const active = selected.category.includes(v);
            return (
              <li key={v}>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#DDE0DA]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#FFD700]"
                    checked={active}
                    onChange={() => update('category', toggle(v, selected.category))}
                    aria-checked={active}
                  />
                  <span>{v}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="mb-6 rounded-2xl border border-[rgba(255,215,0,0.12)] p-4">
        <legend className="px-1 text-sm font-semibold text-[#DDE0DA]">Monetization</legend>
        <ul className="mt-2 space-y-2">
          {MONETIZATION.map((v) => {
            const active = selected.monetization.includes(v);
            return (
              <li key={v}>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#DDE0DA]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#FFD700]"
                    checked={active}
                    onChange={() => update('monetization', toggle(v, selected.monetization))}
                    aria-checked={active}
                  />
                  <span>{v}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="rounded-2xl border border-[rgba(255,215,0,0.12)] p-4">
        <legend className="px-1 text-sm font-semibold text-[#DDE0DA]">Activity</legend>
        <ul className="mt-2 space-y-2">
          {ACTIVITY.map((v) => {
            const active = selected.activity.includes(v);
            return (
              <li key={v}>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#DDE0DA]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#FFD700]"
                    checked={active}
                    onChange={() => update('activity', toggle(v, selected.activity))}
                    aria-checked={active}
                  />
                  <span>{v}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </aside>
  );
}

