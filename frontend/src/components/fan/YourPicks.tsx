"use client";

import Link from "next/link";
import Card from "@/components/ui/forms/Card";
import { getTopClicked } from "@/lib/metrics";

export default function YourPicks() {
  const top = getTopClicked(12);
  if (!top.length) return null;

  return (
    <section aria-label="Your picks" className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-heading font-semibold text-text-ds-primary">Your picks</span>
        <span aria-hidden className="h-[1px] flex-1 bg-white/10" />
      </div>

      <Card noPadding tabIndex={0} className="no-scrollbar flex gap-2 overflow-x-auto p-2">
        {top.map(({ handle, count }) => (
          <Link
            key={handle}
            href={`/tip/${handle}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-ds-primary hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
          >
            <span className="font-heading font-semibold">@{handle}</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px]">
              ×{count}
            </span>
          </Link>
        ))}
      </Card>
    </section>
  );
}
