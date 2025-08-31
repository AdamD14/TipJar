"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/app/AppHeader";
import Section from "@/components/app/Section";
import TipCard, { TipItem } from "@/components/feed/TipCard";
import { apiClient } from "@/lib/apiClient";
import { API } from "@/lib/api-routes";

export default function Page() {
  const [items, setItems] = useState<TipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get<any[]>(API.FAN.TIPS_HISTORY);
        const mapped: TipItem[] = (res.data || []).map((t) => ({
          id: t.id,
          creator: { name: t.creatorId, handle: t.creatorId },
          fan: { name: "You" },
          amount: parseFloat(t.amount),
          message: t.message ?? undefined,
          time: new Date(t.createdAt).toLocaleString(),
        }));
        setItems(mapped);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#001F1F] pb-20">
      <AppHeader />
      <Section title="Feed">
        {error && (
          <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((x) => (
            <TipCard key={x.id} item={x} />
          ))}
        </div>
        {!loading && items.length === 0 && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-[#DDE0DA]">No feed items yet.</div>
        )}
      </Section>
    </main>
  );
}
