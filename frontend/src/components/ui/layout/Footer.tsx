import Link from 'next/link';
import Image from 'next/image';
import { Globe } from 'lucide-react';

const PRODUCT_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Why TipJar+', href: '#why' },
  { label: 'Explore creators', href: '#explore' },
  { label: 'Creator Studio', href: '#studio' },
  { label: 'Learn Web3', href: '/learn' },
];

const RESOURCES_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Help Center', href: '#' },
  { label: 'Status', href: '#' },
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const SOCIAL_LINKS: { label: string; href: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { label: 'X (Twitter)', href: 'https://twitter.com/', icon: XIcon },
  { label: 'GitHub', href: 'https://github.com/', icon: GithubIcon },
  { label: 'Website', href: 'https://tipjar.plus', icon: Globe },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface-app/85 backdrop-blur-sm overflow-hidden">
      <img
        src="/A13.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full max-w-[1920px] aspect-video mx-auto object-cover"
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="tipjar.plus — homepage">
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                className="opacity-80"
              />
              <span className="text-sm font-heading font-semibold tracking-[0.20em] uppercase text-text-ds-secondary">
                TIPJAR.PLUS
              </span>
            </Link>
            <p className="mt-4 max-w-[280px] text-[13px] leading-[1.6] text-text-ds-tertiary font-body">
              Support your favorite creators in USDC. Fast, borderless, and
              transparent — powered by Circle.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-ds-tertiary transition-colors hover:border-gold-400/40 hover:text-gold-400"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product column */}
          <div>
            <h3 className="mb-4 text-xs font-heading font-semibold tracking-[0.14em] uppercase text-text-ds-secondary">
              Product
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-text-ds-tertiary font-body transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="mb-4 text-xs font-heading font-semibold tracking-[0.14em] uppercase text-text-ds-secondary">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {RESOURCES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-text-ds-tertiary font-body transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered by column */}
          <div>
            <h3 className="mb-4 text-xs font-heading font-semibold tracking-[0.14em] uppercase text-text-ds-secondary">
              Built on
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[13px] font-body text-text-ds-tertiary">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
                USDC by Circle
              </div>
              <div className="flex items-center gap-2 text-[13px] font-body text-text-ds-tertiary">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
                Polygon &amp; Base
              </div>
              <div className="flex items-center gap-2 text-[13px] font-body text-text-ds-tertiary">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
                ERC-4337 Smart Accounts
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-[12px] text-text-ds-tertiary font-body">
            &copy; {new Date().getFullYear()} TipJar+. All rights reserved.
          </p>
          <p className="text-[12px] text-text-ds-tertiary font-body">
            Powered by{' '}
            <span className="text-gold-400">Circle</span> &middot; USDC
            stablecoin
          </p>
        </div>
      </div>
    </footer>
  );
}
