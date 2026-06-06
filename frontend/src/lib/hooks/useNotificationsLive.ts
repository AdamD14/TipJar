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

export function useNotificationsLive() {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const abortRef = useRef<AbortController | null>(null);

  const connect = useCallback(() => {
    // Wait for Zustand to rehydrate from sessionStorage before trying
    if (!hasHydrated) return;

    const token = getAuthToken();

    // Abort any previous connection
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // When no token is present (OAuth users) the HttpOnly cookie is sent
    // automatically by the browser thanks to `credentials: 'include'`.

    fetch(`${BACKEND_ORIGIN}/api/v1/circle/notifications/stream`, {
      headers,
      credentials: 'include',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          console.warn(
            `[useNotificationsLive] SSE ${response.status} — retrying in 5s`,
          );
          setTimeout(connect, 5000);
          return;
        }
        if (!response.body) {
          console.warn('[useNotificationsLive] No body — retrying in 5s');
          setTimeout(connect, 5000);
          return;
        }

        console.log('[useNotificationsLive] SSE connected');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log(
              '[useNotificationsLive] SSE stream ended — reconnecting in 3s',
            );
            setTimeout(connect, 3000);
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
                console.log(
                  '[useNotificationsLive] notification received:',
                  notif,
                );
                addNotification({
                  title: notif.title || '',
                  message: notif.message,
                  type:
                    (notif.type as 'info' | 'success' | 'warning' | 'error') ||
                    'info',
                });
              } catch {
                // ignore malformed SSE lines
              }
            }
          }
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          console.warn('[useNotificationsLive] SSE error — retrying in 5s');
          setTimeout(connect, 5000);
        }
      });
  }, [addNotification, hasHydrated]);

  useEffect(() => {
    connect();
    return () => {
      abortRef.current?.abort();
    };
  }, [connect]);
}
