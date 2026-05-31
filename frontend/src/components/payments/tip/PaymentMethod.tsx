"use client";
import React from "react";

export type MethodKey = "wallet" | "card";

export default function PaymentMethod({ value, onChange }: { value: MethodKey; onChange: (m: MethodKey) => void }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="method"
          checked={value === "wallet"}
          onChange={() => onChange("wallet")}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
        />
        <span className="text-white/90">USDC Wallet</span>
      </label>
      <label className="flex items-center gap-2 opacity-40 cursor-not-allowed">
        <input
          type="radio"
          name="method"
          disabled
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
        />
        <span className="text-white/90">Card / SEPA (coming soon)</span>
      </label>
    </div>
  );
}
