// Minimalny klient fetch z obsługą JWT w localStorage
// Uwaga: do produkcji przenieś JWT do ciasteczka HttpOnly i używaj SSR/Route Handlers
export async function api<T>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers = new Headers(opts.headers);
  headers.set('Content-Type', 'application/json');
  if (opts.auth !== false) {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('tj_jwt') : null;
      if (token) headers.set('Authorization', `Bearer ${token}`);
    } catch {}
  }
  const res = await fetch(path, { ...opts, headers });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      message = err?.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

