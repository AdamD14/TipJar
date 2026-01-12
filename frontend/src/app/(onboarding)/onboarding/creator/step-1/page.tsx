// src/app/(onboarding)/onboarding/creator/step-1/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import ArchetypeSelector from "@/components/onboarding/ArchetypeSelector";
import { api } from "@/lib/api";
import { useOnboardingStore } from "@/lib/store/onboardingStore";

export default function Step1() {
  const [saving, setSaving] = useState(false);

  // Zustand store
  const { data, setArchetype } = useOnboardingStore();
  const selectedArchetype = data.archetype || "";

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await api<{
          profile: { archetype?: string; industry?: string };
        }>("/api/v1/creator/onboarding/status");
        // If archetype exists in DB but not in store, sync it
        if (res?.profile?.archetype && !data.archetype) {
          setArchetype(res.profile.archetype);
        }
      } catch (err) {
        console.error("Failed to load status", err);
      }
    };
    loadStatus();
  }, [data.archetype, setArchetype]);

  const saveData = async (archetype: string) => {
    if (!archetype) return;

    setSaving(true);
    try {
      await api<void>("/api/v1/creator/onboarding/identity", {
        method: "PATCH",
        body: JSON.stringify({
          archetype: archetype,
          industry: archetype, // Keep industry for backward compatibility
        }),
      });

      location.assign("/onboarding/creator/step-2");
    } catch (error) {
      console.error("Failed to save step 1", error);
      setSaving(false);
      alert("Something went wrong. Try again.");
    }
  };

  const handleSelect = (archetype: string) => {
    setArchetype(archetype); // Save to Zustand
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveData(selectedArchetype);
  };

  return (
    <OnboardingShell step={1} title="Choose your creator archetype">
      <form className="space-y-10" onSubmit={onSubmit} noValidate>
        <div
          className="space-y-4"
          onClick={(e) => {
            // Deselect when clicking on empty space (not on a button)
            if ((e.target as HTMLElement).closest("button") === null) {
              setArchetype("");
            }
          }}
        >
          <ArchetypeSelector
            value={selectedArchetype}
            onSelectAction={handleSelect}
          />
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <Link
            href="/"
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
            disabled={!selectedArchetype}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
