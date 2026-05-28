"use client";

import React, { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { ArrowUpRight, Wallet, QrCode, CreditCard, ShieldCheck } from "lucide-react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"bank" | "crypto">("bank");
  const [submitting, setSubmitting] = useState(false);

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setAmount("");
      alert("Withdrawal successfully completed!");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Withdraw Funds</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Withdraw your USDC stablecoin balance directly to a Web3 crypto wallet or your linked bank account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">1. Choose Withdrawal Destination</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setMethod("bank")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border font-semibold transition-all ${
                method === "bank" ? "border-teal-400 bg-teal-500/10 text-teal-300" : "border-white/10 bg-white/5 text-text-ds-secondary hover:bg-white/10"
              }`}
            >
              <CreditCard size={24} />
              <span className="text-xs">Bank Transfer (USD)</span>
            </button>
            <button 
              onClick={() => setMethod("crypto")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border font-semibold transition-all ${
                method === "crypto" ? "border-teal-400 bg-teal-500/10 text-teal-300" : "border-white/10 bg-white/5 text-text-ds-secondary hover:bg-white/10"
              }`}
            >
              <Wallet size={24} />
              <span className="text-xs">Crypto Wallet (USDC)</span>
            </button>
          </div>

          <form onSubmit={handleWithdrawal} className="space-y-4 pt-2">
            <div>
              <label className="block text-sm text-text-ds-secondary mb-1">Amount to withdraw (USDC)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 100"
                  required
                  min="5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-ds-tertiary">USDC</span>
              </div>
            </div>

            {method === "crypto" && (
              <div>
                <label className="block text-sm text-text-ds-secondary mb-1">Destination Crypto Address</label>
                <input 
                  type="text" 
                  placeholder="e.g. 0x71C82... or Solana Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-mono"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !amount}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] hover:bg-gold-500 transition-all disabled:opacity-50"
            >
              <ArrowUpRight size={18} />
              {submitting ? "Processing withdrawal..." : "Withdraw Now"}
            </button>
          </form>
        </Card>

        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Withdrawal Speeds</h3>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Gas-Abstracted Transactions</h4>
                <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                  Withdrawals to connected or external Web3 wallets are gas-abstracted. There are no fees or network gas (ETH/MATIC) costs required to settle your funds.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
