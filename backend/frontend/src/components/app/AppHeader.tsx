"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Wallet, Settings, Users, Home, Heart } from "lucide-react";

export default function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors backdrop-blur",
        scrolled ? "bg-[#003737]/90" : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brak logo/brandingu w headerze (branding w hero). */}
        <div className="flex items-center gap-4 text-sm">
          <NavLink href="/feed" label="Feed" icon={<Home className="h-4 w-4" />} />
          <NavLink href="/following" label="Following" icon={<Users className="h-4 w-4" />} />
          <NavLink href="/wallet" label="Wallet" icon={<Wallet className="h-4 w-4" />} />
          <NavLink href="/notifications" label="Notifications" icon={<Bell className="h-4 w-4" />} />
          <NavLink href="/settings" label="Settings" icon={<Settings className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 md:inline-flex"
            disabled
            title="Soon"
          >
            <Heart className="h-4 w-4" /> Tip Now
          </button>
          <div className="h-9 w-9 rounded-xl bg-[#FFD700]/80" title="Avatar" />
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 text-[13px] text-[#BCC1B6] transition-colors hover:text-[#C8AD00]"
      aria-label={label}
    >
      {icon}
      <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C8AD00] after:transition-all group-hover:after:w-full">
        {label}
      </span>
    </Link>
  );
}

