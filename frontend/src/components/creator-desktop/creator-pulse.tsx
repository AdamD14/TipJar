"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Share2 } from "lucide-react";
import Button from "@/components/ui/buttons/Button";

interface PulseData {
  value: number;
  label: string;
  trend: number[];
  delta: number;
}

const mockData: PulseData = {
  value: 1240,
  label: "Total earnings this month",
  trend: [320, 480, 290, 520, 610, 840, 1240],
  delta: 14.3,
};

export function CreatorPulse() {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
      setGlow(true);
      setTimeout(() => setGlow(false), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="card-surface !p-8">
        <div className="skeleton-shimmer h-5 w-32 rounded mb-4" />
        <div className="skeleton-shimmer h-14 w-48 rounded" />
        <div className="skeleton-shimmer h-12 w-full rounded mt-4" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card-surface !p-8 text-center">
        <p className="font-body text-text-secondary text-lg">
          Your journey is just beginning. Share your profile to get your first support.
        </p>
        <Button variant="secondary" size="md" className="mt-4">
          <Share2 className="w-4 h-4 mr-2" />
          Share profile
        </Button>
      </div>
    );
  }

  const maxY = Math.max(...data.trend);
  const minY = Math.min(...data.trend);
  const range = maxY - minY || 1;
  const points = data.trend
    .map(
      (v, i) =>
        `${(i / (data.trend.length - 1)) * 100} ${100 - ((v - minY) / range) * 80}`,
    )
    .join(", ");

  const areaPoints = `${points} 100 100, 0 100`;

  const isPositive = data.delta >= 0;

  return (
    <div
      className={`card-surface !p-8 transition-shadow duration-500 ${
        glow ? "!shadow-[0_0_30px_rgba(255,215,0,0.3)]" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="flex-1">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary mb-2">
            {data.label}
          </p>

          <div className="flex items-baseline gap-4">
            <span
              className="font-heading font-bold text-display text-text-primary tnum leading-none"
              style={{
                fontFeatureSettings: '"tnum"',
                animation: glow
                  ? "pulse-breath 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  : undefined,
              }}
            >
              ${data.value.toLocaleString()}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-heading font-semibold ${
                isPositive
                  ? "bg-success-dark/40 text-success-light"
                  : "bg-error-dark/40 text-error-light"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {isPositive ? "+" : ""}
              {data.delta}%
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <defs>
              <linearGradient
                id="pulse-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="var(--gold-400)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--gold-400)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={areaPoints}
              fill="url(#pulse-gradient)"
            />
            <polyline
              points={points}
              fill="none"
              stroke="var(--gold-400)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}