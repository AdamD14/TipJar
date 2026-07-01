"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Share2,
  Activity,
  ArrowUpRight,
} from "lucide-react";
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

export default function CreatorPulsePage() {
  const { username } = useParams<{ username: string }>();
  const prefix = `/@${username}/creator-desktop/desktop/creator-pulse`;
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [glow, setGlow] = useState(false);
  const [sparkDraw, setSparkDraw] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
      setGlow(true);
      setSparkDraw(true);
      setTimeout(() => setGlow(false), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const isPositive = data ? data.delta >= 0 : true;

  const maxY = data ? Math.max(...data.trend) : 1;
  const minY = data ? Math.min(...data.trend) : 0;
  const range = maxY - minY || 1;

  const maxDayIdx = data
    ? data.trend.indexOf(Math.max(...data.trend))
    : 0;
  const minDayIdx = data
    ? data.trend.indexOf(Math.min(...data.trend))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-main text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="border-b border-teal-500/10 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-gold-400" />
            <h1 className="text-3xl font-bold font-heading tracking-tight bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent">
              Creator Pulse
            </h1>
          </div>
          <p className="text-sm text-text-tertiary leading-relaxed">
            Your heartbeat metric — the single number that defines your momentum.
            SSE-powered real-time updates with spring-animated value changes.
          </p>
        </div>

        {loading ? (
          <div className="card-surface !p-8">
            <div className="skeleton-shimmer h-5 w-32 rounded mb-4" />
            <div className="skeleton-shimmer h-14 w-48 rounded" />
            <div className="skeleton-shimmer h-24 w-full rounded mt-6" />
          </div>
        ) : !data ? (
          <div className="card-surface !p-8 text-center space-y-4">
            <p className="font-body text-text-secondary text-lg">
              Your journey is just beginning. Share your profile to get your
              first support.
            </p>
            <Button variant="secondary" size="md">
              <Share2 className="w-4 h-4 mr-2" />
              Share profile
            </Button>
          </div>
        ) : (
          <div
            className={`card-surface !p-8 transition-shadow duration-500 ${
              glow ? "!shadow-[0_0_30px_rgba(255,215,0,0.3)]" : ""
            }`}
          >
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary mb-2">
              {data.label}
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span
                className="font-heading font-bold text-5xl text-text-primary tnum leading-none"
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

            <div className="relative">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-32"
              >
                <defs>
                  <linearGradient
                    id="pulse-gradient-full"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--gold-400)"
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--gold-400)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                {sparkDraw && (
                  <polygon
                    points={data.trend
                      .map(
                        (v, i) =>
                          `${(i / (data.trend.length - 1)) * 100} ${100 - ((v - minY) / range) * 80}`
                      )
                      .join(", ") + " 100 100, 0 100"}
                    fill="url(#pulse-gradient-full)"
                  />
                )}

                {sparkDraw && (
                  <polyline
                    points={data.trend
                      .map(
                        (v, i) =>
                          `${(i / (data.trend.length - 1)) * 100} ${100 - ((v - minY) / range) * 80}`
                      )
                      .join(", ")}
                    fill="none"
                    stroke="var(--gold-400)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="animate-dash"
                  />
                )}

                {data.trend.map((v, i) => {
                  const x = (i / (data.trend.length - 1)) * 100;
                  const y = 100 - ((v - minY) / range) * 80;
                  const isMax = i === maxDayIdx;
                  const isMin = i === minDayIdx;
                  const isToday = i === data.trend.length - 1;

                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isMax || isMin || isToday ? 1.5 : 0}
                      fill={
                        isToday
                          ? "var(--gold-400)"
                          : isMax
                            ? "var(--success-base)"
                            : isMin
                              ? "var(--error-base)"
                              : "transparent"
                      }
                      style={isToday ? { animation: "pulse-breath 2s infinite" } : undefined}
                    />
                  );
                })}
              </svg>

              <div className="flex justify-between mt-2 text-[10px] font-body text-text-quaternary">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
