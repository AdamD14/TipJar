"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import SocialConnect from "@/components/onboarding/SocialConnect";
import SpecializationPicker from "@/components/onboarding/SpecializationPicker";
import apiClient from "@/lib/apiClient";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";
import { useOnboardingStore } from "@/lib/store/onboardingStore";

export default function Step3() {
  const { loading: guardLoading } = useCreatorGuard(3);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  // Industry selection (filtered by archetype)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  // Track connected socials
  const [connectedSocials, setConnectedSocials] = useState<string[]>([]);
  // Avoid re-triggering on same param
  const processedRef = React.useRef<string | null>(null);

  // Get archetype from Zustand store
  const archetype = useOnboardingStore((state) => state.data.archetype);

  useEffect(() => {
    const connected = searchParams.get("connected");
    if (connected && connected !== processedRef.current) {
      if (!connectedSocials.includes(connected)) {
        setConnectedSocials((prev) => [...prev, connected]);
      }
      processedRef.current = connected;
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, connectedSocials]);

  // Restore state from storage if returning from auth
  useEffect(() => {
    const savedName = sessionStorage.getItem("step3_name");
    const savedBio = sessionStorage.getItem("step3_bio");
    const savedWebsite = sessionStorage.getItem("step3_website");
    if (savedName) setDisplayName(savedName);
    if (savedBio) setBio(savedBio);
    if (savedWebsite) setWebsite(savedWebsite);
  }, []);

  const handleConnect = (platformId: string) => {
    if (connectedSocials.includes(platformId)) {
      if (confirm(`Disconnect ${platformId}?`)) {
        setConnectedSocials((prev) => prev.filter((p) => p !== platformId));
      }
      return;
    }

    // SAVE STATE before redirecting
    sessionStorage.setItem("step3_name", displayName);
    sessionStorage.setItem("step3_bio", bio);
    sessionStorage.setItem("step3_website", website);

    const returnTo = window.location.pathname;

    if (platformId === "twitch") {
      const state = {
        role: "CREATOR",
        timestamp: Date.now(),
        returnTo: `/onboarding/creator/step-3?connected=twitch`,
      };
      const stateEncoded = btoa(JSON.stringify(state));
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
      window.location.href = `${apiUrl}/auth/twitch?state=${stateEncoded}`;
      return;
    }

    window.location.href = `/api/mock-social-auth?platform=${platformId}&returnTo=${returnTo}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      await apiClient.post("/api/v1/creator/onboarding/step-3", {
        displayName,
        bio,
        websiteUrl: website,
        industries: selectedIndustries,
        connectedSocials: connectedSocials,
      });
      // Clear storage on success
      sessionStorage.removeItem("step3_name");
      sessionStorage.removeItem("step3_bio");
      sessionStorage.removeItem("step3_website");
      router.push("/onboarding/creator/step-4");
    } catch (error) {
      console.error("Failed to save step 3", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
      <form className="max-w-6xl mx-auto w-full" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT COLUMN - INDUSTRY & SOCIALS */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* SPECIALIZATION SECTION */}
            {archetype && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Choose your specialization
                </h3>
                <SpecializationPicker
                  archetype={archetype}
                  value={selectedIndustries}
                  onSelect={setSelectedIndustries}
                />
              </div>
            )}

            {/* SOCIALS SECTION */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Connect your socials
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Link your accounts to display them on your profile.
              </p>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 lg:p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                <SocialConnect
                  onConnectAction={handleConnect}
                  connected={connectedSocials}
                  filterByArchetype={archetype}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - INFO */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* NAME SECTION */}
              <div className="space-y-4">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 text-base"
                  placeholder="Your Name or Brand"
                />
              </div>

              {/* BIO SECTION */}
              <div className="space-y-4">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-300"
                >
                  Bio{" "}
                  <span className="text-gray-500 text-xs ml-2">
                    (Max 200 characters)
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 resize-none text-lg"
                    placeholder="I create awesome content about..."
                    maxLength={200}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500 pointer-events-none">
                    {bio.length}/200
                  </div>
                </div>
              </div>

              {/* WEBSITE URL SECTION */}
              <div className="space-y-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-300"
                >
                  Website URL{" "}
                  <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                </label>
                <input
                  id="website"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 text-base"
                  placeholder="your-website.com"
                />
              </div>

              {/* FOOTER (In right column for easy access) */}
              <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-8">
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Skip for now
                </Link>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  loading={saving}
                  className="min-w-[180px] px-8"
                >
                  Next Step
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </OnboardingShell>
  );
}
