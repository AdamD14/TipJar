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
        returnTo: `/onboarding/creator/step-3?connected=twitch`
      };
      const stateEncoded = btoa(JSON.stringify(state));
      // Assuming backend is at localhost:3001/api/v1 or via proxy
      // Using explicit URL for now or relative if proxied.
      // Better to use env var for API URL but hardcoding localhost for dev per request context is often safer if env is unknown
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
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
      await apiClient.post("/api/onboarding/creator/step-3", {
        bio,
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
      <form className="space-y-8 max-w-3xl mx-auto w-full" onSubmit={onSubmit}>
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
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 resize-none"
              placeholder="I create awesome content about..."
              maxLength={200}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500 pointer-events-none">
              {bio.length}/200
            </div>
          </div>
        </div>

        {/* SOCIAL CONNECT SECTION */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="text-sm font-medium text-gray-300">
            Connect your socials
          </h3>
          <SocialConnect
            onConnectAction={handleConnect}
            connected={connectedSocials}
          />
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
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
      </form>
    </OnboardingShell>
  );
}
