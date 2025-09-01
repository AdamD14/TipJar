"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api/http";
import { API } from "@/lib/api-routes";

export type NotificationItem = {
  id?: string | number;
  title?: string;
  type?: string;
  createdAt?: string;
  date?: string;
  read?: boolean;
};

type Options = { intervalMs?: number };

export function useNotifications(opts: Options = {}) {
  const interval = opts.intervalMs ?? 20000;
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<any>(null);

  async function load() {
    setError(null);
    setLoading(true);
      try {
        const { data } = await api.get(API.NOTIFICATIONS);
        const list = Array.isArray(data) ? data : data?.items || [];
        setItems(list);
      } catch (e: any) {
        setError(e.message || "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      if (alive) await load();
    })();
    timer.current = setInterval(load, interval);
    return () => {
      alive = false;
      clearInterval(timer.current);
    };
  }, [interval]);

  const unread = items.filter((i) => i.read === false).length;
  return { items, unread, loading, error, reload: load };
}
