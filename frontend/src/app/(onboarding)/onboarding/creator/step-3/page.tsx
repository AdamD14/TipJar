"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import OnboardingShell from "@/components/ui/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import SpecializationPicker from "@/components/onboarding/SpecializationPicker";
import TwitchConnect from "@/components/creator/TwitchConnect";
import apiClient from "@/lib/apiClient";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { useAuthStore } from "@/lib/store/authStore";

export default function Step3() {
  const { loading: guardLoading } = useCreatorGuard(3);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  // Get archetype from Zustand store
  const archetype = useOnboardingStore((state) => state.data.archetype);
  // Get username from auth store as fallback
  const user = useAuthStore((state) => state.user);
  const username = user?.username || "";

  // Restore state from session storage
  useEffect(() => {
    const savedName = sessionStorage.getItem("step3_name");
    if (savedName) setDisplayName(savedName);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    // Use username if displayName is empty
    const finalDisplayName = displayName.trim() || username;

    try {
      await apiClient.post("/api/v1/creator/onboarding/step-3", {
        displayName: finalDisplayName,
        bio: bio.trim() || undefined,
        specializations: selectedSpecializations,
      });
      sessionStorage.removeItem("step3_name");
      router.push("/onboarding/creator/step-4");
    } catch (error) {
      console.error("Failed to save step 3", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Button enabled when at least 1 specialization selected
  const canProceed = selectedSpecializations.length >= 1;

  if (guardLoading) {
    return (
      <OnboardingShell step={3} title="Checking status...">
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-yellow-500 border-t-transparent rounded-full" />
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={3} title="Tell us about yourself">
      <form className="max-w-4xl mx-auto w-full space-y-10" onSubmit={onSubmit}>
        {/* 1. DISPLAY NAME */}
        <div className="space-y-3">
          <label
            htmlFor="displayName"
            className="block text-lg font-medium text-white"
          >
            Display Name
            <span className="text-gray-500 text-sm ml-2 font-normal">
              (your public display name)
            </span>
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 text-base"
            placeholder={username || "Your Name or Brand"}
          />
        </div>

        {/* 1.5 BIO */}
        <div className="space-y-3">
          <label htmlFor="bio" className="block text-lg font-medium text-white">
            Bio
            <span className="text-gray-500 text-sm ml-2 font-normal">
              (optional, max 200 words)
            </span>
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => {
              const words = e.target.value.split(/\s+/).filter(Boolean);
              if (words.length <= 200) {
                setBio(e.target.value);
              }
            }}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 text-base resize-none"
            placeholder="Tell your audience a bit about yourself..."
          />
          <p className="text-xs text-gray-498">
            {bio.split(/\s+/).filter(Boolean).length}/200 words
          </p>
        </div>

        {/* 2. CHOOSE YOUR SPECIALIZATION */}
        {archetype && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">
              Choose your specialization
            </h3>
            <SpecializationPicker
              archetype={archetype}
              value={selectedSpecializations}
              onSelect={setSelectedSpecializations}
            />
          </div>
        )}

        {/* 3. CONNECT YOUR SOCIALS - Twitch only */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">
            Connect your socials
          </h3>
          <TwitchConnect />
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Skip for now
          </Link>
          <Button
            type="submit"
            variant="gold"
            size="lg"
            loading={saving}
            disabled={!canProceed}
            className="min-w-[180px] px-8"
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
