"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import AvatarUploader from "@/components/onboarding/AvatarUploader";
import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";

import { supabase } from "@/lib/supabase";

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
      setError("Podaj swoją nazwę wyświetlaną.");
      return;
    }
    router.push("/onboarding/fan/step-2");
  };

  return (
    <div className="max-w-xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold font-header bg-gradient-to-r from-[#FFD700] to-[#f9c513] bg-clip-text text-transparent">
          Witaj, Fan!
        </h1>
        <p className="text-gray-400">
          Ustaw swój awatar i nazwę, aby twórcy Cię rozpoznali.
        </p>
      </div>

      <Card>
        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center gap-6">
            <AvatarUploader
              onUploadCompleteAction={(urls) => {
                if (urls[0]) setAvatar(urls[0]);
              }}
              maxSlots={1}
              authToken={sessionData?.token ?? null}
              userId={sessionData?.userId ?? ""}
            />

            <div className="w-full space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Nazwa wyświetlana
              </label>
              <input
                type="text"
                value={data.displayName || ""}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setError(null);
                }}
                className="w-full px-4 py-3 bg-[#0F1E1E] border border-[#004d4d] rounded-lg focus:outline-none focus:border-[#FFD700] text-white placeholder-gray-600 transition-colors"
                placeholder="Np. Jan Kowalski"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          </div>

          <Button
            onClick={handleNext}
            className="w-full py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            variant="primary"
          >
            Dalej
          </Button>
        </div>
      </Card>
    </div>
  );
}
