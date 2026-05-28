"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/forms/Card";
import Spinner from "@/components/ui/Spinner";
import { getBalance, withdraw } from "@/lib/wallet";
import { ArrowUpRight, DollarSign, ShieldCheck } from "lucide-react";

export default function PayoutsPage() {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getBalance();
        setBalance(data?.balance ?? 0);
      } catch (err: any) {
        console.error("Failed to load balance:", err);
        setBalance(0);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    try {
      setSubmitting(true);
      setError(null);
      setSuccessMsg(null);
      
      // Withdraw using backend API
      const result = await withdraw(amount);
      setSuccessMsg("Withdrawal/Payout initiated successfully! Transaction: " + (result?.circleTransactionId || "Pending"));
      setAmount("");
      
      // Reload balance
      const data = await getBalance();
      setBalance(data?.balance ?? 0);
    } catch (err: any) {
      console.error("Payout failed:", err);
      setError("Failed to process payout. Please check your withdrawable balance.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Spinner size="lg" className="text-teal-400" />
        <p className="text-sm font-body text-text-ds-tertiary animate-pulse">
          Loading payouts console...
        </p>
      </div>
    );
  }

  const realBalance = balance ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Bank & Card Payouts</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Withdraw your earnings instantly to your bank account or Visa/Mastercard card.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Withdrawable Balance</span>
          <h2 className="text-3xl font-heading font-bold text-gold-400 mt-2 tnum">
            {realBalance.toFixed(2)} <span className="text-xs font-normal text-white">USDC</span>
          </h2>
          <p className="text-xs text-green-400 mt-1 font-body">Ready for payout instantly</p>
        </Card>

        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Default Destination</span>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300">
              <DollarSign size={16} />
            </div>
            <div>
              <span className="text-sm font-semibold text-text-ds-primary block">Bank Account (USD)</span>
              <span className="text-xs text-text-ds-tertiary font-body">Chase •••• 9821</span>
            </div>
          </div>
        </Card>

        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Payout Fee</span>
          <h2 className="text-3xl font-heading font-bold text-text-ds-primary mt-2">
            0.00 <span className="text-xs font-normal">USDC</span>
          </h2>
          <p className="text-xs text-text-ds-tertiary mt-1 font-body">Free bank payouts always</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Request Payout</h3>
          <form onSubmit={handlePayout} className="space-y-4">
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

            <button
              type="submit"
              disabled={submitting || !amount}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-3 font-semibold text-black hover:bg-gold-500 transition-all disabled:opacity-50"
            >
              <ArrowUpRight size={18} />
              {submitting ? "Processing payout..." : "Withdraw Funds"}
            </button>
          </form>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Instant Payouts Configuration</h3>
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Automatic Payouts</h4>
              <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                Configure auto-payouts to automatically withdraw your wallet balances to your linked bank account every Friday or as soon as your balance exceeds $100.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
