"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Settings, Users, WalletMinimal } from "lucide-react";

const items = [
  { href: "/fan/feed", label: "Feed", icon: Home },
  { href: "/fan/following", label: "Following", icon: Users },
  { href: "/fan/wallet", label: "Wallet", icon: WalletMinimal },
  { href: "/fan/notifications", label: "Notifications", icon: Bell },
  { href: "/fan/settings", label: "Settings", icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="h-full w-full overflow-y-auto p-3 md:p-4">
      <nav className="space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[#003737] text-white"
                  : "text-[#BCC1B6] hover:text-white hover:bg-[#003737]/70",
              ].join(" ")}
            >
              <Icon className="h-5 w-5 opacity-90" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

