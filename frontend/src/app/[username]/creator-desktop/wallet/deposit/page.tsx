"use client";

import React, { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { ArrowDownLeft, Wallet, QrCode, CreditCard, ShieldCheck } from "lucide-react";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"card" | "crypto">("card");
  const [submitting, setSubmitting] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setAmount("");
      alert("Deposit simulation successful!");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Deposit Funds</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Top up your USDC balance instantly using your credit card or an onchain transfer.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">1. Choose Deposit Method</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setMethod("card")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border font-semibold transition-all ${
                method === "card" ? "border-teal-400 bg-teal-500/10 text-teal-300" : "border-white/10 bg-white/5 text-text-ds-secondary hover:bg-white/10"
              }`}
            >
              <CreditCard size={24} />
              <span className="text-xs">Credit/Debit Card</span>
            </button>
            <button 
              onClick={() => setMethod("crypto")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border font-semibold transition-all ${
                method === "crypto" ? "border-teal-400 bg-teal-500/10 text-teal-300" : "border-white/10 bg-white/5 text-text-ds-secondary hover:bg-white/10"
              }`}
            >
              <Wallet size={24} />
              <span className="text-xs">Crypto Stablecoin</span>
            </button>
          </div>

          <form onSubmit={handleDeposit} className="space-y-4 pt-2">
            {method === "card" ? (
              <div>
                <label className="block text-sm text-text-ds-secondary mb-1">Amount to deposit (USD)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 50"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-ds-tertiary">USD</span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col items-center text-center gap-3">
                <QrCode size={140} className="text-white bg-white p-2 rounded-lg" />
                <div>
                  <span className="text-sm font-semibold text-text-ds-primary block">Your Deposit Address</span>
                  <span className="text-xs font-mono text-text-ds-tertiary block select-all mt-1">0x71C82...893a</span>
                </div>
              </div>
            )}

            {method === "card" && (
              <button
                type="submit"
                disabled={submitting || !amount}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FFD700] px-4 py-3 font-semibold text-[#003737] hover:bg-gold-500 transition-all disabled:opacity-50"
              >
                <ArrowDownLeft size={18} />
                {submitting ? "Processing deposit..." : "Deposit Now"}
              </button>
            )}
          </form>
        </Card>

        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary">On-Ramp Information</h3>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Settle Instantly</h4>
                <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                  All credit and debit card deposits are processed immediately via our secure partner Circle, depositing native USDC directly into your unified balance.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
