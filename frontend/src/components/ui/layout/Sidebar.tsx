"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav className="p-4 space-y-1">
      {items.map((it) => {
        const active = path === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`block px-3 py-2 rounded-lg transition ${
              active ? 'bg-primary text-black' : 'hover:bg-white/5 text-[var(--fg)]'
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
