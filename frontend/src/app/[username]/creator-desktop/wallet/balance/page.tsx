"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/forms/Card";
import Spinner from "@/components/ui/Spinner";
import { getWallet, getBalance } from "@/lib/wallet";
import { Coins, ArrowDownLeft, ArrowUpRight, ShieldCheck, HelpCircle } from "lucide-react";

interface WalletInfo {
  walletId: string;
  address: string;
  chain: string;
}

interface BalanceInfo {
  balance: number;
  currency: string;
}

export default function BalancePage() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [balance, setBalance] = useState<BalanceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [walletData, balanceData] = await Promise.all([
          getWallet(),
          getBalance().catch(() => ({ balance: 0, currency: "USDC" }))
        ]);
        setWallet(walletData);
        setBalance(balanceData);
      } catch (err: any) {
        console.error("Error loading balance details:", err);
        setError("Failed to fetch current balance data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Spinner size="lg" className="text-teal-400" />
        <p className="text-sm font-body text-text-ds-tertiary animate-pulse">
          Loading balance details...
        </p>
      </div>
    );
  }

  const realBalance = balance?.balance ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Unified Balance</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Monitor your cross-chain and unified USDC balances.
        </p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden bg-gradient-to-br from-teal-950/40 to-teal-900/10 border-teal-500/20 shadow-xl">
          <div className="absolute right-3 top-3 opacity-10">
            <Coins size={64} className="text-gold-400" />
          </div>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Total Balance</span>
          <h2 className="text-4xl font-heading font-extrabold text-gold-400 mt-2 tnum">
            {realBalance.toFixed(2)} <span className="text-sm font-medium text-white">USDC</span>
          </h2>
          <p className="text-xs text-green-400 mt-1 font-body">Circle Secured balance</p>
        </Card>

        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Withdrawable</span>
          <h2 className="text-3xl font-heading font-bold text-text-ds-primary mt-2 tnum">
            {realBalance.toFixed(2)} <span className="text-xs font-normal">USDC</span>
          </h2>
          <p className="text-xs text-text-ds-tertiary mt-1 font-body">Ready to transfer instantly</p>
        </Card>

        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Pending Settlement</span>
          <h2 className="text-3xl font-heading font-bold text-text-ds-primary mt-2 tnum">
            0.00 <span className="text-xs font-normal">USDC</span>
          </h2>
          <p className="text-xs text-text-ds-tertiary mt-1 font-body">No pending transfers</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Chain abstract split</h3>
          <div className="space-y-3">
            {[
              { chain: `${wallet?.chain ?? "EVM"} (USDC)`, amt: realBalance.toFixed(2), pct: "100%" }
            ].map((it) => (
              <div key={it.chain} className="flex items-center justify-between border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
                <span className="text-sm font-body text-text-ds-secondary">{it.chain}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-text-ds-primary tnum">{it.amt} USDC</span>
                  <span className="text-xs text-text-ds-tertiary block font-body">{it.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Gas & Security</h3>
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Gas Abstracted Payments</h4>
              <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                Your wallet operates with Circle's gas abstraction. You do not need native chain tokens like ETH or MATIC to perform withdrawals or payouts.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-white/[0.05] pt-4">
            <HelpCircle className="text-teal-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Need Help?</h4>
              <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                Got questions about bridging speeds or unified liquidity? Read our documentation in the Knowledge Center.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
