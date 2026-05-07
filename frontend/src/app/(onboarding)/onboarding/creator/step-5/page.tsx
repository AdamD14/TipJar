"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import confetti from "canvas-confetti";
import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarCarousel from "@/components/ui/AvatarCarousel";
import { GoalBar } from "@/components/GoalBar";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/lib/store/authStore";
import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";

interface SummaryData {
  avatarUrl?: string;
  avatarUrls?: string[];
  displayName?: string;
  username?: string;
  profile?: {
    goalLabel?: string;
    goalTarget?: number;
    goalDeadline?: string;
  };
}

export default function Step5() {
  const { loading: guardLoading } = useCreatorGuard(5);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);
  const [data, setData] = useState<SummaryData | null>(null);
  const [copied, setCopied] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/v1/creator/onboarding/status");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch status", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const username = data?.username || user?.username || "creator";
  const profileUrl = `tipjar.plus/@${username}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${profileUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const onFinish = async () => {
    setFinishing(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.7 },
      zIndex: 9999,
    });

    try {
      await apiClient.post("/api/v1/creator/onboarding/complete");
      setTimeout(() => {
        router.push(`/@${username}?preview=true`);
      }, 1500);
    } catch (error) {
      console.error("Failed to complete onboarding", error);
      alert("Something went wrong. Please try again.");
      setFinishing(false);
    }
  };

  if (loading || guardLoading) {
    return (
      <OnboardingShell step={5} title="Review & Finish">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </OnboardingShell>
    );
  }

  const avatarUrls =
    data?.avatarUrls && data.avatarUrls.length > 0
      ? data.avatarUrls
      : data?.avatarUrl
        ? [data.avatarUrl]
        : [];

  const displayName = data?.displayName || user?.displayName || `@${username}`;

  return (
    <OnboardingShell step={5} title="You are all set!">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* AVATAR CAROUSEL */}
        <div className="w-full">
          <AvatarCarousel
            avatarUrls={avatarUrls}
            autoRotate
            rotateInterval={20000}
          />
        </div>

        {/* DISPLAY NAME */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-0.5 bg-gradient-to-r from-yellow-200 via-white to-[#ffd700] bg-clip-text text-transparent drop-shadow-lg">
          {displayName}
        </h2>

        {/* PROFILE LINK */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 mt-2 group"
        >
          <span className="text-lg md:text-xl bg-gradient-to-r from-teal-300 via-white to-teal-400 bg-clip-text text-transparent">
            {profileUrl}
          </span>
          {copied ? (
            <Check size={18} className="text-teal-400" />
          ) : (
            <Copy
              size={18}
              className="text-white/50 group-hover:text-white transition-colors"
            />
          )}
        </button>

        {/* --- PREMIUM PREVIEW SECTION --- */}
        <div className="w-full mt-16 space-y-12 relative border-t border-white/5 pt-12">
          <div className="flex items-center gap-4 text-yellow-500/50 mb-8 px-4">
            <div className="h-px bg-yellow-500/30 flex-1"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Live Page Preview
            </span>
            <div className="h-px bg-yellow-500/30 flex-1"></div>
          </div>

          {/* Featured In / Verify */}
          <section className="rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="font-semibold text-white/80">Featured in:</span>
              {["Forbes", "TechCrunch", "Wired", "Business Insider"].map(
                (logo) => (
                  <span
                    key={logo}
                    className="font-bold text-white/40 hover:text-yellow-500 transition-colors cursor-default"
                  >
                    {logo}
                  </span>
                ),
              )}
              <div className="hidden lg:flex ml-auto items-center gap-6 border-l border-white/10 pl-6">
                <span className="flex items-center gap-2 font-semibold text-white/60 whitespace-nowrap">
                  <ShieldCheck size={14} className="text-yellow-500" />
                  Verified Protocol
                </span>
              </div>
            </div>
          </section>

          {/* Core Offer / Goal Preview */}
          <section className="rounded-3xl bg-white/5 p-8 shadow-md ring-1 ring-white/5 border-b-4 border-yellow-500">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="space-y-4 md:w-2/3">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-900/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400 border border-teal-500/20">
                  Flagship Goal
                </span>
                <h2 className="text-3xl font-bold text-white">
                  {data?.profile?.goalLabel || "My Next Big Project"}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Join me in building something extraordinary. Your support
                  directly funds the production quality and frequency of content
                  you love.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2 text-sm text-white/80 pt-2">
                  {[
                    "Early Access to Content",
                    "Exclusive Behind the Scenes",
                    "Direct Community Access",
                    "Supporter Badge",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle
                        size={18}
                        className="text-yellow-500 shrink-0"
                      />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-[#0A0A0B]/60 rounded-2xl p-2 border border-white/10">
                  <GoalBar
                    goal={{
                      title: data?.profile?.goalLabel || "Goal",
                      target: data?.profile?.goalTarget || 1000,
                      current: 0,
                      deadline: data?.profile?.goalDeadline || "",
                    }}
                  />
                  <Button
                    variant="gold"
                    fullWidth
                    className="mt-4 shadow-lg shadow-yellow-500/10"
                  >
                    Support Goal <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* LAUNCH BUTTON */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <Button
            variant="gold"
            size="lg"
            className="px-16 py-4 text-lg shadow-[0_0_30px_-5px_#fbbf2466]"
            onClick={onFinish}
            loading={finishing}
          >
            Launch My Page
          </Button>
          <p className="text-xs text-gray-500">
            By clicking Launch, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
