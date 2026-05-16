"use client";

import Link from "next/link";
import Card from "@/components/ui/forms/Card";
import { recordClick } from "@/lib/metrics";

export type Trend = { handle: string; score?: number };

export default function TrendingNow({ items }: { items: Trend[] }) {
  if (!items?.length) return null;
  return (
    <section aria-label="Trending now" className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-heading font-semibold text-text-ds-primary">Trending now</span>
        <span aria-hidden="true" className="h-[1px] flex-1 bg-white/10" />
      </div>

      <Card noPadding className="no-scrollbar flex gap-2 overflow-x-auto p-2" tabIndex={0}>
        {items.map((t) => (
          <Link
            key={t.handle}
            href={`/tip/${t.handle}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-teal-800/40 px-3 py-1.5 text-sm text-text-ds-primary hover:bg-teal-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            onClick={() => recordClick(t.handle, "trending")}
          >
            <span className="font-heading font-semibold">@{t.handle}</span>
            {typeof t.score === "number" && (
              <span className="rounded-full border border-gold-400 bg-gold-400/20 px-2 py-0.5 text-[11px] font-heading font-semibold text-teal-900">
                ★ {Math.max(0, Math.min(100, Math.round(t.score)))}
              </span>
            )}
          </Link>
        ))}
      </Card>
    </section>
  );
}
