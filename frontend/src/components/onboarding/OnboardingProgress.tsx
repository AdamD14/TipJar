"use client";
import type { OnboardingStatus, OnboardingStepKey } from '@/lib/onboarding';
import Link from 'next/link';

const steps: { key: OnboardingStepKey; href: string; icon: string }[] = [
  { key: 'identity', href: '/creator/onboarding/step-1-identity', icon: '👤' },
  { key: 'bio', href: '/creator/onboarding/step-2-bio-social', icon: '📝' },
  { key: 'tiers', href: '/creator/onboarding/step-3-tiers', icon: '💎' },
  { key: 'payments', href: '/creator/onboarding/step-4-payments', icon: '💳' },
  { key: 'publish', href: '/creator/onboarding/step-5-publish', icon: '🚀' },
];

export function OnboardingProgress({ status }: { status: OnboardingStatus | null }) {
  const pct = status?.completion ?? 0;
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2">
        {steps.map((s) => (
          <Link key={s.key} href={s.href} className="flex-1">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                status?.steps?.[s.key]
                  ? 'border-[#FFD700] bg-[#FFD700]/10'
                  : 'border-white/10'
              }`}
            >
              <span aria-hidden className="text-lg">
                {s.icon}
              </span>
              <span className="text-sm">{s.key}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-[#FFD700]" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 text-right text-sm text-white/70">{pct}%</div>
    </div>
  );
}

