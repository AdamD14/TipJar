"use client";

import Link from "next/link";
import { recordClick } from "@/lib/metrics";

export type Suggestion = { handle: string; source: "local" | "recent" };

export default function Suggestions({
  items,
  query,
}: {
  items: Suggestion[];
  query: string;
}) {
  if (!query || items.length === 0) return null;
  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-2">
      <p className="mb-1 px-2 text-xs text-[#BCC1B6]">Suggestions</p>
      <ul className="divide-y divide-white/10">
        {items.map((s) => (
          <li key={`${s.source}:${s.handle}`}>
            <Link
              href={`/tip/${s.handle}`}
              className="block px-2 py-2 text-sm text-white/90 hover:bg-white/10"
              onClick={() => recordClick(s.handle, "suggestion")}
            >
              @{s.handle} <span className="text-xs text-[#BCC1B6]">({s.source})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
