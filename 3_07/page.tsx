// frontend/src/app/[username]/creator-desktop/community/feed/page.tsx
// Route: /@:username/creator-desktop/community/feed
// Owner's own Feed dashboard — includes drafts, full pin/edit/delete
// controls on every card. The visitor-facing read-only feed (public
// profile) is a separate page reusing PostCard with isOwner={false}.

"use client";

import { Rss } from "lucide-react";
import { useMyFeed } from "@/lib/api/community/posts.queries";
import PostCreatorBar from "@/components/community/feed/PostCreatorBar";
import PostCard from "@/components/community/feed/PostCard";
import Skeleton from "@/components/ui/Skeleton";

export default function FeedPage() {
  const page = 1;
  const limit = 20;
  const feedQueryKey = ["feed", "mine", page, limit] as const;
  const { data, isLoading, isError } = useMyFeed(page, limit);
  const posts = data?.posts ?? [];

  return (
    <div className="pt-14 px-6 pb-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Rss size={18} className="text-gold-400" />
        <h1 className="text-xl font-heading font-bold text-white">
          Feed {data ? `(${data.total})` : ""}
        </h1>
      </div>

      <PostCreatorBar />

      <div className="mt-6 flex flex-col gap-4">
        {isLoading &&
          [0, 1, 2].map((i) => (
            <Skeleton key={i} variant="card" height={i === 1 ? "80px" : "140px"} />
          ))}

        {isError && (
          <p className="text-sm text-white/40">Could not load your feed.</p>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <div className="text-center py-16 text-white/40 text-sm">
            Your community is waiting for the first signal. Share something —
            a behind-the-scenes photo, a thought, an announcement.
          </div>
        )}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} isOwner feedQueryKey={feedQueryKey} />
        ))}
      </div>
    </div>
  );
}
