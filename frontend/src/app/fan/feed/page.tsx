import FanShell from "@/components/fan/FanShell";

const FEED = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  actor: `user_${i + 3}`,
  target: `creator_${(i % 3) + 1}`,
  amount: (i + 1) * 2,
  time: "2h",
}));

export default function Page() {
  return (
    <FanShell title="Feed">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {FEED.map((e) => (
          <div key={e.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#003737]/70" />
              <div className="flex-1">
                <p className="text-sm text-white/90">
                  <span className="font-semibold">{e.actor}</span> supported
                  <span className="font-semibold"> @{e.target}</span>
                </p>
                <p className="text-xs text-[#BCC1B6]">{e.time} ago</p>
              </div>
              <div className="rounded-xl bg-[#FFD700]/20 px-3 py-1 text-sm text-[#FFD700]">+{e.amount} USDC</div>
            </div>
          </div>
        ))}
      </div>
    </FanShell>
  );
}

