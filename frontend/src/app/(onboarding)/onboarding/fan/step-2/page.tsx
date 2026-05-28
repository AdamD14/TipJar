"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import apiClient from "@/lib/apiClient";
import Button from "@/components/ui/buttons/Button";
import SpecializationPicker from "@/components/onboarding/SpecializationPicker";
import { Loader2, Compass, ArrowRight } from "lucide-react";

const ARCHETYPE_TABS = [
  { id: "visual-creator", label: "Exclusive & Aesthetic", emoji: "🍑", desc: "Premium Models & Content Creators" },
  { id: "health-coach", label: "Fitness & Mentors", emoji: "💪", desc: "Gym Coaches & Personal Development" },
  { id: "live-streamer", label: "Streams & Talk", emoji: "🎙️", desc: "Live Streamers, IRL & Gaming Podcasts" },
  { id: "knowledge-architect", label: "Tech & Wisdom", emoji: "📚", desc: "Educational & Tech Reviews" },
  { id: "lifestyle-storyteller", label: "Vlog & Stories", emoji: "🎬", desc: "Personal Brands & Travel Storytellers" },
];

export default function FanOnboardingStep2() {
  const router = useRouter();
  const { data: onboardingData } = useOnboardingStore();
  const [selectedArchetype, setSelectedArchetype] = useState<string>("visual-creator");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      await apiClient.post("/api/fan/onboarding/step-2", {
        interests: selectedInterests,
        displayName: onboardingData.displayName,
        avatarUrl: onboardingData.avatar,
      });
    },
    onSuccess: () => {
      // Transition to Step 3: Wallet Funding & Profile Card Live Preview
      router.push("/onboarding/fan/step-3");
    },
    onError: (error) => {
      console.error("Failed to save interests:", error);
      setIsSubmitting(false);
    },
  });

  const handleNext = () => {
    setIsSubmitting(true);
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col justify-center items-center px-4 py-12 selection:bg-teal-600/30">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Step Indicator Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">
            <Compass size={10} className="animate-pulse" />
            Step 2 of 3
          </div>
          <h1 className="text-4xl font-black font-header bg-gradient-to-r from-teal-100 via-white to-teal-200 bg-clip-text text-transparent tracking-tight leading-tight">
            Who Do You Want to Discover?
          </h1>
          <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-lg">
            Choose what content matches your vibe. Explore different categories and select the specific tags you're interested in.
          </p>
        </div>

        {/* Archetype Tab Controller */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ARCHETYPE_TABS.map((tab) => {
            const isActive = selectedArchetype === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedArchetype(tab.id)}
                className={`
                  relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-b from-teal-500/15 to-transparent border-teal-400 text-white shadow-lg shadow-teal-500/10 scale-[1.03]"
                      : "bg-[#002424]/40 border-teal-500/10 text-teal-400/60 hover:border-teal-400/30 hover:bg-teal-950/20 hover:text-white"
                  }
                `}
              >
                <span className="text-3xl mb-1.5 filter drop-shadow">
                  {tab.emoji}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-center">
                  {tab.label}
                </span>
                <span className="text-[8px] text-teal-400/40 text-center mt-1 hidden md:block leading-tight font-medium">
                  {tab.desc}
                </span>
                
                {/* Active Underline Effect */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Inner Card rendering the pre-made SpecializationPicker component */}
        <div className="p-6 bg-[#002424]/60 border border-[#004545] rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-teal-400">
                Select Your Tags
              </h2>
              <span className="text-[10px] text-teal-400/40 font-bold uppercase tracking-wider">
                {selectedInterests.length} / 5 selected
              </span>
            </div>

            <SpecializationPicker
              archetype={selectedArchetype}
              value={selectedInterests}
              onSelect={(val) => setSelectedInterests(val)}
              maxSelections={5}
            />
          </div>
        </div>

        {/* Action Controller */}
        <div className="flex flex-col items-center pt-4">
          <Button
            onClick={handleNext}
            disabled={isSubmitting || selectedInterests.length === 0}
            className="w-full max-w-sm py-4 text-xs font-black uppercase tracking-widest bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-teal-950 transition-all rounded-xl shadow-lg shadow-teal-500/10 disabled:opacity-40 disabled:pointer-events-none"
            variant="primary"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={14} />
                <span>Saving Choices...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5">
                <span>Continue to Profile Preview</span>
                <ArrowRight size={12} />
              </div>
            )}
          </Button>
          <span className="text-[10px] text-teal-400/40 font-bold mt-3 uppercase tracking-wider">
            Secured on-chain: Interests configure your discovery feed instantly.
          </span>
        </div>

      </div>
    </div>
  );
}
