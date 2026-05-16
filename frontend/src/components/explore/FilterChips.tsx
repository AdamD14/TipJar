"use client";

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
          <button
            key={c.slug}
            type="button"
            onClick={() => onToggle(c.slug)}
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${
              active
                ? "border-gold-400 bg-gold-400/20 text-gold-400"
                : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
            aria-pressed={active}
          >
            {c.title}
          </button>
        );
      })}
    </div>
  );
}
