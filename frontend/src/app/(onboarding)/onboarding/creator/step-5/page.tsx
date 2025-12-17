"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import GoalBar from "@/components/profile/GoalBar";
import apiClient from "@/lib/apiClient";
import { SocialIcon } from "@/components/onboarding/SocialConnect";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface SummaryData {
  avatarUrl?: string;
  avatarUrls?: string[];
  profile?: {
    industry: string;
    bio: string;
    goalLabel: string;
    goalTarget: number;
  };
}

export default function Step5() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);
  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/onboarding/creator/status");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch status", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onFinish = async () => {
    setFinishing(true);
    try {
      await apiClient.post("/api/onboarding/creator/complete");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to complete onboarding", error);
      alert("Something went wrong. Please try again.");
      setFinishing(false);
    }
  };

  if (loading) {
    return (
      <OnboardingShell step={5} title="Review & Finish">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </OnboardingShell>
    );
  }

  const avatars =
    data?.avatarUrls && data.avatarUrls.length > 0
      ? data.avatarUrls
      : data?.avatarUrl
      ? [data.avatarUrl]
      : [];

  return (
    <OnboardingShell step={5} title="You are all set!">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* CARD PREVIEW */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
            {/* AVATAR CAROUSEL */}
            <div className="w-full md:w-1/3 shrink-0">
              {avatars.length > 0 ? (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  className="w-full h-64 rounded-2xl border-4 border-white/10 shadow-2xl overflow-hidden"
                >
                  {avatars.map((url, i) => (
                    <SwiperSlide key={i} className="relative w-full h-full">
                      <Image
                        src={url}
                        alt={`Avatar ${i}`}
                        fill
                        className="object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-64 rounded-2xl border-4 border-white/10 shadow-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-4xl text-white/20">?</span>
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-6 w-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {data?.profile?.industry || "Creator"}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {data?.profile?.bio || "No bio provided."}
                </p>
              </div>

              {/* GOAL */}
              {data?.profile?.goalLabel && (
                <div className="pt-4 border-t border-white/5">
                  <GoalBar
                    label={data.profile.goalLabel}
                    target={data.profile.goalTarget || 100}
                    current={0}
                    accent="#FFD700"
                  />
                </div>
              )}

              {/* SOCIALS MOCK */}
              <div className="flex items-center gap-4 pt-4 text-gray-500">
                <span className="text-xs uppercase tracking-wider">
                  Connected:
                </span>
                <div className="flex gap-2">
                  <SocialIcon id="youtube" className="w-5 h-5 opacity-50" />
                  <SocialIcon id="instagram" className="w-5 h-5 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <Button
            variant="gold"
            size="lg"
            className="w-full md:w-auto px-12 py-4 text-lg shadow-[0_0_30px_-5px_#fbbf2466]"
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
