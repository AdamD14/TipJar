"use client";

import Link from "next/link";
import { initials, gradientStyle } from "@/lib/avatar";
import { recordClick } from "@/lib/metrics";

export default function FeaturedHero({
  handle,
  score,
  avatarUrl,
  live,
}: {
  handle: string;
  score?: number;
  avatarUrl?: string;
  live?: boolean;
}) {
  return (
    <Link
      href={`/tip/${handle}`}
      onClick={() => recordClick(handle, "featured")}
      className="group relative block overflow-hidden rounded-2xl border border-white/10"
      aria-label={`Tip @${handle}`}
    >
      <div className="h-40 w-full sm:h-56 md:h-64">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-80"
          />
        ) : (
          <div className="h-full w-full opacity-80" style={gradientStyle(handle)} />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-2 inline-flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
            Featured
          </span>
          {typeof score === "number" && (
            <span className="rounded-full border border-[#FFD700] bg-[#FFD700]/20 px-2 py-0.5 text-[11px] font-semibold text-[#FFD700]">
              ★ {Math.max(0, Math.min(100, Math.round(score)))}
            </span>
          )}
          {live && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FF365E] px-2 py-0.5 text-[10px] font-bold text-white">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
            </span>
          )}
        </div>
        <h3 className="text-2xl font-semibold text-white">@{handle}</h3>
        <p className="text-sm text-white/80">Tap to send a quick tip</p>
      </div>
    </Link>
  );
}
