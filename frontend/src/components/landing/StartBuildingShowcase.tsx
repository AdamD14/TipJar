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
      <div className="h-[2px] w-full bg-gradient-to-r from-gold-400 to-teal-600 rounded-t-xl" />
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-flex self-start items-center rounded-full border border-gold-400 bg-gold-400/10 px-2.5 py-0.5 text-[11px] font-heading font-semibold text-gold-400 mb-3">
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
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 py-20 md:py-28">
        <div className="mb-10">
          <h2 className="text-[length:var(--fs-h1)] font-heading font-bold text-text-ds-primary">
            Start{" "}
            <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              Building
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
                  <span className="text-2xl font-heading font-bold text-gold-400 tnum">
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

        <div className="mt-12 flex justify-center">
          <Button variant="primary" href="/studio" size="lg" className="gap-2">
            Open Studio
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
