"use client";

import Button from "@/components/ui/buttons/Button";

export default function FilterChips({
  categories,
  selected,
  onToggle,
}: {
  categories: Array<{ slug: string; title: string }>;
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const active = selected.includes(c.slug);
        return (
          <Button
            key={c.slug}
            variant={active ? "gold" : "ghost"}
            size="sm"
            onClick={() => onToggle(c.slug)}
            aria-pressed={active}
            className={active ? undefined : "border border-white/10 rounded-full"}
          >
            {c.title}
          </Button>
        );
      })}
    </div>
  );
}
