"use client";

import Button from "@/components/ui/buttons/Button";

export default function TopTagsCloud({
  items,
  selected,
  onToggle,
}: {
  items: Array<{ tag: string; count: number }>;
  selected: string[];
  onToggle: (tag: string) => void;
}) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ tag, count }) => {
        const active = selected.includes(tag);
        return (
          <Button
            key={tag}
            variant={active ? "gold" : "ghost"}
            size="sm"
            onClick={() => onToggle(tag)}
            aria-pressed={active}
            className={active ? undefined : "border border-white/10 rounded-full"}
            title={`#${tag} • ${count}`}
          >
            #{tag} <span className="opacity-70">· {count}</span>
          </Button>
        );
      })}
    </div>
  );
}
