"use client";

import { Coins, Shield, Zap, ArrowRight } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";

const TEASER_TOPICS = [
  {
    icon: Coins,
    title: "What is USDC?",
    teaser:
      "Fully-reserved stablecoin issued by Circle. 1 USDC = 1 USD.",
  },
  {
    icon: Shield,
    title: "Wallet basics",
    teaser:
      "Self-custody vs custodial — what you need to know to stay safe.",
  },
  {
    icon: Zap,
    title: "How tipping works",
    teaser:
      "No account needed. Fans pay with card or crypto, creators get USDC.",
  },
];

export default function LearnTeaser() {
  return (
    <section
      id="learn"
      aria-labelledby="learn-heading"
      className="relative w-full py-20 px-4 md:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,215,0,0.04),transparent_70%)]"
      />

      <div className="mx-auto max-w-[1280px]">
        <h2
          id="learn-heading"
          className="mb-2 text-2xl md:text-3xl font-heading font-semibold"
        >
          Learn about{" "}
          <span className="bg-gradient-to-r from-gold-200 via-white to-gold-200 bg-clip-text text-transparent">
            Web3
          </span>
        </h2>
        <p className="mb-10 max-w-[580px] text-[14px] leading-[1.6] text-text-ds-tertiary font-body">
          Short answers upfront. No jargon, just what you need to support
          creators and earn faster.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TEASER_TOPICS.map((topic) => {
            const Icon = topic.icon;
            return (
              <Card key={topic.title} interactive variant="elevated" noPadding>
                <div className="p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400/10 transition-colors group-hover/card:bg-gold-400/20">
                    <Icon size={18} className="text-gold-400" />
                  </div>
                  <h3 className="mb-1 text-base font-heading font-semibold leading-[1.5]">
                    {topic.title}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-text-ds-tertiary font-body">
                    {topic.teaser}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/learn" variant="secondary" className="gap-2">
            Explore all topics
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
