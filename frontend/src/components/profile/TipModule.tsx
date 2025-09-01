'use client';

import { useId, useState } from 'react';

type Props = {
  presets?: number[]; // default [5,10,25]
  currency?: 'USD' | 'EUR' | 'GBP';
  onSubmit?: (amount: number, currency: Props['currency']) => Promise<void> | void;
};

const TEXT_PRIMARY = '#DDE0DA';
const TEXT_SECONDARY = '#BCC1B6';
const GOLD = '#FFD700';

export default function TipModule({ presets = [5, 10, 25], currency = 'USD', onSubmit }: Props) {
  const formId = useId();
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

  const valid = typeof amount === 'number' && amount > 0 && amount <= 10000;

  return (
    <form
      aria-labelledby={`${formId}-title`}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid || loading) return;
        try {
          setLoading(true);
          setError(null);
          await onSubmit?.(amount as number, currency);
        } catch (_err: unknown) {
          setError('Something went wrong.');
        } finally {
          setLoading(false);
        }
      }}
      className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(0,55,55,0.85)] p-5 backdrop-blur-sm"
    >
      <h2 id={`${formId}-title`} className="text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>
        Send a tip
      </h2>
      <p className="mt-1 text-sm" style={{ color: TEXT_SECONDARY }}>
        Choose an amount or enter your own.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setAmount(p)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${amount === p ? 'border-[#FFD700] text-[#FFD700]' : 'border-[rgba(255,215,0,0.20)] text-[#DDE0DA] hover:bg-[rgba(255,215,0,0.08)]'}`}
            aria-pressed={amount === p}
            aria-label={`Tip ${fmt(p)}`}
          >
            {fmt(p)}
          </button>
        ))}
      </div>

      <label htmlFor={`${formId}-custom`} className="mt-4 block text-sm" style={{ color: TEXT_PRIMARY }}>
        Custom amount
      </label>
      <div className="mt-1 flex items-center gap-2">
        <input
          id={`${formId}-custom`}
          inputMode="decimal"
          pattern="[0-9]+([.,][0-9]{1,2})?"
          placeholder="e.g. 7.00"
          className="w-40 rounded-xl border border-[rgba(255,215,0,0.18)] bg-[rgba(0,55,55,0.6)] px-3 py-2 text-base text-[#DDE0DA] placeholder-[#BCC1B6] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)]"
          onChange={(e) => {
            const v = e.target.value.replace(',', '.');
            const n = Number(v);
            setAmount(Number.isFinite(n) ? n : '');
          }}
          value={typeof amount === 'number' ? String(amount) : ''}
          aria-invalid={!valid && amount !== '' ? true : undefined}
        />
        <span className="text-sm" style={{ color: TEXT_SECONDARY }}>
          {currency}
        </span>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm" style={{ color: GOLD }}>
          {error}
        </p>
      )}

      <div className="mt-5">
        <button
          type="submit"
          disabled={!valid || loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-5 py-2.5 text-sm font-semibold text-[#0B0F12] shadow-[0_6px_16px_rgba(255,215,0,0.18)] transition hover:bg-[#E6C200] active:bg-[#C9A500] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.70)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737]"
          aria-busy={loading || undefined}
        >
          {loading && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B0F12] border-t-transparent" />}
          <span>Tip Now</span>
        </button>
      </div>
    </form>
  );
}
