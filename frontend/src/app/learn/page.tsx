export default function LearnPage() {
  const topics = [
    { t: 'Jak kupić USDC?', d: 'Prosty przewodnik krok po kroku.' },
    { t: 'Polecane portfele', d: 'MetaMask, Rabby, Coinbase Wallet – plusy i minusy.' },
  ];
  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Centrum Wiedzy</h1>
      <ul className="space-y-3">
        {topics.map((x) => (
          <li key={x.t} className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="font-semibold">{x.t}</div>
            <div className="text-gray-300 text-sm">{x.d}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

