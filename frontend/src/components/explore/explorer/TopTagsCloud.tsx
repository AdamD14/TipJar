"use client";

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
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              active
                ? "border-[#FFD700] bg-[#FFD700]/20 text-[#FFD700]"
                : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
            title={`#${tag} • ${count}`}
          >
            #{tag} <span className="opacity-70">· {count}</span>
          </button>
        );
      })}
    </div>
  );
}
