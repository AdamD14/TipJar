"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { 
  Users, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  MinusCircle, 
  ChevronRight,
  Clock
} from "lucide-react";
import Link from "next/link";

const MOCK_FOLLOWING = [
  {
    username: "kate_premium",
    displayName: "Kate | Exclusive VIP 🍑",
    category: "Exclusive & Aesthetic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    lastPost: "2 hours ago",
    subscriptionStatus: "Active",
    tier: "Gold VIP ($15/mo)"
  },
  {
    username: "coach_max",
    displayName: "Coach Max 💪",
    category: "Fitness & Gym",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    lastPost: "1 day ago",
    subscriptionStatus: "Active",
    tier: "Workout Access ($5/mo)"
  },
  {
    username: "talk_space",
    displayName: "TalkSpace Podcast 🎙️",
    category: "Streams & Talk",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    lastPost: "3 days ago",
    subscriptionStatus: "Active",
    tier: "Sponsor tier ($3/mo)"
  }
];

export default function FanFollowingPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const decodedUsername = decodeURIComponent(username);
  const cleanUsername = decodedUsername.startsWith("@")
    ? decodedUsername.slice(1)
    : decodedUsername;

  const [followingList, setFollowingList] = useState(MOCK_FOLLOWING);
  const [unfollowedMsg, setUnfollowedMsg] = useState<string | null>(null);

  const handleUnfollow = (usernameToUnfollow: string, displayName: string) => {
    setFollowingList(prev => prev.filter(c => c.username !== usernameToUnfollow));
    setUnfollowedMsg(`Successfully unfollowed @${usernameToUnfollow} (${displayName}) 💔`);
    setTimeout(() => setUnfollowedMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Users className="text-teal-400" />
              Your Subscriptions
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-xl">
              Manage your premium tier memberships and creators you support on TipJar+.
            </p>
          </div>

          <div className="text-xs text-teal-400/60 font-semibold uppercase tracking-wider">
            Supporting {followingList.length} creator{followingList.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Unfollowed Toast */}
        {unfollowedMsg && (
          <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-2xl flex items-center gap-2.5 shadow-2xl animate-in fade-in duration-300">
            <span className="text-xs font-black uppercase tracking-wider">{unfollowedMsg}</span>
          </div>
        )}

        {/* Creator List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {followingList.map((creator) => (
            <Card
              key={creator.username}
              className="group border border-teal-500/10 bg-[#002424]/40 hover:border-teal-400/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Creator Header with Avatar & Details */}
                <div className="flex gap-4 items-start">
                  <img
                    src={creator.avatar}
                    alt={creator.displayName}
                    className="w-14 h-14 rounded-full border border-teal-400/20 object-cover"
                  />
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-white group-hover:text-teal-300 transition-colors">
                      {creator.displayName}
                    </h3>
                    <p className="text-xs text-teal-400 font-mono">@{creator.username}</p>
                    <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400">
                      {creator.category}
                    </span>
                  </div>
                </div>

                {/* Subscription Info */}
                <div className="mt-5 p-4 bg-black/40 border border-teal-500/10 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-teal-400/50 font-medium">Access Tier:</span>
                    <span className="text-white font-bold">{creator.tier}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-teal-400/50 font-medium flex items-center gap-1">
                      <Clock size={12} />
                      Last Post:
                    </span>
                    <span className="text-teal-200 font-medium text-xs">{creator.lastPost}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-teal-500/5 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleUnfollow(creator.username, creator.displayName)}
                  className="px-3.5 py-2 text-[10px] font-black uppercase tracking-widest bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <MinusCircle size={12} />
                  Cancel
                </button>

                <Link
                  href={`/creator/${creator.username}`}
                  className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-teal-500 text-teal-950 hover:bg-teal-400 rounded-xl transition-all flex items-center gap-1.5"
                >
                  Visit Studio
                  <ChevronRight size={12} />
                </Link>
              </div>
            </Card>
          ))}

          {followingList.length === 0 && (
            <div className="col-span-full py-16 text-center bg-[#002424]/20 border border-dashed border-teal-500/15 rounded-3xl">
              <span className="text-4xl">👥</span>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mt-4">Not supporting any creators</h3>
              <p className="text-xs text-teal-400/50 mt-1 max-w-sm mx-auto">
                Explore creators of your interest and unlock exclusive benefits by subscribing to their tiers!
              </p>
              <Link
                href={`/@${cleanUsername}/fan-desktop/explore`}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-teal-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
              >
                <Sparkles size={14} />
                Discover Creators
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
