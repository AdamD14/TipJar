"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentY = window.pageYOffset;
      setHideOnScroll(currentY > lastScrollY && currentY > 100);
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = [
    "fixed top-0 left-0 w-full z-50 transition-opacity duration-500",
    hideOnScroll ? "opacity-0 pointer-events-none" : "opacity-100",
  ].join(" ");

  return (
    <header className={navbarClasses}>
      <nav className="flex items-center justify-between px-4 py-3 bg-transparent backdrop-blur-sm">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-bold text-xl bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg"
        >
          tipjar<span className="text-tj-gold">.plus</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex md:items-center md:space-x-6 text-white text-sm font-medium">
          <li className="opacity-75 hover:opacity-100 transition-opacity">
            <Link href="#why">Why TipJar+</Link>
          </li>
          <li className="opacity-75 hover:opacity-100 transition-opacity">
            <Link href="#how">How it works</Link>
          </li>
          <li className="opacity-75 hover:opacity-100 transition-opacity">
            <Link href="#studio">Start Building / AI Studio</Link>
          </li>
          <li className="opacity-75 hover:opacity-100 transition-opacity">
            <Link href="#explore">Explore</Link>
          </li>
          <li className="opacity-75 hover:opacity-100 transition-opacity">
            <Link href="#learn">Learn</Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Link href="/login"><Button variant="secondary" size="sm">Login</Button></Link>
          <Link href="/signup"><Button variant="primary" size="sm">Get Started</Button></Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white focus:outline-none ml-2"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-tj-turquoise/90 backdrop-blur-sm">
          <ul className="flex flex-col items-center space-y-4 py-4 text-white text-base font-medium">
            <li><Link href="#why" onClick={() => setIsMenuOpen(false)}>Why TipJar+</Link></li>
            <li><Link href="#how" onClick={() => setIsMenuOpen(false)}>How it works</Link></li>
            <li><Link href="#studio" onClick={() => setIsMenuOpen(false)}>Start Building / AI Studio</Link></li>
            <li><Link href="#explore" onClick={() => setIsMenuOpen(false)}>Explore</Link></li>
            <li><Link href="#learn" onClick={() => setIsMenuOpen(false)}>Learn</Link></li>
            <li><Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
            <li><Link href="/signup" onClick={() => setIsMenuOpen(false)}>Get Started</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
