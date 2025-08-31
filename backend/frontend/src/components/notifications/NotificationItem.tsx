export interface NotificationItemProps {
  id: string;
  kind: "tip" | "follow" | "system";
  title: string;
  time: string;
  read?: boolean;
}

export default function NotificationItem({ item }: { item: NotificationItemProps }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 p-4",
        item.read ? "bg-white/5" : "bg-[#FFD700]/10",
      ].join(" ")}
      role="listitem"
      aria-live={item.read ? undefined : "polite"}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-white">{item.title}</h4>
        <span className="text-xs text-white/60">{item.time}</span>
      </div>
      <div className="mt-2 text-xs text[#BCC1B6]">{badge(item.kind)}</div>
    </div>
  );
}

function badge(kind: NotificationItemProps["kind"]) {
  switch (kind) {
    case "tip":
      return "Tip";
    case "follow":
      return "New follower";
    case "system":
      return "System";
  }
}

