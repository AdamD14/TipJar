// src/app/(onboarding)/onboarding/creator/step-1/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import ArchetypeSelector from "@/components/onboarding/ArchetypeSelector";
import { api } from "@/lib/api";

export default function Step1() {
  const [saving, setSaving] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState<string>("");

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const data = await api<{ profile: { industry?: string } }>(
          "/api/v1/creator/onboarding/status"
        );
        if (data?.profile?.industry) {
          setSelectedArchetype(data.profile.industry);
        }
      } catch (err) {
        console.error("Failed to load status", err);
      }
    };
    loadStatus();
  }, []);

  const saveData = async (archetype: string) => {
    if (!archetype) return;

    setSaving(true);
    try {
      await api<void>("/api/v1/creator/onboarding/identity", {
        method: "PATCH",
        body: JSON.stringify({
          industry: archetype,
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
    setSelectedArchetype(archetype);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveData(selectedArchetype);
  };

  return (
    <OnboardingShell
      step={1}
      title="Choose your creator archetype"
    >
      <form className="space-y-10" onSubmit={onSubmit} noValidate>
        <div 
          className="space-y-4"
          onClick={(e) => {
            // Deselect when clicking on empty space (not on a button)
            if ((e.target as HTMLElement).closest('button') === null) {
              setSelectedArchetype("");
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
            disabled={!selectedArchetype}
          >
            Next Step
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
