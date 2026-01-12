import FanShell from "@/components/fan/FanShell";

const NOTIFS = [
  { id: 1, kind: "tip", text: "@creator_1 thanked you for your support!", time: "1h" },
  { id: 2, kind: "follow", text: "@creator_2 posted a new video.", time: "3h" },
  { id: 3, kind: "system", text: "Security tip: enable 2FA to protect your account.", time: "1d" },
];

export default function Page() {
  return (
    <FanShell title="Notifications">
      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
        {NOTIFS.map((n) => (
          <div key={n.id} className="flex items-start justify-between gap-4 p-4">
            <div className="flex-1">
              <p className="text-sm text-white/90">{n.text}</p>
              <p className="mt-1 text-xs text-[#BCC1B6]">{n.time} ago</p>
            </div>
            <button className="rounded-lg border border-white/15 px-3 py-1 text-xs text-white/80">Mark read</button>
          </div>
        ))}
      </div>
    </FanShell>
  );
}

