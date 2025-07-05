const requests: Map<string, { count: number; ts: number }> = new Map();

export function rateLimit(ip: string, limit = 10, intervalMs = 60_000): boolean {
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || now - entry.ts > intervalMs) {
    requests.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
