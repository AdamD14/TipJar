"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/app/AppHeader";
import Section from "@/components/app/Section";
import FollowingCard, { FollowingItem } from "@/components/following/FollowingCard";
import apiClient from "@/lib/apiClient";
import { API } from "@/lib/api-routes";

export default function Page() {
  const [items, setItems] = useState<FollowingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get<{ items: any[] }>(API.CREATORS, { params: { pageSize: 12 } });
        const mapped: FollowingItem[] = (res.data.items || []).map((u) => ({
          handle: u.username || u.id,
          name: u.displayName,
          bio: u.profile?.bio || undefined,
        }));
        setItems(mapped);
      } catch (e) {
        setError((e as Error).message);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#001F1F] pb-20">
      <AppHeader />
      <Section title="Following">
        {error && (
          <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <FollowingCard key={i.handle} item={i} />
          ))}
        </div>
        {items.length === 0 && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-[#DDE0DA]">No creators yet.</div>
        )}
      </Section>
    </main>
  );
}
