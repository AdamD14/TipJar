"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";
import ExampleProfile from "./ExampleProfile";
import { GoalBar } from "@/components/studio/modal/GoalBar";
import QRGenerator from "@/components/studio/QRGenerator";
import HoverSliderWidget from "@/components/studio/widget/HoverSliderWidget";
import { QuickTipButtons } from "@/components/studio/widget/QuickTipButtons";
import { useState } from "react";

const DEMO_GOAL = {
  title: "New Studio Setup",
  target: 500,
  current: 340,
  deadline: "2026-09-01",
};

const TIP_AMOUNTS = [1, 2, 5, 10];

function FeatureCard({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card interactive variant="elevated" noPadding className="flex flex-col">
      <div className="h-[2px] w-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-t-xl" />
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-flex self-start items-center rounded-full border border-teal-500/40 bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-heading font-semibold text-teal-300 mb-3">
          {label}
        </span>
        <p className="text-xs text-text-ds-tertiary font-body mb-4">
          {description}
        </p>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </Card>
  );
}

export default function StartBuildingShowcase() {
  const [activeTip, setActiveTip] = useState(5);

  return (
    <section id="studio" className="relative w-full min-h-screen">
      <img
        src="/027.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full max-w-[1920px] aspect-video mx-auto object-cover"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 py-20 md:py-28">
        <div className="mb-10 text-center">
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-text-ds-primary">
            Creator{" "}
            <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="mt-2 text-lg text-text-ds-tertiary font-body">
            Everything you need to receive tips and grow your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-start justify-center lg:sticky lg:top-24">
            <ExampleProfile />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              label="Goal Tracker"
              description="Set funding goals with live progress tracking."
            >
              <GoalBar goal={DEMO_GOAL} />
            </FeatureCard>

            <FeatureCard
              label="QR Generator"
              description="Create branded QR codes for your tip link."
            >
              <QRGenerator />
            </FeatureCard>

            <FeatureCard
              label="Tip Widget"
              description="Embeddable tip buttons for any website."
            >
              <HoverSliderWidget handle="demo" />
            </FeatureCard>

            <FeatureCard
              label="Quick Tips"
              description="Preset amounts for instant one-tap tipping."
            >
              <div className="flex flex-col items-center gap-4 w-full">
                <QuickTipButtons
                  amounts={TIP_AMOUNTS}
                  active={activeTip}
                  onSelect={setActiveTip}
                />
                <div className="text-center">
                  <span className="text-2xl font-heading font-bold text-teal-300 tnum">
                    ${activeTip}
                  </span>
                  <span className="text-sm text-text-ds-tertiary font-body ml-1">
                    USDC
                  </span>
                </div>
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="w-full mt-12 flex items-center justify-between relative z-20">
          <button
            type="button"
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Previous section"
            title="Previous section"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to next section"
            title="See more"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
