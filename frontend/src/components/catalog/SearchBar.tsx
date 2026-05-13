'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  placeholder?: string;
  'data-analytics-id'?: string;
};

export default function SearchBar({ placeholder = 'Search creators…', ...rest }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState<string>(sp.get('q') ?? '');

  useEffect(() => setQ(sp.get('q') ?? ''), [sp]);

  const pushQuery = useCallback(
    (next: string) => {
      const usp = new URLSearchParams(sp.toString());
      if (next) usp.set('q', next);
      else usp.delete('q');
      usp.delete('page');
      router.push(`/discover?${usp.toString()}`);
    },
    [router, sp],
  );

  return (
    <form
      role="search"
      aria-label="Search creators"
      className="relative w-full max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        pushQuery(q.trim());
      }}
      {...rest}
    >
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gold-400/18 bg-teal-800/60 px-4 py-3 text-base text-text-ds-primary placeholder-teal-25/50 outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 transition-colors duration-200 font-body"
      />
      {q && (
        <button
          type="button"
          aria-label="Clear"
          onClick={() => {
            setQ('');
            pushQuery('');
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-teal-25 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-gold-400/70 transition-colors duration-150 font-body"
        >
          Clear
        </button>
      )}
    </form>
  );
}
