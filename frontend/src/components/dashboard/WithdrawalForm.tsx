"use client";
import { useState } from 'react';

export default function WithdrawalForm({
  balance,
  onSubmit,
}: {
  balance: number;
  onSubmit: (p: { amount: number; address: string }) => Promise<void> | void;
}) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ amount: Number(amount), address });
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="rounded-xl bg-white/5 border border-white/10 p-3">
        <div className="text-sm opacity-80">Dostępne saldo</div>
        <div className="text-xl font-bold">{balance.toFixed(2)} USDC</div>
      </div>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Kwota</span>
        <input
          inputMode="decimal"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Adres wypłaty (EOA)</span>
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2"
        >
          Wypłać
        </button>
        <button
          type="button"
          onClick={() => setAmount(String(balance))}
          className="rounded-lg border border-white/20 px-4 py-2"
        >
          Wypłać wszystko
        </button>
      </div>
    </form>
  );
}
