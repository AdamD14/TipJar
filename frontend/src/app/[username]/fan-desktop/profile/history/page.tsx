"use client";

import Card from "@/components/ui/forms/Card";
import { 
  History, 
  ArrowUpRight, 
  Coins, 
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle2
} from "lucide-react";

const MOCK_TIPS_HISTORY = [
  {
    id: "tx_01h8",
    creator: "@kate_premium",
    displayName: "Kate | Exclusive VIP 🍑",
    amount: "15.00",
    date: "2026-05-28",
    type: "Subscription Tier Renewal",
    hash: "0x3f5c...921a"
  },
  {
    id: "tx_02a3",
    creator: "@coach_max",
    displayName: "Coach Max 💪",
    amount: "5.00",
    date: "2026-05-15",
    type: "Direct Post Tip Support",
    hash: "0x8e92...f7a1"
  },
  {
    id: "tx_049f",
    creator: "@talk_space",
    displayName: "TalkSpace Podcast 🎙️",
    amount: "3.00",
    date: "2026-05-10",
    type: "Live Stream Goal Tip",
    hash: "0x4b7c...243d"
  },
  {
    id: "tx_05cc",
    creator: "@kate_premium",
    displayName: "Kate | Exclusive VIP 🍑",
    amount: "10.00",
    date: "2026-05-01",
    type: "Premium Media Unlock Tip",
    hash: "0x77d1...ba92"
  }
];

export default function FanHistoryPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <History className="text-teal-400" />
              Tip History
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed max-w-xl">
              A comprehensive ledger of all USDC support, subscriptions, and unlock payments made through your smart wallet.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
            <Coins className="text-teal-400 h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">
              Total Support: $33.00 USDC
            </span>
          </div>
        </div>

        {/* Support History Logs List */}
        <Card className="border border-teal-500/10 bg-[#002424]/40 rounded-3xl overflow-hidden p-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-teal-400 border-b border-teal-500/5 pb-3">
            <span>Transaction Logs</span>
            <span>4 records</span>
          </div>

          <div className="divide-y divide-teal-500/5">
            {MOCK_TIPS_HISTORY.map((tx) => (
              <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        {tx.displayName}
                      </h4>
                      <span className="text-[9px] font-mono text-teal-400/60 font-bold">
                        {tx.creator}
                      </span>
                    </div>
                    <p className="text-xs text-teal-400/70">{tx.type}</p>
                    <div className="flex items-center gap-1 text-[10px] text-teal-400/30">
                      <span>Hash: {tx.hash}</span>
                      <ExternalLink size={10} className="hover:text-teal-300 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center shrink-0">
                  <div className="text-sm font-black font-mono text-teal-300">
                    -${tx.amount} USDC
                  </div>
                  <div className="text-[10px] text-teal-400/50 mt-1 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    {tx.date}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
