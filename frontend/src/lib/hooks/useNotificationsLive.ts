"use client";

import { useEffect, useCallback, useRef } from 'react';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { useAuthStore } from '@/lib/store/authStore';

export function useNotificationsLive() {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const abortRef = useRef<AbortController | null>(null);

  const connect = useCallback(() => {
    if (!hasHydrated) return;

    const token = getAuthToken();
    if (!token) return;

    const origin =
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.replace(/\/+$/, '') ||
      'http://localhost:3001';

    const controller = new AbortController();
    abortRef.current = controller;

    fetch(`${origin}/api/v1/circle/notifications/stream`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          console.warn(`[useNotificationsLive] SSE ${response.status} — retrying in 5s`);
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
            console.log('[useNotificationsLive] SSE stream ended — reconnecting in 3s');
            setTimeout(connect, 3000);
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const notif = JSON.parse(line.slice(6));
                console.log('[useNotificationsLive] notification received:', notif);
                addNotification({
                  title: notif.title || '',
                  message: notif.message,
                  type: (notif.type as 'info' | 'success' | 'warning' | 'error') || 'info',
                });
              } catch {}
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

function getAuthToken(): string {
  if (typeof window === 'undefined') return '';
  try {
    const raw = sessionStorage.getItem('auth-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.state?.accessToken || '';
    }
  } catch {}
  return '';
}
