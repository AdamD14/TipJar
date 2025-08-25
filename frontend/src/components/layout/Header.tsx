"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = "mobile-menu";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-brand-gold shadow-[0_2px_6px_rgba(255,165,0,0.2)]"
      style={{
        backgroundImage: "url('/tlo.png')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`absolute inset-0 transition-all duration-300 pointer-events-none ${
          isScrolled ? "bg-gradient-main backdrop-blur-md" : "bg-transparent"
        }`}
      />

      <div className="h-full px-2 flex items-center justify-between relative">
        {/* BRAND - ZMODYFIKOWANA SEKCJA */}
        <Link href="/" className="flex gap-0.5 items-center">
          <div className="relative h-14 w-10">
            <Image
              src="/logo.png"
              alt="TipJar+ logo"
              fill={true}
              objectFit="contain"
              priority
            />
          </div>
          <span className="text-[24px] font-ui text-text-primary leading-none">
            tipjar.plus
          </span>
        </Link>

        {/* NAVBAR — desktop */}
        <div className="hidden xl:block">
          <Navbar variant="desktop" />
        </div>

        {/* PRZYCISKI — desktop (po prawej) */}
        <div className="hidden xl:flex items-center space-x-4">
          <Link
            href="/login"
            className="
              group relative inline-flex items-center justify-center
              h-10 px-9 text-[14px] font-ui font-semibold
              text-[#092327]
              rounded-[33px] border-2 border-[#00ffff] bg-[#EAF4FB]
              transition-all duration-300 ease-linear
              hover:rounded-[2px] hover:bg-gradient-to-r hover:from-[#0a5e5e] hover:to-[linear-gradient(352deg, #0cbaba 0%, #1db7ea 50%, #0a5e5e 100%);]              hover:text-[#EAF4FB] active:translate-y-[1px]
            "
          >
            <User className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-[5px]" />
            login
          </Link>
        </div>

        {/* HAMBURGER — mobile */}
        <button
          onClick={() => setIsMenuOpen((s) => !s)}
          className="xl:hidden text-text-secondary ml-2"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE NAV — menu + login/register pod menu */}
      <div
        id={mobileMenuId}
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="relative">
          <Navbar variant="mobile" onClickItem={() => setIsMenuOpen(false)} />
          <div className="px-4 pb-4 flex flex-col gap-2">
            <Link
              href="/login"
              className="block text-center border border-[#FFD700] text-[#FFD700] rounded-md py-2 hover:bg-[#003737] hover:text-white transition"
              onClick={() => setIsMenuOpen(false)}
            >
              login
            </Link>
            <Link
              href="/register"
              className="block text-center bg-[#FFD700] text-black rounded-md py-2 hover:bg-transparent hover:border hover:border-[#FFD700] hover:text-[#FFD700] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}