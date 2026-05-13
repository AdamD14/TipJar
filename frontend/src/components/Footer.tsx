import Link from "next/link";
import clsx from "clsx";

export default function Footer() {
  return (
    <footer className="bg-surface-app border-t border-white/[0.05] py-8 text-center text-sm font-body text-text-ds-secondary">
      <nav className="mb-4" aria-label="Footer navigation">
        <a
          href="#"
          className={clsx(
            "mx-2",
            "text-text-ds-secondary",
            "hover:text-gold-400 hover:underline",
            "transition-colors duration-200",
          )}
        >
          Home
        </a>
        <a
          href="#how"
          className={clsx(
            "mx-2",
            "text-text-ds-secondary",
            "hover:text-gold-400 hover:underline",
            "transition-colors duration-200",
          )}
        >
          How it Works
        </a>
        <a
          href="#why"
          className={clsx(
            "mx-2",
            "text-text-ds-secondary",
            "hover:text-gold-400 hover:underline",
            "transition-colors duration-200",
          )}
        >
          Why
        </a>
        <a
          href="#examples"
          className={clsx(
            "mx-2",
            "text-text-ds-secondary",
            "hover:text-gold-400 hover:underline",
            "transition-colors duration-200",
          )}
        >
          Examples
        </a>
        <Link
          href="/explore"
          className={clsx(
            "mx-2",
            "text-text-ds-secondary",
            "hover:text-gold-400 hover:underline",
            "transition-colors duration-200",
          )}
        >
          Explore
        </Link>
      </nav>
      <div className="mb-2">
        <a
          href="#"
          className={clsx(
            "mx-2",
            "text-text-ds-tertiary",
            "hover:text-text-ds-secondary hover:underline",
            "transition-colors duration-200",
          )}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className={clsx(
            "mx-2",
            "text-text-ds-tertiary",
            "hover:text-text-ds-secondary hover:underline",
            "transition-colors duration-200",
          )}
        >
          Terms of Service
        </a>
      </div>
      <div className="text-text-ds-tertiary">
        &copy; 2025 TipJar+. All rights reserved.
      </div>
    </footer>
  );
}
