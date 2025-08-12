export default function CreatorDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Creator Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Tips today", "Total supporters", "USDC balance", "Payouts"].map((t, i) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
            <div className="text-sm text-white/60">{t}</div>
            <div className="mt-2 text-2xl font-bold">{["23", "4,120", "1,053", "2"][i]}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#140a2a] p-4">
        <h2 className="font-semibold">Recent tips</h2>
        <div className="mt-3 space-y-2 text-sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-white/10 py-2 last:border-0"
            >
              <span>Fan {i + 1}</span>
              <span className="text-white/70">{i % 2 ? 3 : 5} USDC</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
