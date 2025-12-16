"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import IndustrySelector from "@/components/onboarding/IndustrySelector";
import apiClient from "@/lib/apiClient";

export default function Step1() {
  const [saving, setSaving] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const { data } = await apiClient.get("/api/onboarding/creator/status");
        if (data?.profile?.industry) {
          const saved = data.profile.industry.split(",").filter(Boolean);
          setSelectedIndustries(saved);
        }
      } catch (err) {
        console.error("Failed to load status", err);
      }
    };
    loadStatus();
  }, []);

  const saveData = async (industriesToSave: string[]) => {
    if (industriesToSave.length === 0) return;

    setSaving(true);
    try {
      await apiClient.post("/api/onboarding/creator/step-1", {
        industry: industriesToSave.join(","),
      });

      location.assign("/onboarding/creator/step-2");
    } catch (error) {
      console.error("Failed to save step 1", error);
      setSaving(false);
      alert("Something went wrong. Try again.");
    }
  };

  const handleSelect = (newSelection: string[]) => {
    setSelectedIndustries(newSelection);

    if (newSelection.length === 3) {
      saveData(newSelection);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveData(selectedIndustries);
  };

  return (
    <OnboardingShell
      step={1}
      title="Select categories that best describe your content (max 3)"
    >
      <form className="space-y-10" onSubmit={onSubmit} noValidate>
        <div className="space-y-4">
          <IndustrySelector
            value={selectedIndustries}
            onSelectAction={handleSelect}
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
            disabled={selectedIndustries.length === 0}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
