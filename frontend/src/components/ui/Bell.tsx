"use client";
import Link from "next/link";

export default function Bell({
  count = 0,
  href = "/fan/notifications",
  title = "Notifications",
}: {
  count?: number;
  href?: string;
  title?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={title}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm8-6v-5a8 8 0 1 0-16 0v5l-2 2v1h20v-1l-2-2Z"
          fill="currentColor"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 min-w-[20px] rounded-full bg-[#FFD700] px-1.5 text-center text-[11px] font-bold text-[#003737]">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
