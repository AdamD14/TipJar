'use client';

import { CreditCard, ShieldCheck, Globe2, Clock3, DollarSign } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
import React from 'react';

export default function WhyTipJar() {
  return (
    <section id="why-tipjar" className="relative w-full min-h-screen">
      <img
        src="/why.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full min-h-screen py-20 px-4 md:px-8">
        <div className="w-full h-full flex flex-col justify-center gap-10 md:gap-16 lg:gap-20">

        <h2 className="text-center font-heading text-2xl lg:text-3xl text-text-ds-quaternary font-semibold">
          why tipjar+
        </h2>

          <div className="w-full">
<div className="group bg-surface-base border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-gold-400/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gold-400/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-400/20">
            <CreditCard className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-heading font-semibold text-text-ds-secondary">Simplicity &amp; Payment Flexibility</h3>
        </div>
        <p className="text-base md:text-base lg:text-md text-text-ds-tertiary leading-relaxed font-body">
          No sign-up required, no crypto experience needed. Fans can tip using cards, Google Pay, Apple Pay, 
          Revolut, bank transfer or Crypto wallet <span className="text-gold-400">creators always receive USDC</span>. Just tap, scan, or click done in seconds.
        </p>
      </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-16">

<div className="group bg-surface-base border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-gold-400/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gold-400/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-400/20">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-heading font-semibold text-text-ds-secondary">Secure and Transparent</h3>
        </div>
        <p className="text-base md:text-base lg:text-md text-text-ds-tertiary leading-relaxed font-body">
          Built on Web3 technology, tipjar ensures secure and transparent transactions. Powered by blockchain 
          and USDC - regulated stablecoin <span className="text-gold-400">issued by Circle.com</span>. No custodians, no banks - you stay in full control.
        </p>
      </div>

<div className="group bg-surface-base border-2 border-gold-400 rounded-lg p-6 transition-all duration-300 hover:border-gold-400 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.20)_inset]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gold-400/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-400/20">
            <DollarSign className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-heading font-semibold text-gold-400">LOW FEES &amp; Direct Support</h3>
        </div>
        <p className="text-base md:text-base lg:text-md text-text-ds-tertiary leading-relaxed font-body">
          A simple, <span className="text-gold-400">flat 2.5% service fee</span> charged on each transaction ensures creators receive the majority of their earnings directly from fans, cutting out the middleman and maximizing profits.
        </p>
      </div>

<div className="group bg-surface-base border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-gold-400/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gold-400/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-400/20">
            <Globe2 className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-heading font-semibold text-text-ds-secondary">Global</h3>
        </div>
        <p className="text-base md:text-base lg:text-md text-text-ds-tertiary leading-relaxed font-body">
          Send or receive support from <span className="text-gold-400">anywhere in the world</span> no borders, no limits. Creators get paid instantly in USDC. Fast, on chain, borderless, censorship-free.
        </p>
      </div>

          </div>

          <div className="w-full">
<div className="group bg-surface-base border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-gold-400/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gold-400/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-gold-400/20">
            <Clock3 className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-heading font-semibold text-text-ds-secondary">Instant Payouts</h3>
        </div>
        <p className="text-base md:text-base lg:text-md text-text-ds-tertiary leading-relaxed font-body">
          Funds are delivered instantly to the creator&apos;s wallet with no delays, no holds, and no frozen 
          assets. You earn it, you own it right away. Need cash? You can withdraw crypto or{' '}
          <span className="text-gold-400">convert to local 80+ fiat currencies </span> anytime via Circle&apos;s off-ramps.
        </p>
      </div>
          </div>

      <div className="w-full mt-6">
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Scroll to next section"
            title="See more"
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-12 w-12 rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-12 w-12 rounded-full border border-text-ds-tertiary/60 text-text-ds-tertiary hover:brightness-[1.15] hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </Button>
        </div>
      </div>

        </div>
      </div>
    </section>
  );
}
