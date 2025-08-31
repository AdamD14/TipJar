import type { Subscription } from '@/lib/api/contracts';

export default function SubscriptionsList({ items }: { items: Subscription[] }) {
  if (!items?.length) return <p className="opacity-70">Brak subskrypcji.</p>;
  return (
    <div className="grid gap-2">
      {items.map((s) => (
        <div
          key={s.id}
          className="rounded-xl bg-white/5 border border-white/10 p-3 grid grid-cols-3 sm:grid-cols-5 gap-2"
        >
          <span>@{s.fan}</span>
          <span>
            {s.amount} USDC / {s.period}
          </span>
          <span className="opacity-75">{new Date(s.startedAt).toLocaleDateString()}</span>
          <span className={`text-sm ${s.active ? 'text-green-300' : 'text-red-300'}`}>
            {s.active ? 'aktywna' : 'nieaktywna'}
          </span>
          <span className="hidden sm:block text-right opacity-70">ID: {s.id}</span>
        </div>
      ))}
    </div>
  );
}
