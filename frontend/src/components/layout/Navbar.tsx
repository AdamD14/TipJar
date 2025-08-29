"use client";

import Link from "next/link";

const navItems = [
  { label: "why tipjar+?", href: "#why" },
  { label: "how it works?", href: "#how-it-works" },
  { label: "start building / ai studio", href: "#start-building" },
  { label: "Explore", href: "/explore" },
  { label: "learn about web3", href: "#learn" },
];

interface NavbarProps {
  variant?: "desktop" | "mobile";
  onClickItem?: () => void;
}

export default function Navbar({
  variant = "desktop",
  onClickItem,
}: NavbarProps) {
  if (variant === "desktop") {
    return (
      <ul className="hidden xl:flex gap-5 text-[14px] lowercase text-[#DDE0DA]">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="p-2 rounded-lg backdrop-blur-md bg-black/10 shadow-md"
          >
            <Link
              href={item.href}
              className="transition hover:text-[#FFD700] hover:underline underline-offset-2 duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737] rounded"
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
          className="block py-2 rounded-md transition hover:text-[#FFD700] hover:underline underline-offset-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003737]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
