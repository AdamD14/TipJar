"use client";
import { useState } from 'react';
import { isEvmAddress } from '@/lib/validators/address';

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
  const [err, setErr] = useState<string | null>(null);

  const amt = Number((amount || '').replace(',', '.'));
  const validAmt = Number.isFinite(amt) && amt > 0 && amt <= balance;
  const validAddr = isEvmAddress(address);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!validAmt) return setErr('Nieprawidłowa kwota.');
    if (!validAddr) return setErr('Nieprawidłowy adres EVM (0x…).');
    setLoading(true);
    try {
      await onSubmit({ amount: amt, address });
    } catch (e: any) {
      setErr(e?.message || 'Błąd wypłaty.');
    } finally {
      setLoading(false);
    }
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
        <div className="text-xs opacity-70">Max: {balance.toFixed(2)} USDC</div>
      </label>

      <label className="grid gap-1">
        <span className="text-sm opacity-80">Adres wypłaty (EOA)</span>
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 p-2"
          placeholder="0x…"
        />
      </label>

      {err && <p className="text-red-300 text-sm">{err}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !validAmt || !validAddr}
          aria-busy={loading}
          className="rounded-lg bg-[var(--color-primary)] text-black font-semibold px-4 py-2 disabled:opacity-50"
        >
          Wypłać
        </button>
        <button
          type="button"
          onClick={() => setAmount(String(balance.toFixed(2)))}
          className="rounded-lg border border-white/20 px-4 py-2"
        >
          Wypłać wszystko
        </button>
      </div>
    </form>
  );
}
