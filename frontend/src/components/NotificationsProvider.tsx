"use client";

import { ReactNode, useEffect } from "react";
import { useNotificationsLive } from "@/lib/hooks/useNotificationsLive";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useAuthStore } from "@/lib/store/authStore";

const BACKEND_ORIGIN = (
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN ?? "http://localhost:3001"
).replace(/\/+$/, "");

/**
 * Hydrates the accessToken in authStore from the HttpOnly cookie.
 *
 * After an OAuth redirect the token is in the cookie but NOT in sessionStorage.
 * The backend exposes POST /api/v1/auth/token which reads the cookie server-side
 * and returns the raw JWT — allowing JS to store it in-memory for SSE auth.
 */
async function hydrateTokenFromCookie() {
  const alreadyHasToken = useAuthStore.getState().accessToken;
  if (alreadyHasToken) return;

  try {
    const res = await fetch(`${BACKEND_ORIGIN}/api/v1/auth/token`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return;
    const body = (await res.json()) as { accessToken: string | null };
    if (body.accessToken) {
      useAuthStore.getState().setAccessToken(body.accessToken);
    }
  } catch {
    // Network error or not logged in — ignore
  }
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  useNotificationsLive();

  const loadHistory = useNotificationStore((s) => s.loadHistory);
  const resetLoaded = useNotificationStore((s) => s.resetLoaded);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  // Step 1: once Zustand has rehydrated from sessionStorage, try to also
  // pull the token from the HttpOnly cookie (covers OAuth login).
  // Step 2: after token is available, load notification history.
  useEffect(() => {
    if (!hasHydrated) return;

    (async () => {
      await hydrateTokenFromCookie();
      resetLoaded();
      await loadHistory();
    })();
  }, [hasHydrated, loadHistory, resetLoaded]);

  return <>{children}</>;
}
