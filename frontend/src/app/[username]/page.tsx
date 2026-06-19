"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ArrowLeft, Share2, Copy, Send } from "lucide-react";
import clsx from "clsx";
import { getPublicProfile } from "@/lib/users";
import { me } from "@/lib/auth";
import Button from "@/components/ui/buttons/Button";
import Spinner from "@/components/ui/Spinner";
import AvatarCarousel from "@/components/onboarding/AvatarCarousel";
import Header from "@/components/landing/Header";
import Navbar from "@/components/ui/layout/Navbar";
import { useAuthStore } from "@/lib/store/authStore";
import { useGoalProgress, useTip } from "@/lib/api/queries";
import { GoalBar } from "@/components/studio/modal/GoalBar";
import { AmountSlider } from "@/components/payments/tip/AmountSlider";
import { useToast } from "@/components/ui/notifications/Toast";
import { isValidUsdc, parseAmount } from "@/lib/currency";
import { track } from "@/lib/analytics/track";
import { normalize } from "@/lib/api/errors";
import FanWall from "@/components/payments/FanWall";

const TIP_PRESETS = [1, 2, 5, 10, 20];
const MAX_MESSAGE = 80;

type UserProfile = {
  id: string;
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
  const hydrated = useAuthStore((state) => state._hasHydrated);
  const isLoggedIn = hydrated && !!user?.username;
  const isOwnProfile = user?.username?.toLowerCase() === cleanUsername.toLowerCase();

  const { data: goalProgress } = useGoalProgress(cleanUsername);

  useEffect(() => {
    if (!cleanUsername) return;

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

  useEffect(() => {
    if (!hydrated) return;
    if (user?.username) return;
    me()
      .then((fetched) => {
        if (fetched) {
          useAuthStore.getState().setUser({
            ...fetched,
            email: fetched.email ?? undefined,
            username: fetched.username ?? undefined,
            avatarUrl: fetched.avatarUrl ?? undefined,
            role: fetched.role === "CREATOR" ? "CREATOR" : "FAN",
          });
        }
      })
      .catch(() => {});
  }, [hydrated, user?.username]);

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
  const creatorId = profile.id || cleanUsername;
  const liveCurrent = goalProgress ? Number(goalProgress.totalReceived) : 0;

  const goal = {
    title: profile.profile?.goalLabel || "Goal",
    target: profile.profile?.goalTarget || 500,
    current: liveCurrent,
    deadline: profile.profile?.goalDeadline || "",
  };

  // Build badge list: archetype + specializations
  const specializations: string[] = profile.profile?.industry
    ? profile.profile.industry.split(",").map((s) => s.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30">
      {/* ═══ PREVIEW BANNER ═══ */}
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 shadow-lg border-b border-teal-500/20">
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-bold text-white tracking-wide">
                Your profile is live! Share your link
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyProfileLink}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-semibold text-xs tracking-wider transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy link
                    </>
                  )}
                </button>
                <button
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: safeDisplayName,
                          url: `https://tipjar.plus/@${safeHandle}`,
                        });
                      } catch (err) {
                        copyProfileLink();
                      }
                    } else {
                      copyProfileLink();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-semibold text-xs tracking-wider transition-all"
                >
                  <Share2 size={12} />
                  Share
                </button>
              </div>
            </div>
            <Link
              href={`/${username}/creator-desktop`}
              className="inline-flex items-center gap-1.5 bg-purple-300/40 hover:bg-purple-300/60 px-4 py-2 rounded-lg text-white font-bold text-xs uppercase tracking-wider transition-all border border-purple-300/30"
            >
              <ArrowLeft size={14} />
              Back to Creator-Desktop
            </Link>
          </div>
        </div>
      )}

      {/* ═══ HEADER / NAVBAR ═══ */}
      {isPreview ? null : isLoggedIn ? <Navbar /> : <Header />}

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        className={`${isPreview ? "pt-20" : isLoggedIn ? "pt-14" : "pt-28"} max-w-7xl mx-auto px-6 pb-20`}
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
                className="text-sm md:text-base font-bold text-teal-100 hover:text-purple-300 transition-all flex items-center gap-2 group"
              >
                <span className="text-teal-600 group-hover:text-teal-300 transition-colors">
                  tipjar.plus/
                </span>
                <span>@{safeHandle}</span>
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy
                    size={14}
                    className="text-teal-600 group-hover:text-purple-300 transition-colors"
                  />
                )}
              </button>

              {/* Action buttons */}
              <div className="w-full grid grid-cols-2 gap-3 mt-6">
                <Button
                  variant="secondary"
                  size="md"
                  className="text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-500/10"
                >
                  Follow
                </Button>
                <Button
                  variant="glass"
                  size="md"
                  onClick={copyProfileLink}
                  className="text-xs font-bold tracking-widest uppercase gap-1.5 border-teal-500/30 bg-teal-950/60 text-white hover:bg-teal-800/80 hover:border-teal-400/50 shadow-lg transition-all"
                >
                  <Share2 size={14} />
                  Share
                </Button>
              </div>

      {/* Stats */}
      <div className="grid grid-cols-2 w-full gap-4 mt-6 pt-6 border-t border-teal-700/30 text-center">
        <div>
          <p className="text-xl font-bold text-white leading-none">
            0
          </p>
          <p className="text-[8px] uppercase tracking-widest text-teal-400 mt-1 font-bold">
            Followers
          </p>
        </div>
        <div>
          <p className="text-xl font-bold text-white leading-none">
            {goalProgress?.tipCount ?? 0}
          </p>
          <p className="text-[8px] uppercase tracking-widest text-teal-400 mt-1 font-bold">
            Supporters
          </p>
        </div>
      </div>

      {/* FanWall — recent tips */}
      <FanWall creatorId={creatorId} className="w-full mt-6 pt-6 border-t border-teal-700/30" />
    </div>
  </div>

      {/* ── RIGHT COLUMN: Main profile card ── */}
      <div className="flex-1 w-full lg:pt-16">
        <section className="relative rounded-[32px] border border-[#004545] bg-[#003737] p-8 flex flex-col gap-8 shadow-2xl">
          {/* Specialization badges — floating on top edge, half in / half out */}
          {(profile.profile?.archetype || specializations.length > 0) && (
            <div className="absolute top-0 left-8 -translate-y-1/2 flex gap-2.5 flex-wrap z-10">
              {profile.profile?.archetype && (
                <span className="px-4 py-2 rounded-xl bg-[#002121] text-[#FFD700] text-[10px] font-black uppercase tracking-[0.25em] border border-[#FFD700]/20 shadow-xl">
                  {profile.profile.archetype.replace(/-/g, " ")}
                </span>
              )}
              {specializations.map((spec) => (
                <span key={spec} className="px-4 py-2 rounded-xl bg-[#002121] text-[#3FB5B5] text-[10px] font-black uppercase tracking-[0.25em] border border-[#007373]/20 shadow-xl">
                  {spec.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          )}

  {/* Goal + Tip Panel */}
      {profile.profile?.goalTarget && (
        <div className="pt-2 max-w-xl flex flex-col gap-4">
          <GoalBar goal={goal} />
          {!isOwnProfile && profile.role !== "FAN" && (
            <TipPanel creatorId={creatorId} />
          )}
        </div>
      )}

          {/* Display Name */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">
            {safeDisplayName}
          </h1>

          {/* Bio */}
          <div className="pt-8 border-t border-[#004545]">
            <p className="text-xl text-[#ABE1E1] leading-relaxed max-w-4xl mb-10">
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

function TipPanel({ creatorId }: { creatorId: string }) {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState("");
  const [tipError, setTipError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { mutateAsync, isPending } = useTip();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s._hasHydrated);
  const isLoggedIn = hydrated && !!user;
  const valid = isValidUsdc(amount);

  const handlePreset = useCallback((p: number) => {
    setAmount(p);
    setTipError(null);
    setSuccess(false);
  }, []);

  const submit = useCallback(async () => {
    setTipError(null);
    if (!valid) {
      setTipError("Amount must be between 0.5 and 10,000 USDC.");
      return;
    }
    if (!isLoggedIn) {
      setTipError("Log in to send a tip.");
      return;
    }

    try {
      await mutateAsync({ creatorId, amount, message: message.trim() || undefined });
      toast.push({ type: "success", text: `Thank you! ${amount} USDC sent.` });
      track("tip_success", { creatorId, amount });
      setSuccess(true);
      setMessage("");
      setTimeout(() => setSuccess(false), 4000);
    } catch (e: unknown) {
      const { msg } = normalize(e);
      setTipError(msg || "Failed to process tip.");
      toast.push({ type: "error", text: "Failed to process tip." });
    }
  }, [valid, isLoggedIn, creatorId, amount, message, mutateAsync, toast]);

  return (
    <div className="bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md space-y-4">
      <div className="flex gap-2 flex-wrap">
        {TIP_PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePreset(p)}
            className={clsx(
              "w-12 h-12 rounded-lg font-heading font-bold text-sm tracking-wider transition-all",
              amount === p
                ? "bg-gradient-to-r from-gold-400 to-gold-300 text-teal-900 shadow-md"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:border-white/20",
            )}
          >
            ${p}
          </button>
        ))}
      </div>

      <AmountSlider value={amount} min={1} max={100} onChange={(v) => { setAmount(v); setTipError(null); setSuccess(false); }} />

      <div>
        <input
          type="text"
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message (optional)"
          className="w-full h-10 px-4 rounded-[6px] font-body text-base bg-teal-800 text-teal-25 placeholder:text-teal-100 border border-teal-700 hover:border-teal-450 focus:border-gold-300 focus:shadow-[0_0_0_1px_var(--teal-200),0_0_0_4px_rgba(255,215,0,0.25)] outline-none transition-all duration-200"
        />
        <p className="text-right text-[10px] text-teal-500/30 mt-1 tnum">
          {message.length}/{MAX_MESSAGE}
        </p>
      </div>

      {tipError && <p className="text-red-300 text-sm">{tipError}</p>}
      {success && (
        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-300">
          Tip sent successfully!
        </div>
      )}

      <Button
        onClick={submit}
        disabled={isPending || !valid}
        variant="primary"
        fullWidth
        loading={isPending}
        size="md"
        leftIcon={!isPending ? <Send size={16} /> : undefined}
      >
        {isPending ? "Sending..." : `Send ${valid ? `${amount.toFixed(2)} USDC` : ""}`}
      </Button>

      {!isLoggedIn && (
        <p className="text-center text-xs text-teal-500/40">
          Log in to send a tip
        </p>
      )}
    </div>
  );
}
