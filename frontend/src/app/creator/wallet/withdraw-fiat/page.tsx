"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { WithdrawFiatSchema } from "@/lib/validators";

export default function WithdrawFiat() {
  const [f, setF] = useState({ amount: "", method: "iban" as "iban" | "card" | "revolut", details: {} as any });
  const submit = async () => {
    const payload = WithdrawFiatSchema.parse({ amount: Math.round(Number(f.amount) * 100), method: f.method, details: f.details });
    await api("/api/v1/creator/payout", { method: "POST", body: JSON.stringify(payload) });
    alert("Payout requested");
  };
  return (
    <section className="max-w-lg bg-white/5 border border-white/10 rounded-2xl p-6">
      <h1 className="text-lg font-semibold mb-4">Withdraw (FIAT)</h1>
      <Label>Amount (USDC)</Label>
      <Input type="number" value={f.amount} onChange={(v) => setF({ ...f, amount: v })} />
      <Label className="mt-3">Method</Label>
      <Select value={f.method} onChange={(v) => setF({ ...f, method: v as any })} options={[["iban", "IBAN"], ["card", "Card"], ["revolut", "Revolut"]]} />
      <button onClick={submit} className="mt-5 px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold">
        Request payout
      </button>
    </section>
  );
}
function Label({ children, className }: { children: any; className?: string }) {
  return <div className={`text-sm ${className || ""}`}>{children}</div>;
}
function Input({ value, onChange, ...rest }: { value: any; onChange: (v: string) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-lg p-2" />;
}
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-lg p-2 mt-1">
      {options.map(([v, l]) => (
        <option key={v} value={v} className="bg-[#003737]">
          {l}
        </option>
      ))}
    </select>
  );
}

