export default function FanDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your support</h1>
      <div className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
        <h2 className="font-semibold">Creators you support</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="flex justify-between border-b border-white/10 py-2 last:border-0"
            >
              <span>Creator {i + 1}</span>
              <span className="text-white/70">{i % 2 ? 3 : 5} tips</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
