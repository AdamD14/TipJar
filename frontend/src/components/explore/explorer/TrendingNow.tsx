"use client";

import Link from "next/link";
import { recordClick } from "@/lib/metrics";

export type Trend = { handle: string; score?: number };

export default function TrendingNow({ items }: { items: Trend[] }) {
  if (!items?.length) return null;
  return (
    <section aria-label="Trending now" className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">Trending now</span>
        <span aria-hidden="true" className="h-[1px] flex-1 bg-white/10" />
      </div>

      <div
        className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2"
        tabIndex={0}
      >
        {items.map((t) => (
          <Link
            key={t.handle}
            href={`/tip/${t.handle}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-teal-800/40 px-3 py-1.5 text-sm text-white/90 hover:bg-teal-800/60 focus:outline-none focus:ring-2 focus:ring-gold-400"
            onClick={() => recordClick(t.handle, "trending")}
          >
            <span className="font-semibold">@{t.handle}</span>
            {typeof t.score === "number" && (
              <span className="rounded-full border border-gold-400 bg-gold-400/20 px-2 py-0.5 text-[11px] font-semibold text-teal-900">
                ★ {Math.max(0, Math.min(100, Math.round(t.score)))}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
