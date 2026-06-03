"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
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
    <div className="animate-pulse flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
      <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="h-3 w-16 rounded bg-white/[0.07]" />
      </div>
    </div>
  );
}

function TipRow({ tip }: { tip: PublicTip }) {
  const displayName = tip.isAnonymous
    ? "Anonymous"
    : tip.fan?.displayName || tip.fan?.username || "Someone";
  const avatarSrc = tip.isAnonymous
    ? "/logo.png"
    : tip.fan?.avatarUrl || "/logo.png";

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors">
      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
        <Image
          src={avatarSrc}
          alt={displayName}
          fill
          className="object-cover"
          sizes="36px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-heading font-bold text-white truncate">
            {displayName}
          </span>
          <span className="text-[10px] text-teal-500/40 tnum shrink-0">
            {formatRelativeTime(tip.createdAt)}
          </span>
        </div>

        <span className="text-sm font-heading font-bold text-gold-400 tnum">
          ${Number(tip.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
        </span>

        {tip.message && (
          <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed">
            {tip.message}
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
      <h3 className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-3 px-1">
        Recent Supporters
      </h3>

      <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
        {isLoading && (
          <>
            <SkeletonRow />
            <SkeletonRow />
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

        {tips.map((tip) => (
          <TipRow key={tip.id} tip={tip} />
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
