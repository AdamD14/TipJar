'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, ShieldCheck, Globe2, Clock3, DollarSign } from 'lucide-react';
import React from 'react';

export default function WhyTipJar() {
  return (
    <section className="relative w-full min-h-screen">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image 
          src="/2.png" 
          alt="" 
          fill 
          priority 
          sizes="100vw" 
          quality={90}
          className="object-cover rounded-2xl pointer-events-none select-none" 
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full min-h-screen py-20 px-4 md:px-8">
        <div className="w-full h-full flex flex-col justify-center gap-10 md:gap-16 lg:gap-20">
          
          {/* Container 1 - Top full width */}
          <div className="w-full">
            <div className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#FFD700]/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#FFD700]/20">
                  <CreditCard className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-semibold text-[#DDE0DA]">Simplicity &amp; Payment Flexibility</h3>
              </div>
              <p className="text-base md:text-base lg:text-md text-[#DDE0DA] leading-relaxed">
                No sign-up required, no crypto experience needed. Fans can tip using cards, Google Pay, Apple Pay,
                Revolut, bank transfer or Crypto wallet <span className="text-[#FFD700]">creators always receive USDC</span>. Just tap, scan, or click done in seconds.
              </p>
            </div>
          </div>

          {/* Containers 2, 3, 4 - Middle row with 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-16">
            
            {/* Container 2 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#FFD700]/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#FFD700]/20">
                  <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-semibold text-[#DDE0DA]">Secure and Transparent</h3>
              </div>
              <p className="text-base md:text-base lg:text-md text-[#DDE0DA] leading-relaxed">
                Built on Web3 technology, tipjar ensures secure and transparent transactions. Powered by blockchain
                and USDC - regulated stablecoin <span className="text-[#FFD700]">issued by Circle.com</span>. No custodians, no banks - you stay in full control.
              </p>
            </div>

            {/* Container 3 - Featured */}
            <div className="group bg-black/40 backdrop-blur-sm border-2 border-[#FFD700] rounded-lg p-6 transition-all duration-300 hover:border-[#FFD700] hover:shadow-[0_0_0_4px_rgba(255,215,0,0.20)_inset]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#FFD700]/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#FFD700]/20">
                  <DollarSign className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-semibold text-[#FFD700]">LOW FEES &amp; Direct Support</h3>
              </div>
              <p className="text-base md:text-base lg:text-md text-[#DDE0DA] leading-relaxed">
                A simple, <span className="text-[#FFD700]">flat 5% service</span> fee ensures creators receive the
                majority of their earnings. Creators receive tips directly from their fans, eliminating
                intermediaries and maximizing earnings.
              </p>
            </div>

            {/* Container 4 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#FFD700]/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#FFD700]/20">
                  <Globe2 className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-semibold text-[#DDE0DA]">Global</h3>
              </div>
              <p className="text-base md:text-base lg:text-md text-[#DDE0DA] leading-relaxed">
                Send or receive support from <span className="text-[#FFD700]">anywhere in the world</span> no borders, no limits. Creators get paid instantly in USDC. Fast, on chain, borderless, censorship-free.
              </p>
            </div>

          </div>

          {/* Container 5 - Bottom full width */}
          <div className="w-full">
            <div className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[0_0_0_4px_rgba(255,215,0,0.10)_inset]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#FFD700]/10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#FFD700]/20">
                  <Clock3 className="w-5 h-5 text-[#FFD700]" />
                </div>
                <h3 className="text-lg sm:text-lg md:text-lg lg:text-xl font-semibold text-[#DDE0DA]">Instant Payouts</h3>
              </div>
              <p className="text-base md:text-base lg:text-md text-[#DDE0DA] leading-relaxed">
                Funds are delivered instantly to the creator&apos;s wallet with no delays, no holds, and no frozen
                assets. You earn it, you own it right away. Need cash? You can withdraw crypto or{' '}
                <span className="text-[#FFD700]">convert to local 80+ fiat currencies </span> anytime via Circle&apos;s off-ramps.
              </p>
            </div>
          </div>

          {/* Navigation - na dole strony */}
          <div className="w-full mt-6">
            <div className="flex items-center justify-between">
              <Link
                href="#learn"
                className="group inline-flex items-center gap-2 text-base md:text-base lg:text-md font-medium text-[#DDE0DA] underline-offset-4 hover:underline transition"
              >
                Learn more about Web3 <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>

              <button
                type="button"
                aria-label="Back to top"
                title="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#DDE0DA]/60 text-[#DDE0DA] transition hover:-translate-y-0.5 hover:bg-[#DDE0DA]/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}