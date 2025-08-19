"use client";

import Link from "next/link";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={[
        "fixed inset-0 z-50 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-hidden={!open}
    >
      {open && (
        <div className="fixed inset-0 bg-[#003737] p-6 text-[#DDE0DA]">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="text-base font-semibold">Menu</span>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/15 px-3 py-2 text-sm"
            >
              Zamknij
            </button>
          </div>
          <nav className="mx-auto mt-8 max-w-7xl space-y-3 text-xl">
            <MenuLink href="/why" label="Why tipjar+?" onClose={onClose} />
            <MenuLink href="/how" label="How it works?" onClose={onClose} />
            <MenuLink href="/ai" label="Start building / AI Studio" onClose={onClose} />
            <MenuLink href="/creators" label="Explore creators" onClose={onClose} />
            <MenuLink href="/learn" label="Learn about WEB3" onClose={onClose} />
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-xl border border-[#003737] px-4 py-3 font-semibold text-[#003737] transition-colors hover:bg-gradient-to-r hover:from-[#002828] hover:to-[#007474] hover:text-white bg-white"
                onClick={onClose}
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2 text-[#BCC1B6] transition-colors hover:bg-[#FFD700]/15 hover:text-white"
      onClick={onClose}
    >
      {label}
    </Link>
  );
}
```tsx
"use client";

import Link from "next/link";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={[
        "fixed inset-0 z-50 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black/60",
          open ? "" : "hidden",
        ].join(" ")}
        onClick={onClose}
      />
      <aside
        className={[
          "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#003737] p-6 text-[#DDE0DA] shadow-2xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <nav className="mt-6 space-y-4 text-lg">
          <MenuLink href="/why" label="Why tipjar+?" />
          <MenuLink href="/how" label="How it works?" />
          <MenuLink href="/ai" label="Start building / AI Studio" />
          <MenuLink href="/creators" label="Explore creators" />
          <MenuLink href="/learn" label="Learn about WEB3" />
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#003737] px-4 py-3 font-semibold text-[#003737] transition-colors hover:bg-gradient-to-r hover:from-[#002828] hover:to-[#007474] hover:text-white bg-white"
              onClick={onClose}
            >
              Login
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-[#BCC1B6] transition-colors hover:text-[#C8AD00]"
      onClick={(e) => {
        // close-by-navigation handled by parent on backdrop
      }}
    >
      {label}
    </Link>
  );
}

