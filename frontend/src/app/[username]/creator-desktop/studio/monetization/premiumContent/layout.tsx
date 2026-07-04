"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const tabs = [
  { href: "products", label: "Products" },
  { href: "tiers", label: "Tiers" },
  { href: "bundles", label: "Bundles" },
  { href: "access-settings", label: "Access" },
  { href: "billing", label: "Billing" },
] as const;

export default function PremiumContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const current = tabs.find((t) =>
    pathname.includes(`/studio/monetization/premiumContent/${t.href}`)
  )?.href || "products";

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 border-l-4 border-teal-400 pl-4">
        <h1 className="text-base font-heading font-medium text-teal-400">
          Premium Content
        </h1>
        <p className="text-xs text-white/30">
          Products, tiers, bundles & access
        </p>
      </div>

      <nav
        className="flex gap-1 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-1 overflow-x-auto"
        aria-label="Premium Content sections"
      >
        {tabs.map((tab) => {
          const href = `/studio/monetization/premiumContent/${tab.href}`;
          const active = current === tab.href;
          return (
            <Link
              key={tab.href}
              href={href}
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-heading font-medium transition-colors whitespace-nowrap",
                active
                  ? "bg-teal-700 text-white shadow-inner"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}