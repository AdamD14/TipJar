"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  Sparkles,
  Palette,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

import confetti from "canvas-confetti";
import OnboardingShell from "@/components/ui/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarCarousel from "@/components/ui/AvatarCarousel";
import Spinner from "@/components/ui/Spinner";
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
          <Spinner size="md" />
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
      <div className="max-w-lg mx-auto flex flex-col items-center">
        {/* AVATAR CAROUSEL */}
        <div className="w-full max-w-[280px]">
          <AvatarCarousel
            avatarUrls={avatarUrls}
            autoRotate
            rotateInterval={20000}
          />
        </div>

        {/* DISPLAY NAME */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 text-white text-center">
          {displayName}
        </h2>

        {/* PROFILE LINK — copyable */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 mt-2 group"
        >
          <span className="text-base md:text-lg text-teal-300 font-medium">
            {profileUrl}
          </span>
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy
              size={16}
              className="text-teal-600 group-hover:text-gold-400 transition-colors"
            />
          )}
        </button>

        {/* INFO CARD — what you can do after launch */}
        <div className="w-full mt-8 rounded-2xl border border-teal-700/30 bg-teal-800/50 p-5 space-y-3">
          <h3 className="text-sm font-heading font-semibold text-gold-400 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} />
            After launch you can
          </h3>
          <ul className="space-y-2.5">
            {[
              {
                icon: <Palette size={16} className="text-purple-300 shrink-0" />,
                text: "Customize your profile design, banners & theme",
              },
              {
                icon: <LayoutDashboard size={16} className="text-teal-300 shrink-0" />,
                text: "Manage goals, track supporters & view analytics",
              },
              {
                icon: <Sparkles size={16} className="text-gold-400 shrink-0" />,
                text: "Set up subscriptions, tip alerts & OBS overlays",
              },
            ].map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-3 text-sm text-teal-100/80"
              >
                {item.icon}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* LAUNCH BUTTON */}
        <div className="flex flex-col items-center gap-3 mt-8 w-full">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="shadow-[0_0_30px_-5px_rgba(255,215,0,0.25)]"
            onClick={onFinish}
            loading={finishing}
          >
            Launch My Page
            <ArrowRight size={18} />
          </Button>
          <p className="text-xs text-text-ds-tertiary text-center">
            By clicking Launch, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}
