"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import SocialConnect from "@/components/onboarding/SocialConnect";
import apiClient from "@/lib/apiClient";

export default function Step3() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  // Track connected socials
  const [connectedSocials, setConnectedSocials] = useState<string[]>([]);
  // Avoid re-triggering on same param
  const processedRef = React.useRef<string | null>(null);

  useEffect(() => {
    const connected = searchParams.get("connected");
    if (connected && connected !== processedRef.current) {
      if (!connectedSocials.includes(connected)) {
        setConnectedSocials((prev) => [...prev, connected]);
        // Optional: show toast or success message
      }
      processedRef.current = connected;
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, connectedSocials]);

  const handleConnect = (platformId: string) => {
    // If already connected, maybe disconnect? For now, just ignore or optional alert
    if (connectedSocials.includes(platformId)) {
      if (confirm(`Disconnect ${platformId}?`)) {
        setConnectedSocials((prev) => prev.filter((p) => p !== platformId));
      }
      return;
    }

    const returnTo = window.location.pathname;

    if (platformId === "twitch") {
      // Connect to real backend
      const state = {
        role: "CREATOR",
        timestamp: Date.now(),
        returnTo: `/onboarding/creator/step-3?connected=twitch`,
      };
      const stateEncoded = btoa(JSON.stringify(state));
      // Assuming backend is at localhost:3001/api/v1 or via proxy
      // Using explicit URL for now or relative if proxied.
      // Better to use env var for API URL but hardcoding localhost for dev per request context is often safer if env is unknown
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
      window.location.href = `${apiUrl}/auth/twitch?state=${stateEncoded}`;
      return;
    }

    // Redirect to mock auth for others
    window.location.href = `/api/mock-social-auth?platform=${platformId}&returnTo=${returnTo}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      await apiClient.post("/api/v1/creator/onboarding/step-3", {
        bio,
        websiteUrl: website,
        // If the backend supported saving socials, we would send them here:
        // socials: connectedSocials
      });
      router.push("/onboarding/creator/step-4");
    } catch (error) {
      console.error("Failed to save step 3", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OnboardingShell step={3} title="Tell us about yourself">
      <form className="max-w-6xl mx-auto w-full" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT COLUMN - SOCIALS */}
          <div className="order-2 lg:order-1 space-y-4">
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
              />
            </div>
          </div>

          {/* RIGHT COLUMN - BIO & WEBSITE */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="lg:sticky lg:top-24 space-y-8">
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
