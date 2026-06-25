"use client";
import React, { useState, useEffect } from "react";

interface SimplePulseData {
  earnings: string;
  currency: string;
  supportersCount: number;
  followersCount: number;
  profileVisitsCount: number;
  newNotificationsCount: number;
  latestNotification: string;
}

export const CreatorPulseWidget: React.FC = () => {
  const [data, setData] = useState<SimplePulseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        earnings: "+10.00",
        currency: "USDC",
        supportersCount: 2,
        followersCount: 2,
        profileVisitsCount: 10,
        newNotificationsCount: 3,
        latestNotification: "Tip from @crypto_buddha (3.00 USDC)",
      });
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="glass-liquid gpu-layer shadow-maestro elevation-z-2 rounded-3xl p-6 max-w-md w-full border-gold-subtle">
        <div className="h-4 w-16 skeleton-shimmer rounded mb-4" />
        <div className="h-10 w-full skeleton-shimmer rounded mb-6" />
        <div className="h-4 w-36 skeleton-shimmer rounded mb-6" />
        <div className="border-t border-[color-mix(in_oklch,var(--teal-100)_10%,transparent)] my-4" />
        <div className="h-8 w-full skeleton-shimmer rounded" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="group glass-liquid gpu-layer shadow-maestro elevation-z-2 rounded-3xl p-6 max-w-md w-full border-gold-subtle relative overflow-hidden isolate">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle 1px at 20% 30%, var(--teal-300) 0.5px, transparent 0.5px), radial-gradient(circle 1px at 60% 70%, var(--teal-300) 0.5px, transparent 0.5px), radial-gradient(circle 1px at 80% 20%, var(--teal-300) 0.5px, transparent 0.5px), radial-gradient(circle 1px at 40% 80%, var(--purple-300) 0.5px, transparent 0.5px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div
          className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] -translate-x-[140%] group-hover:animate-[sheen_0.6s_ease-in-out]"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
          style={{
            color: "color-mix(in oklch, var(--teal-100) 50%, transparent)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          Today
        </span>
        <span
          className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
          style={{
            color: "var(--color-success-base)",
            backgroundColor: "color-mix(in oklch, var(--color-success-base) 10%, transparent)",
            border: "1px solid color-mix(in oklch, var(--color-success-base) 15%, transparent)",
          }}
        >
          Live Pulse
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="text-3xl font-extrabold tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {data.earnings}
          </span>

          <div
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#2775CA" }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
              <circle cx="12" cy="12" r="10" fill="#2775CA" />
              <path
                d="M12 4V20M8 8H14C15.5 8 16.5 9 16.5 10.5C16.5 12 15.5 13 14 13H10C8.5 13 7.5 14 7.5 15.5C7.5 17 8.5 18 10 18H16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div
          className="text-xs truncate"
          style={{ color: "color-mix(in oklch, var(--teal-100) 80%, transparent)" }}
        >
          from{" "}
          <span
            className="font-bold font-mono"
            style={{
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            +{data.supportersCount}
          </span>{" "}
          supporter{data.supportersCount > 1 ? "s" : ""}
        </div>

        <div className="w-16 h-6 flex-shrink-0">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <polyline
              points="0,85 20,65 40,90 60,30 80,45 100,10"
              fill="none"
              stroke="var(--color-success-base)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <div
        className="my-3.5"
        style={{
          borderTop: "1px solid color-mix(in oklch, var(--teal-100) 10%, transparent)",
        }}
      />

      <div
        className="flex items-center justify-between gap-4 text-xs"
        style={{ color: "color-mix(in oklch, var(--teal-100) 80%, transparent)" }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="var(--color-success-base)"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span className="truncate">
            <strong style={{ color: "var(--text-primary)" }}>+{data.followersCount}</strong> new followers
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="var(--color-success-base)"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>
            <strong style={{ color: "var(--text-primary)" }}>+{data.profileVisitsCount}</strong> visits
          </span>
        </div>
      </div>

      <div
        className="my-3.5"
        style={{
          borderTop: "1px solid color-mix(in oklch, var(--teal-100) 10%, transparent)",
        }}
      />

      <div
        className="rounded-lg p-2.5 flex items-center justify-between gap-4 text-[11px] font-mono"
        style={{
          backgroundColor: "color-mix(in oklch, var(--teal-900) 40%, transparent)",
          border: "1px solid color-mix(in oklch, var(--teal-100) 5%, transparent)",
          color: "color-mix(in oklch, var(--teal-100) 80%, transparent)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "var(--color-success-base)" }}
          />
          <span className="truncate">Latest: {data.latestNotification}</span>
        </div>
        <div
          className="text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
          style={{
            color: "var(--color-success-base)",
            backgroundColor: "color-mix(in oklch, var(--color-success-base) 10%, transparent)",
            border: "1px solid color-mix(in oklch, var(--color-success-base) 20%, transparent)",
          }}
        >
          +{data.newNotificationsCount} new
        </div>
      </div>
    </div>
  );
};

export default CreatorPulseWidget;
