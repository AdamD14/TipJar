"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowLeft,
  Share2,
  Copy,
} from "lucide-react";
import { getPublicProfile } from "@/lib/users";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { GoalBar } from "@/components/creator/GoalBar";
import AvatarCarousel from "@/components/ui/AvatarCarousel";
import Header from "@/components/landing/Header";
import { useAuthStore } from "@/lib/store/authStore";

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
    specializations?: string[];
    goalLabel: string | null;
    goalTarget: number | null;
    goalDeadline: string | null;
    socials: Record<string, string | boolean | null> | null;
  } | null;
};

/* ── Archetype Badge ── */
function ArchetypeBadge({ label, variant = "archetype" }: { label: string; variant?: "archetype" | "specialization" }) {
  return (
    <span
      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] border shadow-xl ${
        variant === "archetype"
          ? "bg-teal-900 text-gold-400 border-gold-400/20"
          : "bg-teal-900 text-teal-300 border-teal-600/20"
      }`}
    >
      {label.replace(/-/g, " ")}
    </span>
  );
}

export default function CreatorProfile() {
  const { username } = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const decoded = decodeURIComponent(username || "");
  const cleanUsername = decoded.startsWith("@") ? decoded.slice(1) : decoded;
  const safeHandle = cleanUsername || "creator";

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!cleanUsername) return;

    // Guard: don't try to load profiles for asset filenames
    if (/\.(png|svg|ico|jpg|jpeg|gif|webp)$/i.test(cleanUsername)) {
      setLoading(false);
      setError("Not a user");
      return;
    }

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
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center text-white">
        <p className="text-xl mb-4">Profile not found</p>
        <Link href="/" className="text-teal-300 hover:underline">
          Go home
        </Link>
      </div>
    );
  }

  const safeDisplayName = profile.displayName || profile.username || "Creator";
  const hasBio = Boolean(profile.profile?.bio?.trim());

  const goal = {
    title: profile.profile?.goalLabel || "Goal",
    target: profile.profile?.goalTarget || 500,
    current: 0,
    deadline: profile.profile?.goalDeadline || "",
  };

  // Build badge list: archetype + specializations
  const specializations: string[] = profile.profile?.specializations ?? [];

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30">
      {/* ═══ PREVIEW BANNER ═══ */}
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                🎉 Profile Preview — This is how others see your page!
              </span>
            </div>
            <Link
              href={`/@${safeHandle}/creator/dashboard`}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-bold text-sm uppercase tracking-wider transition-all"
            >
              <ArrowLeft size={16} />
              Back to Studio
            </Link>
          </div>
        </div>
      )}

      {/* ═══ HEADER / NAVBAR — Landing page style ═══ */}
      {!isPreview && <Header />}

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        className={`${
          isPreview ? "pt-20" : "pt-28"
        } max-w-7xl mx-auto px-6 pb-20`}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT COLUMN: Avatar + Link + Buttons + Stats ── */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col items-center">
            <div className="w-full relative mb-3 scale-90 sm:scale-100">
              <AvatarCarousel
                avatarUrls={
                  profile.avatarUrls?.length
                    ? profile.avatarUrls
                    : [profile.avatarUrl || "/logo.png"]
                }
              />
            </div>

            {/* Profile link */}
            <div className="mt-4 flex flex-col items-center w-full">
              <button
                onClick={copyProfileLink}
                className="text-xs font-bold text-teal-100 hover:text-gold-400 transition-all flex items-center gap-2 group"
              >
                <span className="text-teal-600 group-hover:text-teal-300 transition-colors">
                  tipjar.plus/
                </span>
                <span>@{safeHandle}</span>
                {copied ? (
                  <Check size={12} className="text-green-400" />
                ) : (
                  <Copy size={12} className="text-teal-600 group-hover:text-gold-400 transition-colors" />
                )}
              </button>

              {/* Action buttons */}
              <div className="w-full grid grid-cols-2 gap-3 mt-6">
                <Button
                  variant="glass"
                  className="text-[10px] tracking-widest uppercase"
                >
                  Follow
                </Button>
                <Button
                  variant="glass"
                  onClick={copyProfileLink}
                  className="text-[10px] tracking-widest uppercase gap-1.5"
                >
                  <Share2 size={12} />
                  Share
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 w-full gap-4 mt-6 pt-6 border-t border-teal-700/30 text-center">
                <div>
                  <p className="text-xl font-black text-white leading-none">0</p>
                  <p className="text-[8px] uppercase tracking-widest text-teal-400 mt-1 font-bold">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="text-xl font-black text-white leading-none">0</p>
                  <p className="text-[8px] uppercase tracking-widest text-teal-400 mt-1 font-bold">
                    Supporters
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Main profile card ── */}
          <div className="flex-1 w-full lg:pt-16">
            <section className="relative rounded-[32px] border border-teal-700/30 bg-teal-800 p-8 flex flex-col gap-8 shadow-2xl">
              {/* Specialization badges — floating on top edge, half in / half out */}
              {(profile.profile?.archetype || specializations.length > 0) && (
                <div className="absolute top-0 left-8 -translate-y-1/2 flex gap-2.5 flex-wrap z-10">
                  {profile.profile?.archetype && (
                    <ArchetypeBadge
                      label={profile.profile.archetype}
                      variant="archetype"
                    />
                  )}
                  {specializations.map((spec) => (
                    <ArchetypeBadge
                      key={spec}
                      label={spec}
                      variant="specialization"
                    />
                  ))}
                </div>
              )}

              {/* GoalBar */}
              {profile.profile?.goalTarget && (
                <div className="w-full max-w-xl">
                  <GoalBar goal={goal} />
                </div>
              )}

              {/* Display Name */}
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black text-white tracking-tighter leading-none">
                {safeDisplayName}
              </h1>

              {/* Bio */}
              <div className="pt-8 border-t border-teal-700/30">
                <p className="text-xl text-teal-100 leading-relaxed max-w-4xl mb-6">
                  {hasBio
                    ? profile.profile?.bio
                    : "This creator has not added a bio yet."}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
