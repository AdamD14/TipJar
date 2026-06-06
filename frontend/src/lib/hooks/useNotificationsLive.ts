"use client";

import { useEffect, useCallback, useRef } from 'react';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { useAuthStore } from '@/lib/store/authStore';

const BACKEND_ORIGIN =
  (process.env.NEXT_PUBLIC_BACKEND_ORIGIN ?? 'http://localhost:3001').replace(
    /\/+$/,
    '',
  );

/**
 * Returns the JWT access token.
 *
 * Priority:
 *  1. authStore in-memory value (set after email/password login)
 *  2. sessionStorage persisted value (survives page refresh for classic login)
 *
 * For OAuth users the token lives only in the HttpOnly cookie and is
 * NOT accessible from JS — in that case the SSE request is sent without
 * a Bearer header and the backend validates via the cookie extractor
 * in JwtStrategy (cookieExtractor runs before fromAuthHeaderAsBearerToken).
 */
function getAuthToken(): string {
  // 1. In-memory store (fastest, always up to date)
  const storeToken = useAuthStore.getState().accessToken;
  if (storeToken) return storeToken;

  // 2. Persisted sessionStorage (classic login after page refresh)
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem('auth-storage');
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: { accessToken?: string } };
        return parsed?.state?.accessToken || '';
      }
    } catch {
      // ignore parse errors
    }
  }
  return '';
}

/**
 * Attempts to refresh the access token using the HttpOnly refresh_token cookie.
 * On success, updates authStore with the new token.
 * Returns true if refresh succeeded, false otherwise.
 */
async function tryRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_ORIGIN}/api/v1/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { accessToken?: string };
    if (body.accessToken) {
      useAuthStore.getState().setAccessToken(body.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function useNotificationsLive() {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const abortRef = useRef<AbortController | null>(null);

  const connect = useCallback(
    (signal: AbortSignal) => {
      const token = getAuthToken();

      // Not authenticated — don't connect, don't retry, don't spam console
      if (!token) return;

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      fetch(`${BACKEND_ORIGIN}/api/v1/circle/notifications/stream`, {
        headers,
        credentials: 'include',
        signal,
      })
        .then(async (response) => {
          if (!response.ok) {
            if (response.status === 401) {
              // Token expired — try to refresh, then reconnect
              console.warn('[useNotificationsLive] SSE 401 — attempting token refresh');
              const refreshed = await tryRefreshToken();
              if (refreshed && !signal.aborted) {
                setTimeout(() => connect(signal), 1000);
              }
              // If refresh failed the user is logged out — stop silently
              return;
            }
            console.warn(`[useNotificationsLive] SSE ${response.status} — retrying in 5s`);
            if (!signal.aborted) setTimeout(() => connect(signal), 5000);
            return;
          }
          if (!response.body) {
            console.warn('[useNotificationsLive] No body — retrying in 5s');
            if (!signal.aborted) setTimeout(() => connect(signal), 5000);
            return;
          }

          console.log('[useNotificationsLive] SSE connected');
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log('[useNotificationsLive] SSE stream ended — reconnecting in 3s');
              if (!signal.aborted) setTimeout(() => connect(signal), 3000);
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const notif = JSON.parse(line.slice(6)) as {
                    title?: string;
                    message: string;
                    type?: string;
                  };
                  console.log('[useNotificationsLive] notification received:', notif);
                  addNotification({
                    title: notif.title || '',
                    message: notif.message,
                    type: (notif.type as 'info' | 'success' | 'warning' | 'error') || 'info',
                  });
                } catch {
                  // ignore malformed SSE lines
                }
              }
            }
          }
        })
        .catch(() => {
          if (!signal.aborted) {
            console.warn('[useNotificationsLive] SSE error — retrying in 5s');
            setTimeout(() => connect(signal), 5000);
          }
        });
    },
    [addNotification],
  );

  useEffect(() => {
    // Wait for hydration; skip entirely if not authenticated
    if (!hasHydrated) return;
    if (!accessToken) return;

    const controller = new AbortController();
    abortRef.current = controller;
    connect(controller.signal);

    return () => {
      controller.abort();
    };
  }, [connect, hasHydrated, accessToken]);
}
