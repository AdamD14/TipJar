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
      {/* Back to Dashboard */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          href={`/@${safeHandle}/dashboard`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* --- Top Profile Section --- */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
          {/* LEFT COLUMN: Avatar, Handle, Stats */}
          <div className="w-full md:w-[320px] flex-shrink-0 flex flex-col items-center md:items-start">
            <div className="w-full mb-6 relative">
              {/* Avatars */}
              <AvatarCarousel
                avatarUrls={
                  profile.avatarUrls?.length
                    ? profile.avatarUrls
                    : [profile.avatarUrl || "/logo.png"]
                }
              />
            </div>

            <div className="w-full text-center md:text-left space-y-6">
              {/* Handle & Copy */}
              <div className="space-y-2">
                <p className="text-teal-400 font-bold text-xl tracking-wide">
                  @{safeHandle}
                </p>
                <button
                  onClick={copyProfileLink}
                  className="group flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white transition-all text-base w-full md:w-auto font-medium"
                >
                  <span>tipjar.plus/@{safeHandle}</span>
                  {copied ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy
                      size={16}
                      className="opacity-50 group-hover:opacity-100"
                    />
                  )}
                </button>
                {/* Archetype Badge */}
                {profile.profile?.archetype && (
                  <div className="pt-1 flex justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-yellow-500/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                      <ShieldCheck size={10} />{" "}
                      {profile.profile.archetype.replace(/-/g, " ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-row md:flex-col lg:flex-row justify-center md:justify-start gap-8 pt-2">
                {[
                  { label: "Followers", value: "0" },
                  { label: "Views", value: "0" },
                ].map((item) => (
                  <div key={item.label} className="text-center md:text-left">
                    <p className="text-2xl font-black text-white leading-none mb-1">
                      {item.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold opacity-60">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bio, Buttons, Goal */}
          <div className="flex-1 flex flex-col pt-4">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-center md:text-left tracking-tight">
              {safeDisplayName}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 text-center md:text-left max-w-2xl font-light">
              {profile.profile?.bio ||
                "Welcome to my page! I create content and build communities."}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
              <Button
                variant="secondary"
                className="px-8"
                leftIcon={<UserPlus size={18} />}
              >
                Follow
              </Button>
              <Button
                variant="gold"
                className="px-8 shadow-xl shadow-yellow-500/10"
                leftIcon={<Coins size={18} />}
              >
                TIP IT
              </Button>
            </div>

            {/* Goal Card */}
            {profile.profile?.goalTarget && (
              <div className="max-w-xl bg-gradient-to-br from-[#1a2e2e]/80 to-[#0A0A0B]/95 border border-teal-500/20 rounded-3xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest mb-1">
                      Goal
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                      {goal.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest mb-1">
                        Progress
                      </span>
                      <div className="relative w-14 h-14 bg-teal-500/5 rounded-full flex items-center justify-center border border-teal-500/10">
                        <span className="text-lg font-black text-white">
                          0%
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col border-l border-teal-500/20 pl-4">
                      <span className="text-[10px] font-bold text-teal-500/40 uppercase tracking-widest">
                        Target Amount
                      </span>
                      <span className="text-xl font-black text-teal-400 tracking-tight">
                        ${goal.target.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400"
                    style={{ width: "0%" }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-teal-500/40 uppercase tracking-widest">
                  <span>Funds raised</span>
                  <span className="text-lg text-white font-bold">$0</span>
                </div>
                <div className="flex justify-center pt-4">
                  <button className="w-full bg-teal-500 text-black py-3 rounded-2xl text-lg font-black uppercase tracking-[0.2em] shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
                    <span className="text-xl">$</span> TIP IT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- MOCK PREVIEW SECTION --- */}
        <div className="space-y-12 relative mt-16">
          <div className="flex items-center gap-4 text-yellow-500/50 mb-4 px-4">
            <div className="h-px bg-yellow-500/30 flex-1"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Live Page Preview
            </span>
            <div className="h-px bg-yellow-500/30 flex-1"></div>
          </div>

          {/* Top Supporters (Fan Wall) */}
          <div className="relative group rounded-xl border border-white/5 bg-white/5 p-6 overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500/20 border-b border-l border-yellow-500/40 text-yellow-200 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
              MOCK PREVIEW
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              🏆 Top Supporters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
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
          <section className="space-y-6 relative group">
            <div className="absolute -top-4 -right-4 bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 text-[10px] font-bold px-3 py-1 rounded-full z-10">
              MOCK PREVIEW
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Content Hub / Start
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Top 3 Materiały
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <PlayCircle size={22} className="text-teal-400" />,
                  title: "Inżynieria Wirali: Framework 7-minutowy",
                  desc: "Analiza struktury treści, które generują 1M+ wyświetleń bez budżetu reklamowego.",
                  cta: "Obejrzyj",
                },
                {
                  icon: <FileText size={22} className="text-teal-400" />,
                  title: "Case study: $42k z jednego launchu",
                  desc: "Dokładny zapis sekwencji wiadomości i strategii segmentacji użytej w kampanii.",
                  cta: "Czytaj",
                },
                {
                  icon: <Mail size={22} className="text-teal-400" />,
                  title: "Szablon: Sekwencja konwertująca",
                  desc: "5 gotowych wzorców treści skracających czas od kontaktu do sprzedaży.",
                  cta: "Pobierz",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all hover:bg-white/10 hover:border-teal-500/30"
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
            <div className="absolute -top-4 -right-4 bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 text-[10px] font-bold px-3 py-1 rounded-full z-10">
              MOCK PREVIEW
            </div>
            {/* Community Mock */}
            <div className="relative group rounded-xl border border-white/5 bg-white/5 p-6 overflow-hidden">
              <CommunitySection
                links={[
                  { label: "Discord", href: "#" },
                  { label: "Twitter", href: "#" },
                ]}
              />
            </div>

            {/* Tiers Mock */}
            <div className="relative group rounded-xl border border-white/5 bg-white/5 p-6 overflow-hidden">
              <SupportTierCard tier={MOCK_TIERS[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
