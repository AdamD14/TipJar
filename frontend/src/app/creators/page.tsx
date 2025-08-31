"use client";
import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api-routes";
import { api } from "@/lib/api/http";
import Image from "next/image";

type Creator = {
  id: string;
  username: string | null;
  displayName: string;
  avatarUrl: string | null;
  bio?: string | null;
};

export default function CreatorsPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Creator[]>([]);

  const qs = useMemo(() => new URLSearchParams(q ? { q } : {}).toString(), [q]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const path = qs ? `${API.CREATORS}?${qs}` : API.CREATORS;
      const { data } = await api.get(path);
      const list: Creator[] = Array.isArray(data) ? data : data?.items || [];
      setItems(list);
    } catch (e: any) {
      setError(e.message || "Failed to load creators");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!alive) return;
      await load();
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs]);

  return (
    <main className="min-h-screen bg-[#001F1F] px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold">Explore creators</h1>
        <p className="mt-1 text-white/70">Find creators by handle or name.</p>

        <div className="mt-4">
          <label className="block">
            <span className="mb-1 block text-sm text-[#DDE0DA]">Search</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. @janedoe or Jane"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
          </label>
        </div>

        {loading && (
          <p className="mt-6 text-white/80">Loading creators…</p>
        )}
        {error && (
          <p className="mt-6 text-red-300">{error}</p>
        )}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((c) => (
            <li key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10">
                  {c.avatarUrl ? (
                    <Image src={c.avatarUrl} alt={c.displayName} fill sizes="48px" style={{ objectFit: "cover" }} />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
                <div>
                  <div className="font-semibold">{c.displayName}</div>
                  <div className="text-sm text-white/70">@{c.username || c.id.slice(0, 6)}</div>
                </div>
              </div>
              {c.bio && <p className="mt-2 text-sm text-white/80 line-clamp-3">{c.bio}</p>}
              <a
                href={`/${encodeURIComponent(c.username || c.id)}`}
                className="mt-3 inline-block rounded-xl bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]"
              >
                View profile
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

