'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const CATEGORIES = ['Writer', 'Musician', 'Podcaster', 'Illustrator', 'Designer'] as const;
const MONETIZATION = ['Memberships', 'Commissions', 'Tips'] as const;
const ACTIVITY = ['Active', 'Trending', 'New'] as const;

export default function FiltersSheet() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const panelRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const selected = useMemo(() => {
    const arr = (key: string) => (sp.get(key)?.split(',').filter(Boolean) ?? []);
    return {
      category: arr('category'),
      monetization: arr('monetization'),
      activity: arr('activity'),
    };
  }, [sp]);

  const toggle = (value: string, list: string[]) => {
    const set = new Set(list);
    set.has(value) ? set.delete(value) : set.add(value);
    return Array.from(set);
  };

  const update = (key: string, next: string[]) => {
    const usp = new URLSearchParams(sp.toString());
    if (next.length) usp.set(key, next.join(','));
    else usp.delete(key);
    usp.delete('page');
    router.push(`/discover?${usp.toString()}`);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="filters-sheet"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-gold-400/20 px-4 py-2 text-sm text-gold-400 hover:bg-gold-400/8 focus-visible:ring-2 focus-visible:ring-gold-400/70 transition-colors duration-150 font-body"
      >
        Filters
      </button>

      <div
        id="filters-sheet"
        role={open ? 'dialog' : undefined}
        aria-modal={open || undefined}
        ref={panelRef}
        tabIndex={-1}
        className={`fixed inset-0 z-backdrop transition duration-200 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={(e) => e.currentTarget === e.target && setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl border border-gold-400/12 bg-teal-800/96 backdrop-blur-md p-4">
          <div className="mx-auto max-w-md">
            <h2 className="mb-3 text-base font-semibold text-text-ds-primary font-heading">Filters</h2>

            <fieldset className="mb-4">
              <legend className="text-sm text-text-ds-primary font-body">Category</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((v) => {
                  const active = selected.category.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update('category', toggle(v, selected.category))}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-150 font-body ${active ? 'border-gold-400 text-gold-400' : 'border-gold-400/20 text-text-ds-primary'}`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mb-4">
              <legend className="text-sm text-text-ds-primary font-body">Monetization</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {MONETIZATION.map((v) => {
                  const active = selected.monetization.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update('monetization', toggle(v, selected.monetization))}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-150 font-body ${active ? 'border-gold-400 text-gold-400' : 'border-gold-400/20 text-text-ds-primary'}`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm text-text-ds-primary font-body">Activity</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {ACTIVITY.map((v) => {
                  const active = selected.activity.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update('activity', toggle(v, selected.activity))}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-150 font-body ${active ? 'border-gold-400 text-gold-400' : 'border-gold-400/20 text-text-ds-primary'}`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gold-400/20 px-4 py-2 text-sm text-text-ds-primary hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-gold-400/70 transition-colors duration-150 font-body"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
