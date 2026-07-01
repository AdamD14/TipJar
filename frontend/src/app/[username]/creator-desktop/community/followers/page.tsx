"use client";

import Image from "next/image";
import { UserCheck } from "lucide-react";
import { useFollowersList } from "@/lib/api/queries";
import { useAuthStore } from "@/lib/store/authStore";
import Spinner from "@/components/ui/Spinner";

/**
 * Thumbnail grid of the creator's followers. Route anticipated by
 * CreatorSidebar.tsx's nav config (community/followers).
 * Uses the logged-in creator's own id (this page only makes sense on
 * one's own creator-desktop) as the `followingId` for GET /follows/:id.
 */
export default function FollowersPage() {
  const user = useAuthStore((s) => s.user);
  const creatorId = user?.id;

  const { data, isLoading, isError } = useFollowersList(creatorId || "", 1, 50);
  const followers = data?.followers ?? [];

  return (
    <div className="pt-14 px-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <UserCheck size={18} className="text-gold-400" />
        <h1 className="text-xl font-heading font-bold text-white">
          Followers {data ? `(${data.total})` : ""}
        </h1>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="md" />
        </div>
      )}

      {isError && <p className="text-sm text-white/40">Could not load followers.</p>}

      {!isLoading && !isError && followers.length === 0 && (
        <div className="text-center py-16 text-white/40 text-sm">
          No followers yet. Share your profile to get your first one!
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {followers.map((f) => (
          <div
            key={f.id}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-teal-800/40 border border-white/[0.06] hover:border-gold-400/25 transition-colors"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400/20">
              <Image
                src={f.avatarUrl || "/logo.png"}
                alt={f.displayName}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <span className="text-xs font-heading font-bold text-white text-center truncate w-full">
              {f.displayName}
            </span>
            {f.username && (
              <span className="text-[10px] text-teal-400 truncate w-full text-center">
                @{f.username}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
