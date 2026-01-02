"use client";

import React, { useState, useEffect } from "react";
import {
  // Common
  Gamepad2,
  Video,
  Mic,
  Camera,
  Dumbbell,
  Utensils,
  Laptop,
  Plane,
  Sparkles,
  MoreHorizontal,
  Music2,
  Palette,
  // Specific
  Smile,
  Heart,
  Users,
  Zap,
  MessageCircle,
  GraduationCap,
  MessageSquare,
  Timer,
  Spade,
  Smartphone,
  TrendingUp,
  Trophy,
  Hammer,
  Shirt,
  ShoppingBag,
  Gem,
  Activity,
  Briefcase,
  Newspaper,
  Fingerprint,
  Apple,
  Target,
  PenTool,
  Monitor,
  Image,
  Aperture,
  Book,
  BookOpen,
  Code,
  Cpu,
  Rocket,
  Languages,
  Scissors,
  Package,
  Wrench,
  TreeDeciduous,
  Crosshair,
  Globe,
  Brain,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import clsx from "clsx";

// --- DATA & STRUCTURE ---

const MAIN_GROUPS = [
  {
    id: "youtubers",
    label: "Youtubers",
    theme: "yt",
    icon: Video,
    desc: "Long form content",
    items: [
      { id: "gaming_yt", label: "Gaming", icon: Gamepad2 },
      { id: "comedy", label: "Comedy / Prank", icon: Smile },
      { id: "vlog", label: "Vlog / Lifestyle", icon: Camera },
      { id: "beauty", label: "Beauty / Makeup", icon: Heart },
      { id: "family", label: "Family / Parenting", icon: Users },
      { id: "motivation_yt", label: "Motivation", icon: Zap },
      { id: "tech", label: "Tech / Reviews", icon: Laptop },
      { id: "food", label: "Food / Mukbang", icon: Utensils },
      { id: "reactions", label: "Reactions", icon: MessageCircle },
      { id: "edu", label: "Education", icon: GraduationCap },
    ],
  },
  {
    id: "streaming",
    label: "Streaming",
    theme: "twitch",
    icon: Gamepad2,
    desc: "Live entertainment",
    items: [
      { id: "esport", label: "Gaming / E-sport", icon: Trophy },
      { id: "justchatting", label: "Just Chatting / IRL", icon: MessageSquare },
      { id: "music_live", label: "Music / DJ", icon: Music2 },
      { id: "speedrun", label: "Speedrun", icon: Timer },
      { id: "models", label: "Digital Models", icon: Camera },
      { id: "gambling", label: "Poker / Slots", icon: Spade },
    ],
  },
  {
    id: "shortform",
    label: "Short Form",
    theme: "tiktok",
    icon: Smartphone,
    desc: "Reels, TikTok, Shorts",
    items: [
      { id: "trends", label: "Trends / Viral", icon: TrendingUp },
      { id: "fitness_short", label: "Fitness", icon: Dumbbell },
      { id: "tips", label: "Quick Tips", icon: Zap },
      { id: "challenges", label: "Challenges", icon: Trophy },
      { id: "diy", label: "DIY / Hacks", icon: Hammer },
      { id: "beauty_short", label: "Beauty / Make-up", icon: Heart },
      { id: "dance", label: "Dance", icon: Music2 },
      { id: "grwm", label: "GRWM", icon: Shirt },
    ],
  },
  {
    id: "podcast",
    label: "Podcast",
    theme: "podcast",
    icon: Mic,
    desc: "Audio & Video",
    items: [
      { id: "interviews", label: "Interviews", icon: MessageSquare },
      { id: "crime", label: "True Crime", icon: Fingerprint },
      { id: "dating_pod", label: "Dating / Relationships", icon: Heart },
      { id: "biz_pod", label: "Business", icon: Briefcase },
      { id: "politics", label: "Politics / News", icon: Newspaper },
    ],
  },
  {
    id: "coach",
    label: "Coach / Mentor",
    theme: "coach",
    icon: Target,
    desc: "Growth & Finance",
    items: [
      { id: "fit_coach", label: "Fitness / Sport", icon: Dumbbell },
      { id: "finance", label: "Finance / Crypto", icon: TrendingUp },
      { id: "life_coach", label: "Life / Motivation", icon: Zap },
      { id: "entrep", label: "Entrepreneurship", icon: Briefcase },
      { id: "health", label: "Health / Diet", icon: Apple },
      { id: "dating_coach", label: "Dating / PUA", icon: Heart },
    ],
  },
  {
    id: "influencer",
    label: "Influencer",
    theme: "influencer",
    icon: Sparkles,
    desc: "Lifestyle & Fame",
    items: [
      { id: "fashion", label: "Fashion", icon: ShoppingBag },
      { id: "travel", label: "Travel", icon: Plane },
      { id: "luxury", label: "Luxury Lifestyle", icon: Gem },
      { id: "modeling", label: "Modeling", icon: Camera },
      { id: "bodypos", label: "Body Positive", icon: Activity },
    ],
  },
];

const NICHE_GROUPS = [
  {
    id: "art",
    label: "Arts",
    theme: "art",
    icon: Palette,
    desc: "Creative & Visual", // DODANO
    items: [
      { id: "painting", label: "Painting", icon: PenTool },
      { id: "digital", label: "Digital Art", icon: Monitor },
      { id: "graphic", label: "Graphic Design", icon: Image },
      { id: "photo", label: "Photography", icon: Aperture },
      { id: "dance_art", label: "Artistic Dance", icon: Music2 },
      { id: "writer", label: "Writing", icon: Book },
      { id: "sculpt", label: "Sculpture", icon: Hammer },
    ],
  },
  {
    id: "science",
    label: "Science",
    theme: "science",
    icon: Brain,
    desc: "Knowledge & Tech", // DODANO
    items: [
      { id: "coding", label: "Coding / Dev", icon: Code },
      { id: "ai", label: "AI / Math", icon: Cpu },
      { id: "space", label: "Space / Physics", icon: Rocket },
      { id: "lang", label: "Languages", icon: Languages },
      { id: "history", label: "History", icon: BookOpen },
    ],
  },
  {
    id: "homemade",
    label: "Handmade / Craft",
    theme: "homemade",
    icon: Scissors,
    desc: "DIY & Creation", // DODANO
    items: [
      { id: "sewing", label: "Tailoring", icon: Shirt },
      { id: "knives", label: "Blacksmithing", icon: Hammer },
      { id: "pottery", label: "Pottery", icon: Package },
      { id: "hats", label: "Accessories", icon: Sparkles },
    ],
  },
  {
    id: "build",
    label: "Survival / Build",
    theme: "build",
    icon: Wrench,
    desc: "Construction & Nature", // DODANO
    items: [
      { id: "construction", label: "Construction", icon: Hammer },
      { id: "bushcraft", label: "Bushcraft", icon: TreeDeciduous },
      { id: "survival", label: "Survival", icon: Crosshair },
      { id: "weapons", label: "Militaria", icon: Target },
      { id: "eco", label: "Eco / Farming", icon: Globe },
    ],
  },
  {
    id: "other",
    label: "Other",
    theme: "other",
    icon: MoreHorizontal,
    desc: "Define yourself", // DODANO
    items: [],
  },
];

// --- STYLING CONFIGURATION ---

const THEMES: Record<string, { glow: string; border: string; accent: string }> =
  {
    yt: {
      glow: "shadow-[0_0_20px_-5px_rgba(255,0,0,0.4)]",
      border: "border-red-500/30",
      accent: "text-red-500",
    },
    twitch: {
      glow: "shadow-[0_0_20px_-5px_rgba(145,70,255,0.4)]",
      border: "border-[#9146FF]/30",
      accent: "text-[#9146FF]",
    },
    tiktok: {
      glow: "shadow-[0_0_20px_-5px_rgba(255,0,80,0.4)]",
      border: "border-pink-500/30",
      accent: "text-pink-400",
    },
    podcast: {
      glow: "shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]",
      border: "border-blue-500/30",
      accent: "text-blue-400",
    },
    coach: {
      glow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]",
      border: "border-emerald-500/30",
      accent: "text-emerald-400",
    },
    influencer: {
      glow: "shadow-[0_0_20px_-5px_rgba(244,63,94,0.4)]",
      border: "border-rose-400/30",
      accent: "text-rose-400",
    },
    art: {
      glow: "shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]",
      border: "border-indigo-500/30",
      accent: "text-indigo-400",
    },
    science: {
      glow: "shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]",
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
    },
    homemade: {
      glow: "shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)]",
      border: "border-amber-500/30",
      accent: "text-amber-400",
    },
    build: {
      glow: "shadow-[0_0_15px_-5px_rgba(168,162,158,0.3)]",
      border: "border-stone-500/30",
      accent: "text-stone-400",
    },
    other: {
      glow: "shadow-[0_0_15px_-5px_rgba(255,255,255,0.15)]",
      border: "border-gray-500/30",
      accent: "text-gray-400",
    },
  };
// Mapping from archetype (Step 1) to relevant item IDs (not group IDs)
const ARCHETYPE_TO_ITEMS: Record<string, string[]> = {
  "live-streamer": [
    // Streaming
    "esport",
    "justchatting",
    "music_live",
    "speedrun",
    "models",
    "gambling",
    // Youtubers (live versions)
    "gaming_yt",
    "reactions",
    "comedy",
  ],
  "lifestyle-storyteller": [
    // Youtubers
    "vlog",
    "beauty",
    "family",
    "food",
    // Podcast
    "interviews",
    "dating_pod",
    // Influencer
    "fashion",
    "travel",
    "luxury",
    "bodypos",
    // Short Form
    "grwm",
    "beauty_short",
    // Streaming
    "justchatting",
  ],
  "visual-creator": [
    // Youtubers
    "beauty",
    "food",
    "tech",
    // Streaming
    "models",
    "music_live",
    // Arts
    "painting",
    "digital",
    "graphic",
    "photo",
    "dance_art",
    "sculpt",
    // Influencer
    "fashion",
    "travel",
    "modeling",
    // Short Form
    "beauty_short",
    "dance",
    "grwm",
    "diy",
    // Handmade
    "sewing",
    "knives",
    "pottery",
    "hats",
    // Survival/Build
    "construction",
    "bushcraft",
    "survival",
    "weapons",
    "eco",
  ],
  "knowledge-architect": [
    // Youtubers
    "edu",
    "tech",
    // Podcast
    "crime",
    "biz_pod",
    "politics",
    // Coach
    "finance",
    "entrep",
    // Science
    "coding",
    "ai",
    "space",
    "lang",
    "history",
    // Arts
    "graphic",
    "writer",
    // Handmade
    "sewing",
    "knives",
    "pottery",
    // Survival/Build
    "construction",
    "bushcraft",
    "survival",
    "weapons",
    "eco",
    // Short Form
    "tips",
    "diy",
  ],
  "micro-entertainer": [
    // Short Form
    "trends",
    "challenges",
    "dance",
    "diy",
    "tips",
    "fitness_short",
    // Youtubers
    "comedy",
    "gaming_yt",
    "reactions",
  ],
  "health-coach": [
    // Youtubers
    "motivation_yt",
    // Coach
    "fit_coach",
    "finance",
    "life_coach",
    "entrep",
    "health",
    "dating_coach",
    // Podcast
    "dating_pod",
    // Influencer
    "bodypos",
    // Short Form
    "fitness_short",
  ],
};

interface IndustrySelectorProps {
  value: string[];
  onSelectAction: (value: string[]) => void;
  error?: boolean;
  filterByArchetype?: string; // Filter groups by archetype from Step 1
}

export default function IndustrySelector({
  value,
  onSelectAction,
  error,
  filterByArchetype,
}: IndustrySelectorProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [showNiche, setShowNiche] = useState(false);

  // Get allowed item IDs based on archetype
  const allowedItems = filterByArchetype
    ? ARCHETYPE_TO_ITEMS[filterByArchetype]
    : null;

  // Helper to filter items within a group
  const filterGroupItems = (group: (typeof MAIN_GROUPS)[0]) => {
    if (!allowedItems) return group;
    const filteredItems = group.items.filter((item) =>
      allowedItems.includes(item.id)
    );
    return { ...group, items: filteredItems };
  };

  // Filter groups - only show groups that have at least one allowed item
  const filteredMainGroups = allowedItems
    ? MAIN_GROUPS.map(filterGroupItems).filter((g) => g.items.length > 0)
    : MAIN_GROUPS;

  const filteredNicheGroups = allowedItems
    ? NICHE_GROUPS.map(filterGroupItems).filter(
        (g) => g.items.length > 0 || g.id === "other"
      )
    : NICHE_GROUPS;

  useEffect(() => {
    if (value.length > 0) {
      const allGroups = [...MAIN_GROUPS, ...NICHE_GROUPS];
      const foundGroup = allGroups.find(
        (g) =>
          value.includes(g.label) ||
          g.items.some((item) => value.includes(item.label))
      );
      if (foundGroup) {
        setExpandedGroup(foundGroup.id);
        if (NICHE_GROUPS.some((g) => g.id === foundGroup.id)) {
          setShowNiche(true);
        }
      }
    }
  }, []); // Run only on mount to prevent jumping around

  const handleSelect = (label: string) => {
    if (value.includes(label)) {
      // Deselect
      onSelectAction(value.filter((v) => v !== label));
    } else {
      // Select (limit to 3 is handled here or parent, keeping UI strict)
      if (value.length < 3) {
        onSelectAction([...value, label]);
      }
    }
  };

  const renderGroup = (group: (typeof MAIN_GROUPS)[0]) => {
    const theme = THEMES[group.theme] || THEMES.other;
    const isMainSelected = value.includes(group.label);
    const Icon = group.icon;
    const isExpanded = expandedGroup === group.id;

    return (
      <div key={group.id} className="flex flex-col gap-2 h-full">
        {/* --- MAIN CARD --- */}
        <button
          type="button"
          onClick={() => {
            handleSelect(group.label);
            setExpandedGroup((prev) => (prev === group.id ? null : group.id));
          }}
          className={clsx(
            "relative w-full p-2 md:p-3 rounded-2xl text-left transition-all duration-300 overflow-hidden group border bg-black/40 backdrop-blur-sm flex items-center gap-3",
            theme.border,
            theme.glow,
            isMainSelected
              ? "ring-1 ring-white/50 bg-white/5"
              : "hover:bg-white/5 hover:border-white/30"
          )}
        >
          {/* Ikona lewo */}
          <div
            className={clsx(
              "p-2 rounded-xl transition-colors bg-white/5 shrink-0",
              isMainSelected
                ? theme.accent
                : "text-gray-400 group-hover:text-white"
            )}
          >
            <Icon size={24} strokeWidth={1.5} />
          </div>

          {/* Tekst prawo */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <h3
              className={clsx(
                "text-lg md:text-xl font-bold tracking-tight transition-colors truncate",
                isMainSelected
                  ? "text-white"
                  : "text-gray-200 group-hover:text-white"
              )}
            >
              {group.label}
            </h3>
            {group.desc && (
              <p className="text-gray-500 text-[10px] md:text-xs font-medium truncate group-hover:text-gray-400 transition-colors">
                {group.desc}
              </p>
            )}
          </div>

          {/* Znacznik wyboru */}
          {isMainSelected && (
            <div
              className={clsx(
                "w-2 h-2 rounded-full shrink-0 mr-1",
                theme.accent,
                "shadow-[0_0_8px_currentColor] bg-current"
              )}
            />
          )}
        </button>

        {/* --- SUB-ITEMS --- */}
        <div
          className={clsx(
            "gap-2",
            isExpanded ? "grid grid-cols-2" : "hidden md:grid md:grid-cols-2"
          )}
        >
          {group.items.map((item) => {
            const isSubSelected = value.includes(item.label);
            const SubIcon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.label)}
                className={clsx(
                  "flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 text-center gap-1 min-h-[70px]",
                  isSubSelected
                    ? `bg-white/10 ${theme.border} ring-1 ring-inset ring-white/20`
                    : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20"
                )}
              >
                <SubIcon
                  size={16}
                  className={isSubSelected ? theme.accent : "text-gray-500"}
                />
                <span
                  className={clsx(
                    "text-xs font-medium leading-tight",
                    isSubSelected ? "text-gray-100" : "text-gray-500"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* --- MAIN GRID (6 cols) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {filteredMainGroups.map(renderGroup)}
      </div>

      {/* --- MORE BUTTON --- */}
      <div className="relative py-4 flex items-center justify-center">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full absolute" />
        <button
          type="button"
          onClick={() => setShowNiche(!showNiche)}
          className="relative z-10 bg-[#0a0a0a] px-5 py-1.5 flex items-center gap-2 text-xs md:text-sm text-gray-400 hover:text-white hover:border-white/20 uppercase tracking-widest font-bold border border-white/5 rounded-full transition-all cursor-pointer"
        >
          More / Niche / Values
          {showNiche ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* --- NICHE GRID --- */}
      {showNiche && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          {filteredNicheGroups.map((group) => {
            if (group.id === "other") {
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleSelect("Other")}
                  className={clsx(
                    "col-span-1 h-full min-h-[80px] border border-dashed border-white/10 rounded-2xl flex flex-row items-center justify-start p-3 gap-3 hover:border-white/30 transition-colors group bg-black/20",
                    value.includes("Other") &&
                      "border-amber-500/50 bg-amber-500/5"
                  )}
                >
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                    <MoreHorizontal
                      size={20}
                      className="text-gray-500 group-hover:text-white"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block text-base font-bold text-gray-300 mb-0 group-hover:text-white">
                      Other
                    </span>
                    <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                      Define yourself
                    </span>
                  </div>
                </button>
              );
            }
            return renderGroup(group);
          })}
        </div>
      )}
    </div>
  );
}
