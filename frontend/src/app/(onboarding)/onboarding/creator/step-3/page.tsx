"use client";
import React, { useState } from "react";
import Link from "next/link";
import OnboardingShell from "@/components/layout/OnboardingShell";
import Button from "@/components/ui/Button";
import QRCode from "react-qr-code";

import apiClient from "@/lib/apiClient";

export default function Step3() {
  const [generating, setGenerating] = useState(false);
  // TODO: Get real username from store or context
  const profileUrl = "https://tipjar.plus/@yourname"; 

  async function generatePoster() {
    setGenerating(true);
    try {
      await apiClient.post("/api/onboarding/poster", {});
      alert("Poster generated! (Check console for mock)");
    } catch (e) {
      console.error(e);
      alert("Failed to generate poster");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <OnboardingShell 
      step={3} 
      title="You are ready!" 
      subtitle="Your profile is live. Share it now to start receiving support."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Karta QR */}
        <div className="flex flex-col items-center p-8 rounded-2xl bg-white text-brand-dark shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="mb-4">
             <QRCode value={profileUrl} size={200} fgColor="#003737" />
          </div>
          <p className="font-bold text-lg">@{profileUrl.split('@')[1] || 'username'}</p>
          <p className="text-sm opacity-60 mt-1">Scan to tip in USDC</p>
          
          <div className="mt-6 w-full">
            <Button variant="outline" size="sm" fullWidth className="!border-brand-dark/20 !text-brand-dark hover:!bg-brand-dark/5">
              Download PNG
            </Button>
          </div>
        </div>

        {/* Akcje */}
        <div className="space-y-6 py-4">
          <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-5">
            <h3 className="text-brand-gold font-bold mb-2 flex items-center gap-2">
              <span>✨</span> AI Magic
            </h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Want a professional promo poster? Our AI will write a witty headline based on your bio.
            </p>
            <Button 
              variant="glass" 
              fullWidth 
              onClick={generatePoster} 
              loading={generating}
              className="!bg-brand-gold/20 hover:!bg-brand-gold/30 !border-brand-gold/40"
            >
              Generate AI Poster
            </Button>
          </div>

          <div className="h-px bg-white/10 w-full my-4" />

          <div className="flex flex-col gap-3">
            <Link href="/creatorstudio" className="w-full">
               <Button variant="gold" size="lg" fullWidth>
                 Enter Studio →
               </Button>
            </Link>
            <Link href="/onboarding/creator/step-2" className="w-full">
               <Button variant="ghost" size="sm" fullWidth>
                 Back to edit
               </Button>
            </Link>
          </div>
        </div>

      </div>
    </OnboardingShell>
  );
}
