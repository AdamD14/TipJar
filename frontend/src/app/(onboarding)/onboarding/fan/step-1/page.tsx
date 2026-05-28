"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import AvatarUploader from "@/components/onboarding/AvatarUploader";
import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";
import { supabase } from "@/lib/supabase";
import { Sparkles, User } from "lucide-react";

export default function FanOnboardingStep1() {
  const router = useRouter();
  const { setAvatar, setDisplayName, data } = useOnboardingStore();
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<{
    token: string;
    userId: string;
  } | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSessionData({
          token: session.access_token,
          userId: session.user.id,
        });
      }
    };
    getSession();
  }, []);

  const handleNext = () => {
    if (!data.displayName?.trim()) {
      setError("Please enter your display name.");
      return;
    }
    router.push("/onboarding/fan/step-2");
  };

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col justify-center items-center px-4 py-12 selection:bg-teal-600/30">
      <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Step Indicator Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">
            <Sparkles size={10} className="animate-pulse" />
            Step 1 of 2
          </div>
          <h1 className="text-4xl font-black font-header bg-gradient-to-r from-teal-100 via-white to-teal-200 bg-clip-text text-transparent tracking-tight leading-tight">
            Welcome to TipJar
          </h1>
          <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-sm">
            Set up your identity so your favorite creators can recognize and thank you.
          </p>
        </div>

        <Card className="border border-[#004545] bg-[#002424]/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-6">
              
              {/* Avatar Upload Container */}
              <div className="relative group">
                <AvatarUploader
                  onUploadCompleteAction={(urls) => {
                    if (urls[0]) setAvatar(urls[0]);
                  }}
                  maxSlots={1}
                  authToken={sessionData?.token ?? null}
                  userId={sessionData?.userId ?? ""}
                />
              </div>

              {/* Display Name Input */}
              <div className="w-full space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-teal-400">
                  Your Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={data.displayName || ""}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setError(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-teal-500/20 rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-teal-800/40 text-sm transition-all shadow-inner"
                    placeholder="e.g., Alex Carter"
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs font-bold mt-1.5 animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              className="w-full py-4 text-xs font-black uppercase tracking-widest bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-teal-950 transition-all rounded-xl shadow-lg shadow-teal-500/10 mt-2"
              variant="primary"
            >
              Continue to Interests
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
