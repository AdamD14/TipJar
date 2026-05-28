"use client";

import React, { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { RefreshCw, ShieldCheck } from "lucide-react";

export default function ExchangePage() {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setAmount("");
      alert("Swap processed successfully!");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Convert Stablecoins</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Instantly convert other stablecoins (USDT, EURC) into USDC or vice-versa.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Token Swap</h3>
          <form onSubmit={handleSwap} className="space-y-4">
            <div>
              <label className="block text-sm text-text-ds-secondary mb-1">From</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-ds-tertiary">USDT</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-2 rounded-full border border-white/10 bg-white/5 text-teal-300">
                <RefreshCw size={20} className="animate-spin-slow" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-ds-secondary mb-1">To (Estimated)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount ? Number(amount) * 0.999 : ""} 
                  disabled
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-ds-tertiary font-body"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-ds-tertiary">USDC</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !amount}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] hover:bg-gold-500 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              {submitting ? "Exchanging..." : "Swap Tokens"}
            </button>
          </form>
        </Card>

        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Conversion Rate & Slippage</h3>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Guaranteed 1:1 Pegs</h4>
                <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                  Swaps between major dollar-backed stablecoins (USDT to USDC) carry 0% price slippage and are processed completely gaslessly.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
