"use client";
import React from "react";
import clsx from "clsx";

// Definicje ikon i kolorów
export const SOCIAL_PLATFORMS = [
  // Video & Stream
  { id: "youtube", label: "YouTube", color: "#FF0000" },
  { id: "vimeo", label: "Vimeo", color: "#4AB7EA" },
  { id: "wattpad", label: "Wattpad", color: "#FF501A" },
  { id: "medium", label: "Medium", color: "#000001" },
  { id: "rumble", label: "Rumble", color: "#85C742" },
  { id: "substack", label: "Substack", color: "#FF6719" },

  // Social & Lifestyle
  { id: "facebook", label: "Facebook", color: "#1877F2" },
  { id: "instagram", label: "Instagram", color: "#E1306C" },
  { id: "tiktok", label: "TikTok", color: "#00F2EA" },
  { id: "snapchat", label: "Snapchat", color: "#FFFC00" },
  { id: "x", label: "X (Twitter)", color: "#FFFFFF" },
  { id: "threads", label: "Threads", color: "#000000" },

  // Streaming
  { id: "twitch", label: "Twitch", color: "#9146FF" },
  { id: "kick", label: "Kick", color: "#53FC18" },

  // Audio
  { id: "spotify", label: "Spotify", color: "#1DB954" },
  { id: "soundcloud", label: "SoundCloud", color: "#FF5500" },
  { id: "apple_podcasts", label: "Apple Podcasts", color: "#A259FF" },
  { id: "bandcamp", label: "Bandcamp", color: "#629AA9" },

  // Edu & Biz
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { id: "udemy", label: "Udemy", color: "#A435F0" },
  { id: "skillshare", label: "Skillshare", color: "#00FF84" },
  { id: "gumroad", label: "Gumroad", color: "#ff90e8" },

  // Monetization
  { id: "pinterest", label: "Pinterest", color: "#E60023" },
  { id: "onlyfans", label: "OnlyFans", color: "#00AFF0" },
  { id: "patreon", label: "Patreon", color: "#FF424D" },
  { id: "kofi", label: "Ko-fi", color: "#13C3FF" },
  { id: "buymeacoffee", label: "Buy Me a Coffee", color: "#FFDD00" },

  // Art
  { id: "etsy", label: "Etsy", color: "#F1641E" },
  { id: "behance", label: "Behance", color: "#1769FF" },
  { id: "artstation", label: "ArtStation", color: "#13AFF0" },
  { id: "dribbble", label: "Dribbble", color: "#EA4C89" },
  { id: "deviantart", label: "DeviantArt", color: "#05CC47" },

  // Tech
  { id: "github", label: "GitHub", color: "#181717" },
  { id: "stackoverflow", label: "Stack Overflow", color: "#F48024" },
  { id: "researchgate", label: "ResearchGate", color: "#00CCBB" },
  { id: "huggingface", label: "Hugging Face", color: "#FFD21E" },

  // Outdoor
  { id: "strava", label: "Strava", color: "#FC4C02" },
  { id: "alltrails", label: "AllTrails", color: "#428a13" },
  { id: "komoot", label: "Komoot", color: "#93BF33" },

  // Community
  { id: "telegram", label: "Telegram", color: "#26A5E4" },
  { id: "reddit", label: "Reddit", color: "#FF4500" },
  { id: "discord", label: "Discord", color: "#5865F2" },
  { id: "steam", label: "Steam", color: "#00ADEE" },
];

export const SocialIcon = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const baseClass = clsx("w-6 h-6", className);

  switch (id) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "twitch":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
        </svg>
      );
    case "kick":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M1.333 0h5.606v9.126l7.732-9.117h6.81l-8.736 9.827 9.922 14.164h-7.054l-6.529-10.088v10.088H1.333V0z" />
        </svg>
      );
    case "rumble":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M2.5 21.5c-.83 0-1.5-.67-1.5-1.5v-8c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v8c0 .83-.67 1.5-1.5 1.5h-3zm7.75 0c-.83 0-1.5-.67-1.5-1.5v-12c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5h-3zm7.75 0c-.83 0-1.5-.67-1.5-1.5v-16c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v16c0 .83-.67 1.5-1.5 1.5h-3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={baseClass}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.74-1.61.57-.96.56-2.1.56-3.17.03-4.66.01-9.33.01-14z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.852-2.433-4.587 0-3.775 2.748-7.253 7.951-7.253 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
        </svg>
      );
    case "threads":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M12.65 1.75c-5.78 0-10.4 4.54-10.4 10.25 0 5.75 4.88 10.25 10.87 10.25 2.8 0 5.25-1 7.15-2.76.3-.28.31-.77.01-1.04-.28-.27-.76-.25-1.04.03-1.6 1.5-3.66 2.27-6.07 2.27-4.66 0-8.5-3.67-8.5-8.75 0-5.22 3.86-8.75 8.7-8.75 4.86 0 7.9 3.52 7.9 8.35 0 2.22-.64 4.04-1.9 5.17-1.14 1.02-2.82 1.34-4.25.68-.6-.28-1.05-.73-1.32-1.32-.44.52-1 .9-1.66 1.06-.68.16-1.4.07-2.03-.24-1.38-.66-2.07-2.18-1.74-3.72.33-1.55 1.83-2.62 3.42-2.62.8 0 1.58.26 2.23.75V8.92c0-.42.33-.75.75-.75s.75.33.75.75v5.04c0 .03.01.06.02.08.77.26 1.39-.09 1.71-.38.74-.66 1.12-2.06 1.12-4.1 0-4.14-2.5-7.06-6.66-7.06zm-1.8 11.63c.43 0 .8-.2.98-.55V10.8c-.37-.3-.83-.46-1.3-.46-.86 0-1.67.63-1.84 1.45-.17.8.2 1.6.84 1.9.4.2.86.18 1.32-.3z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1588a18.2915 18.2915 0 00-5.4882 0 12.616 12.616 0 00-.6173-1.1588.077.077 0 00-.0785-.0371 19.7186 19.7186 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 20.03 20.03 0 005.9937 3.0337.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.1 13.1 0 00-4.883-1.5162.06.06 0 00-.0647.0251zm-4.3283 9.4882c-1.396 0-2.527-1.272-2.527-2.8277 0-1.5558 1.1093-2.8277 2.527-2.8277 1.4285 0 2.5484 1.2828 2.527 2.8277 0 1.5558-1.1202 2.8277-2.527 2.8277zm-6.015 0c-1.396 0-2.527-1.272-2.527-2.8277 0-1.5558 1.1093-2.8277 2.527-2.8277 1.4285 0 2.5484 1.2828 2.527 2.8277 0 1.5558-1.1202 2.8277-2.527 2.8277z" />
        </svg>
      );
    case "steam":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174l-.105-4.074c-1.869-1.022-3.15-2.993-3.15-5.286 0-3.314 2.687-6 6-6s6 2.686 6 6-2.687 6-6 6c-1.045 0-2.025-.264-2.884-.73l-4.068.106c1.748 4.463 6.09 7.626 11.175 7.626 6.627 0 12-5.373 12-12S18.627 0 12 0zm-1.745 13.042c-1.32 1.32-3.46 1.32-4.78 0-1.32-1.32-1.32-3.46 0-4.78 1.32-1.32 3.46-1.32 4.78 0 1.32 1.32 1.32 3.46 0 4.78z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );

    // Default placeholder for missing ones (most requests are covered above or I'll add generic globe)
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={baseClass}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
  }
};

// Categories definition
const CATEGORIES = [
  {
    id: "video",
    label: "Video & Content",
    items: ["youtube", "vimeo", "rumble", "dailymotion"],
  },
  {
    id: "social",
    label: "Social",
    items: ["facebook", "instagram", "tiktok", "snapchat", "x", "threads"],
  },
  { id: "stream", label: "Streaming", items: ["twitch", "kick"] },
  {
    id: "writing",
    label: "Writing & Blogs",
    items: ["medium", "substack", "wattpad"],
  },
  {
    id: "music",
    label: "Music & Audio",
    items: ["spotify", "soundcloud", "apple_podcasts", "bandcamp"],
  },
  {
    id: "art",
    label: "Art & Design",
    items: [
      "behance",
      "artstation",
      "dribbble",
      "deviantart",
      "etsy",
      "pinterest",
    ],
  },
  {
    id: "money",
    label: "Monetization",
    items: ["patreon", "ko-fi", "buymeacoffee", "onlyfans", "gumroad"],
  },
  {
    id: "tech",
    label: "Tech & Dev",
    items: ["github", "stackoverflow", "producthunt"],
  },
  {
    id: "community",
    label: "Community",
    items: ["discord", "reddit", "telegram", "steam"],
  },
  { id: "other", label: "Other", items: ["strava", "alltrails", "komoot"] },
];

// Mapping from archetype to relevant social platform IDs
const ARCHETYPE_TO_PLATFORMS: Record<string, string[]> = {
  "live-streamer": [
    "twitch",
    "kick",
    "youtube",
    "discord",
    "x",
    "instagram",
    "tiktok",
    "patreon",
    "kofi",
    "buymeacoffee",
  ],
  "lifestyle-storyteller": [
    "youtube",
    "instagram",
    "tiktok",
    "facebook",
    "x",
    "threads",
    "pinterest",
    "snapchat",
    "patreon",
    "kofi",
    "buymeacoffee",
    "linkedin",
  ],
  "visual-creator": [
    "instagram",
    "tiktok",
    "pinterest",
    "behance",
    "dribbble",
    "artstation",
    "deviantart",
    "etsy",
    "youtube",
    "patreon",
    "kofi",
  ],
  "knowledge-architect": [
    "youtube",
    "linkedin",
    "x",
    "medium",
    "substack",
    "github",
    "stackoverflow",
    "udemy",
    "skillshare",
    "spotify",
    "apple_podcasts",
    "patreon",
  ],
  "micro-entertainer": [
    "tiktok",
    "instagram",
    "youtube",
    "snapchat",
    "x",
    "threads",
    "twitch",
    "kick",
    "patreon",
    "kofi",
    "buymeacoffee",
  ],
  "health-coach": [
    "instagram",
    "youtube",
    "tiktok",
    "facebook",
    "linkedin",
    "spotify",
    "apple_podcasts",
    "strava",
    "patreon",
    "kofi",
    "gumroad",
  ],
};

interface SocialConnectProps {
  onConnectAction?: (platformId: string) => void;
  connected?: string[];
  filterByArchetype?: string; // Filter platforms by archetype
}

export default function SocialConnect({
  onConnectAction,
  connected = [],
  filterByArchetype,
}: SocialConnectProps) {
  // Get allowed platform IDs based on archetype
  const allowedPlatforms = filterByArchetype
    ? ARCHETYPE_TO_PLATFORMS[filterByArchetype]
    : null;

  return (
    <div className="space-y-8">
      {CATEGORIES.map((cat) => {
        // Filter platforms belonging to this category that actually exist in definitions
        let platforms = cat.items
          .map((id) =>
            SOCIAL_PLATFORMS.find(
              (p) => p.id === id || p.id === id.replace("_", "")
            )
          ) // handle slight mismatches if any
          .filter((p): p is (typeof SOCIAL_PLATFORMS)[number] => !!p);

        // If archetype filter is active, only show allowed platforms
        if (allowedPlatforms) {
          platforms = platforms.filter((p) => allowedPlatforms.includes(p.id));
        }

        if (platforms.length === 0) return null;

        return (
          <div key={cat.id}>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">
              {cat.label}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((p) => {
                const isConnected = connected.includes(p.id);

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onConnectAction?.(p.id)}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group text-left",
                      isConnected
                        ? "bg-white/10 border-green-500/50 hover:bg-white/15"
                        : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20"
                    )}
                  >
                    <div
                      className="p-2 rounded-lg shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${p.color}20`,
                        color: p.color,
                      }}
                    >
                      <SocialIcon id={p.id} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-gray-200 truncate group-hover:text-white">
                        {p.label}
                      </span>
                      <span className="text-[10px] text-gray-500 truncate">
                        {isConnected ? "Connected" : "Connect"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
