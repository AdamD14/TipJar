"use client";

import React, { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { ShieldCheck, HelpCircle } from "lucide-react";

export default function WalletSettingsPage() {
  const [autoPayout, setAutoPayout] = useState(true);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Wallet Settings</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Configure safety caps, auto-payout behaviors, and preferred fallback chains.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Payout Automation</h3>
          
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <div>
              <span className="text-sm font-semibold text-text-ds-primary block">Automatic Bank Payouts</span>
              <span className="text-xs text-text-ds-tertiary font-body">Payout instantly when balance exceeds $100</span>
            </div>
            <input 
              type="checkbox" 
              checked={autoPayout}
              onChange={() => setAutoPayout(!autoPayout)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-text-ds-primary block">Weekly Payout Trigger</span>
              <span className="text-xs text-text-ds-tertiary font-body">Process weekly bank transfers every Friday</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 uppercase">Enabled</span>
          </div>
        </Card>

        <Card className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Security Settings</h3>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-teal-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Daily Safety Limit</h4>
                <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                  Your daily single-transaction and total payout safety limit is managed by your agent-wallet spending policies.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
