import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { initials, gradientStyle } from "@/lib/avatar";
import { recordClick } from "@/lib/metrics";

type Props = {
  handle: string;
  exists: boolean;
  score?: number;
  tags?: string[];
  collections?: string[];
  avatarUrl?: string;
  live?: boolean;
};

export default function CreatorCard({
  handle,
  exists,
  score,
  tags,
  collections,
  avatarUrl,
  live,
}: Props) {
  const hasMeta = (tags && tags.length > 0) || typeof score === "number";
  const url = exists ? `/tip/${handle}` : "/register";

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="relative mr-2 h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={`Avatar of @${handle}`}
              src={avatarUrl}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="grid h-full w-full place-items-center text-sm font-semibold text-white/90"
              style={gradientStyle(handle)}
              aria-hidden="true"
            >
              {initials(handle)}
            </div>
          )}
          {live && (
            <span
              title="LIVE"
              className="absolute -right-1 -top-1 inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">Creator</p>
          <h3 className="truncate text-lg font-semibold text-white">@{handle}</h3>

          {hasMeta && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {typeof score === "number" && (
                <span
                  className="inline-flex items-center rounded-full border border-gold-400 bg-gold-400/20 px-2 py-0.5 text-[11px] font-semibold text-gold-400"
                  title="Trending score"
                >
                  ★ {Math.max(0, Math.min(100, Math.round(score)))}
                </span>
              )}
              {(tags ?? []).slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/80"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {collections && collections.length > 0 && (
            <p className="mt-1 truncate text-[11px] text-white/50">
              in: {collections.slice(0, 3).join(", ")}
              {collections.length > 3 ? "…" : ""}
            </p>
          )}
        </div>

        <a
          href={url}
          className="font-ui"
          aria-label={exists ? `Tip @${handle}` : `Claim handle @${handle}`}
          onClick={() => recordClick(handle, "creator-card")}
        >
          <Button>{exists ? "Tip now" : "Claim @handle"}</Button>
        </a>
      </div>
    </Card>
  );
}
