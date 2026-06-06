"use client";

import { ReactNode } from "react";
import { useNotificationsLive } from "@/lib/hooks/useNotificationsLive";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useEffect } from "react";

export function NotificationsProvider({ children }: { children: ReactNode }) {
  useNotificationsLive();
  const loadHistory = useNotificationStore((s) => s.loadHistory);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return <>{children}</>;
}
