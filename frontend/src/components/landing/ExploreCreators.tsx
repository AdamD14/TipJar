"use client";

import { useState } from "react";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";
import CreatorCard from "@/components/explore/CreatorCard";
import TrendingNow from "@/components/explore/TrendingNow";
import TopTagsCloud from "@/components/explore/TopTagsCloud";
import FilterChips from "@/components/explore/FilterChips";

const CATEGORIES = [
  { slug: "all", title: "All" },
  { slug: "digital-art", title: "Digital Art" },
  { slug: "music", title: "Music" },
  { slug: "gaming", title: "Gaming" },
  { slug: "education", title: "Education" },
  { slug: "fitness", title: "Fitness" },
];

const EXAMPLE_CREATORS = [
  {
    name: "Elena Moreau",
    handle: "elenart",
    category: "Digital Art",
    score: 78,
    tags: ["illustration", "procreate"],
    live: false,
  },
  {
    name: "Leo Maxwell",
    handle: "leosonix",
    category: "Music",
    score: 65,
    tags: ["beats", "lofi"],
    live: true,
  },
  {
    name: "Riley Chen",
    handle: "rileyplays",
    category: "Gaming",
    score: 92,
    tags: ["twitch", "fps"],
    live: true,
  },
  {
    name: "Sarah Mitchell",
    handle: "teachsarah",
    category: "Education",
    score: 71,
    tags: ["web3", "tutorials"],
    live: false,
  },
  {
    name: "Marcus Johnson",
    handle: "fitmarc",
    category: "Fitness",
    score: 58,
    tags: ["training", "nutrition"],
    live: false,
  },
  {
    name: "Aria Nakamura",
    handle: "ariapixel",
    category: "Digital Art",
    score: 84,
    tags: ["3d", "blender"],
    live: false,
  },
  {
    name: "DJ Koda",
    handle: "djkoda",
    category: "Music",
    score: 73,
    tags: ["edm", "mixes"],
    live: true,
  },
  {
    name: "Nova Streams",
    handle: "novastreams",
    category: "Gaming",
    score: 67,
    tags: ["retro", "speedrun"],
    live: false,
  },
];

const TRENDING_ITEMS = [
  { handle: "rileyplays", score: 92 },
  { handle: "ariapixel", score: 84 },
  { handle: "elenart", score: 78 },
  { handle: "djkoda", score: 73 },
  { handle: "teachsarah", score: 71 },
];

const TAG_CLOUD_ITEMS = [
  { tag: "illustration", count: 142 },
  { tag: "beats", count: 98 },
  { tag: "twitch", count: 87 },
  { tag: "web3", count: 76 },
  { tag: "3d", count: 65 },
  { tag: "lofi", count: 54 },
  { tag: "fps", count: 49 },
  { tag: "training", count: 38 },
  { tag: "procreate", count: 31 },
  { tag: "blender", count: 27 },
];

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Digital Art": "digital-art",
  Music: "music",
  Gaming: "gaming",
  Education: "education",
  Fitness: "fitness",
};

export default function ExploreCreators() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryToggle = (slug: string) => {
    if (slug === "all") {
      setSelectedCategories(["all"]);
      return;
    }
    setSelectedCategories((prev) => {
      const next = prev.filter((s) => s !== "all");
      return next.includes(slug)
        ? next.filter((s) => s !== slug)
        : [...next, slug];
    });
  };

  const filteredCreators = EXAMPLE_CREATORS.filter((c) => {
    const catMatch =
      selectedCategories.includes("all") ||
      selectedCategories.includes(CATEGORY_SLUG_MAP[c.category] ?? "");
    const tagMatch =
      selectedTags.length === 0 ||
      c.tags.some((t) => selectedTags.includes(t));
    return catMatch && tagMatch;
  });

  return (
    <section id="explore" className="relative w-full min-h-screen">
      <img
        src="/e.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-20 md:py-28">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[length:var(--fs-h1)] font-heading font-bold text-text-ds-primary">
              Explore{" "}
              <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
                Creators
              </span>
            </h2>
            <p className="mt-2 text-lg text-text-ds-tertiary font-body">
              Featured by category. Find your next favorite.
            </p>
          </div>
          <Button
            variant="link"
            href="/explore"
            className="hidden sm:inline-flex shrink-0"
          >
            Discover all
          </Button>
        </div>

        <div className="mb-6">
          <FilterChips
            categories={CATEGORIES}
            selected={selectedCategories}
            onToggle={handleCategoryToggle}
          />
        </div>

        <div className="mb-8">
          <TrendingNow items={TRENDING_ITEMS} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.handle}
              name={creator.name}
              handle={creator.handle}
              category={creator.category}
              score={creator.score}
              tags={creator.tags}
              live={creator.live}
              exists
              variant="enhanced"
            />
          ))}
        </div>

        <div className="mb-10">
          <TopTagsCloud
            items={TAG_CLOUD_ITEMS}
            selected={selectedTags}
            onToggle={(tag) =>
              setSelectedTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag)
                  : [...prev, tag],
              )
            }
          />
        </div>

        <div className="flex justify-center">
          <Button variant="secondary" href="/explore" className="gap-2">
            Explore all creators
          </Button>
        </div>
      </div>
    </section>
  );
}
