"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Stepper from "@/components/onboarding/Stepper";

// --- Animated Brand Component ---
function AnimatedBrand() {
  const letters = ["T", "I", "P", "J", "A", "R", ".", "P", "L", "U", "S"];

  return (
    <span className="text-[13px] md:text-sm font-semibold tracking-[0.20em] uppercase text-text-secondary transition-colors inline-flex cursor-default">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block hover:text-[#FFD700] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          style={{
            animationDelay: `${index * 0.1}s`,
            animation: "letterFloat 3s ease-in-out infinite",
          }}
        >
          {letter}
        </span>
      ))}
      <style jsx>{`
        @keyframes letterFloat {
          0%,
          90%,
          100% {
            transform: translateY(0);
          }
          45% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </span>
  );
}

// --- Main Shell Component ---

type Props = {
  step: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  username?: string | null;
};

export default function OnboardingShell({ step, title, children }: Props) {
  // Logika scrolla (lokalna, żeby nie importować hooków, których mogę nie znać)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-main font-ui overflow-x-hidden flex flex-col relative">
      {/* --- HEADER --- */}
      <header
        role="banner"
        data-testid="navbar"
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "backdrop-blur-md bg-brand-dark/80 border-cyan-300/20"
            : "bg-transparent border-transparent"
        )}
      >
        <nav className="mx-auto w-full px-4 md:px-6" aria-label="Main">
          <div className="flex py-1 items-center justify-between">
            <div className="flex-1 flex items-center justify-start">
              <div className="flex items-center gap-2">
                <AnimatedBrand />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* --- CONTENT AREA --- */}
      {/* ZMIANA: pt-24 -> pt-20 (zmniejszony odstęp od góry), px-4 -> px-2 (więcej miejsca na boki) */}
      <div className="flex-1 mx-auto w-full px-2 pt-16 pb-16 md:pb-16">
        {/* Stepper */}
        {/* ZMIANA: px-2 -> px-1, md:px-4 -> md:px-2 (zmniejszone marginesy boczne o połowę) */}
        <div className="mb-10 px-1 md:px-2 w-full">
          <Stepper active={step} />
        </div>

        {/* Główna karta treści */}
        {/* ZMIANA: p-6 -> p-3, md:p-12 -> md:p-6 (zmniejszone paddingi wewnętrzne o połowę) */}
        <div className="mx-auto w-full rounded-3xl bg-brand-primary/40 backdrop-blur-xl border border-white/5 p-2 md:p-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent opacity-50" />

          <div className="relative z-10">
            <h1 className="w-fit mx-auto text-l md:text-xl text-center bg-gradient-to-r from-blue-200 via-white to-cyan-200 bg-clip-text text-transparent mb-3 font-ui tracking-tight">
              {title}
            </h1>

            <div className="mt-8 space-y-8">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
