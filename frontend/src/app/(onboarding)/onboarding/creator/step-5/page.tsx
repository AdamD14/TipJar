"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check } from "lucide-react";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarCarousel from "@/components/ui/AvatarCarousel";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/lib/store/authStore";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";

interface SummaryData {
  avatarUrl?: string;
  avatarUrls?: string[];
  displayName?: string;
  username?: string;
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
    try {
      await apiClient.post("/api/v1/creator/onboarding/complete");
      router.push(`/@${username}`);
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

  // Get avatar URLs from API response
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

        {/* LAUNCH BUTTON */}
        <div className="flex flex-col items-center gap-4 mt-10">
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
