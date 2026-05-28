"use client";

import React from "react";
import Card from "@/components/ui/forms/Card";
import { Link2, Plus, Wallet, ShieldCheck } from "lucide-react";

export default function ConnectedWalletsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Connected Web3 Wallets</h1>
          <p className="text-sm text-text-ds-tertiary font-body mt-1">
            Connect external Web3 wallets (MetaMask, Coinbase Wallet) for direct onchain deposits or withdrawals.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#FFD700] px-4 py-2 text-sm font-semibold text-[#003737] hover:brightness-[1.15] transition-all">
          <Plus size={16} /> Link Web3 Wallet
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300">
                <Wallet size={20} />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-ds-primary block">MetaMask</span>
                <span className="text-xs text-text-ds-tertiary font-mono">0x71C...893a</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 uppercase">Connected</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-ds-tertiary border-t border-white/[0.05] pt-4 font-body">
            <Link2 size={14} className="text-teal-400" />
            <span>Used for direct CCTP cross-chain bridge and stablecoin withdrawals.</span>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Direct Web3 Deposits</h3>
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Gasless Signature</h4>
              <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                Interact with your linked wallets completely gaslessly via EIP-712 standard signatures. All transactions are fully gas-abstracted by our platform.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
