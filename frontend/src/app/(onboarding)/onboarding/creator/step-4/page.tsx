"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import OnboardingShell from "@/components/ui/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import TargetBar from "@/components/onboarding/TargetBar";
import Spinner from "@/components/ui/Spinner";
import apiClient from "@/lib/apiClient";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";

interface Goal {
  title: string;
  target: number;
  current: number;
  deadline: string;
}

export default function Step4() {
  const { loading: guardLoading } = useCreatorGuard(4);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [publishedGoal, setPublishedGoal] = useState<Goal | null>(null);

  const handlePublish = (goal: Goal) => {
    setPublishedGoal(goal);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!publishedGoal) {
      alert("Please set your target first.");
      return;
    }
    setSaving(true);

    try {
      await apiClient.post("/api/v1/creator/onboarding/step-4", {
        goalLabel: publishedGoal.title,
        goalTarget: publishedGoal.target,
        goalDeadline: publishedGoal.deadline,
      });
      router.push("/onboarding/creator/step-5");
    } catch (error) {
      console.error("Failed to save step 4", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (guardLoading) {
    return (
      <OnboardingShell step={4} title="Checking status...">
        <div className="flex justify-center py-20">
          <Spinner size="md" />
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={4} title="Set your first specific Goal">
      <form className="space-y-8 w-full" onSubmit={onSubmit}>
        <TargetBar onPublish={handlePublish} />

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-8 border-t border-teal-700/20">
          <Link
            href="/"
            className="text-sm text-text-ds-tertiary hover:text-white transition-colors"
          >
            Skip for now
          </Link>
          <Button
            type="submit"
            variant={publishedGoal ? "primary" : "ghost"}
            size="lg"
            loading={saving}
            className={`min-w-[180px] px-8 ${
              !publishedGoal
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!publishedGoal}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
