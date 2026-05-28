// src/lib/api.ts
import { useAuthStore } from "@/lib/store/authStore";

const ORIGIN =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
  'http://localhost:3001';

export async function api<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const headers = new Headers(opts.headers);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Automatyczne dodawanie tokena z Zustand
  const token = useAuthStore.getState().accessToken;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Zbuduj pełny URL względem ORIGIN
  const url = path.startsWith('http')
    ? path
    : `${ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;

  const res = await fetch(url, {
    ...opts,
    headers,
    credentials: 'include', // zostawiamy na wszelki wypadek
  });

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