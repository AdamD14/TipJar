import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CreatorCard from "@/components/explore/discover/CreatorCard";
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
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {first.length === 0 ? (
        <p className="text-sm text-muted">Brak elementów w tej kolekcji.</p>
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
        <a
          href={`/discover?collection=${encodeURIComponent(title)}`}
          className="font-ui"
        >
          <Button variant="secondary">Zobacz więcej</Button>
        </a>
      </div>
    </Card>
  );
}
