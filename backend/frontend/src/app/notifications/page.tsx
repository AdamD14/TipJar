"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/app/AppHeader";
import Section from "@/components/app/Section";
import NotificationItem, { NotificationItemProps } from "@/components/notifications/NotificationItem";
import apiClient from "@/lib/apiClient";
import { API } from "@/lib/api-routes";

type BackendNotification = { id: string; userId: string; message: string; read: boolean; createdAt: string };

export default function Page() {
  const [items, setItems] = useState<NotificationItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiClient.get<BackendNotification[]>(API.NOTIFICATIONS);
        if (!mounted) return;
        const mapped: NotificationItemProps[] = res.data.map((n) => ({
          id: n.id,
          kind: inferKind(n.message),
          title: n.message,
          time: new Date(n.createdAt).toLocaleString(),
          read: n.read,
        }));
        setItems(mapped);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const markAllRead = async () => {
    try {
      await apiClient.post(API.NOTIFICATIONS + "/read-all");
      setItems((prev) => prev.map((i) => ({ ...i, read: true })));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <main className="min-h-screen bg-[#001F1F] pb-20">
      <AppHeader />
      <Section title="Notifications">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-white/70">{loading ? "Loading..." : `${items.length} notifications`}</div>
          <button onClick={markAllRead} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90">Mark all read</button>
        </div>
        {error && <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
        <div className="space-y-3" role="list">
          {items.map((n) => (
            <NotificationItem key={n.id} item={n} />
          ))}
          {!loading && items.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-[#DDE0DA]">No notifications yet.</div>
          )}
        </div>
      </Section>
    </main>
  );
}

function inferKind(message: string): NotificationItemProps["kind"] {
  if (/tip/i.test(message)) return "tip";
  if (/follow/i.test(message)) return "follow";
  return "system";
}
