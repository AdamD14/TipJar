"use client";

import { useState } from "react";
import {
  Coins,
  Shield,
  Zap,
  Rocket,
  Lock,
  ArrowRight,
  Search,
} from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";
import Input from "@/components/ui/forms/Input";

const CATEGORY_PILLS = [
  "All",
  "Getting Started",
  "For Fans",
  "For Creators",
  "Web3 101",
  "Security",
];

const TEASER_TOPICS = [
  {
    icon: Rocket,
    title: "Getting started",
    teaser:
      "Create your tip page in under 2 minutes. No crypto wallet needed to start receiving.",
    category: "Getting Started",
    readTime: "3 min",
  },
  {
    icon: Coins,
    title: "What is USDC?",
    teaser:
      "Fully-reserved stablecoin issued by Circle. 1 USDC = 1 USD — always.",
    category: "Web3 101",
    readTime: "4 min",
  },
  {
    icon: Shield,
    title: "Wallet basics",
    teaser:
      "Self-custody vs custodial — what you need to know to stay safe.",
    category: "Security",
    readTime: "5 min",
  },
  {
    icon: Zap,
    title: "How tipping works",
    teaser:
      "No account needed. Fans pay with card or crypto, creators get USDC.",
    category: "For Fans",
    readTime: "3 min",
  },
  {
    icon: Lock,
    title: "Security & wallets",
    teaser:
      "Best practices for keeping your funds safe and your keys secure.",
    category: "Security",
    readTime: "6 min",
  },
  {
    icon: Coins,
    title: "Setting up goals",
    teaser:
      "Create funding goals to rally your community and track progress.",
    category: "For Creators",
    readTime: "4 min",
  },
];

const POPULAR_ARTICLES = [
  { title: "How to withdraw USDC to your bank", category: "For Fans" },
  { title: "Understanding gas fees on TipJar+", category: "Web3 101" },
  { title: "Embed your tip widget anywhere", category: "For Creators" },
];

export default function LearnTeaser() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTopics =
    activeCategory === "All"
      ? TEASER_TOPICS
      : TEASER_TOPICS.filter((t) => t.category === activeCategory);

  return (
    <section id="learn" className="relative w-full min-h-screen">
      <img
        src="/pattern.svg"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full mx-auto object-cover"
      />
7
      <div className="mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="text-center mb-8 flex flex-col items-center justify-center gap-2">
          <h2
            id="learn-heading"
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-text-ds-primary"
          >
            Knowledge{" "}
            <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              center
            </span>
          </h2>
          
        </div>

        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {CATEGORY_PILLS.map((cat) => {
            const active = activeCategory === cat;
            return (
              <Button
                key={cat}
                variant={active ? "tertiary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={active}
                className={
                  active ? undefined : "border border-white/10 rounded-full"
                }
              >
                {cat}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filteredTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Card key={topic.title} interactive variant="elevated" noPadding>
                <div className="h-[2px] w-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-t-xl" />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 transition-colors group-hover/card:bg-teal-500/20">
                      <Icon size={18} className="text-teal-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-text-ds-tertiary font-body">
                        {topic.category}
                      </span>
                      <span className="text-[11px] text-text-ds-tertiary font-body tnum">
                        {topic.readTime} read
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-1 text-base font-heading font-semibold leading-[1.5] text-text-ds-primary">
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

        <div className="mb-10">
          <h3 className="text-sm font-heading font-semibold text-text-ds-primary mb-4">
            Popular articles
          </h3>
          <div className="space-y-3">
            {POPULAR_ARTICLES.map((article) => (
              <a
                key={article.title}
                href="/learn"
                className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.05] bg-surface-elevated/40 px-4 py-3 transition-colors hover:bg-surface-elevated/60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-text-ds-tertiary font-body shrink-0">
                    {article.category}
                  </span>
                  <span className="text-sm font-heading font-medium text-text-ds-primary truncate">
                    {article.title}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-text-ds-tertiary shrink-0"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/learn";
            }}
            className="w-full max-w-md flex gap-2"
          >
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-ds-tertiary pointer-events-none"
              />
              <Input
                placeholder="Search articles..."
                className="pl-9"
              />
            </div>
            <Button variant="tertiary" type="submit">
              Search
            </Button>
          </form>

          <Button href="/learn" variant="ghost" rightIcon={<ArrowRight size={16} />}>
            Learn more
          </Button>
        </div>

        {/* Navigation arrows */}
        <div className="w-full mt-12 flex items-center justify-between relative z-20">
          <button
            type="button"
            onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
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
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            aria-label="Scroll to bottom"
            title="Scroll to bottom"
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
