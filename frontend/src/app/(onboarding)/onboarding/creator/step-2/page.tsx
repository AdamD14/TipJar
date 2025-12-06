"use client";
import React, { useState } from "react";
import Link from "next/link";
import OnboardingShell from "@/components/layout/OnboardingShell";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import GoalBar from "@/components/profile/GoalBar";

import apiClient from "@/lib/apiClient";

export default function Step2() {
  const [saving, setSaving] = useState(false);
  
  // Stan lokalny do podglądu na żywo
  const [goalLabel, setGoalLabel] = useState("New microphone");
  const [goalTarget, setGoalTarget] = useState(1000);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const bio = formData.get("bio") as string;
    
    try {
      await apiClient.post("/api/onboarding/creator/step2", {
          bio,
          goalLabel,
          goalTarget,
          currency: "USDC"
      });
      
      location.assign("/onboarding/creator/step-3");
    } catch (error) {
      console.error("Failed to save step 2", error);
      setSaving(false);
      alert("Failed to save. Please try again.");
    }
  }

  return (
    <OnboardingShell 
      step={2} 
      title="Set your Goal" 
      subtitle="Tell fans what you are raising money for. Transparency increases support."
    >
      <form className="space-y-8" onSubmit={onSubmit} noValidate>
        
        <Field 
          label="Short Bio" 
          htmlFor="bio" 
          hint="Keep it punchy. Who are you and what do you create? (Max 280 chars)"
        >
          <Textarea 
            id="bio" 
            name="bio" 
            maxLength={280} 
            placeholder="I create electronic music and tutorials for aspiring producers..." 
            className="h-32"
          />
        </Field>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-sm font-bold text-white uppercase tracking-wider">Funding Goal</h3>
             <span className="text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">Live Preview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Goal Name" htmlFor="goalLabel">
              <Input 
                id="goalLabel" 
                name="goalLabel" 
                value={goalLabel}
                onChange={(e) => setGoalLabel(e.target.value)}
                placeholder="e.g. New Camera" 
              />
            </Field>
            <div className="grid grid-cols-2 gap-2">
               <Field label="Amount" htmlFor="goalAmount">
                 <Input 
                   id="goalAmount" 
                   name="goalAmount" 
                   type="number" 
                   min={1} 
                   value={goalTarget}
                   onChange={(e) => setGoalTarget(Number(e.target.value))}
                 />
               </Field>
               <Field label="Currency" htmlFor="currency">
                 <Input disabled value="USDC" className="opacity-60 cursor-not-allowed text-center" />
               </Field>
            </div>
          </div>

          {/* Podgląd komponentu GoalBar */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-white/40 mb-3">How it looks to your fans:</p>
            <GoalBar 
              current={0} 
              target={goalTarget || 100} 
              label={goalLabel || "My Goal"} 
              accent="#FFD700"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link href="/onboarding/creator/step-1">
            <Button variant="ghost" type="button">← Back</Button>
          </Link>
          <Button type="submit" variant="gold" size="lg" loading={saving} className="min-w-[140px]">
            Next Step →
          </Button>
        </div>
      </form>
    </OnboardingShell>
  );
}
