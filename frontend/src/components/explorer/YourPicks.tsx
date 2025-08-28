"use client";

import Link from "next/link";
import { getTopClicked } from "@/lib/metrics";

export default function YourPicks() {
  const top = getTopClicked(12);
  if (!top.length) return null;

  return (
    <section aria-label="Your picks" className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">Your picks</span>
        <span aria-hidden className="h-[1px] flex-1 bg-white/10" />
      </div>

      <div
        className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2"
        tabIndex={0}
      >
        {top.map(({ handle, count }) => (
          <Link
            key={handle}
            href={`/tip/${handle}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            <span className="font-semibold">@{handle}</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px]">
              ×{count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
