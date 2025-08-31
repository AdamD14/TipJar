'use client';

import SearchBar from '@/components/catalog/SearchBar';
import FiltersSidebar from '@/components/catalog/FiltersSidebar';
import FiltersSheet from '@/components/catalog/FiltersSheet';
import ResultsGrid from '@/components/catalog/ResultsGrid';
import FilterChip from '@/components/catalog/FilterChip';
import { useSearchParams, useRouter } from 'next/navigation';

export default function DiscoverPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const chips = [
    ...split('category', sp.get('category')),
    ...split('monetization', sp.get('monetization')),
    ...split('activity', sp.get('activity')),
  ];

  return (
    <main id="main-content" className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 md:px-6">
      <h1 className="sr-only">Discover creators</h1>

      <div className="mb-6 flex items-center justify-between gap-3">
        <SearchBar />
        <FiltersSheet />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {chips.map((c) => (
          <FilterChip
            key={c.key + ':' + c.value}
            label={`${capitalize(c.key)}: ${c.value}`}
            onRemove={() => {
              const usp = new URLSearchParams(sp.toString());
              const arr = split(c.key, sp.get(c.key)).map((x) => x.value);
              const next = arr.filter((v) => v !== c.value);
              if (next.length) usp.set(c.key, next.join(','));
              else usp.delete(c.key);
              usp.delete('page');
              router.push(`/discover?${usp.toString()}`);
            }}
          />
        ))}
      </div>

      <div className="flex gap-8">
        <FiltersSidebar />
        <section className="min-w-0 flex-1">
          <ResultsGrid />
        </section>
      </div>
    </main>
  );
}

function split(
  key: 'category' | 'monetization' | 'activity',
  v: string | null,
): { key: 'category' | 'monetization' | 'activity'; value: string }[] {
  if (!v) return [];
  return (v.split(',').filter(Boolean) as string[]).map((x) => ({ key, value: x }));
}
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

