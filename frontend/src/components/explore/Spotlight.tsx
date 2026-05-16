"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { initials, gradientStyle } from "@/lib/avatar";
import { recordClick } from "@/lib/metrics";

export type SpotlightItem = {
  handle: string;
  score?: number;
  avatarUrl?: string;
  live?: boolean;
};

const SEEN_KEY = "tj_spotlight_seen_v1";

function getSeen(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
  } catch {
    return [];
  }
}
function setSeen(arr: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(arr.slice(0, 200)));
  } catch {}
}

export default function Spotlight({ pool }: { pool: SpotlightItem[] }) {
  const [seen, setSeenState] = useState<string[]>([]);
  const [current, setCurrent] = useState<SpotlightItem | null>(null);

  useEffect(() => {
    setSeenState(getSeen());
  }, []);

  const candidates = useMemo(() => {
    const s = new Set(seen);
    const list = (pool || []).filter((it) => !s.has(it.handle));
    return list.length ? list : pool || [];
  }, [pool, seen]);

  useEffect(() => {
    if (!candidates.length) {
      setCurrent(null);
      return;
    }
    setCurrent(candidates[0]);
  }, [candidates]);

  function markSeen(h: string) {
    const next = [h, ...seen.filter((x) => x !== h)];
    setSeenState(next);
    setSeen(next);
  }

  if (!current) return null;

  const { handle, score, avatarUrl, live } = current;

  return (
    <section aria-label="Spotlight" className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Spotlight</span>
        <button
          type="button"
          onClick={() => {
            markSeen(handle);
          }}
          className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
          aria-label="Dismiss spotlight"
        >
          Dismiss
        </button>
      </div>

      <Link
        href={`/tip/${handle}`}
        onClick={() => {
          recordClick(handle, "spotlight");
          markSeen(handle);
        }}
        className="group relative block overflow-hidden rounded-2xl border border-white/10"
        aria-label={`Tip @${handle}`}
      >
        <div className="h-40 w-full sm:h-48 md:h-56">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-90"
            />
          ) : (
            <div className="h-full w-full opacity-90" style={gradientStyle(handle)} />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute -bottom-4 left-4 grid h-16 w-16 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur">
          <span className="text-base font-bold text-white">{initials(handle)}</span>
        </div>

        <div className="absolute bottom-0 left-24 right-4 pb-3">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
              Featured
            </span>
            {typeof score === "number" && (
              <span className="rounded-full border border-gold-400 bg-gold-400/20 px-2 py-0.5 text-[11px] font-semibold text-gold-400">
                ★ {Math.max(0, Math.min(100, Math.round(score)))}
              </span>
            )}
            {live && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
              </span>
            )}
          </div>
          <h3 className="truncate text-xl font-semibold text-white">@{handle}</h3>
          <p className="text-sm text-white/80">Tap to send a quick tip</p>
        </div>
      </Link>
    </section>
  );
}
