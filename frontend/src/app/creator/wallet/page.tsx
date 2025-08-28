import CreatorShell from "@/components/creator/CreatorShell";

export default function Page() {
  return (
    <CreatorShell title="Wallet">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#002828] to-[#007474] p-6 text-white lg:col-span-2">
          <h2 className="text-xl font-semibold">USDC Balance</h2>
          <p className="mt-3 text-4xl font-bold tracking-tight">$ 0.00</p>
          <div className="mt-6 flex gap-3">
            <button className="rounded-xl bg-white px-4 py-2 font-semibold text-[#003737]">Withdraw (FIAT)</button>
            <button className="rounded-xl border border-white/20 px-4 py-2 font-semibold text-white/90">Withdraw (Web3)</button>
          </div>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm text-[#BCC1B6]">Shortcuts</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="rounded-xl bg-[#FFD700] px-3 py-2 font-semibold text-[#003737]">Request payout</button>
            <button className="rounded-xl border border-white/15 px-3 py-2 font-semibold text-white/80">Export CSV</button>
          </div>
        </section>
      </div>
      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <div className="mt-4 divide-y divide-white/10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#003737]/60" />
                <div>
                  <p className="text-sm text-white/90">Tip from @fan_{i + 1}</p>
                  <p className="text-xs text-[#BCC1B6]">Aug {10 + i}, 2025</p>
                </div>
              </div>
              <div className="text-sm text-[#FFD700]">+{(i + 1) * 3} USDC</div>
            </div>
          ))}
        </div>
      </section>
    </CreatorShell>
  );
}

