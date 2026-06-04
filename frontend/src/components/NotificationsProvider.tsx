"use client";

import { ReactNode } from "react";
import { useNotificationsLive } from "@/lib/hooks/useNotificationsLive";

export function NotificationsProvider({ children }: { children: ReactNode }) {
  useNotificationsLive();
  return <>{children}</>;
}