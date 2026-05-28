"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";
import { 
  Search, 
  Sparkles, 
  Compass, 
  Flame, 
  Heart, 
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";

const EXPLORE_CREATORS = [
  {
    username: "kate_premium",
    displayName: "Kate | Exclusive VIP 🍑",
    category: "Exclusive & Aesthetic",
    tags: ["OnlyFans", "Private Chat", "1-on-1"],
    bio: "Uncensored behind-the-scenes, premium photoshoots, and direct messaging.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    followers: "124K",
    likes: "45.2K",
    isHot: true
  },
  {
    username: "coach_max",
    displayName: "Coach Max 💪",
    category: "Fitness & Gym",
    tags: ["Workout Plans", "Dieting", "Personal Coaching"],
    bio: "Transform your body with customized daily workout routines & meal plans.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    followers: "48K",
    likes: "12.8K",
    isHot: false
  },
  {
    username: "talk_space",
    displayName: "TalkSpace Podcast 🎙️",
    category: "Streams & Talk",
    tags: ["Live Podcasts", "IRL", "eSports"],
    bio: "Interactive live podcasts on tech, esports, and random daily dramas.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    followers: "89K",
    likes: "32.1K",
    isHot: true
  },
  {
    username: "alex_beats",
    displayName: "Alex Beats 🎵",
    category: "Music & Beats",
    tags: ["Lofi", "EDM", "Free Samples"],
    bio: "Chilled lo-fi beats, synthwave melodies, and customized royalty-free tracks.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    followers: "31K",
    likes: "8.4K",
    isHot: false
  }
];

export default function FanExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredCreators = EXPLORE_CREATORS.filter((c) => {
    const matchesSearch = c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || c.category.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Compass className="text-teal-400 animate-spin" style={{ animationDuration: "10s" }} />
              Discover Creators
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-xl">
              Search and filter through the top-tier creators on TipJar. Instant, zero-gas support using stablecoins.
            </p>
          </div>

          {/* Luxury Search & Filter Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-md">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-500/60">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, handle, bio..."
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-teal-500/10 focus:border-teal-400 rounded-xl focus:outline-none placeholder-teal-800/40 text-white text-xs transition-all shadow-inner"
              />
            </div>
            <button className="px-4 py-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:text-white hover:bg-teal-500/20 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-xs font-black uppercase tracking-wider">
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["All", "Exclusive", "Fitness", "Streams", "Music"].map((tag) => {
            const isSelected = selectedTag === tag || (tag === "All" && selectedTag === "All");
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === "All" ? "All" : tag)}
                className={`
                  px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shrink-0
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-400 text-teal-950 shadow-md shadow-teal-500/10"
                      : "bg-[#002424]/40 border-teal-500/10 text-teal-400/60 hover:border-teal-400/30 hover:text-white"
                  }
                `}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Explore Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCreators.map((creator) => (
            <Card
              key={creator.username}
              className="group border border-teal-500/10 bg-[#002424]/40 hover:border-teal-400/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hot creator tag */}
              {creator.isHot && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-2xl flex items-center gap-1">
                  <Flame size={10} className="animate-pulse" />
                  Trending
                </div>
              )}

              <div className="flex gap-4 items-start">
                <img
                  src={creator.avatar}
                  alt={creator.displayName}
                  className="w-16 h-16 rounded-2xl border border-teal-400/20 object-cover"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                      {creator.displayName}
                    </h3>
                  </div>
                  <p className="text-xs text-teal-400 font-mono">@{creator.username}</p>
                  <p className="text-xs text-teal-400/70 leading-relaxed pt-2">
                    {creator.bio}
                  </p>
                </div>
              </div>

              {/* Badges / Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {creator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-teal-500/5 border border-teal-500/10 text-[9px] font-bold text-teal-400 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Stat Row */}
              <div className="mt-6 pt-4 border-t border-teal-500/5 flex justify-between items-center text-[10px] text-teal-400/40">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} className="text-teal-500/60" />
                    {creator.followers} followers
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} className="text-pink-500/60" />
                    {creator.likes} likes
                  </span>
                </div>
                
                <button className="flex items-center gap-1.5 text-teal-400 hover:text-white font-black uppercase tracking-widest text-[9px] transition-colors">
                  Interact Profile <ArrowRight size={10} />
                </button>
              </div>
            </Card>
          ))}

          {filteredCreators.length === 0 && (
            <div className="col-span-full py-12 text-center bg-[#002424]/20 border border-dashed border-teal-500/15 rounded-3xl">
              <span className="text-3xl">🔍</span>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mt-3">No creators found</h3>
              <p className="text-xs text-teal-400/50 mt-1">Try searching for other tags, categories, or keywords.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
