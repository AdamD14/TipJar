"use client";
import React from "react";

export default function OnboardingShell({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  const pct = Math.min(100, Math.max(0, Math.round((step / 5) * 100)));
  return (
    <main className="min-h-screen bg-[#001F1F] px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-white/80">
            <span>Onboarding</span>
            <span>
              Step {step} / 5
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#FFD700]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="mt-4">{children}</div>
      </div>
    </main>
  );
}

