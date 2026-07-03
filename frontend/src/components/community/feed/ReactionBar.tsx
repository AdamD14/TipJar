// frontend/src/components/community/feed/ReactionBar.tsx
// Renders nothing for ANNOUNCEMENT posts — announcements are one-way
// broadcasts, not discussion topics (enforced again server-side in
// PostsService.addReaction, this is just the UI mirror of that rule).

"use client";

import { Heart, Flame, PartyPopper } from "lucide-react";
import type { Post, ReactionEmoji } from "@/lib/api/community/posts.contracts";
import { useToggleReaction } from "@/lib/api/community/posts.queries";

const REACTIONS: { emoji: ReactionEmoji; icon: typeof Heart; label: string }[] = [
  { emoji: "heart", icon: Heart, label: "Heart" },
  { emoji: "fire", icon: Flame, label: "Fire" },
  { emoji: "clap", icon: PartyPopper, label: "Clap" },
];

export default function ReactionBar({
  post,
  feedQueryKey,
}: {
  post: Post;
  feedQueryKey: readonly unknown[];
}) {
  const toggleReaction = useToggleReaction(feedQueryKey);

  if (post.type === "ANNOUNCEMENT") return null;

  return (
    <div className="flex items-center gap-3 pt-2">
      {REACTIONS.map(({ emoji, icon: Icon, label }) => {
        const isActive = post.reactionCounts.viewerReacted.includes(emoji);
        const count = post.reactionCounts[emoji];

        return (
          <button
            key={emoji}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            onClick={() =>
              toggleReaction.mutate({ postId: post.id, emoji, isActive })
            }
            className={[
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors",
              isActive
                ? "bg-gold-400/20 text-gold-400 border border-gold-400/40"
                : "bg-white/5 text-text-ds-tertiary border border-white/10 hover:bg-white/10",
            ].join(" ")}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="tabular-nums">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
