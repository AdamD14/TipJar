"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  Monitor,
  Clapperboard,
  PlusCircle,
  Users,
  BarChart3,
  Compass,
  Music,
  Wallet,
  Bell,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import Button from "@/components/ui/buttons/Button";
import { UsdcBalance } from "./UsdcBalance";

type Role = "CREATOR" | "FAN";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const creatorNav: NavItem[] = [
  { label: "Desktop", icon: Monitor, href: "desktop" },
  { label: "Studio", icon: Clapperboard, href: "studio" },
  { label: "Add", icon: PlusCircle, href: "add" },
  { label: "Community", icon: Users, href: "community" },
  { label: "Growth", icon: BarChart3, href: "analytics" },
];

const fanNav: NavItem[] = [
  { label: "Explore", icon: Compass, href: "explore" },
  { label: "Community", icon: Users, href: "community" },
  { label: "Tyl", icon: Music, href: "tyl" },
];

export default function Navbar() {
  const pathname = usePathname();
  const params = useParams<{ username: string }>();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s._hasHydrated);
  const unreadCount = useNotificationStore((s) => s.notifications.filter((n) => !n.read).length);

  if (!hydrated || !user?.username) return null;

  const username = user.username;
  const role: Role = user.role === "FAN" ? "FAN" : "CREATOR";
  const prefix = role === "CREATOR" ? "creator-desktop" : "fan-desktop";

  const centerItems = role === "CREATOR" ? creatorNav : fanNav;

  const homeHref = `/@${username}/${prefix}`;

  return (
    <header
      className="header-shell fixed top-0 inset-x-0 z-elevated border-b border-teal-300 backdrop-blur-[20px] saturate-[200%]"
      style={{
        backgroundImage: "linear-gradient" 
      }}
    >
    <div className="header-inner">
    {/* ── Column 1: Brand ── */}
    <div className="flex items-center gap-2">
      <Link
        href={homeHref}
        className="nav-item gap-2 group rounded-lg hover:text-text-primary hover:bg-surface-elevated/70"
      >
        <span className="font-heading font-semibold text-xl text-text-primary hidden sm:inline">
          tipjar.plus
        </span>
      </Link>
    </div>

      {/* ── Column 2: Center nav ── */}
      <nav className="nav-list">
      {centerItems.map((item) => {
        const Icon = item.icon;
        const fullHref = `/@${username}/${prefix}/${item.href}`;
        const active = pathname === fullHref;

        return (
        <Link
          key={item.href}
          href={fullHref}
          className={[
            "nav-item gap-1.5 rounded-lg font-heading",
            active
              ? "bg-surface-elevated text-primary"
              : "text-text-primary hover:text-text-primary hover:bg-surface-elevated/70",
          ].join(" ")}
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        );
      })}
      </nav>

    {/* ── Column 3: Wallet · Bell · @username ── */}
    <div className="flex items-center gap-1">
      {/* Wallet + USDC Balance as one clickable element */}
      <Link
        href={`/@${username}/${prefix}/wallet`}
        className="nav-item gap-1 rounded-lg text-text-primary hover:text-text-primary hover:bg-surface-elevated/70"
        aria-label="Wallet"
      >
        <UsdcBalance />
        <Wallet className="h-5 w-5 text-text-primary" />
      </Link>

      <Link
        href={`/@${username}/${prefix}/notifications`}
        className="icon-button relative rounded-lg text-text-primary hover:text-text-primary hover:bg-surface-elevated/70"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-teal-400 rounded-full border-2 border-[#002020]" />
        )}
      </Link>

      <Button
        variant="ghost"
        href={`/@${username}`}
        className="gap-3 px-2 py-0 tracking-wide text-text-primary hover:!translate-y-0 hover:!shadow-none hover:!bg-surface-elevated/70 hover:!brightness-100 hover:!text-text-primary active:!translate-y-0 active:!scale-100"
      >
        @{username}
      </Button>
    </div>
    </div>
    </header>
  );
}
