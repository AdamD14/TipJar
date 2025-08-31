export default function WalletPage() {
  const balance = 42.75;
  const tx = [
    { id: 'tx1', kind: 'tip', amount: -5, ts: '2025-08-20' },
    { id: 'tx2', kind: 'deposit', amount: 50, ts: '2025-08-18' },
  ];
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Portfel</h1>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-6">
        <div className="text-sm opacity-80">Saldo</div>
        <div className="text-3xl font-bold">{balance.toFixed(2)} USDC</div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Historia</h2>
      <div className="grid gap-2">
        {tx.map((t) => (
          <div key={t.id} className="rounded-xl bg-white/5 border border-white/10 p-3 flex justify-between">
            <span className="capitalize">{t.kind}</span>
            <span className={t.amount < 0 ? 'text-red-300' : 'text-green-300'}>
              {t.amount > 0 ? '+' : ''}
              {t.amount} USDC
            </span>
            <span className="opacity-70">{t.ts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
