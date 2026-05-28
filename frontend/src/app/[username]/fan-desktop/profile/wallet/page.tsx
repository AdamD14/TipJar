"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Coins, 
  Plus, 
  TrendingUp, 
  Sparkles, 
  History,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function FanWalletPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const decodedUsername = decodeURIComponent(username);
  const cleanUsername = decodedUsername.startsWith("@")
    ? decodedUsername.slice(1)
    : decodedUsername;

  const [balance, setBalance] = useState(150.00);
  const [address, setAddress] = useState("0x89a...c4b2");
  const [copied, setAddressCopied] = useState(false);
  const [tipSuccessMsg, setTipSuccessMsg] = useState<string | null>(null);

  const copyAddress = () => {
    navigator.clipboard.writeText("0x89a24cfd82937740283c847de49c95101a05c4b2");
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  const handleDeposit = () => {
    setBalance(prev => prev + 50.00);
    setTipSuccessMsg("Deposited $50.00 USDC securely via Circle Flow! 💳✨");
    setTimeout(() => setTipSuccessMsg(null), 4000);
  };

  const handleWithdraw = () => {
    if (balance < 25) {
      alert("Minimum withdrawal is $25.00 USDC");
      return;
    }
    setBalance(prev => prev - 25.00);
    setTipSuccessMsg("Withdrew $25.00 USDC to your linked Web3 wallet! 💸");
    setTimeout(() => setTipSuccessMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Wallet className="text-teal-400 animate-pulse" />
              Circle Tip Wallet
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-xl">
              Manage your stablecoin balance, deposit USDC instantly, or withdraw to your personal Web3 address.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
            <Lock className="text-teal-400 h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-400/80">
              Secured by Circle App Kit
            </span>
          </div>
        </div>

        {/* Toast Alert Success */}
        {tipSuccessMsg && (
          <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-2xl flex items-center gap-2.5 shadow-2xl animate-in fade-in duration-300">
            <Sparkles size={16} className="text-teal-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-xs font-black uppercase tracking-wider">{tipSuccessMsg}</span>
          </div>
        )}

        {/* Top Grid: Balance and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Giant Card */}
          <Card className="border border-teal-500/10 bg-[#002424]/60 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden lg:col-span-2 flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
            
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400/60 flex items-center gap-1.5">
                  <Coins size={12} />
                  Net Available Funds
                </span>
                <div className="text-5xl font-black text-white mt-2 flex items-baseline gap-2">
                  ${balance.toFixed(2)}
                  <span className="text-lg text-teal-400 font-bold tracking-widest font-mono">USDC</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Wallet size={24} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button 
                onClick={handleDeposit}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 text-teal-950 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-teal-500/10"
              >
                <Plus size={16} strokeWidth={2.5} />
                Quick Deposit $50
              </button>
              <button 
                onClick={handleWithdraw}
                className="w-full py-4 rounded-2xl bg-[#002424]/40 hover:bg-[#002424]/80 border border-teal-500/20 text-teal-400 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <ArrowUpRight size={16} />
                Withdraw $25
              </button>
            </div>
          </Card>

          {/* Column 3: Stats / Wallet Info */}
          <Card className="border border-teal-500/10 bg-[#002424]/30 rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-teal-400">Your Web3 Identity</h3>
              
              <div className="p-4 bg-black/40 border border-teal-500/10 rounded-2xl space-y-2">
                <span className="text-[10px] text-teal-400/50 block font-mono">Circle Smart Contract Account</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-teal-200">
                    {address}
                  </span>
                  <button 
                    onClick={copyAddress}
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:text-white transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-teal-400/60 font-medium">Chain Network</span>
                  <span className="text-white font-bold font-mono">Polygon POS</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-teal-400/60 font-medium">Gas Delegation</span>
                  <span className="text-emerald-400 font-black uppercase tracking-wider text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    100% Free (Gasless)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-teal-500/5 flex items-center gap-2 text-[10px] text-teal-400/40">
              <TrendingUp size={12} className="text-teal-500/60" />
              <span>USDC is natively fully backed 1:1 by liquid cash reserves.</span>
            </div>
          </Card>

        </div>

        {/* Bottom Section: Activity Log */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-teal-500/10 pb-3">
            <History size={16} className="text-teal-400" />
            <h2 className="text-lg font-black font-header tracking-tight">Recent Wallet Activity</h2>
          </div>

          <div className="divide-y divide-teal-500/5 border border-teal-500/10 bg-[#002424]/20 rounded-3xl overflow-hidden">
            {[
              { type: "deposit", desc: "Circle Deposit App Kit", amount: "+$50.00 USDC", date: "May 28, 2026", status: "Success" },
              { type: "tip", desc: "Tip support to @coach_max", amount: "-$5.00 USDC", date: "May 15, 2026", status: "Success" },
              { type: "tip", desc: "Tip support to @kate_premium", amount: "-$10.00 USDC", date: "May 10, 2026", status: "Success" },
              { type: "deposit", desc: "Crypto transfer (Polygon)", amount: "+$100.00 USDC", date: "May 01, 2026", status: "Success" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-[#002424]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === "deposit" 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  }`}>
                    {tx.type === "deposit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">{tx.desc}</h4>
                    <p className="text-[10px] text-teal-400/50 mt-0.5 font-medium">{tx.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`text-xs font-black font-mono ${
                    tx.type === "deposit" ? "text-emerald-400" : "text-teal-300"
                  }`}>
                    {tx.amount}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
