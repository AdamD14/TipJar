"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

/**
 * Publiczny header dla stron innych niż landing.
 * Landing utrzymuje własny układ i tło zgodnie z ustaleniami.
 */
export default function PublicHeader() {
  const [open, setOpen] = useState(false);
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
        "fixed inset-x-0 top-0 z-40 backdrop-blur transition-colors",
        scrolled ? "bg-[#003737]/90" : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Bez logo/brandingu w headerze – zgodnie z wytycznymi */}
        <div className="flex items-center gap-8 text-sm">
          <NavLink href="/why" label="Why tipjar+?" />
          <NavLink href="/how" label="How it works?" />
          <NavLink href="/ai" label="Start building / AI Studio" />
          <NavLink href="/creators" label="Explore creators" />
          <NavLink href="/learn" label="Learn about WEB3" />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl border border-[#003737] px-4 py-2 text-sm font-semibold text-[#003737] transition-colors hover:bg-gradient-to-r hover:from-[#002828] hover:to-[#007474] hover:text-white md:inline-flex"
          >
            Login
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-xl p-2 text-[#DDE0DA] md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative hidden text-[13px] text-[#BCC1B6] transition-colors hover:text-[#C8AD00] md:inline-block"
    >
      <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C8AD00] after:transition-all hover:after:w-full">
        {label}
      </span>
    </Link>
  );
}
