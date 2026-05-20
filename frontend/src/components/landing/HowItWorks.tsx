"use client";

import React, { useState } from "react";
import {
  UserPlus, Wallet, Compass, Heart, Sparkles, Users,
  Palette, Share2, LayoutGrid, QrCode, Layers, TrendingUp, HandHeart,
} from "lucide-react";
import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;

interface StepItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const fanSteps: StepItem[] = [
  { icon: UserPlus, title: "Sign Up", description: "Use email, Google, Twitch, or MetaMask. Registration is optional — you can tip without an account." },
  { icon: Wallet, title: "Top Up", description: "Fund your tips — add or buy USDC using crypto or your preferred payment method." },
  { icon: Compass, title: "Explore", description: "Discover creators sharing knowledge and experiences for the new digital era." },
  { icon: Heart, title: "Support", description: "Real people, real value. Send one-time tips or set up recurring support for creators you love." },
  { icon: Sparkles, title: "Enjoy the Journey", description: "From streamers and models to musicians, educators, coaches, and influencers — find your community." },
  { icon: HandHeart, title: "Contribute", description: "Contribute to the culture, be part of the style." },
];

const creatorSteps: StepItem[] = [
  { icon: Palette, title: "Ownership", description: "Editable avatar, bio, and animated/static cover. No third-party integrations. 100% creator-owned space." },
  { icon: Share2, title: "Engagement", description: "Shareable widget (iframe), QR codes, dynamic Open Graph cards, and social links (X, Instagram, YouTube, Discord, Telegram)." },
  { icon: LayoutGrid, title: "Usability", description: "Clean Web3 UI with a responsive layout, hover effects, micro-animations, and themes; works out of the box, no code needed." },
  { icon: QrCode, title: "Accessibility", description: "Instant, borderless access via shareable links and QR codes." },
  { icon: Layers, title: "Flexibility", description: "One-time tips with presets, fundraising goals with progress bars and deadlines, and monthly subscriptions with customizable tiers." },
  { icon: TrendingUp, title: "Shareability", description: "Goal tracking that shows real impact, plus subscriptions and milestones that build loyalty and community." },
];

/* ------------------------------------------------------------------ */
/*  Snake Timeline sub-component                                        */
/* ------------------------------------------------------------------ */

/**
 * Snake layout for 2-column grid:
 *   Row 0: 1 → 2   (left → right)
 *   Row 1: 4 ← 3   (right → left, reversed!)
 *   Row 2: 5 → 6   (left → right)
 */

const SNAKE_MAP = [
  { row: 0, col: 0 }, // 0 → pos [0,0]
  { row: 0, col: 1 }, // 1 → pos [0,1]
  { row: 1, col: 1 }, // 2 → pos [1,1] (reversed row)
  { row: 1, col: 0 }, // 3 → pos [1,0]
  { row: 2, col: 0 }, // 4 → pos [2,0]
  { row: 2, col: 1 }, // 5 → pos [2,1]
] as const;

interface SnakeTimelineProps {
  steps: StepItem[];
  accent: "gold" | "purple";
}

function SnakeTimeline({ steps, accent }: SnakeTimelineProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const grid = Array.from({ length: 3 }, () => Array<StepItem | null>(2).fill(null));
  steps.forEach((step, i) => {
    const pos = SNAKE_MAP[i];
    grid[pos.row][pos.col] = step;
  });

  const borderColor = accent === "gold" ? "border-gold-400" : "border-purple-300";
  const textColor = accent === "gold" ? "text-gold-400" : "text-purple-300";
  const glowColor = accent === "gold" ? "shadow-gold-glow" : "shadow-[0_0_10px_rgba(77,25,77,0.2)]";

  return (
    <div className="relative">
      {/* SVG connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <linearGradient id={`snake-gradient-${accent}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent === "gold" ? "#FFD700" : "#4D194D"} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accent === "gold" ? "#FFC312" : "#661B66"} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Lines will be drawn via CSS pseudo-elements on cards */}
      </svg>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 relative z-10">
        {grid.map((row, rowIdx) =>
          row.map((step, colIdx) => {
            if (!step) return null;
            const originalIdx = steps.indexOf(step);
            const isActive = activeIdx === originalIdx;
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative"
                onMouseEnter={() => setActiveIdx(originalIdx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <Card
                  interactive
                  variant="base"
                  className={`transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] ${
                    isActive ? "-translate-y-1.5" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 transition-colors duration-300 ${
                        isActive
                          ? `${borderColor} ${accent === "gold" ? "bg-gold-400/10" : "bg-purple-300/10"} ${glowColor}`
                          : "border-teal-600 bg-teal-800"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${
                          isActive ? textColor : "text-teal-300"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`font-heading font-semibold text-base mb-1 transition-colors duration-200 ${
                          isActive ? textColor : "text-text-ds-secondary"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-sm text-text-ds-tertiary font-body leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Connecting line to next card */}
                {rowIdx < 2 && (
                  <div
                    className={`absolute left-1/2 -bottom-3 w-px h-6 ${
                      accent === "gold" ? "bg-gold-400/30" : "bg-purple-300/30"
                    }`}
                    style={{ transform: "translateX(-50%)" }}
                  />
                )}
                {colIdx === 0 && rowIdx < 2 && (
                  <div
                    className={`absolute top-1/2 -right-4 w-8 h-px ${
                      accent === "gold" ? "bg-gold-400/30" : "bg-purple-300/30"
                    }`}
                    style={{ transform: "translateY(-50%)" }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full min-h-screen">
      <img
        src="/how.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full min-h-screen py-20 px-4 md:px-8">
        <div className="w-full h-full flex flex-col justify-center gap-10 md:gap-16 lg:gap-20">
          <h2 className="text-center font-heading text-2xl lg:text-3xl text-text-ds-quaternary font-semibold">
            how it works ?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
            {/* For Fans */}
            <div className="flex flex-col">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-heading font-semibold text-gold-400">
                <Users size={22} className="text-gold-400" />
                For Fans
              </h3>
              <SnakeTimeline steps={fanSteps} accent="gold" />
              <div className="mt-8">
                <Button variant="secondary" href="/signup">
                  Sign up as a Fan
                </Button>
              </div>
            </div>

            {/* For Creators */}
            <div className="flex flex-col">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-heading font-semibold text-gold-400">
                <Sparkles size={22} className="text-gold-400" />
                For Creators
              </h3>
              <SnakeTimeline steps={creatorSteps} accent="gold" />
              <div className="mt-8">
                <Button variant="primary" href="/register">
                  Join as a Creator
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="w-full mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Back to top"
              title="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="h-12 w-12 rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Scroll to next section"
              title="See more"
              onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
              className="h-12 w-12 rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
