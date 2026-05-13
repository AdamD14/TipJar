'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Checkbox from '@/components/ui/Checkbox';

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
      <fieldset className="mb-6 rounded-2xl border border-gold-400/12 p-4">
        <legend className="px-1 text-sm font-semibold text-text-ds-primary font-heading">Category</legend>
        <ul className="mt-2 space-y-2">
          {CATEGORIES.map((v) => {
            const active = selected.category.includes(v);
            return (
              <li key={v}>
                <Checkbox
                  color="gold"
                  checked={active}
                  onChange={() => update('category', toggle(v, selected.category))}
                  label={<span className="text-text-ds-primary">{v}</span>}
                />
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="mb-6 rounded-2xl border border-gold-400/12 p-4">
        <legend className="px-1 text-sm font-semibold text-text-ds-primary font-heading">Monetization</legend>
        <ul className="mt-2 space-y-2">
          {MONETIZATION.map((v) => {
            const active = selected.monetization.includes(v);
            return (
              <li key={v}>
                <Checkbox
                  color="gold"
                  checked={active}
                  onChange={() => update('monetization', toggle(v, selected.monetization))}
                  label={<span className="text-text-ds-primary">{v}</span>}
                />
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="rounded-2xl border border-gold-400/12 p-4">
        <legend className="px-1 text-sm font-semibold text-text-ds-primary font-heading">Activity</legend>
        <ul className="mt-2 space-y-2">
          {ACTIVITY.map((v) => {
            const active = selected.activity.includes(v);
            return (
              <li key={v}>
                <Checkbox
                  color="gold"
                  checked={active}
                  onChange={() => update('activity', toggle(v, selected.activity))}
                  label={<span className="text-text-ds-primary">{v}</span>}
                />
              </li>
            );
          })}
        </ul>
      </fieldset>
    </aside>
  );
}
