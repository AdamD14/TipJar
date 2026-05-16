"use client";
import { useState } from 'react';
import { isEvmAddress } from '@/lib/validators/address';
import Field from '@/components/ui/forms/Field';
import Input from '@/components/ui/forms/Input';
import FormError from '@/components/ui/forms/FormError';
import Button from '@/components/ui/buttons/Button';

function isFetchError(e: unknown): e is { message?: string } {
  return typeof e === 'object' && e !== null && 'message' in e;
}

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
    if (!validAmt) return setErr('Invalid amount.');
    if (!validAddr) return setErr('Invalid EVM address (0x…).');
    setLoading(true);
    try {
      await onSubmit({ amount: amt, address });
    } catch (e: unknown) {
      setErr(isFetchError(e) ? e.message || 'Withdrawal failed.' : 'Withdrawal failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="rounded-xl bg-surface-elevated border border-white/10 p-3">
        <div className="text-sm text-text-ds-secondary font-body">Available balance</div>
        <div className="text-xl font-heading font-bold text-text-ds-primary">{balance.toFixed(2)} USDC</div>
      </div>

      <Field label="Amount" hint={`Max: ${balance.toFixed(2)} USDC`}>
        <Input
          inputMode="decimal"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Field>

      <Field label="Withdrawal address (EOA)">
        <Input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x…"
        />
      </Field>

      {err && <FormError message={err} />}

      <div className="flex gap-2">
        <Button
          type="submit"
          loading={loading}
          disabled={!validAmt || !validAddr}
        >
          Withdraw
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setAmount(String(balance.toFixed(2)))}
        >
          Withdraw all
        </Button>
      </div>
    </form>
  );
}
