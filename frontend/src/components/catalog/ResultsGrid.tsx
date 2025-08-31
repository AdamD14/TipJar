'use client';

import { useEffect, useMemo, useState } from 'react';
import CreatorCard from './CreatorCard';
import type { Creator } from './types';
import { useSearchParams } from 'next/navigation';

type ApiResponse = {
  data: Creator[];
  total: number;
  page: number;
  pageSize: number;
};

export default function ResultsGrid() {
  const sp = useSearchParams();
  const [state, setState] = useState<{ loading: boolean; error?: string; res?: ApiResponse }>({
    loading: true,
  });

  const qs = useMemo(() => sp.toString(), [sp]);

  useEffect(() => {
    const ctrl = new AbortController();
    setState({ loading: true });
    fetch(`/api/creators/search?${qs}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((res: ApiResponse) => setState({ loading: false, res }))
      .catch((err) => {
        if ((err as any).name !== 'AbortError') setState({ loading: false, error: 'Failed to load' });
      });
    return () => ctrl.abort();
  }, [qs]);

  if (state.loading) {
    return (
      <div aria-busy="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-2xl bg-[rgba(255,255,255,0.06)]"
            aria-hidden
          />
        ))}
      </div>
    );
  }
  if (state.error || !state.res) {
    return <p className="text-sm text-[#DDE0DA]">No results.</p>;
  }

  const { data } = state.res;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((c) => (
        <CreatorCard key={c.id} creator={c} href={`/creators/${c.handle}`} />
      ))}
    </div>
  );
}

