export interface TxItem {
  id: string;
  type: "tip_in" | "tip_out" | "payout" | "deposit";
  amount: number; // USD
  time: string;
  note?: string;
}

export default function TransactionList({ items }: { items: TxItem[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-[#DDE0DA]">
      <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>
      <ul className="space-y-3">
        {items.map((tx) => (
          <li key={tx.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <div className="text-sm text-[#DDE0DA]">
              <span className="font-medium text-white">{label(tx.type)}</span>
              <span className="opacity-60"> • {tx.time}</span>
              {tx.note && <span className="opacity-90"> — {tx.note}</span>}
            </div>
            <div className="text-sm font-semibold text-[#FFD700]">${tx.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function label(t: TxItem["type"]) {
  switch (t) {
    case "tip_in":
      return "Tip received";
    case "tip_out":
      return "Tip sent";
    case "payout":
      return "Payout";
    case "deposit":
      return "Deposit";
  }
}

