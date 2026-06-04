"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";

interface GrowthMetric {
  label: string;
  current: number;
  previous: number;
  format: "currency" | "number" | "percent";
  prefix?: string;
  suffix?: string;
}

const mockMetrics: GrowthMetric[] = [
  { label: "Weekly tips", current: 340, previous: 280, format: "currency", prefix: "$" },
  { label: "New followers", current: 28, previous: 18, format: "number" },
  { label: "Profile views", current: 1240, previous: 1100, format: "number" },
  { label: "Retention rate", current: 72, previous: 75, format: "percent", suffix: "%" },
];

function formatValue(m: GrowthMetric): string {
  if (m.format === "currency") {
    return `${m.prefix ?? ""}${m.current.toLocaleString()}${m.suffix ?? ""}`;
  }
  if (m.format === "percent") {
    return `${m.current}${m.suffix ?? ""}`;
  }
  return `${m.prefix ?? ""}${m.current}${m.suffix ?? ""}`;
}

function computeDelta(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

const trendConfig = {
  up: { icon: TrendingUp, color: "text-success-base", bg: "bg-success-dark/30" },
  down: { icon: TrendingDown, color: "text-error-base", bg: "bg-error-dark/30" },
  flat: { icon: Minus, color: "text-text-quaternary", bg: "bg-teal-800" },
};

function getTrend(delta: number): "up" | "down" | "flat" {
  if (delta > 0) return "up";
  if (delta < 0) return "down";
  return "flat";
}

export function GrowthSnapshot() {
  const [metrics, setMetrics] = useState<GrowthMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"week" | "month">("week");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics(mockMetrics);
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="card-surface !p-6">
        <div className="skeleton-shimmer h-4 w-32 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="skeleton-shimmer h-3 w-16 rounded mb-2" />
              <div className="skeleton-shimmer h-6 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface !p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary">
          Growth Snapshot
        </h3>
        <div className="flex rounded-lg bg-teal-800 p-0.5">
          {(["week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-xs font-heading font-semibold transition-colors duration-200 ${
                view === v
                  ? "bg-gold-400 text-teal-900"
                  : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              {v === "week" ? "7d" : "30d"}
            </button>
          ))}
        </div>
      </div>

      {metrics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <BarChart3 className="w-10 h-10 text-purple-300" />
          <p className="font-body text-sm text-text-secondary">
            Not enough data yet. Growth stats will appear after your first week.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {metrics.map((m, idx) => {
            const delta = computeDelta(m.current, m.previous);
            const trend = getTrend(delta);
            const cfg = trendConfig[trend];
            const Icon = cfg.icon;

            return (
              <div
                key={m.label}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <p className="font-body text-xs text-text-quaternary mb-1.5">{m.label}</p>
                <span className="font-heading font-semibold text-xl text-text-primary tnum block">
                  {formatValue(m)}
                </span>
                <div className="flex items-center gap-1 mt-1.5">
                  <span
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-heading font-semibold ${cfg.bg}`}
                  >
                    <Icon className={`w-3 h-3 ${cfg.color}`} />
                    <span className={cfg.color}>
                      {delta > 0 ? "+" : ""}
                      {delta}%
                    </span>
                  </span>
                  <span className="font-body text-[10px] text-text-quaternary">vs prev</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}