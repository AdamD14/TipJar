import React from "react";
import Link from "next/link";
import Stepper from "@/components/onboarding/Stepper";

type Props = {
  step: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function OnboardingShell({ step, title, subtitle, children }: Props) {
  return (
    <section className="min-h-screen bg-gradient-main px-4 py-10 text-text-primary font-ui">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             {/* Możesz tu dodać małe logo, jeśli chcesz */}
             <span className="font-bold text-xl tracking-tight text-white">Onboarding</span>
          </div>
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-brand-gold/80 hover:text-brand-gold transition-colors hover:underline"
          >
            Skip setup
          </Link>
        </header>

        <Stepper active={step} />

        <div className="mt-8 rounded-3xl bg-brand-primary/40 backdrop-blur-xl border border-white/5 p-6 md:p-10 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-ui">{title}</h1>
            {subtitle ? <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p> : null}
            
            <div className="mt-10 space-y-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}