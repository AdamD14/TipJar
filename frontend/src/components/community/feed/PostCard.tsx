// frontend/src/components/community/feed/PostCard.tsx
// One component, four visual treatments by post.type. Context menu
// (pin/edit/delete) only renders when `isOwner` is true — the public
// feed passes isOwner={false}.

"use client";

import { useState } from "react";
import Image from "next/image";
import { Megaphone, Zap, MoreVertical, Pin } from "lucide-react";
import type { Post } from "@/lib/api/community/posts.contracts";
import { useDeletePost, useTogglePin } from "@/lib/api/community/posts.queries";
import ReactionBar from "./ReactionBar";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function PostCard({
  post,
  isOwner,
  feedQueryKey,
}: {
  post: Post;
  isOwner: boolean;
  feedQueryKey: readonly unknown[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const deletePost = useDeletePost();
  const togglePin = useTogglePin();

  const isAnnouncement = post.type === "ANNOUNCEMENT";
  const isUpdate = post.type === "UPDATE";
  const isMedia = post.type === "MEDIA" && post.mediaUrls.length > 0;

  return (
    <div
      className={[
        "relative rounded-xl border p-4 transition-colors",
        isAnnouncement
          ? "border-gold-400/50 bg-gold-400/[0.04]"
          : post.isPinned
            ? "border-violet-400/30 bg-violet-400/[0.04]"
            : "border-white/[0.06] bg-teal-800/40",
        isUpdate ? "py-3" : "py-4",
      ].join(" ")}
    >
      {post.isPinned && (
        <div className="mb-2 flex items-center gap-1.5 text-[11px] text-violet-300">
          <Pin className="h-3 w-3" />
          Pinned
        </div>
      )}

      {isAnnouncement && (
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gold-400">
          <Megaphone className="h-4 w-4" />
          Announcement
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {isUpdate && <Zap className="h-3.5 w-3.5 text-teal-400 shrink-0" />}
          <span className="text-[11px] text-text-ds-tertiary">
            {timeAgo(post.createdAt)}
          </span>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              type="button"
              aria-label="Post options"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-md p-1 text-text-ds-tertiary hover:bg-white/10"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-7 z-10 w-40 rounded-lg border border-white/10 bg-teal-900 py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    togglePin.mutate(post.id);
                    setMenuOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-xs text-text-ds-primary hover:bg-white/5"
                >
                  {post.isPinned ? "Unpin" : "Pin to top"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Delete this post? This cannot be undone.")) {
                      deletePost.mutate(post.id);
                    }
                    setMenuOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-xs text-rose-400 hover:bg-white/5"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p
        className={[
          "whitespace-pre-wrap text-text-ds-primary",
          isUpdate ? "mt-1 text-sm" : "mt-2 text-sm leading-relaxed",
        ].join(" ")}
      >
        {post.content}
      </p>

      {isMedia && (
        <div
          className={[
            "mt-3 grid gap-1.5 overflow-hidden rounded-lg",
            post.mediaUrls.length === 1 ? "grid-cols-1" : "grid-cols-2",
          ].join(" ")}
        >
          {post.mediaUrls.slice(0, 4).map((url, i) => (
            <div key={url} className="relative aspect-square bg-teal-950">
              <Image src={url} alt="" fill className="object-cover" sizes="240px" />
              {i === 3 && post.mediaUrls.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-semibold text-white">
                  +{post.mediaUrls.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!isAnnouncement && <ReactionBar post={post} feedQueryKey={feedQueryKey} />}
    </div>
  );
}
