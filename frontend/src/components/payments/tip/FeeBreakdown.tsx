"use client";
import React from "react";
import { computeFee } from "@/lib/appKitClient";

export default function FeeBreakdown({ amount }: { amount: number }) {
  const fee = parseFloat(computeFee(amount.toString()));
  const net = amount - fee;

  return (
    <div className="rounded-xl bg-white/5 p-4 text-white space-y-2">
      <div className="flex justify-between text-sm text-white/70">
        <span>Tip amount</span>
        <span>{amount.toFixed(2)} USDC</span>
      </div>
      <div className="flex justify-between text-sm text-white/70">
        <span>Platform fee (2.5%)</span>
        <span>&minus;{fee.toFixed(2)} USDC</span>
      </div>
      <div className="border-t border-white/10 pt-2 flex justify-between font-heading font-semibold">
        <span>Creator receives</span>
        <span>{net.toFixed(2)} USDC</span>
      </div>
    </div>
  );
}
