"use client";

import { useId } from "react";
import type { ExplorerSort } from "@/lib/explorer";

export default function SortSelect({
  value,
  onChange,
}: {
  value: ExplorerSort;
  onChange: (v: ExplorerSort) => void;
}) {
  const id = useId();
  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-sm text-muted">Sort</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as ExplorerSort)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
      >
        <option value="trending">Trending</option>
        <option value="newest">Newest</option>
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </select>
    </label>
  );
}
