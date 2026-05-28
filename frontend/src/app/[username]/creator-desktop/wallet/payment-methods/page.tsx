"use client";

import React from "react";
import Card from "@/components/ui/forms/Card";
import { CreditCard, Plus, HelpCircle, ShieldAlert } from "lucide-react";

export default function PaymentMethodsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Payment Methods</h1>
          <p className="text-sm text-text-ds-tertiary font-body mt-1">
            Manage your cards, linked bank accounts, and onramp details.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#FFD700] px-4 py-2 text-sm font-semibold text-[#003737] hover:brightness-[1.15] transition-all">
          <Plus size={16} /> Add Method
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col justify-between space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <CreditCard size={24} className="text-teal-300" />
              <div>
                <span className="text-sm font-semibold text-text-ds-primary block">Visa •••• 5643</span>
                <span className="text-xs text-text-ds-tertiary font-body">Expires 12/28</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/20 uppercase">Default</span>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-ds-primary">Method Security</h3>
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-teal-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-ds-secondary">Secured Payment Portals</h4>
              <p className="text-xs text-text-ds-tertiary font-body mt-1 leading-relaxed">
                All external payment methods and linked bank credentials are cryptographically secured. We do not store or read full credit card details.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
