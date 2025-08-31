export default function FeedPage() {
  const items = [{ type: 'tip_thanks', creator: 'marta_art', amount: 5, time: '1d' }];
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Twoja aktywność</h1>
      <div className="grid gap-2">
        {items.map((x, i) => (
          <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3">
            {x.type === 'tip_thanks' ? (
              <>Twórca <b>{x.creator}</b> podziękował za {x.amount} USDC • {x.time}</>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
