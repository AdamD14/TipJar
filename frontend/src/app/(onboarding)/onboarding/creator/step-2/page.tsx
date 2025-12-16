"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarUploader from "@/components/onboarding/AvatarUploader";

import apiClient from "@/lib/apiClient";

export default function Step2() {
  const [saving, setSaving] = useState(false);
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);
  const [sessionData, setSessionData] = useState<{
    token: string;
    userId: string;
  } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSessionData({
          token: session.access_token,
          userId: session.user.id,
        });
      }
    };
    getSession();
  }, [supabase]);

  const saveData = async (url: string) => {
    setSaving(true);
    try {
      await apiClient.post("/api/onboarding/creator/step-2", {
        avatarUrl: url,
      });

      location.assign("/onboarding/creator/step-3");
    } catch (error) {
      console.error("Failed to save step 2", error);
      setSaving(false);
      alert("Failed to save. Please try again.");
    }
  };

  const handleUploadComplete = (urls: string[]) => {
    setAvatarUrls(urls);

    if (urls.length === 3) {
      saveData(urls[0]);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (avatarUrls.length > 0) {
      saveData(avatarUrls[0]);
    }
  };

  return (
    <OnboardingShell step={2} title="Upload your Avatar (max 3)">
      <form className="space-y-10" onSubmit={onSubmit} noValidate>
        <div className="max-w-3xl mx-auto w-full">
          <AvatarUploader
            authToken={sessionData?.token ?? null}
            userId={sessionData?.userId ?? ""}
            onUploadCompleteAction={handleUploadComplete}
            maxSlots={3}
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
            disabled={avatarUrls.length === 0}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
