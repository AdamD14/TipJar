"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import Button from "@/components/ui/buttons/Button";
import Card from "@/components/ui/forms/Card";
import { 
  Sparkles, 
  Wallet, 
  UserCheck, 
  ArrowRight, 
  Coins, 
  Plus, 
  Check, 
  QrCode,
  ShieldCheck
} from "lucide-react";

export default function FanOnboardingStep3() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data: onboardingData, reset: resetOnboarding } = useOnboardingStore();
  const [balance, setBalance] = useState<number>(0.00);
  const [fundingAmount, setFundingAmount] = useState<number | null>(null);
  const [isFunding, setIsFunding] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showQR, setShowQr] = useState(false);

  // Fallback defaults for previewing
  const previewDisplayName = onboardingData.displayName || user?.displayName || "Alex Carter";
  const previewUsername = user?.username || "fanfa";
  const previewAvatar = onboardingData.avatar || "/images/placeholder-avatar.png";

  const handleQuickFund = (amount: number) => {
    setFundingAmount(amount);
    setIsFunding(true);
    setTimeout(() => {
      setBalance((prev) => prev + amount);
      setIsFunding(false);
      setFundingAmount(null);
    }, 1200);
  };

  const handleFinishOnboarding = () => {
    setIsFinished(true);
    resetOnboarding(); // Clean up state
    const cleanUsername = user?.username || "fanfa";
    router.push(`/@${cleanUsername}/fan-desktop/explore`);
  };

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col justify-center items-center px-4 py-12 selection:bg-teal-600/30">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Step Indicator Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">
            <Sparkles size={10} className="animate-pulse" />
            Step 3 of 3
          </div>
          <h1 className="text-4xl font-black font-header bg-gradient-to-r from-teal-100 via-white to-teal-200 bg-clip-text text-transparent tracking-tight leading-tight">
            Finalize Your Profile & Wallet
          </h1>
          <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-xl">
            You're almost there! Review your newly created live profile card and optionally fund your gas-free TipJar USDC wallet to support your favorite creators instantly.
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Column 1: Live Interactive Profile Preview */}
          <div className="flex flex-col justify-between p-1 bg-gradient-to-b from-teal-500/10 to-transparent rounded-3xl border border-teal-500/15">
            <div className="p-6 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <UserCheck size={12} />
                Live Profile Preview
              </span>

              {/* Fan Profile Preview Card */}
              <div 
                onClick={handleFinishOnboarding}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#004d4d] bg-black/60 p-6 shadow-2xl transition-all duration-300 hover:border-teal-400 hover:scale-[1.02] active:scale-[0.99]"
              >
                {/* Visual top highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500" />
                
                <div className="flex items-center gap-4">
                  {/* Avatar wrapper */}
                  <div className="relative w-16 h-16 rounded-full border border-teal-400/30 overflow-hidden bg-teal-950/40 flex items-center justify-center">
                    {previewAvatar && !previewAvatar.includes("placeholder") ? (
                      <img src={previewAvatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center text-xl font-black text-teal-300 uppercase">
                        {previewDisplayName.substring(0, 2)}
                      </div>
                    )}
                    
                    {/* Hover state overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <span className="text-[9px] font-black uppercase tracking-wider text-teal-400">Live</span>
                    </div>
                  </div>

                  {/* Identity text */}
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                      {previewDisplayName}
                    </h3>
                    <p className="text-xs text-teal-400 font-mono">
                      @{previewUsername}
                    </p>
                    <span className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-[9px] font-bold text-teal-300 uppercase tracking-widest">
                      ✨ PREMIUM FAN
                    </span>
                  </div>
                </div>

                {/* Simulated Feed / Activity list inside card */}
                <div className="mt-5 pt-4 border-t border-teal-500/10 space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-teal-500/60">
                    Interests & Discovery
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300">
                      🍑 Exclusive
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300">
                      💪 Fitness
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      🎙️ Podcasts
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-teal-400/40 pt-1">
                  <span>Joined today</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 flex items-center gap-1 group-hover:text-teal-300 transition-colors">
                    Click Card to Explore Creators <ArrowRight size={10} />
                  </span>
                </div>
              </div>

              <p className="text-xs text-teal-400/50 leading-relaxed text-center italic">
                💡 Clicking your live profile card above will instantly complete onboarding.
              </p>
            </div>
          </div>

          {/* Column 2: Gas-free USDC Wallet Deposit */}
          <Card className="border border-[#004545] bg-[#002424]/60 backdrop-blur-xl rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Wallet size={12} />
                Tip Wallet Integration
              </span>

              <div className="p-4 rounded-2xl bg-black/40 border border-teal-500/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-teal-400/60 font-medium">Your Active USDC Balance</div>
                  <div className="text-3xl font-black text-white mt-1 flex items-baseline gap-1.5">
                    ${balance.toFixed(2)}
                    <span className="text-xs text-teal-400 font-bold tracking-widest font-mono">USDC</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                  <Coins size={24} className="animate-bounce" style={{ animationDuration: "3s" }} />
                </div>
              </div>

              {/* Deposit Quick-Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center gap-1">
                  Fund Instantly
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 25, 50].map((amount) => (
                    <button
                      key={amount}
                      disabled={isFunding}
                      onClick={() => handleQuickFund(amount)}
                      className="group py-2.5 px-3 bg-teal-950/40 border border-teal-500/20 rounded-xl hover:border-teal-400 hover:bg-teal-900/30 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-1 transition-all"
                    >
                      <Plus size={14} className="text-teal-400 group-hover:scale-125 transition-transform" />
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show QR Option */}
              <div className="pt-2">
                <button
                  onClick={() => setShowQr(!showQR)}
                  className="w-full py-2 px-3 border border-dashed border-teal-500/20 rounded-xl text-xs text-teal-400/80 hover:text-white hover:border-teal-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <QrCode size={14} />
                  {showQR ? "Hide Deposit Address QR" : "Show Deposit Address QR / Crypto"}
                </button>
                {showQR && (
                  <div className="mt-3 p-4 bg-black/50 border border-teal-500/20 rounded-xl flex flex-col items-center space-y-2 text-center">
                    <div className="w-32 h-32 bg-white rounded-lg p-2 flex items-center justify-center">
                      {/* Placeholder for QR code */}
                      <div className="w-full h-full bg-teal-950 flex items-center justify-center text-[10px] text-teal-400 font-bold font-mono">
                        [ QR CODE ]
                      </div>
                    </div>
                    <span className="text-[10px] text-teal-400/70 font-mono break-all bg-[#002424]/40 px-2.5 py-1 rounded border border-teal-500/10">
                      0x4f87...94e2
                    </span>
                    <span className="text-[9px] text-teal-400/40 font-bold uppercase tracking-wider">
                      Send any ERC-20 / Solana USDC directly to this address
                    </span>
                  </div>
                )}
              </div>

              {/* Premium abstract details */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-teal-500/5 border border-teal-500/10">
                <ShieldCheck size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-teal-400/60 leading-relaxed">
                  TipJar utilizes secured <strong>Circle Agent Wallets</strong>. Transactions are gas-abstracted (completely free to tip) and backed by 1-to-1 collateralized digital dollars (USDC).
                </p>
              </div>
            </div>

            {/* Step Complete Button */}
            <div className="pt-4">
              <Button
                onClick={handleFinishOnboarding}
                disabled={isFinished}
                className="w-full py-4 text-xs font-black uppercase tracking-widest bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-teal-950 transition-all rounded-xl shadow-lg shadow-teal-500/10"
                variant="primary"
              >
                {isFinished ? "Redirecting..." : "Complete & Explore Creators"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
