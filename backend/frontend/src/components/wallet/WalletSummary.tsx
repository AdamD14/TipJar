export default function WalletSummary() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-2xl bg-white/5 p-5 text-[#DDE0DA]">
        <h3 className="text-sm text-[#BCC1B6]">USDC Balance</h3>
        <p className="mt-2 text-3xl font-bold text-white">$1,240.50</p>
        <p className="mt-1 text-xs text-white/60">On Solana</p>
      </div>
      <div className="rounded-2xl bg-white/5 p-5 text-[#DDE0DA]">
        <h3 className="text-sm text-[#BCC1B6]">Monthly Inflow</h3>
        <p className="mt-2 text-3xl font-bold text-white">$320.00</p>
        <p className="mt-1 text-xs text-white/60">+12% vs last month</p>
      </div>
      <div className="rounded-2xl bg-white/5 p-5 text-[#DDE0DA]">
        <h3 className="text-sm text-[#BCC1B6]">Payouts</h3>
        <div className="mt-2 flex gap-3">
          <button className="flex-1 rounded-xl bg-[#FFD700] px-4 py-2 font-semibold text-[#003737]" disabled>
            Withdraw (soon)
          </button>
          <button className="flex-1 rounded-xl border border-white/15 px-4 py-2 font-semibold text-white/90" disabled>
            Deposit (soon)
          </button>
        </div>
      </div>
    </div>
  );
}

