"use client";

import FeaturedHero from "./FeaturedHero";
import CreatorCard from "@/components/discover/CreatorCard";

export type Item = {
  handle: string;
  score?: number;
  tags?: string[];
  collections?: string[];
  avatarUrl?: string;
  live?: boolean;
};

export default function FeaturedGrid({ items }: { items: Item[] }) {
  if (!items?.length) return null;
  const [first, second, third] = items.slice(0, 3);
  if (!first) return null;

  return (
    <section className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <FeaturedHero
            handle={first.handle}
            score={first.score}
            avatarUrl={first.avatarUrl}
            live={first.live}
          />
        </div>
        <div className="space-y-3">
          {second && (
            <CreatorCard
              handle={second.handle}
              exists={true}
              score={second.score}
              tags={second.tags}
              collections={second.collections}
              avatarUrl={second.avatarUrl}
              live={second.live}
            />
          )}
          {third && (
            <CreatorCard
              handle={third.handle}
              exists={true}
              score={third.score}
              tags={third.tags}
              collections={third.collections}
              avatarUrl={third.avatarUrl}
              live={third.live}
            />
          )}
        </div>
      </div>
    </section>
  );
}
