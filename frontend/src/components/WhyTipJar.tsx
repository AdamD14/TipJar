// components/WhyTipJar.tsx
import React from "react";

export default function WhyTipJar() {
  return (
    <section id="why-tipjar" className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3 auto-rows-fr">

        {/* 1) Row - full width: Simplicity & Payment Flexibility */}
        <article className="md:col-span-3 rounded-2xl p-6 md:p-8 shadow-lg bg-gradient-to-br from-[#083a3a] via-[#0b4a4a] to-[#0e5b5b]">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            Simplicity & Payment Flexibility
          </h2>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/90">
            No sign-up required and no crypto experience needed. Fans can tip using cards, Google Pay, Apple Pay, Revolut, bank transfer, or a crypto wallet —{" "}
            <span className="text-[#FFD700] font-semibold">creators always receive USDC</span>. Just tap, scan, or click — done in seconds.
          </p>
        </article>

        {/* 2) Row of three cards: left Secure, middle Low Fees highlighted, right Global */}
        <article className="rounded-2xl p-6 md:p-8 shadow-lg bg-gradient-to-br from-[#0a2b2b] via-[#0d3636] to-[#114444]">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
            Secure and Transparent
          </h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/90">
            Built on Web3 technology with auditable transactions on-chain. Powered by blockchain and USDC — a fully-reserved, regulated stablecoin{" "}
            <span className="text-[#FFD700] font-semibold">issued by Circle.com</span>. No custodians, no banks — you stay in control.
          </p>
        </article>

        <article className="rounded-2xl p-6 md:p-8 shadow-xl ring-1 ring-[#FFD700]/30 bg-gradient-to-br from-[#124e4e] via-[#166060] to-[#1a7373]">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
            LOW FEES & Direct Support
          </h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/90">
            A simple, <span className="text-[#FFD700] font-semibold">flat 5% service</span> fee keeps more value with creators. Tips flow directly from fans to creators, reducing intermediaries and maximizing earnings.
          </p>
        </article>

        <article className="rounded-2xl p-6 md:p-8 shadow-lg bg-gradient-to-br from-[#0a2b2b] via-[#0d3636] to-[#114444]">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
            Global
          </h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/90">
            Send or receive support from anywhere in the world — no banks, no borders, no limits. Fans can use 80+ fiat currencies; creators get instant USDC. You can{" "}
            <span className="text-[#FFD700] font-semibold">anywhere in the world easily convert and withdraw to your local currency</span>.
          </p>
        </article>

        {/* 3) Row - full width: Instant Payouts */}
        <article className="md:col-span-3 rounded-2xl p-6 md:p-8 shadow-lg bg-gradient-to-br from-[#083a3a] via-[#0b4a4a] to-[#0e5b5b]">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
            Instant Payouts
          </h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/90">
            Funds settle instantly to the creator’s wallet — no delays, no holds, no frozen assets. Need cash? Off-ramps let you convert USDC to local currency anytime.
          </p>

          {/* Footer row: Learn more on the left, Back to top on the right */}
          <div className="mt-6 flex items-center justify-between">
            <a
              href="#learn"
              className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-white hover:text-[#FFD700] transition-colors"
            >
              Learn more
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-white hover:text-[#FFD700] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Top
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
