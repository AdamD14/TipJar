"use client";

import Link from "next/link";
import Image from "next/image";
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
import Button from "@/components/ui/buttons/Button";

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
  { label: "Analytics", icon: BarChart3, href: "analytics" },
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

  if (!hydrated || !user?.username) return null;

  const username = user.username;
  const role: Role = user.role === "FAN" ? "FAN" : "CREATOR";
  const prefix = role === "CREATOR" ? "creator-desktop" : "fan-desktop";

  const centerItems = role === "CREATOR" ? creatorNav : fanNav;

  const homeHref = `/@${username}/${prefix}`;

  return (
    <header
      className="fixed top-0 inset-x-0 z-elevated h-14 flex items-center px-4 gap-4 border-b border-border-subtle backdrop-blur-[20px] saturate-[200%]"
      style={{
        backgroundColor: "rgba(0, 31, 31, 0.44)",
      }}
    >
      {/* ── Column 1: Brand ── */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={homeHref}
          className="flex items-center gap-2 group transition-all duration-200"
        >
          <span className="font-heading font-semibold text-md text-text-primary hidden sm:inline">
            tipjar.plus
          </span>
          <Image
            src="/logo.svg"
            alt="TipJar+"
            width={28}
            height={28}
            className="shrink-0"
            priority
          />
        </Link>
      </div>

      {/* ── Column 2: Center nav ── */}
      <nav className="flex-1 flex items-center justify-center gap-1 min-w-0">
        {centerItems.map((item) => {
          const Icon = item.icon;
          const fullHref = `/@${username}/${prefix}/${item.href}`;
          const active = pathname === fullHref;

          return (
            <Link
              key={item.href}
              href={fullHref}
              className={[
"flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-md font-heading font-medium transition-colors duration-200 whitespace-nowrap",
          active
            ? "bg-surface-elevated text-primary"
            : "text-text-primary/50 hover:text-text-primary hover:bg-surface-elevated/70",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Column 3: Wallet · Bell · @username ── */}
      <div className="flex items-center gap-1 shrink-0">
        <Link
          href={`/@${username}/${prefix}/wallet`}
          className="p-2 rounded-lg text-text-primary hover:text-text-tertiary hover:bg-surface-elevated/70 transition-colors duration-200"
          aria-label="Wallet"
        >
          <Wallet className="h-5 w-5" />
        </Link>

        <Link
          href={`/@${username}/${prefix}/notifications`}
          className="p-2 rounded-lg text-text-primary hover:text-text-tertiary hover:bg-surface-elevated/70 transition-colors duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Link>

        <Button variant="ghost" href={`/@${username}`} className="gap-3 px-2 tracking-wide">
          @{username}
        </Button>
      </div>
    </header>
  );
}
