"use client";

import React from "react";
import clsx from "clsx";
import {
  Gamepad2,
  Video,
  Mic,
  Camera,
  Dumbbell,
  Utensils,
  Laptop,
  Plane,
  Sparkles,
  Music2,
  Palette,
  Smile,
  Heart,
  Users,
  Zap,
  MessageCircle,
  GraduationCap,
  MessageSquare,
  Timer,
  Spade,
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
  Aperture,
  Book,
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
} from "lucide-react";

// Simple flat list of specializations per archetype
const ARCHETYPE_SPECIALIZATIONS: Record<
  string,
  { label: string; icon: React.ElementType }[]
> = {
  "live-streamer": [
    { label: "Streamer", icon: Video },
    { label: "Gaming / E-sport", icon: Gamepad2 },
    { label: "Just Chatting / IRL", icon: MessageSquare },
    { label: "Music / DJ", icon: Music2 },
    { label: "Speedrun", icon: Timer },
    { label: "Digital Models", icon: Camera },
    { label: "Poker / Slots", icon: Spade },
    { label: "Reactions", icon: MessageCircle },
    { label: "Comedy / Prank", icon: Smile },
  ],
  "lifestyle-storyteller": [
    { label: "Youtubers", icon: Video },
    { label: "Vlog / Lifestyle", icon: Camera },
    { label: "Podcast", icon: Mic },
    { label: "Interviews", icon: MessageSquare },
    { label: "Beauty / Make-up", icon: Heart },
    { label: "Body Positive", icon: Activity },
    { label: "Family / Parenting", icon: Users },
    { label: "Food / Mukbang", icon: Utensils },
    { label: "Dating / Relationships", icon: Heart },
    { label: "Just Chatting / IRL", icon: MessageSquare },
    { label: "GRWM", icon: Shirt },
    { label: "Travel", icon: Plane },
    { label: "Luxury Lifestyle", icon: Gem },
  ],
  "visual-creator": [
    { label: "Influencer", icon: Sparkles },
    { label: "Beauty / Makeup", icon: Heart },
    { label: "Food / Mukbang", icon: Utensils },
    { label: "Tech / Reviews", icon: Laptop },
    { label: "Digital Models", icon: Camera },
    { label: "Artistic Dance", icon: Music2 },
    { label: "Fashion", icon: ShoppingBag },
    { label: "Modeling", icon: Camera },
    { label: "Dance", icon: Music2 },
  ],
  "knowledge-architect": [
    { label: "Education", icon: GraduationCap },
    { label: "Tech / Reviews", icon: Laptop },
    { label: "Podcast", icon: Mic },
    { label: "True Crime", icon: Fingerprint },
    { label: "Business", icon: Briefcase },
    { label: "Politics / News", icon: Newspaper },
    { label: "Finance / Crypto", icon: TrendingUp },
    { label: "Science", icon: Cpu },
    { label: "Coding / Dev", icon: Code },
    { label: "AI / Math", icon: Cpu },
    { label: "Space / Physics", icon: Rocket },
    { label: "Languages", icon: Languages },
    { label: "History", icon: Book },
    { label: "Graphic Design", icon: PenTool },
    { label: "Writing", icon: Book },
    { label: "Handmade / Craft", icon: Scissors },
    { label: "Tailoring", icon: Shirt },
    { label: "Blacksmithing", icon: Hammer },
    { label: "Pottery", icon: Package },
    { label: "Survival / Build", icon: Wrench },
    { label: "Construction", icon: Hammer },
    { label: "Bushcraft", icon: TreeDeciduous },
    { label: "Survival", icon: Crosshair },
    { label: "Militaria", icon: Target },
    { label: "Eco / Farming", icon: Globe },
    { label: "Quick Tips", icon: Zap },
    { label: "DIY / Hacks", icon: Hammer },
  ],
  "micro-entertainer": [
    { label: "Short Form", icon: Video },
    { label: "Comedy / Prank", icon: Smile },
    { label: "Gaming", icon: Gamepad2 },
    { label: "Reactions", icon: MessageCircle },
    { label: "Trends / Viral", icon: TrendingUp },
    { label: "Challenges", icon: Trophy },
    { label: "Fitness", icon: Dumbbell },
    { label: "Quick Tips", icon: Zap },
    { label: "Dance", icon: Music2 },
    { label: "DIY / Hacks", icon: Hammer },
  ],
  "health-coach": [
    { label: "Motivation", icon: Zap },
    { label: "Coach / Mentor", icon: Target },
    { label: "Fitness / Sport", icon: Dumbbell },
    { label: "Finance / Crypto", icon: TrendingUp },
    { label: "Life / Motivation", icon: Zap },
    { label: "Entrepreneurship", icon: Briefcase },
    { label: "Health / Diet", icon: Apple },
    { label: "Dating / PUA", icon: Heart },
    { label: "Dating / Relationships", icon: Heart },
    { label: "Body Positive", icon: Activity },
    { label: "Fitness", icon: Dumbbell },
  ],
};

interface SpecializationPickerProps {
  archetype: string;
  value: string[];
  onSelect: (value: string[]) => void;
  maxSelections?: number;
}

export default function SpecializationPicker({
  archetype,
  value,
  onSelect,
  maxSelections = 3,
}: SpecializationPickerProps) {
  const specializations = ARCHETYPE_SPECIALIZATIONS[archetype] || [];

  const handleClick = (label: string) => {
    if (value.includes(label)) {
      onSelect(value.filter((v) => v !== label));
    } else if (value.length < maxSelections) {
      onSelect([...value, label]);
    }
  };

  if (specializations.length === 0) {
    return (
      <p className="text-gray-500">
        No specializations available for this archetype.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {specializations.map((spec) => {
        const Icon = spec.icon;
        const isSelected = value.includes(spec.label);

        return (
          <button
            key={spec.label}
            type="button"
            onClick={() => handleClick(spec.label)}
            className={clsx(
              "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
              isSelected
                ? "bg-teal-500/20 border-teal-500/50 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
            )}
          >
            <Icon
              size={20}
              className={isSelected ? "text-teal-400" : "text-gray-500"}
            />
            <span className="text-sm font-medium truncate">{spec.label}</span>
          </button>
        );
      })}
    </div>
  );
}
