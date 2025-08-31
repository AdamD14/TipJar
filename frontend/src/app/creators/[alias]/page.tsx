"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import TipLauncher from "@/components/TipLauncher";
import { useCreator } from "@/hooks/useCreator";
import { useQuery } from "@tanstack/react-query";
import { getCreatorTips } from "@/lib/tips";
import { track } from "@/lib/analytics";

export default function CreatorProfilePage() {
  const { alias } = useParams<{ alias: string }>();

  const {
    data: creator,
    isLoading: creatorLoading,
    error: creatorError,
  } = useCreator(alias);

  const {
    data: tips,
    isLoading: tipsLoading,
    error: tipsError,
  } = useQuery({
    queryKey: ["tips", alias],
    queryFn: () => getCreatorTips(alias),
    enabled: !!alias,
  });

  useEffect(() => {
    if (alias) track("view_profile", { alias });
  }, [alias]);

  if (creatorLoading || tipsLoading) {
    return <LoadingSkeleton />;
  }

  if (creatorError || tipsError || !creator) {
    return <ErrorState message="Profile not found" />;
  }

  return (
    <main className="min-h-screen bg-[#001F1F] p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <img
            src={creator.avatarUrl || "/placeholder_light_gray_block.png"}
            alt={creator.displayName || alias}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{creator.displayName || alias}</h1>
            <p className="text-teal-400">@{creator.username || alias}</p>
          </div>
        </div>
        {creator.profile?.bio && (
          <p className="mt-4 text-white/80">{creator.profile.bio}</p>
        )}
        <div className="mt-6">
          <TipLauncher username={alias} />
        </div>
        {Array.isArray(tips) && tips.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Recent tips</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {tips.map((t: any, i: number) => (
                <li key={i}>{t.amount} USDC</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
