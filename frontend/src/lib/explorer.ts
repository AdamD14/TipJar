export type HandleEntry =
  | string
  | {
      handle: string;
      score?: number;
      tags?: string[];
      createdAt?: string;
      avatarUrl?: string;
      live?: boolean;
    };

export type Creator = {
  handle: string;
  score: number;
  tags: string[];
  createdAt?: string;
  collections: string[];
  avatarUrl?: string;
  live?: boolean;
};

export function normalizeEntry(e: HandleEntry): {
  handle: string;
  score: number;
  tags: string[];
  createdAt?: string;
  avatarUrl?: string;
  live?: boolean;
} {
  if (typeof e === "string") return { handle: e, score: 0, tags: [] };
  return {
    handle: e.handle,
    score: Number(e.score ?? 0),
    tags: e.tags ?? [],
    createdAt: e.createdAt,
    avatarUrl: e.avatarUrl,
    live: e.live,
  };
}

export function flattenCollections(
  input: Array<{ slug: string; handles: HandleEntry[] }>
): Creator[] {
  const map = new Map<string, Creator>();
  for (const col of input || []) {
    for (const raw of col.handles || []) {
      const n = normalizeEntry(raw);
      const prev = map.get(n.handle);
      if (!prev) {
        map.set(n.handle, {
          handle: n.handle,
          score: n.score,
          tags: n.tags,
          createdAt: n.createdAt,
          avatarUrl: n.avatarUrl,
          live: n.live,
          collections: [col.slug],
        });
      } else {
        prev.score = Math.max(prev.score, n.score);
        prev.tags = Array.from(new Set([...prev.tags, ...n.tags]));
        if (!prev.avatarUrl && n.avatarUrl) prev.avatarUrl = n.avatarUrl;
        if (n.live) prev.live = true;
        if (!prev.collections.includes(col.slug)) prev.collections.push(col.slug);
      }
    }
  }
  return Array.from(map.values());
}

export type ExplorerFilters = {
  query?: string;
  categories?: string[];
  tags?: string[];
};

export function applyQuery(rows: Creator[], q?: string): Creator[] {
  const s = (q ?? "").trim().toLowerCase();
  if (!s) return rows;
  return rows.filter((r) => r.handle.toLowerCase().includes(s));
}

export function applyFilters(rows: Creator[], f: ExplorerFilters): Creator[] {
  let out = rows;
  if (f?.categories?.length) {
    const want = new Set(f.categories);
    out = out.filter((r) => r.collections.some((c) => want.has(c)));
  }
  if (f?.tags?.length) {
    const wantTags = new Set(f.tags.map((t) => t.toLowerCase()));
    out = out.filter((r) => r.tags?.some((t) => wantTags.has(String(t).toLowerCase())));
  }
  return applyQuery(out, f.query);
}

export type ExplorerSort = "trending" | "newest" | "az" | "za";

export function sortCreators(rows: Creator[], mode: ExplorerSort): Creator[] {
  const copy = [...rows];
  switch (mode) {
    case "newest":
      return copy.sort((a, b) => {
        const A = a.createdAt ? Date.parse(a.createdAt) : 0;
        const B = b.createdAt ? Date.parse(b.createdAt) : 0;
        return B - A || a.handle.localeCompare(b.handle);
      });
    case "az":
      return copy.sort((a, b) => a.handle.localeCompare(b.handle));
    case "za":
      return copy.sort((a, b) => b.handle.localeCompare(a.handle));
    case "trending":
    default:
      return copy.sort((a, b) => b.score - a.score || a.handle.localeCompare(b.handle));
  }
}

export function paginate<T>(rows: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const items = rows.slice(start, start + perPage);
  return { items, total: rows.length, hasMore: start + items.length < rows.length };
}

export function topTags(
  rows: Creator[],
  limit = 16
): Array<{ tag: string; count: number }> {
  const m = new Map<string, number>();
  for (const r of rows) for (const t of r.tags || []) {
    const k = String(t).toLowerCase();
    m.set(k, (m.get(k) || 0) + 1);
  }
  return Array.from(m.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
