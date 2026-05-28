"use client";

import React from "react";
import Card from "@/components/ui/forms/Card";
import { CreditCard, Plus, HelpCircle, ShieldAlert } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Your Payment Cards</h1>
          <p className="text-sm text-text-ds-tertiary font-body mt-1">
            Link credit/debit cards to instantly top up your balance or receive instant payouts.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#FFD700] px-4 py-2 text-sm font-semibold text-[#003737] hover:brightness-[1.15] transition-all">
          <Plus size={16} /> Link New Card
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden bg-gradient-to-br from-teal-950/40 to-teal-900/15 border-teal-500/20 shadow-xl space-y-6">
          <div className="flex justify-between items-start">
            <CreditCard size={32} className="text-teal-300" />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">Primary</span>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-text-ds-tertiary font-body uppercase tracking-wider">Card Number</div>
            <div className="text-xl font-mono tracking-widest text-text-ds-primary">•••• •••• •••• 5643</div>
          </div>

          <div className="flex justify-between text-xs text-text-ds-tertiary font-body">
            <div>
              <span className="block uppercase tracking-wider text-[10px]">Card Holder</span>
              <span className="font-semibold text-text-ds-primary">ELENA MOREAU</span>
            </div>
            <div>
              <span className="block uppercase tracking-wider text-[10px]">Expires</span>
              <span className="font-semibold text-text-ds-primary">12/28</span>
            </div>
          </div>
        </Card>

        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Card Security</h3>
            <div className="flex items-start gap-3">
              <ShieldAlert className="text-teal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">SCA Secure Verification</h4>
                <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                  All credit and debit cards are verified using Strong Customer Authentication (SCA) to prevent unauthorized charges and ensure full fraud protection.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-text-ds-tertiary border-t border-white/[0.05] pt-4 font-body">
            <HelpCircle size={14} className="text-teal-400" />
            <span>Need to remove or replace a primary card? Contact Support.</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
