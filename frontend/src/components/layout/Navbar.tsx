"use client";

import Link from "next/link";

const navItems = [
  { label: "why tipjar+?", href: "#why" },
  { label: "how it works?", href: "#how-it-works" },
  { label: "start building / ai studio", href: "#start-building" },
  { label: "explore creators", href: "#explore" },
  { label: "learn about web3", href: "#learn" },
];

interface NavbarProps {
  variant?: "desktop" | "mobile";
  onClickItem?: () => void;
}

export default function Navbar({ variant = "desktop", onClickItem }: NavbarProps) {
  if (variant === "desktop") {
    return (
      <ul className="hidden xl:flex gap-5 text-opacity-70 text-[14px] lowercase text-text-secondary">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="p-2 rounded-lg backdrop-blur-md bg-[#4d194d]/10 shadow-md"
          >
            <Link
              href={item.href}
              className="transition hover:text-[#FFD700] hover:underline underline-offset-2 duration-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="px-4 pb-4 text-2xl lowercase text-text-secondary">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClickItem}
          className="block py-2 transition hover:text-[#FFD700] hover:underline underline-offset-2"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
