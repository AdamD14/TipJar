// frontend/src/components/landing/WhyTipJar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, ShieldCheck, Globe2, Clock3, DollarSign } from 'lucide-react';
import React from 'react';

export default function WhyTipJar() {
  return (
    <section id="why" aria-labelledby="whyTipJarHeading" className="relative py-12 md:py-16">
      {/* FULL-BLEED background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/2.png" alt="" fill priority sizes="100vw" className="object-cover" />
        {/* lekki przyciemniacz dla czytelności */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(0,0,0,.45),transparent_60%),linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.1))]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-4 text-[#DDE0DA]">
        {/* 1) Simplicity — poziomo */}
        <Card>
          <CardTitle icon={<CreditCard className="h-5 w-5 text-[#FFD700]" />}>
            Simplicity &amp; Payment Flexibility
          </CardTitle>
          <CardBody>
            No sign-up required, no crypto experience needed. Fans can tip using cards, Google Pay, Apple Pay,
            Revolut, bank transfer or Crypto wallet —{' '}
            <span className="text-[#FFD700]">creators always receive USDC</span>. Just tap, scan, or click —
            done in seconds.
          </CardBody>
        </Card>

        {/* 2) Trzy karty pionowo (środkowa wyróżniona) */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardTitle icon={<ShieldCheck className="h-5 w-5 text-[#FFD700]" />}>
              Secure and Transparent
            </CardTitle>
            <CardBody className="md:text-[16px]">
              Built on Web3 technology, tipjar ensures secure and transparent transactions. Powered by blockchain
              and USDC — a fully-reserved, regulated stablecoin{' '}
              <span className="text-[#FFD700]">issued by Circle.com</span>. No custodians, no banks — you stay in
              full control.
            </CardBody>
          </Card>

          <Card highlight>
            <CardTitle icon={<DollarSign className="h-5 w-5 text-[#FFD700]" />} className="text-[#FFD700]">
              LOW FEES &amp; Direct Support
            </CardTitle>
            <CardBody className="text-[#DDE0DA] md:text-[16px]">
              A simple, <span className="text-[#FFD700]">flat 5% service</span> fee ensures creators receive the
              majority of their earnings. Creators receive tips directly from their fans, eliminating
              intermediaries and maximizing earnings.
            </CardBody>
          </Card>

          <Card>
            <CardTitle icon={<Globe2 className="h-5 w-5 text-[#FFD700]" />}>Global</CardTitle>
            <CardBody className="md:text-[16px]">
              Send or receive support from <span className="text-[#FFD700]">anywhere in the world</span> — no
              banks, no borders, no limits. Circle enables fans to tip using 80+ fiat currencies (USD, EUR, GBP,
              JPY). Creators get paid instantly in USDC. Fast, borderless, censorship-free.
            </CardBody>
          </Card>
        </div>

        {/* 3) Instant Payouts — poziomo */}
        <Card className="mt-4">
          <CardTitle icon={<Clock3 className="h-5 w-5 text-[#FFD700]" />}>Instant Payouts</CardTitle>
          <CardBody className="md:text-[16px]">
            Funds are delivered instantly to the creator&apos;s wallet — with no delays, no holds, and no frozen
            assets. You earn it, you own it — right away. Need cash? You can{' '}
            <span className="text-[#FFD700]">convert &amp; withdraw to local currency</span> anytime via Circle&apos;s
            off-ramps.
          </CardBody>
        </Card>

        {/* 4) Learn more / Back to top - space-between */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            href="#learn"
            className="group inline-flex items-center gap-1 text-sm font-medium text-[#FFD700] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60 rounded transition"
          >
            Learn more about Web3 <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>

          <button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FFD700]/60 text-[#FFD700] transition hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===== Helpers ===== */

function Card({
  children,
  className = '',
  highlight = false,
}: React.PropsWithChildren<{ className?: string; highlight?: boolean }>) {
  return (
    <article
      className={[
        'rounded-[16px] p-6 md:p-8 transition will-change-transform',
        highlight
          ? 'border-2 border-[#FFD700] bg-card hover:shadow-[0_0_0_6px_rgba(255,215,0,0.15)_inset]'
          : 'border border-white/10 bg-card hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]',
        // relief
        'shadow-[inset_0_1px_0_rgba(255,255,255,.06),inset_0_-10px_16px_rgba(0,0,0,.35),0_10px_22px_rgba(0,0,0,.30)]',
        'hover:-translate-y-[2px]',
        className,
      ].join(' ')}
    >
      {children}
    </article>
  );
}

function CardTitle({
  children,
  icon,
  className = '',
}: React.PropsWithChildren<{ icon?: React.ReactNode; className?: string }>) {
  return (
    <h3 className={['mb-3 flex items-center gap-2 font-semibold leading-[1.5] text-base md:text-xl', className].join(' ')}>
      {icon ? <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFD700]/10">{icon}</span> : null}
      <span>{children}</span>
    </h3>
  );
}

function CardBody({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) {
  return <p className={['text-[14px] leading-[1.6] text-[#BCC1B6] md:text-[16px]', className].join(' ')}>{children}</p>;
}