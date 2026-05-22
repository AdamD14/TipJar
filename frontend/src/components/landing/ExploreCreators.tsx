"use client";

import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";

const EXAMPLE_CREATORS = [
  {
    category: "Digital Art",
    initial: "E",
    name: "Elena Moreau",
    handle: "@elenart",
    role: "Illustrator",
    goalPercent: 68,
  },
  {
    category: "Music",
    initial: "L",
    name: "Leo Maxwell",
    handle: "@leosonix",
    role: "Producer",
    goalPercent: 45,
  },
  {
    category: "Gaming",
    initial: "R",
    name: "Riley Chen",
    handle: "@rileyplays",
    role: "Streamer",
    goalPercent: 89,
  },
  {
    category: "Education",
    initial: "S",
    name: "Sarah Mitchell",
    handle: "@teachsarah",
    role: "Educator",
    goalPercent: 72,
  },
  {
    category: "Fitness",
    initial: "M",
    name: "Marcus Johnson",
    handle: "@fitmarc",
    role: "Coach",
    goalPercent: 55,
  },
];

export default function ExploreCreators() {
  return (
     <section id="explore" className="relative w-full min-h-screen">
      <img
        src="/e.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[length:var(--fs-h1)] font-heading font-bold text-text-ds-primary">
              Explore Creators
            </h2>
            <p className="mt-2 text-lg text-text-ds-tertiary font-body">
              Featured by category. Find your next favorite.
            </p>
          </div>
          <Button variant="link" href="/explore" className="hidden sm:inline-flex shrink-0">
            Discover all
          </Button>
        </div>

        <div
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {EXAMPLE_CREATORS.map((creator) => (
            <MiniCreatorCard key={creator.handle} {...creator} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniCreatorCard({
  category,
  initial,
  name,
  handle,
  role,
  goalPercent,
}: {
  category: string;
  initial: string;
  name: string;
  handle: string;
  role: string;
  goalPercent: number;
}) {
  return (
    <Card
      interactive
      variant="base"
      noPadding
      className="min-w-[260px] w-[260px] flex-shrink-0"
    >
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs text-text-ds-tertiary font-body">
            {category}
          </span>
          {goalPercent > 0 && (
            <span className="text-xs font-heading font-bold text-gold-400 tabular-nums">
              {goalPercent}%
            </span>
          )}
        </div>

        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
          <span className="text-xl font-heading font-bold text-teal-900">
            {initial}
          </span>
        </div>

        <div className="text-center">
          <h3 className="text-sm font-heading font-semibold text-text-ds-primary">
            {name}
          </h3>
          <p className="text-xs text-text-ds-tertiary font-body">
            {handle} · {role}
          </p>
        </div>
      </div>
    </Card>
  );
}
