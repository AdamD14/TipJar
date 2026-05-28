"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Wallet as WalletIcon, 
  ExternalLink, 
  Share2, 
  Copy, 
  Check, 
  Coins, 
  MessageSquare, 
  Tv, 
  QrCode, 
  Eye, 
  TrendingUp, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  Flame,
  Layout,
  Layers,
  Activity,
  Heart,
  Terminal,
  MousePointer,
  CheckCircle,
  CopyLeft
} from "lucide-react";
import { getPublicProfile } from "@/lib/users";
import Spinner from "@/components/ui/Spinner";

// Types corresponding to the public profile response
type UserProfile = {
  displayName: string;
  username: string | null;
  avatarUrl: string | null;
  avatarUrls: string[];
  role: string;
  profile: {
    bio: string | null;
    bannerUrl: string | null;
    archetype: string | null;
    industry: string | null;
    goalLabel: string | null;
    goalTarget: number | null;
    socials: Record<string, string | boolean | null> | null;
  } | null;
};

// Archetype styling rules and customization parameters
const ARCHETYPE_CONFIG: Record<
  string,
  {
    name: string;
    tagline: string;
    primaryColor: string;
    glowColor: string;
    borderColor: string;
    badgeBg: string;
    showcaseImg: string;
    priorityCards: string[];
  }
> = {
  "live-streamer": {
    name: "Interactive Streamer",
    tagline: "Live-action, instant alerts, real-time connection.",
    primaryColor: "from-purple-600 via-fuchsia-600 to-indigo-600",
    glowColor: "rgba(145, 70, 255, 0.25)",
    borderColor: "border-purple-500/20 hover:border-purple-400/40",
    badgeBg: "bg-purple-950/40 text-purple-300 border-purple-500/20",
    showcaseImg: "/011.webp",
    priorityCards: ["live-overlays", "wallet-moment", "profile-visibility", "support-surfaces", "monetization-preset"],
  },
  "lifestyle-storyteller": {
    name: "Lifestyle Storyteller",
    tagline: "Personal brand, deep connection, visual authenticity.",
    primaryColor: "from-rose-600 via-pink-600 to-amber-600",
    glowColor: "rgba(244, 63, 94, 0.25)",
    borderColor: "border-rose-500/20 hover:border-rose-400/40",
    badgeBg: "bg-rose-950/40 text-rose-300 border-rose-500/20",
    showcaseImg: "/001.webp",
    priorityCards: ["profile-visibility", "community-engagement", "support-surfaces", "wallet-moment", "qr-campaigns"],
  },
  "visual-creator": {
    name: "Visual Creator",
    tagline: "Sleek aesthetics, high-fidelity gallery, clean style.",
    primaryColor: "from-pink-500 via-purple-600 to-orange-500",
    glowColor: "rgba(236, 72, 153, 0.25)",
    borderColor: "border-pink-500/20 hover:border-pink-400/40",
    badgeBg: "bg-pink-950/40 text-pink-300 border-pink-500/20",
    showcaseImg: "/003.webp",
    priorityCards: ["profile-visibility", "wallet-moment", "monetization-preset", "qr-campaigns", "live-overlays"],
  },
  "knowledge-architect": {
    name: "Knowledge Architect",
    tagline: "Structured insights, deep learning, highly valued value.",
    primaryColor: "from-amber-500 via-yellow-600 to-emerald-600",
    glowColor: "rgba(234, 179, 8, 0.2)",
    borderColor: "border-yellow-500/20 hover:border-yellow-400/40",
    badgeBg: "bg-yellow-950/40 text-[#FFD700] border-yellow-500/20",
    showcaseImg: "/015.webp",
    priorityCards: ["support-surfaces", "wallet-moment", "monetization-preset", "profile-visibility", "community-engagement"],
  },
  "micro-entertainer": {
    name: "Micro-Entertainer",
    tagline: "Viral hook-points, digital spikes, fast-paced actions.",
    primaryColor: "from-cyan-400 via-teal-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.25)",
    borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
    badgeBg: "bg-cyan-950/40 text-cyan-300 border-cyan-500/20",
    showcaseImg: "/005.webp",
    priorityCards: ["qr-campaigns", "wallet-moment", "profile-visibility", "live-overlays", "community-engagement"],
  },
  "health-coach": {
    name: "Motivational Guide",
    tagline: "Transformational journeys, personalized feedback.",
    primaryColor: "from-blue-600 via-indigo-600 to-teal-500",
    glowColor: "rgba(59, 130, 246, 0.25)",
    borderColor: "border-blue-500/20 hover:border-blue-400/40",
    badgeBg: "bg-blue-950/40 text-blue-300 border-blue-500/20",
    showcaseImg: "/013.webp",
    priorityCards: ["support-surfaces", "community-engagement", "wallet-moment", "profile-visibility", "qr-campaigns"],
  },
};

// Default fallback configuration
const DEFAULT_CONFIG = {
  name: "Creator",
  tagline: "Your launchpad into decentralized support and interaction.",
  primaryColor: "from-teal-600 to-purple-600",
  glowColor: "rgba(20, 184, 166, 0.2)",
  borderColor: "border-teal-500/20 hover:border-teal-400/40",
  badgeBg: "bg-teal-950/40 text-teal-300 border-teal-500/20",
  showcaseImg: "/003.webp",
  priorityCards: ["wallet-moment", "profile-visibility", "support-surfaces", "monetization-preset", "qr-campaigns", "live-overlays", "community-engagement"],
};

export default function CreatorDesktop() {
  const { username } = useParams<{ username: string }>();
  const decoded = decodeURIComponent(username || "");
  const cleanUsername = decoded.startsWith("@") ? decoded.slice(1) : decoded;
  const safeHandle = cleanUsername || "creator";

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Hardcoded wallet details representing the USDC / Agent Wallet existence moment
  const mockWallet = {
    address: "0x8920...2a1b",
    fullAddress: "0x8920392138127391a2731c2a1b92139e831201ab",
    balance: "0.00",
    currency: "USDC",
    chain: "Arc Network",
  };

  useEffect(() => {
    if (!cleanUsername) return;

    const fetchProfile = async () => {
      try {
        const data = await getPublicProfile(cleanUsername);
        setProfile(data as UserProfile);
      } catch (err) {
        console.error("Failed to load public profile for creator desktop", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [cleanUsername]);

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`https://tipjar.plus/@${safeHandle}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(mockWallet.fullAddress);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Get configuration based on active archetype
  const archetypeKey = profile?.profile?.archetype || "";
  const config = ARCHETYPE_CONFIG[archetypeKey] || DEFAULT_CONFIG;

  const publicProfileUrl = `/@${safeHandle}?preview=true`;

  // Define All Potential Cards with asymmetric height and tighter padding (FLOW FIRST, density optimized)
  const cardsDatabase: Record<string, React.ReactNode> = {
    
    // ══ CARD 1: Wallet (EXISTENCE MOMENT, Medium Card - Compact, High Density) ══
    "wallet-moment": (
      <div 
        key="wallet-moment" 
        className="break-inside-avoid mb-6 rounded-2xl border border-teal-500/20 bg-gradient-to-br from-[#001f1f] via-black/85 to-[#001010] p-4.5 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-teal-400/40 hover:scale-[1.01]"
        style={{ boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)" }}
      >
        {/* Background artwork: USDC symbol integrated */}
        <div className="absolute right-0 bottom-0 w-28 h-28 opacity-10 pointer-events-none select-none group-hover:scale-105 group-hover:opacity-15 transition-all duration-500">
          <Image src="/usdc2.webp" alt="USDC background" fill className="object-contain" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 border border-teal-500/10 shrink-0">
              <WalletIcon size={15} />
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-wider text-teal-400 font-bold">On-chain Presence</span>
              <h3 className="text-sm font-black text-white leading-tight">Agent Wallet Active</h3>
            </div>
          </div>
          <Image src="/circle.webp" alt="Circle logo" width={16} height={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Dense Balance presentation */}
        <div className="py-3 border-y border-teal-500/10 mb-4 flex items-center justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-teal-400/40 font-bold">Consolidated Balance</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black tracking-tight text-white">{mockWallet.balance}</span>
              <span className="text-xs font-black text-teal-300">USDC</span>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-teal-400/15 text-teal-300 border border-teal-400/30">
              {mockWallet.chain}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-black/40 rounded-lg p-2 border border-teal-500/5 flex items-center justify-between min-w-0">
            <span className="text-[10px] font-mono font-bold text-teal-100/75 truncate select-all">{mockWallet.address}</span>
            <button 
              onClick={copyWalletAddress} 
              className="text-teal-400 hover:text-white transition-colors shrink-0 pl-2"
            >
              {copiedWallet ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-teal-400/10 hover:bg-teal-400/20 text-teal-300 border border-teal-400/20 transition-all">
          Wallet Operations
        </button>
      </div>
    ),

    // ══ CARD 2: Profile Customizer (EXISTENCE MOMENT, Tall Card - Visual Showcase) ══
    "profile-visibility": (
      <div 
        key="profile-visibility" 
        className="break-inside-avoid mb-6 rounded-2xl border border-purple-500/15 bg-gradient-to-br from-[#0c031c] via-[#04010a] to-black p-4 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-purple-400/40 hover:scale-[1.01]"
      >
        {/* Full-bleed illustration preview (Varying height asset) */}
        <div className="relative w-full h-[190px] rounded-xl overflow-hidden mb-4 border border-purple-500/10">
          <Image 
            src={config.showcaseImg} 
            alt="Visual template preview" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/5 py-1 px-2.5 rounded-full">
            <Sparkles size={10} className="text-purple-400" />
            <span className="text-[8px] font-black uppercase tracking-widest text-purple-200">
              Interactive View
            </span>
          </div>
        </div>

        <div className="px-1.5 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[8px] uppercase tracking-wider text-purple-400 font-bold">Visual Customizer</span>
              <h3 className="text-sm font-black text-white leading-tight mt-0.5">Profile Layout</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/20">
              Active Theme
            </span>
          </div>

          <p className="text-[11px] text-purple-200/60 leading-relaxed font-semibold mb-4">
            Rearrange floating widgets, choose accent gradients, and custom brand your tipping container.
          </p>

          <Link 
            href={publicProfileUrl}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-purple-500/20 hover:bg-purple-500/30 text-white transition-all border border-purple-500/30"
          >
            <span>Edit Appearance</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    ),

    // ══ CARD 3: Flexible Support (Medium Card - Compact Interactive) ══
    "support-surfaces": (
      <div 
        key="support-surfaces" 
        className="break-inside-avoid mb-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] p-4.5 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-teal-300 border border-white/10 shrink-0">
            <Coins size={15} />
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold">Surfaces & Support</span>
            <h3 className="text-sm font-black text-white leading-tight">Flexible Monetization</h3>
          </div>
        </div>

        <p className="text-[11px] text-[#ABE1E1]/70 leading-relaxed font-semibold mb-4">
          Customize instant digital micro-tipping levels. Set fixed default amounts, allow custom input, and collect messaging.
        </p>

        {/* Compact Preset configuration display */}
        <div className="grid grid-cols-4 gap-1.5 mb-4 text-center">
          {["$2", "$10", "$25", "Custom"].map((val, idx) => (
            <div key={val} className={`py-1.5 rounded-lg text-[10px] font-black border ${
              idx === 0 
                ? "bg-teal-500/10 border-teal-500/30 text-teal-300" 
                : "bg-white/[0.01] border-white/5 text-white/50"
            }`}>
              {val}
            </div>
          ))}
        </div>

        <button className="w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all">
          Edit Monetization
        </button>
      </div>
    ),

    // ══ CARD 4: Live OBS Overlays (Streamer Specialty - Landscape/Detailed Card) ══
    "live-overlays": (
      <div 
        key="live-overlays" 
        className="break-inside-avoid mb-6 rounded-2xl border border-teal-500/15 bg-gradient-to-br from-[#002424] via-black/90 to-black p-4.5 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-teal-400/30 hover:scale-[1.01]"
      >
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 border border-teal-500/10 shrink-0">
              <Tv size={15} />
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-wider text-teal-400/80 font-bold">OBS Studio Integration</span>
              <h3 className="text-sm font-black text-white leading-tight">Live Broadcast Overlay</h3>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
        </div>

        <p className="text-[11px] text-teal-200/60 leading-relaxed font-semibold mb-4">
          Connect your tipping feed directly to your stream screen. Copy your custom browser-source link for beautiful animations.
        </p>

        {/* Compact Terminal Copy Row */}
        <div className="bg-black/60 rounded-xl p-3 border border-teal-500/5 mb-4 flex items-center justify-between gap-3 font-mono text-[9px] text-teal-400 select-all truncate">
          <span>{`api.tipjar.plus/v1/overlay/${safeHandle}`}</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`https://api.tipjar.plus/v1/overlay/${safeHandle}`);
            }} 
            className="text-white/40 hover:text-teal-400 transition-colors shrink-0"
          >
            <Copy size={11} />
          </button>
        </div>

        <button className="w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/20 transition-all">
          Manage OBS Widgets
        </button>
      </div>
    ),

    // ══ CARD 5: QR Codes (Compact Card - Symmetrical Box) ══
    "qr-campaigns": (
      <div 
        key="qr-campaigns" 
        className="break-inside-avoid mb-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] p-4 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-teal-400 border border-white/10 shrink-0">
            <QrCode size={13} />
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider text-white/40 font-bold">Visibility Assets</span>
            <h3 className="text-xs font-black text-white leading-tight">Smart QR Code</h3>
          </div>
        </div>

        {/* Mini QR box illustration using local pattern.svg backdrop */}
        <div className="relative w-full h-[120px] rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center mb-3">
          <div className="absolute inset-0 opacity-10 select-none">
            <Image src="/pattern.svg" alt="Pattern" fill className="object-cover" />
          </div>
          <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center z-10 shadow-lg relative group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full border border-black/5 bg-[radial-gradient(#002424_1.5px,transparent_1px)] [background-size:8px_8px] opacity-85 flex items-center justify-center">
              <span className="text-[6px] font-black text-[#002424] uppercase tracking-tighter">QR</span>
            </div>
          </div>
        </div>

        <button className="w-full py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/5 transition-all">
          Get Vector Code
        </button>
      </div>
    ),

    // ══ CARD 6: Fanwall Testimonials (Varying height - Community feedback) ══
    "community-engagement": (
      <div 
        key="community-engagement" 
        className="break-inside-avoid mb-6 rounded-2xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] p-4.5 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 border border-white/10 shrink-0">
            <MessageSquare size={15} />
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold">Social Proof</span>
            <h3 className="text-sm font-black text-white leading-tight">Fanwall Moderation</h3>
          </div>
        </div>

        {/* Compact bubble representing a fan comment */}
        <div className="p-3 bg-purple-950/20 rounded-xl border border-purple-500/10 text-left mb-4 relative">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              {/* Using a local creator image placeholder if available, else a stylized token */}
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500" />
              <span className="text-[9px] font-black text-white">Ania</span>
            </div>
            <div className="flex items-center gap-0.5 text-purple-400">
              <Heart size={8} className="fill-current" />
              <span className="text-[7px] font-black uppercase tracking-widest">Backer</span>
            </div>
          </div>
          <p className="text-[10px] text-purple-200/60 leading-normal font-semibold italic">"Incredible setup! Very clean and quick."</p>
        </div>

        <button className="w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all">
          Configure Feed
        </button>
      </div>
    ),
  };

  // Re-order card list dynamically according to archetype priority rules
  const activePriorityList = config.priorityCards;
  const missingCards = Object.keys(cardsDatabase).filter(c => !activePriorityList.includes(c));
  const sortedCardKeys = [...activePriorityList, ...missingCards];

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30">
      
      <main className="max-w-7xl mx-auto px-4.5 pt-6 pb-20">
        
        {/* ═══ SYSTEM HERO BANNER (EXISTS MOMENTS - Tight Padding, High Visual Impact) ═══ */}
        <div 
          className="mb-8 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-[#002828]/80 via-[#001717]/95 to-black/95 p-6 md:p-8 shadow-2xl relative overflow-hidden group"
          style={{ boxShadow: "0 20px 48px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.04)" }}
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-400/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-teal-400/15 transition-all duration-700" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-[8px] font-black uppercase tracking-wider text-teal-400">
                  <Activity size={9} className="animate-pulse" />
                  Existence verified
                </span>
                {profile?.profile?.archetype && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${config.badgeBg} border`}>
                    {config.name}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                Your page is live!
              </h1>
              
              <p className="text-xs md:text-sm text-[#ABE1E1]/70 max-w-xl font-semibold leading-normal">
                {profile?.displayName ? `Congratulations ${profile.displayName}, your tipjar is active.` : "Congratulations, your tipjar is active."} {config.tagline}
              </p>
            </div>

            {/* Quick Share Link Widget (More compact, tighter padding) */}
            <div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-black/60 p-3 rounded-2xl border border-teal-500/15 min-w-full lg:min-w-[420px] backdrop-blur-md"
              style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)" }}
            >
              <div className="flex-1 flex items-center gap-2.5 min-w-0 px-1">
                <div className="w-7.5 h-7.5 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0">
                  <UserCheck size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-[7px] uppercase tracking-widest text-teal-400/50 font-bold">Public Endpoint</p>
                  <p className="text-xs font-mono font-black text-teal-100 truncate mt-0.5">
                    tipjar.plus/@{safeHandle}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={copyProfileLink}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-teal-400/10 hover:bg-teal-400/20 px-3.5 py-2 rounded-xl text-teal-300 font-bold text-[10px] uppercase tracking-wider transition-all border border-teal-400/20"
                >
                  {copiedLink ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
                <Link
                  href={publicProfileUrl}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-purple-500/20 hover:bg-purple-500/30 px-3.5 py-2 rounded-xl text-white font-bold text-[10px] uppercase tracking-wider transition-all border border-purple-500/30 shadow-lg shadow-purple-500/10"
                >
                  <ExternalLink size={12} />
                  <span>View page</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TRUE ASYMMETRIC MASONRY DASHBOARD ═══ */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance] w-full">
          {sortedCardKeys.map((key) => cardsDatabase[key])}
        </div>

      </main>
    </div>
  );
}
