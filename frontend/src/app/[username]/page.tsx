"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Copy,
  Check,
  UserPlus,
  Coins,
  PlayCircle,
  FileText,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { getPublicProfile } from "@/lib/users";
import AvatarCarousel from "@/components/ui/AvatarCarousel";
import Button from "@/components/ui/Button";
import CommunitySection from "@/components/creator/CommunitySection";
import SupportTierCard from "@/components/creator/SupportTierCard";
import HeaderBar from "@/components/ui/HeaderBar";
import { GoalBar } from "@/components/GoalBar";

// Types
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
  } | null;
};

// Mock Data
const MOCK_TIERS = [
  {
    id: "tier-1",
    name: "Supporter",
    priceMonthly: 5,
    perks: ["Supporter Badge", "Exclusive Discord Channel", "Early Access"],
  },
  {
    id: "tier-2",
    name: "Super Fan",
    priceMonthly: 15,
    perks: ["All Previous Perks", "Monthly Q&A", "Merch Discount"],
    recommended: true,
  },
];

export default function CreatorProfile() {
  const { username } = useParams<{ username: string }>();
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const decoded = decodeURIComponent(username || "");
  const cleanUsername = decoded.startsWith("@") ? decoded.slice(1) : decoded;
  const safeHandle = cleanUsername || "creator";

  useEffect(() => {
    if (!cleanUsername) return;

    const fetchProfile = async () => {
      try {
        const data = await getPublicProfile(cleanUsername);
        setProfile(data as UserProfile);
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [cleanUsername]);

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`https://tipjar.plus/@${safeHandle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center text-white">
        <p className="text-xl mb-4">Profile not found</p>
        <Link href="/" className="text-teal-400 hover:underline">
          Go home
        </Link>
      </div>
    );
  }

  const safeDisplayName = profile.displayName || profile.username || "Creator";
  const goal = {
    title: profile.profile?.goalLabel || "Goal",
    target: profile.profile?.goalTarget || 500,
    current: 0,
    deadline: "",
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white">
      {/* Header */}
      <HeaderBar
        action={
          <Link
            href={`/@${safeHandle}/dashboard`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </Link>
        }
      />

      <main className="pt-32 max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* LEFT COLUMN: Avatar, Link, Buttons, Stats */}
          <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-full relative mb-3">
              <AvatarCarousel
                avatarUrls={
                  profile.avatarUrls?.length
                    ? profile.avatarUrls
                    : [profile.avatarUrl || "/logo.png"]
                }
              />
            </div>

            {/* Profile Link (raised right under carousel) */}
            <button
              onClick={copyProfileLink}
              className="text-lg font-bold text-white hover:text-teal-400 transition-colors mb-6 tracking-tight flex items-center gap-2"
            >
              <span>tipjar.plus/@{safeHandle}</span>
              {copied && <Check size={18} className="text-green-400" />}
            </button>

            {/* Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 mb-6">
              <Button
                variant="gold"
                className="w-full justify-center shadow-xl shadow-yellow-500/10 uppercase tracking-widest text-xs py-4"
              >
                TIP IT
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-center uppercase tracking-widest text-xs py-4"
              >
                Follow
              </Button>
            </div>

            {/* Stats */}
            <div className="flex w-full justify-between px-2 pt-2 border-t border-white/5">
              {[
                { label: "Followers", value: "0" },
                { label: "Supporters", value: "0" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-xl font-black text-white leading-none mb-1">
                    {item.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Info & Goal */}
          <div className="flex-1 flex flex-col xl:flex-row gap-8 w-full pt-8">
            {/* Identity Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              {/* Display Name */}
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                {safeDisplayName}
              </h1>

              {/* Archetype & Industry */}
              <div className="space-y-1">
                {profile.profile?.archetype && (
                  <div className="text-yellow-400 font-bold uppercase tracking-widest text-xs">
                    {profile.profile.archetype.replace(/-/g, " ")}
                  </div>
                )}
                {profile.profile?.industry && (
                  <div className="text-teal-400 font-bold uppercase tracking-widest text-xs">
                    {profile.profile.industry}
                  </div>
                )}
              </div>

              {/* Bio */}
              <p className="text-gray-400 text-base leading-relaxed max-w-xl font-light mx-auto md:mx-0 pt-4 border-t border-white/5 mt-4">
                {profile.profile?.bio ||
                  "Welcome to my page! I create content and build communities."}
              </p>
            </div>

            {/* Goal Bar */}
            {profile.profile?.goalTarget && (
              <div className="w-full xl:w-[400px] shrink-0">
                <GoalBar goal={goal} />
              </div>
            )}
          </div>
        </div>

        {/* --- MOCK PREVIEW SECTION --- */}
        <div className="space-y-12 relative mt-32 opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4 text-yellow-500/30 mb-8 px-4">
            <div className="h-px bg-yellow-500/20 flex-1"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Mock Data Preview
            </span>
            <div className="h-px bg-yellow-500/20 flex-1"></div>
          </div>

          {/* Top Supporters (Fan Wall) */}
          <div className="relative group rounded-xl border border-white/5 bg-white/[0.02] p-6 overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              🏆 Top Supporters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["CryptoKing", "DesignLvr", "Web3Fan"].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 shadow-md"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-900 ring-1 ring-white/10"></div>
                  <div>
                    <div className="text-sm font-bold text-white">{s}</div>
                    <div className="text-xs text-teal-400 font-mono">
                      ${(3 - i) * 50}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Hub */}
          <section className="space-y-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Content Hub</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <PlayCircle size={22} className="text-teal-400" />,
                  title: "Viral Engineering 101",
                  desc: "Learn the structure behind 1M+ view content.",
                  cta: "Watch",
                },
                {
                  icon: <FileText size={22} className="text-teal-400" />,
                  title: "Case Study: $42k Launch",
                  desc: "Step-by-step breakdown of the campaign strategy.",
                  cta: "Read",
                },
                {
                  icon: <Mail size={22} className="text-teal-400" />,
                  title: "Conversion Templates",
                  desc: "5 ready-to-use email sequences for sales.",
                  cta: "Download",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400">
                    {card.icon}
                    Premium
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 flex-1 leading-relaxed">
                    {card.desc}
                  </p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-400 hover:text-white transition-colors">
                    {card.cta} <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Offers / Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Community Mock */}
            <div className="relative group rounded-xl border border-white/5 bg-white/[0.02] p-6 overflow-hidden">
              <CommunitySection
                links={[
                  { label: "Discord", href: "#" },
                  { label: "Twitter", href: "#" },
                ]}
              />
            </div>

            {/* Tiers Mock */}
            <div className="relative group rounded-xl border border-white/5 bg-white/[0.02] p-6 overflow-hidden">
              <SupportTierCard tier={MOCK_TIERS[0]} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
