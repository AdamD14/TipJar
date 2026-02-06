"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowLeft,
} from "lucide-react";
import { getPublicProfile } from "@/lib/users";
import AvatarCarousel from "@/components/ui/AvatarCarousel";
import Button from "@/components/ui/Button";
import { GoalBar } from "@/components/GoalBar";
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
    goalLabel: string | null;
    goalTarget: number | null;
    goalDeadline: string | null;
    socials: Record<string, string | boolean | null> | null;
  } | null;
};

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
  const isOwner = user?.username === cleanUsername;

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
  const hasBio = Boolean(profile.profile?.bio?.trim());
  const validSocialLinks = Object.entries(profile.profile?.socials ?? {}).filter(
    ([, value]) => typeof value === "string" && value.trim().startsWith("http"),
  );

  // CHECK: search for "top supporters" / "fan wall" fields in getPublicProfile response.
  const topSupporters: Array<{ name: string; avatarUrl?: string; totalContributed?: number }> = [];

  const goal = {
    title: profile.profile?.goalLabel || "Goal",
    target: profile.profile?.goalTarget || 500,
    current: 0,
    deadline: profile.profile?.goalDeadline || "",
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white">
      {/* Preview Banner */}
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
              href={`/@${safeHandle}/dashboard`}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-bold text-sm uppercase tracking-wider transition-all"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* Header - only show when not in preview mode */}
      {!isPreview && (
        <header className="fixed inset-x-0 top-0 z-40 bg-gradient-main/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm font-semibold tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
            >
              TIPJAR.PLUS
            </Link>
            {isOwner && (
              <Link
                href={`/@${safeHandle}/creator/dashboard`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <ArrowLeft size={14} />
                <span>Back to Dashboard</span>
              </Link>
            )}
          </div>
        </header>
      )}

      <main
        className={`${
          isPreview ? "pt-20" : "pt-32"
        } max-w-7xl mx-auto px-4 pb-20`}
      >
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

          {/* RIGHT COLUMN: Identity -> Fan Wall -> Goal */}
          <div className="flex-1 flex flex-col gap-6 w-full pt-8">
            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 shadow-[0_0_60px_rgba(20,184,166,0.08)]">
              {/* Display Name */}
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none text-center md:text-left">
                {safeDisplayName}
              </h1>

              {/* Archetype & Industry */}
              <div className="space-y-1 mt-4 text-center md:text-left">
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
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl font-light mx-auto md:mx-0 pt-4 border-t border-white/5 mt-4 text-center md:text-left">
                {hasBio
                  ? profile.profile?.bio
                  : "This creator has not added a bio yet."}
              </p>

              {/* Socials */}
              {validSocialLinks.length > 0 && (
                <div className="flex items-center gap-3 pt-4 justify-center md:justify-start flex-wrap">
                  {validSocialLinks.map(([label, url]) => (
                    <a
                      key={label}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <span className="text-sm font-bold text-white capitalize">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </section>

            {/* Fan Wall */}
            {topSupporters.length > 0 && (
              <section className="rounded-3xl border border-teal-300/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 md:p-8 shadow-[0_0_70px_rgba(45,212,191,0.12)]">
                <h2 className="text-lg font-extrabold tracking-wider uppercase text-white mb-4">
                  Top Supporters
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topSupporters.slice(0, 8).map((supporter) => (
                    <article
                      key={supporter.name}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex items-center gap-3"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500/60 to-yellow-500/30 border border-white/20 overflow-hidden">
                        {supporter.avatarUrl && (
                          <Image
                            src={supporter.avatarUrl}
                            alt={supporter.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{supporter.name}</p>
                        {typeof supporter.totalContributed === "number" && (
                          <p className="text-xs text-teal-300 font-semibold">
                            ${supporter.totalContributed}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Goal Bar */}
            {profile.profile?.goalTarget && (
              <div className="w-full max-w-[420px]">
                <GoalBar goal={goal} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
