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
        />
        <span className="text-white/90">Wallet</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="method"
          checked={value === "card"}
          onChange={() => onChange("card")}
        />
        <span className="text-white/90">Card / SEPA</span>
      </label>
    </div>
  );
}
