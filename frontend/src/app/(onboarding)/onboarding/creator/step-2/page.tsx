"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarUploader from "@/components/onboarding/AvatarUploader";
import { Loader2 } from "lucide-react";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";

export default function Step2() {
  const { loading: guardLoading } = useCreatorGuard(2);
  const [saving, setSaving] = useState(false);
  const [isReadyToAdvance, setIsReadyToAdvance] = useState(false);
  const [sessionData, setSessionData] = useState<{
    token: string;
    userId: string;
  } | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const [existingAvatars, setExistingAvatars] = useState<string[]>([]);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function fetchStatus() {
      try {
        const { default: client } = await import("@/lib/apiClient");
        const { data } = await client.get("/api/v1/creator/onboarding/status");
        if (mounted && data && data.avatarUrls) {
          setExistingAvatars(data.avatarUrls);
          if (data.avatarUrls.length > 0) setIsReadyToAdvance(true);
        }
      } catch (err) {
        console.error("Status fetch failed", err);
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && mounted) {
        console.log("Session verified:", session.user.id);
        setSessionData({
          token: session.access_token,
          userId: session.user.id,
        });
        // Fetch status once we have session (although apiClient uses cookie, we sync logic here)
        fetchStatus();
      } else if (mounted) {
        console.warn("No Supabase session in onAuthStateChange");
      }
      if (mounted) setIsLoadingSession(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleUploadComplete = (urls: string[]) => {
    if (urls.length >= 1) {
      setIsReadyToAdvance(true);
    }
  };

  const onNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isReadyToAdvance && !confirm("No photos uploaded? Skip?")) return;

    setSaving(true);
    // Mimic the delay before navigation or perform backend sync if needed
    // In strict implementations we would verify the uploads are linked in DB here

    // For now proceed
    setTimeout(() => {
      location.assign("/onboarding/creator/step-3");
    }, 500);
  };

  if (isLoadingSession || guardLoading) {
    return (
      <OnboardingShell step={2} title="Upload your Avatar">
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-[#FFD700]" />
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={2} title="Upload your Avatar (max 3)">
      <form className="space-y-10" onSubmit={onNext} noValidate>
        <div className="max-w-3xl mx-auto w-full">
          {/* Debug info if needed: {sessionData ? "Logged in" : "No session"} */}
          <AvatarUploader
            authToken={sessionData?.token ?? null}
            userId={sessionData?.userId ?? ""}
            onUploadCompleteAction={handleUploadComplete}
            maxSlots={3}
            initialUrls={existingAvatars}
          />
        </div>

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
            disabled={!isReadyToAdvance}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
