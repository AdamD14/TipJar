"use client";
import { useMemo, useState } from "react";
import { CreatorCard } from "@/components/CreatorCard";

const MOCK = Array.from({ length: 24 }).map((_, i) => ({
  handle: `creator${i + 1}`,
  name: `Creator ${i + 1}`,
  bio: "Making awesome stuff on the internet.",
  avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}));

export default function ExplorePage() {
  const [q, setQ] = useState("");
  const [top] = useState(MOCK.slice(0, 8));
  const filtered = useMemo(
    () =>
      MOCK.filter((c) =>
        (c.name + c.handle + c.bio).toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search creators…"
          className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-white/40"
        />
      </div>
      <section>
        <h2 className="mb-3 text-xl font-bold">Top creators</h2>
        <div className="flex snap-x gap-4 overflow-x-auto pb-2">
          {top.map((c) => (
            <div key={c.handle} className="snap-start w-56 shrink-0">
              <CreatorCard creator={c} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold">All creators</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((c) => (
            <CreatorCard key={c.handle} creator={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
