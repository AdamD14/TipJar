"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarUploader from "@/components/onboarding/AvatarUploader";
import { Loader2 } from "lucide-react";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";

export default function Step2() {
  const { loading: guardLoading } = useCreatorGuard(2);
  const [saving, setSaving] = useState(false);
  const [isReadyToAdvance, setIsReadyToAdvance] = useState(false);
  const [existingAvatars, setExistingAvatars] = useState<string[]>([]);

  useEffect(() => {
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
    fetchStatus();
    return () => {
      mounted = false;
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

  if (guardLoading) {
    return (
      <OnboardingShell step={2} title="Upload your Avatar">
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-[#FFD700]" />
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell
      step={2}
      title="Upload 3 (optional) photos to unlock your profile's full potential."
    >
      <form className="space-y-6" onSubmit={onNext} noValidate>
        <div className="max-w-5xl mx-auto w-full">
          <AvatarUploader
            onUploadCompleteAction={handleUploadComplete}
            maxSlots={3}
            initialUrls={existingAvatars}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
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
            className="min-w-[180px] px-4"
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
