"use client";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";

export default function Bell({ href = "/fan/notifications" }: { href?: string }) {
  const { items } = useNotifications({ intervalMs: 20000 });
  const unread = Array.isArray(items) ? items.filter((n) => n?.read === false).length : 0;
  return (
    <Link
      href={href}
      aria-label={unread > 0 ? `Notifications: ${unread} unread` : "Notifications"}
      className="relative inline-flex select-none items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
    >
      <span className="leading-none">🔔</span>
      {unread > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 inline-flex min-w-[18px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFD700] px-1 text-[10px] font-bold text-[#003737]"
        >
          {unread}
        </span>
      )}
    </Link>
  );
}

