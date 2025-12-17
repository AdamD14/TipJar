"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import AvatarUploader from "@/components/onboarding/AvatarUploader";

export default function Step2() {
  const [saving, setSaving] = useState(false);
  const [isReadyToAdvance, setIsReadyToAdvance] = useState(false); // Enable next button when uploads done
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

  // Handle uploaded URLs (user info only, we trust backend created MediaRecords)
  const handleUploadComplete = (urls: string[]) => {
    // If backend already saved records, we can just proceed or enable button
    if (urls.length >= 1) {
      // Min 1 photo? User requested 3 max.
      setIsReadyToAdvance(true);
    }
  };

  const onNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isReadyToAdvance && !confirm("No photos uploaded? Skip?")) return;

    setSaving(true);
    // Notify completion? Or just navigate.
    // User said: "next step sie uaktywani... po 30sek lub jak skonczy"
    // We navigate to step 3.

    // Optional: Call update status if needed, assuming uploads are async processed
    // await apiClient.post("/api/creator/onboarding/step-2-complete")...
    // For now, just navigate.

    setTimeout(() => {
      location.assign("/onboarding/creator/step-3");
    }, 500);
  };

  return (
    <OnboardingShell step={2} title="Upload your Avatar (max 3)">
      <form className="space-y-10" onSubmit={onNext} noValidate>
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
            disabled={!isReadyToAdvance}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
