"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Field from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import AvatarUploader from "@/components/onboarding/AvatarUploader";
import SocialConnect from "@/components/onboarding/SocialConnect";
// IMPORTUJEMY NOWY GRID
import IndustrySelector from "@/components/onboarding/IndustrySelector";
import apiClient from "@/lib/apiClient";

export default function Step1() {
  const [saving, setSaving] = useState(false);

  // Stan formularza
  const [industry, setIndustry] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  // Stan sesji dla uploadera
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

  const handleUploadComplete = (urls: string[]) => {
    if (urls.length > 0) {
      setAvatarUrl(urls[0]);
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!industry) {
      alert("Please choose your category.");
      return;
    }

    setSaving(true);

    try {
      await apiClient.post("/api/onboarding/creator/step1", {
        industry,
        avatarUrl,
      });

      location.assign("/onboarding/creator/step-2");
    } catch (error) {
      console.error("Failed to save step 1", error);
      setSaving(false);
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <OnboardingShell
      step={1}
      title="Select the category that best describes your content. This will help fans find you in Explore."
    >
      <form className="space-y-10" onSubmit={onSubmit} noValidate>
        {/* SEKCJA 1: KATEGORIE (Bento Grid) */}
        <div className="space-y-4">
          <IndustrySelector value={industry} onSelectAction={setIndustry} />
          <input type="hidden" name="industry" value={industry} />
        </div>

        <div className="border-t border-white/5 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* SEKCJA 2: AVATAR (Prawa strona) */}
          <div className="order-2 lg:order-2 w-full">
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">
                Profile Identity
              </label>
              <p className="text-sm text-gray-500">
                Your visual badge on the platform.
              </p>
            </div>

            {sessionData ? (
              <AvatarUploader
                authToken={sessionData.token}
                userId={sessionData.userId}
                onUploadCompleteAction={handleUploadComplete}
                maxSlots={3}
              />
            ) : (
              <div className="h-[250px] w-full flex items-center justify-center border border-dashed border-gray-700 rounded-xl bg-gray-900/30">
                <span className="text-gray-500 animate-pulse">
                  Initializing Studio...
                </span>
              </div>
            )}
          </div>

          {/* SEKCJA 3: SOCIALE (Lewa strona) */}
          <div className="order-1 lg:order-1 space-y-6">
            <Field
              label="Trust & Verification"
              htmlFor="socials"
              hint="Connect at least one account to get verified status."
            >
              <SocialConnect onConnect={(p) => console.log("Connect", p)} />
            </Field>
          </div>
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
            disabled={!industry} // Blokada bez wybranej kategorii
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
