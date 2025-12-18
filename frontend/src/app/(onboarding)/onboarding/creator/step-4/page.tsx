"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import GoalBar from "@/components/profile/GoalBar";
import apiClient from "@/lib/apiClient";

import { useCreatorGuard } from "@/lib/hooks/useCreatorGuard";

export default function Step4() {
  const { loading: guardLoading } = useCreatorGuard(4);
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [goalLabel, setGoalLabel] = useState("My First Goal");
  const [goalTarget, setGoalTarget] = useState<number>(1000);
  // Optional: track current amount for preview (default 0 or random for visual)
  const [previewAmount] = useState(250);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      await apiClient.post("/api/v1/creator/onboarding/step-4", {
        goalLabel,
        goalTarget: Number(goalTarget),
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
          <div className="animate-spin h-10 w-10 border-4 border-yellow-500 border-t-transparent rounded-full" />
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={4} title="Set your first specific Goal">
      <form className="space-y-8 max-w-3xl mx-auto w-full" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Inputs */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="goalLabel"
                className="block text-sm font-medium text-gray-300"
              >
                Goal Name
              </label>
              <input
                id="goalLabel"
                type="text"
                value={goalLabel}
                onChange={(e) => setGoalLabel(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
                placeholder="e.g. New Camera, Rent, Charity"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="goalTarget"
                className="block text-sm font-medium text-gray-300"
              >
                Target Amount ($)
              </label>
              <input
                id="goalTarget"
                type="number"
                min="1"
                value={goalTarget}
                onChange={(e) => setGoalTarget(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
              />
            </div>
          </div>

          {/* RIGHT: Preview */}
          <div className="flex flex-col justify-center space-y-4">
            <span className="text-xs font-mono uppercase text-gray-500 tracking-widest text-center">
              Preview
            </span>
            <div className="p-6 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-sm">
              <GoalBar
                label={goalLabel || "Goal Name"}
                target={goalTarget || 100}
                current={previewAmount}
                accent="#FFD700"
              />
            </div>
            <p className="text-xs text-center text-gray-600">
              This is how your goal will appear on your profile.
            </p>
          </div>
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
            disabled={!goalLabel || !goalTarget}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
