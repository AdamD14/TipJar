type Subscription = { fan: string; amount: number; period: string };

export default function SubscriptionsList({ items }: { items: Subscription[] }) {
  if (!items.length) return <p className="opacity-70">Brak subskrypcji.</p>;
  return (
    <div className="grid gap-2">
      {items.map((s, i) => (
        <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 flex justify-between">
          <span>@{s.fan}</span>
          <span>
            {s.amount} USDC / {s.period}
          </span>
        </div>
      ))}
    </div>
  );
}
