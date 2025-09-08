'use client'

import Link from "next/link";
import React from "react";


export default function WhyTipJar() {
  return (
    <section id="why-tipjar" aria-labelledby="whyTipJarHeading" className="py-20 md:py-20">
      <div className="mt-10 sm:mt-16 md:mt-24 mx-auto max-w-7xl px-2 text-[#DDE0DA]">
        
        {/* Tytuł sekcji na środku */}
        <div className="text-center mb-20 md:mb-20">
          <h2 
            id="whyTipJarHeading" 
            className="text-3xl md:text-4xl font-bold text-[#DDE0DA] transition-colors duration-300 hover:text-[#FFD700]"
          >
            Why TipJar+
          </h2>
        </div>

        {/* 1) Simplicity — poziomo */}
        <article className="group rounded-[16px] border border-white/10 bg-card p-6 md:p-8 transition hover:-translate-y-[2px] hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
          <h3 className="mb-3 text-base font-semibold leading-[1.5]">Simplicity &amp; Payment Flexibility</h3>
          <p className="text-[14px] leading-[1.5] text-[#BCC1B6]">
            No sign-up required, no crypto experience needed. Fans can tip using cards, Google Pay, Apple Pay, Revolut, bank transfer or Crypto wallet —{" "}
            <span className="text-[#FFD700] transition-colors group-hover:text-[#FFEA70]">creators always receive USDC</span>. Just tap, scan, or click — done in seconds.
          </p>
        </article>

        {/* 2) Trzy karty pionowo (środkowa wyróżniona) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="group rounded-[16px] border border-white/10 bg-card p-6 md:p-8 transition hover:-translate-y-[2px] hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
            <h3 className="mb-3 text-base font-semibold leading-[1.5]">Secure and Transparent</h3>
            <p className="text-[14px] leading-[1.5] text-[#BCC1B6]">
              Built on Web3 technology, tipjar ensures secure and transparent transactions. Powered by blockchain and USDC — a fully-reserved, regulated stablecoin{" "}
              <span className="text-[#FFD700] transition-colors group-hover:text-[#FFEA70]">issued by Circle.com</span> . No custodians, no banks — you stay in full control.
            </p>
          </article>

          <article className="group rounded-[16px] border-2 border-[#FFD700] bg-card p-6 md:p-8 transition hover:-translate-y-[2px] hover:shadow-[0_0_0_6px_rgba(255,215,0,0.15)_inset]">
            <h3 className="mb-3 text-base font-semibold leading-[1.5] text-[#FFD700]">LOW FEES &amp; Direct Support</h3>
            <p className="text-[14px] leading-[1.5] text-[#DDE0DA]">
              A simple, <span className="text-[#FFD700] transition-colors group-hover:text-[#FFEA70]">flat 5% service</span> fee ensures creators receive the majority of their earnings. Creators receive tips directly from their fans, eliminating intermediaries and maximizing earnings.
            </p>
          </article>

          <article className="group rounded-[16px] border border-white/10 bg-card p-6 md:p-8 transition hover:-translate-y-[2px] hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
            <h3 className="mb-3 text-base font-semibold leading-[1.5]">Global</h3>
            <p className="text-[14px] leading-[1.5] text-[#BCC1B6]">
              Send or receive support from <span className="text-[#FFD700] transition-colors group-hover:text-[#FFEA70]">anywhere in the world</span> — no banks, no borders, no limits. Circle enables fans to tip using over 80 fiat currencies including USD, EUR, GBP, JPY. Creators get paid instantly in USDC, directly to their wallets. Fast, borderless, censorship-free.
            </p>
          </article>
        </div>

        {/* 3) Instant Payouts — poziomo */}
        <article className="mt-6 group rounded-[16px] border border-white/10 bg-card p-6 md:p-8 transition hover:-translate-y-[2px] hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
          <h3 className="mb-3 text-base font-semibold leading-[1.5]">Instant Payouts</h3>
          <p className="text-[14px] leading-[1.5] text-[#BCC1B6]">
            Funds are delivered instantly to the creator's wallet — with no delays, no holds, and no frozen assets. You earn it, you own it — right away. Need cash? You can{" "}
            <span className="text-[#FFD700] transition-colors group-hover:text-[#FFEA70]">easily convert and withdraw to your local currency</span> anytime via Circle's off-ramps.
          </p>
        </article>

        {/* 4) Learn more (lewo) + Back to top (prawo) */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            href="#learn"
            className="group inline-flex items-center gap-1 text-sm font-medium text-[#FFD700] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60 rounded transition"
          >
            Learn more about Web3 <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>

          <button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FFD700]/60 text-[#FFD700] transition hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}