"use client";

import React from "react";
import Card from "@/components/ui/forms/Card";
import { Users, Sparkles, TrendingUp, DollarSign } from "lucide-react";

export default function SubscriptionsPage() {
  const tiers = [
    { title: "Bronze Tier", price: 5, activeSubs: 24, totalEarnings: 120 },
    { title: "Silver VIP", price: 15, activeSubs: 12, totalEarnings: 180 },
    { title: "Gold Exclusive", price: 50, activeSubs: 4, totalEarnings: 200 },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-ds-primary">Subscriptions & MRR</h1>
        <p className="text-sm text-text-ds-tertiary font-body mt-1">
          Monitor your Monthly Recurring Revenue (MRR) and active subscriber tiers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Active Subscribers</span>
          <div className="flex items-center gap-2 mt-2">
            <Users size={24} className="text-teal-400" />
            <h2 className="text-3xl font-heading font-bold text-text-ds-primary">40 <span className="text-sm font-normal text-text-ds-tertiary">fans</span></h2>
          </div>
          <p className="text-xs text-green-400 mt-1 font-body">+4 this week (10%)</p>
        </Card>

        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Monthly MRR</span>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp size={24} className="text-teal-400" />
            <h2 className="text-3xl font-heading font-bold text-text-ds-primary">500.00 <span className="text-sm font-normal text-text-ds-tertiary">USDC</span></h2>
          </div>
          <p className="text-xs text-text-ds-tertiary mt-1 font-body">Stable recurring income</p>
        </Card>

        <Card>
          <span className="text-xs text-text-ds-tertiary uppercase font-heading tracking-wider">Total Earned</span>
          <div className="flex items-center gap-2 mt-2">
            <DollarSign size={24} className="text-teal-400" />
            <h2 className="text-3xl font-heading font-bold text-text-ds-primary">2,450.00 <span className="text-sm font-normal text-text-ds-tertiary">USDC</span></h2>
          </div>
          <p className="text-xs text-text-ds-tertiary mt-1 font-body">Life-time subscription earnings</p>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-text-ds-primary">Your Subscription Tiers</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.title} className="flex flex-col justify-between space-y-4 border-teal-500/10 bg-teal-950/10">
              <div>
                <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-300">
                  {tier.title}
                </span>
                <h4 className="text-2xl font-heading font-bold mt-2 text-text-ds-primary">${tier.price} <span className="text-xs font-normal">/ month</span></h4>
              </div>

              <div className="border-t border-white/[0.05] pt-3 space-y-1">
                <div className="flex justify-between text-xs text-text-ds-secondary">
                  <span>Active Subs:</span>
                  <span className="font-semibold">{tier.activeSubs}</span>
                </div>
                <div className="flex justify-between text-xs text-text-ds-secondary">
                  <span>Monthly income:</span>
                  <span className="font-semibold text-gold-400">${tier.totalEarnings} USDC</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
