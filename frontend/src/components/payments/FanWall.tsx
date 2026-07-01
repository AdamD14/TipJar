"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Heart } from "lucide-react";
import { usePublicTips, type PublicTip } from "@/lib/api/queries";

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-start gap-3 p-4 rounded-xl bg-white/[0.03]">
      <div className="w-12 h-12 rounded-full bg-white/10 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-28 rounded bg-white/10" />
        <div className="h-3 w-20 rounded bg-white/[0.07]" />
      </div>
    </div>
  );
}

function TipRow({ tip, index }: { tip: PublicTip; index: number }) {
  const displayName = tip.isAnonymous
    ? "Anonymous"
    : tip.fan?.displayName || tip.fan?.username || "Someone";
  const avatarSrc = tip.isAnonymous ? "/logo.png" : tip.fan?.avatarUrl || "/logo.png";

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-teal-800/60 to-teal-900/40 border border-white/[0.06] hover:border-gold-400/25 transition-colors duration-200 animate-fade-in"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/30 shrink-0 shadow-[0_0_12px_-2px_rgba(255,215,0,0.25)]">
        <Image src={avatarSrc} alt={displayName} fill className="object-cover" sizes="48px" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-heading font-bold text-white truncate">
            {displayName}
          </span>
          <span className="text-[10px] text-teal-500/40 tnum shrink-0">
            {formatRelativeTime(tip.createdAt)}
          </span>
        </div>

        <span className="text-lg font-heading font-black text-gold-400 tnum tracking-tight">
          ${Number(tip.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-[10px] font-bold text-gold-400/60 ml-1 uppercase">USDC</span>
        </span>

        {tip.message && (
          <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed italic">
            &ldquo;{tip.message}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

interface FanWallProps {
  creatorId: string;
  className?: string;
}

export default function FanWall({ creatorId, className }: FanWallProps) {
  const { data, isLoading, isError } = usePublicTips(creatorId, 1, 20);

  const tips = data?.tips ?? [];

  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="flex items-center gap-2 mb-3 px-1">
        <Heart size={14} className="text-gold-400" fill="currentColor" />
        <h3 className="text-xs font-heading font-black text-white uppercase tracking-widest">
          Recent Supporters
        </h3>
        {data && data.total > 0 && (
          <span className="text-[10px] text-teal-500/40 tnum ml-auto">{data.total} total</span>
        )}
      </div>

      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
        {isLoading && (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        )}

        {isError && (
          <p className="text-xs text-white/30 p-3">Could not load tips.</p>
        )}

        {!isLoading && tips.length === 0 && (
          <p className="text-xs text-white/30 p-3">No tips yet. Be the first!</p>
        )}

        {tips.map((tip, i) => (
          <TipRow key={tip.id} tip={tip} index={i} />
        ))}
      </div>

      {data && data.total > 20 && (
        <p className="text-[10px] text-teal-500/30 mt-2 text-center tnum">
          Showing 20 of {data.total}
        </p>
      )}
    </div>
  );
}
