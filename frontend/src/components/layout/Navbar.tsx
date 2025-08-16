"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "why tipjar+?", href: "#why" },
  { label: "how it works?", href: "#how-it-works" },
  { label: "start building / ai studio", href: "#start-building" },
  { label: "explore creators", href: "#explore" },
  { label: "learn about web3", href: "#learn" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = "mobile-menu";

  return (
    <nav className="w-full bg-transparent bg-opacity-70 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-1 py-2 xl:py-4 xl:px-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-text-secondary xl:hidden"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <ul className="hidden xl:flex items-end gap-5 text-opacity-70 text-[14px] lowercase text-text-secondary">
          {navItems.map((item) => (
            <li key={item.href}className="p-2 rounded-lg backdrop-blur-md bg-[#4d194d]/10 shadow-md" >
              <Link
                href={item.href}
                className="transition hover:text-[#FFD700] hover:underline underline-offset-2 duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        id={mobileMenuId}
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4  pb-4 text-2xl lowercase text-text-secondary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 transition hover:text-[#FFD700] hover:underline underline-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}