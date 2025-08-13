"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { ShieldCheck, ArrowRight } from "lucide-react";

const KycPromptPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  // Przekieruj, jeśli użytkownik nie jest twórcą (zabezpieczenie)
  // Ten hook zadziała, gdy tylko 'user' zostanie załadowany
  useEffect(() => {
    if (user && role !== "CREATOR") {
      router.replace("/explore");
    }
  }, [user, role, router]);
  
  // <<< POPRAWKA: Dodajemy stan ładowania
  // Wyświetl spinner, dopóki dane użytkownika nie zostaną w pełni załadowane
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  // Jeśli po załadowaniu danych okaże się, że to nie twórca, nie renderuj nic,
  // ponieważ useEffect zaraz go przekieruje. To zapobiega "mignięciu" treści.
  if (role !== "CREATOR") {
    return null;
  }

  const handleSkip = () => {
    router.push("/creator/dashboard");
  };

  const handleStartKYC = () => {
    // TODO: Zintegrować z dostawcą KYC
    router.push("/creator/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-teal-900/20 backdrop-blur-md border border-teal-400/20 rounded-2xl shadow-2xl p-8 text-center">
        <div className="mx-auto w-fit bg-gradient-to-r from-teal-500 to-purple-500 p-3 rounded-full mb-6">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-white text-2xl font-bold mb-4">
          Identity Verification (KYC)
        </h1>
        <p className="text-white/80 text-sm mb-8">
          As a creator, verifying your identity is required to receive payouts.
          You can do it now to unlock all features, or complete it later from
          your dashboard.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleStartKYC}
            className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 shadow-lg"
          >
            Verify Identity Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleSkip}
            className="w-full bg-white/10 text-white/80 font-semibold py-3 rounded-lg hover:bg-white/20 transition-colors duration-200"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default KycPromptPage;
