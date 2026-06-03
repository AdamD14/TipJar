"use client";
import React from "react";

const FEE_BPS = 250;

function computeFee(amount: number): number {
  return Math.floor(amount * FEE_BPS) / 10000;
}

export default function FeeBreakdown({ amount }: { amount: number }) {
  const fee = computeFee(amount);
  const creatorReceives = amount - fee;

  return (
    <div className="rounded-xl bg-white/5 p-4 text-white space-y-2">
      <div className="flex justify-between text-sm text-white/70">
        <span>You send</span>
        <span>{amount.toFixed(2)} USDC</span>
      </div>
      <div className="flex justify-between text-sm text-white/70">
        <span>Platform fee (2.5%, deducted from receiver)</span>
        <span>&minus;{fee.toFixed(2)} USDC</span>
      </div>
      <div className="border-t border-white/10 pt-2 flex justify-between font-heading font-semibold">
        <span>Creator receives</span>
        <span>{creatorReceives.toFixed(2)} USDC</span>
      </div>
    </div>
  );
}
