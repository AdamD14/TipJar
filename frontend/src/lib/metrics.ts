const RECENT_KEY = "tj_recent_searches";
const CLICKS_KEY = "tj_clicks";

type Clicks = Record<string, number>;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}
function safeSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function recordClick(handle: string, _ctx: string = "tip") {
  if (!handle) return;
  const clicks = safeGet<Clicks>(CLICKS_KEY, {});
  clicks[handle] = (clicks[handle] || 0) + 1;
  safeSet(CLICKS_KEY, clicks);
  const recent = getRecentRaw();
  const next = [handle, ...recent.filter((h) => h !== handle)].slice(0, 30);
  safeSet(RECENT_KEY, next);
}

export function getRecent(limit = 10): string[] {
  return getRecentRaw().slice(0, limit);
}
function getRecentRaw(): string[] {
  return safeGet<string[]>(RECENT_KEY, []);
}

export function getTopClicked(
  limit = 12
): Array<{ handle: string; count: number }> {
  const clicks = safeGet<Clicks>(CLICKS_KEY, {});
  return Object.entries(clicks)
    .map(([handle, count]) => ({ handle, count }))
    .sort((a, b) => b.count - a.count || a.handle.localeCompare(b.handle))
    .slice(0, limit);
}
