"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Page from "@/components/ui/layout/Page";
import Card from "@/components/ui/forms/Card";
import SearchBox, { type SearchResult } from "@/components/explore/SearchBox";
import CreatorCard from "@/components/explore/CreatorCard";
import { collections } from "@/data/collections";
import CollectionCard from "@/components/explore/CollectionCard";
import SortSelect from "@/components/explore/SortSelect";
import FilterChips from "@/components/explore/FilterChips";
import Suggestions, { type Suggestion } from "@/components/explore/Suggestions";
import TrendingClient from "@/components/explore/TrendingClient";
import YourPicks from "@/components/fan/YourPicks";
import FeaturedGrid from "@/components/creator/FeaturedGrid";
import Spotlight from "@/components/explore/Spotlight";
import TopTagsCloud from "@/components/explore/TopTagsCloud";
import {
  flattenCollections,
  applyFilters,
  sortCreators,
  paginate,
  type ExplorerSort,
  topTags,
} from "@/lib/explorer";

export default function PageDiscover() {
  const items: SearchResult[] = [];
  return (
    <Page>
      <div className="mx-auto max-w-5xl space-y-6">
        <Card>
          <h1 className="text-2xl font-bold text-white">Discover creators</h1>
          <p className="mt-1 text-[#DDE0DA]">
            Wpisz @handle lub przeglądaj kuratorowane kolekcje.
          </p>
        </Card>
        {collections.length > 0 && (
          <Spotlight
            pool={sortCreators(flattenCollections(collections), "trending")
              .slice(0, 20)
              .map((c) => ({
                handle: c.handle,
                score: c.score,
                avatarUrl: c.avatarUrl,
                live: c.live,
              }))}
          />
        )}
        {collections.length > 0 && (
          <FeaturedGrid
            items={sortCreators(flattenCollections(collections), "trending")
              .slice(0, 3)
              .map((c) => ({
                handle: c.handle,
                score: c.score,
                tags: c.tags,
                collections: c.collections,
                avatarUrl: c.avatarUrl,
                live: c.live,
              }))}
          />
        )}
        {collections.length > 0 && (
          <TrendingClient
            items={sortCreators(flattenCollections(collections), "trending")
              .slice(0, 24)
              .map((c) => ({ handle: c.handle, score: c.score }))}
          />
        )}
        <YourPicks />
        <Client initial={items} />
        {collections.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Kolekcje</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((c) => (
                <CollectionCard
                  key={c.slug}
                  title={c.title}
                  description={c.description}
                  handles={c.handles}
                />
              ))}
            </div>
          </section>
        )}
        <AllCreators />
      </div>
    </Page>
  );
}


function Client({ initial }: { initial: SearchResult[] }) {
  const [direct, setDirect] = useState<SearchResult[]>(initial);
  const [q, setQ] = useState("");

  const suggest = useSuggestions(q);

  return (
    <section className="space-y-4">
      <SearchBox onResults={(rows) => setDirect(rows)} onQueryChange={setQ} />
      {q && <Suggestions items={suggest} query={q} />}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {direct.map((it) => (
          <CreatorCard
            key={it.handle}
            handle={it.handle}
            exists={it.exists}
          />
        ))}
      </div>
    </section>
  );
}

function AllCreators() {
  const cats = collections.map((c) => ({ slug: c.slug, title: c.title }));
  const base = useMemo(() => flattenCollections(collections), []);
  const [selected, setSelected] = useState<string[]>([]);
  const [tagSel, setTagSel] = useState<string[]>([]);
  const [sort, setSort] = useState<ExplorerSort>("trending");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  function GridFilter() {
    return (
      <input
        value={query}
        onChange={(e) => {
          setPage(1);
          setQuery(e.target.value);
        }}
        placeholder="Filter handles…"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
      />
    );
  }

  const filtered = useMemo(
    () => applyFilters(base, { categories: selected, tags: tagSel, query }),
    [base, selected, tagSel, query]
  );
  const sorted = useMemo(() => sortCreators(filtered, sort), [filtered, sort]);
  const { items, total, hasMore } = useMemo(
    () => paginate(sorted, page, 12),
    [sorted, page]
  );

  const onToggle = useCallback((slug: string) => {
    setPage(1);
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">All creators</h2>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {cats.length > 0 && (
        <FilterChips categories={cats} selected={selected} onToggle={onToggle} />
      )}
      <TopTagsCloud
        items={useMemo(() => topTags(base, 16), [base])}
        selected={tagSel}
        onToggle={(tag) => {
          setPage(1);
          setTagSel((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          );
        }}
      />
      <GridFilter />
      <p className="text-xs text-[#BCC1B6]">
        Showing {Math.min(items.length + (page - 1) * 12, total)} of {total}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <CreatorCard
            key={c.handle}
            handle={c.handle}
            exists={true}
            score={c.score}
            tags={c.tags}
            collections={c.collections}
            avatarUrl={c.avatarUrl}
            live={c.live}
          />
        ))}
        {items.length === 0 && (
          <p className="text-sm text-[#BCC1B6]">No matches.</p>
        )}
      </div>
      {hasMore && (
        <div className="mt-2">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}

function useSuggestions(q: string): Suggestion[] {
  const s = (q || "").trim().toLowerCase();
  if (s.length < 2) return [];
  const fromLocal = Array.from(
    new Set(
      (collections || [])
        .flatMap((c) => (c.handles || []).map((h: any) => (typeof h === "string" ? h : h.handle)))
        .filter(Boolean)
    )
  )
    .filter((h) => h.toLowerCase().includes(s))
    .slice(0, 5)
    .map((handle) => ({ handle, source: "local" as const }));

  let recent: string[] = [];
  try {
    recent = JSON.parse(localStorage.getItem("tj_recent_searches") || "[]");
  } catch {}
  const fromRecent = recent
    .filter((h) => (h || "").toLowerCase().includes(s))
    .slice(0, 5)
    .map((handle) => ({ handle, source: "recent" as const }));

  const map = new Map<string, Suggestion>();
  [...fromLocal, ...fromRecent].forEach((it) => map.set(it.handle, it));
  return Array.from(map.values()).slice(0, 5);
}
