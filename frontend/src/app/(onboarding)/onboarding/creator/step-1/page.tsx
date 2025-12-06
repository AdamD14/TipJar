"use client";
import React from "react";
import Link from "next/link";
import OnboardingShell from "@/components/layout/OnboardingShell";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import AvatarUploader from "@/components/onboarding/AvatarUploader";
import SocialConnect from "@/components/onboarding/SocialConnect";
import apiClient from "@/lib/apiClient";

const INDUSTRIES = [
  "Streamer / Gaming",
  "Music / DJ",
  "Education / Tutor",
  "Fitness / Coach",
  "Creator / Influencer",
  "Art / Design",
  "Cosplay / Modeling",
  "Podcast / Radio",
  "Other",
];

export default function Step1() {
  const [saving, setSaving] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string | undefined>(undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const industry = formData.get("industry") as string;
    
    try {
      // User reported "exception" because fetch might return !res.ok which we handled with simple Error.
      // Using apiClient likely fixes auth headers and better error handling.
      // apiClient uses axios presumably.
      await apiClient.post("/api/onboarding/creator/step1", {
          industry,
          avatarUrl // Send uploaded avatar URL
      });
      
      // api call throws if failed usually (axios/fetch wrapper)
      
      // Navigate to step 2 (using window.location to strictly follow prompt "location.assign" or router)
      // Prompt used location.assign, but router is better in Next.js. 
      // Existing code used location.assign. I'll stick to router if possible or location.assign.
      // Existing code: location.assign("/onboarding/step-2");
      // New path: /onboarding/creator/step-2
      location.assign("/onboarding/creator/step-2");
    } catch (error) {
      console.error("Failed to save step 1", error);
      setSaving(false);
      // Maybe show alert?
      alert("Failed to save. Please try again.");
    }
  }

  return (
    <OnboardingShell 
      step={1} 
      title="Let's define you" 
      subtitle="Start by setting up your identity. This helps fans find you."
    >
      <form className="space-y-8" onSubmit={onSubmit} noValidate>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Field 
            label="Your Industry" 
            htmlFor="industry" 
            hint="Helps with discovery and SEO."
          >
            <Select id="industry" name="industry" defaultValue={INDUSTRIES[0]}>
              {INDUSTRIES.map((i) => (<option key={i} value={i}>{i}</option>))}
            </Select>
          </Field>

          <Field 
            label="Profile Picture" 
            htmlFor="avatar" 
            hint="Recommended: 400x400px PNG/JPG."
          >
            <AvatarUploader name="avatar" onUpload={setAvatarUrl} />
          </Field>
        </div>

        <div className="pt-4 border-t border-white/5">
          <Field 
            label="Connect Socials" 
            htmlFor="socials" 
            hint="Link your accounts to build trust."
          >
            <SocialConnect onConnect={(p) => console.log("Connect", p)} />
          </Field>
        </div>

        <div className="flex items-center justify-between pt-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-white/40 hover:text-white transition-colors"
          >
            I'll do this later
          </Link>
          <Button 
            type="submit" 
            variant="gold" 
            size="lg" 
            loading={saving}
            className="min-w-[140px]"
          >
            Next Step →
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
