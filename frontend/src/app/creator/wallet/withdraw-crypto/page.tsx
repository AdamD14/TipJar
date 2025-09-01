"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { WithdrawCryptoSchema } from "@/lib/validators";

export default function WithdrawCrypto() {
  const [f, setF] = useState({ amount: "", toAddress: "", chain: "base" as "base" | "polygon" | "eth" });
  const submit = async () => {
    const payload = WithdrawCryptoSchema.parse({ amount: Math.round(Number(f.amount) * 100), toAddress: f.toAddress, chain: f.chain });
    await api("/api/v1/creator/payout-crypto", { method: "POST", body: JSON.stringify(payload) });
    alert("Payout requested");
  };
  return (
    <section className="max-w-lg bg-white/5 border border-white/10 rounded-2xl p-6">
      <h1 className="text-lg font-semibold mb-4">Withdraw (USDC → Wallet)</h1>
      <Label>Amount (USDC)</Label>
      <Input type="number" value={f.amount} onChange={(v) => setF({ ...f, amount: v })} />
      <Label className="mt-3">Destination address (EVM)</Label>
      <Input value={f.toAddress} onChange={(v) => setF({ ...f, toAddress: v })} />
      <Label className="mt-3">Chain</Label>
      <Select value={f.chain} onChange={(v) => setF({ ...f, chain: v as any })} options={[["base", "Base"], ["polygon", "Polygon"], ["eth", "Ethereum"]]} />
      <div className="text-xs text-white/60 mt-3">Gas opłacany Paymasterem (jeśli aktywne) – środki w USDC.</div>
      <button onClick={submit} className="mt-5 px-4 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold">
        Request payout
      </button>
    </section>
  );
}
function Label({ children }: { children: any }) {
  return <div className="text-sm">{children}</div>;
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

