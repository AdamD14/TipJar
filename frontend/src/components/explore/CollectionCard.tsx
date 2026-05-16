import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";
import CreatorCard from "@/components/explore/CreatorCard";
import type { HandleEntry } from "@/data/collections";

export default function CollectionCard({
  title,
  description,
  handles,
}: {
  title: string;
  description?: string;
  handles: HandleEntry[];
}) {
  const first = handles.slice(0, 3);
  return (
    <Card>
    <div className="mb-3">
      <h3 className="text-lg font-heading font-semibold text-text-ds-primary">{title}</h3>
      {description && <p className="text-sm text-text-ds-secondary">{description}</p>}
    </div>
    {first.length === 0 ? (
      <p className="text-sm text-text-ds-secondary">No items in this collection.</p>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2">
        {first.map((h) => {
          const handle = typeof h === "string" ? h : h.handle;
          const score = typeof h === "string" ? undefined : h.score;
          const tags = typeof h === "string" ? undefined : h.tags;
          const avatarUrl = typeof h === "string" ? undefined : h.avatarUrl;
          const live = typeof h === "string" ? undefined : h.live;
          return (
            <CreatorCard
              key={handle}
              handle={handle}
              exists={true}
              score={score}
              tags={tags}
              avatarUrl={avatarUrl}
              live={live}
            />
          );
        })}
      </div>
    )}
    <div className="mt-4">
      <Button
        variant="secondary"
        href={`/discover?collection=${encodeURIComponent(title)}`}
      >
        View more
      </Button>
    </div>
    </Card>
  );
}
