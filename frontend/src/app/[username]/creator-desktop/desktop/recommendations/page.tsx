"use client";

import { Recommendations } from "@/components/creator-desktop/recommendations";
import { Lightbulb } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-gradient-main text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="border-b border-teal-500/10 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-5 h-5 text-gold-400" />
            <h1 className="text-3xl font-bold font-heading tracking-tight bg-gradient-to-r from-gold-400 to-white bg-clip-text text-transparent">
              Recommendations
            </h1>
          </div>
          <p className="text-sm text-text-tertiary leading-relaxed">
            Your silent partner — data-driven actions to grow your business.
            AI-powered suggestions ranked by potential impact.
          </p>
        </div>
        <Recommendations />
      </div>
    </div>
  );
}
