"use client";
import React from "react";

export default function FeeBreakdown({ amount }: { amount: number }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 text-white">
      <p className="text-sm text-muted">Amount</p>
      <p className="mt-1 text-lg font-semibold">{amount.toFixed(2)} USDC</p>
    </div>
  );
}
