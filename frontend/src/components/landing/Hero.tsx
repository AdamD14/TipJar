"use client";

import Image from "next/image";
import PrimaryCta from "@/components/cta/PrimaryCta";
import SecondaryCta from "@/components/cta/SecondaryCta";

export default function Hero() {
  return (
    <section
      className="relative text-white min-h-screen lg:pb-0"
      aria-labelledby="hero-heading"
    >
      {/* FULL-BLEED background /1.png — zawsze 100vw × 100vh */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden>
        <Image src="/1.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Logo desktop - prawy górny róg */}
      <Image
        src="/logo.png"
        alt=""
        priority
        width={160}
        height={160}
        aria-hidden
        className="
          hidden lg:block
          pointer-events-none select-none 
          fixed top-16 right-4 z-30
          w-auto max-h-[160px]
          opacity-90 drop-shadow-[0_10px_28px_rgba(0,0,0,.35)]
        "
      />

      <div className="mx-auto px-4 md:px-6">
        {/* kontener referencyjny */}
        <div className="relative max-w-7xl min-h-screen flex flex-col justify-center">
          <h1
            id="hero-heading"
            className="font-ui font-bold tracking-tight leading-[1.15] text-5xl sm:text-6xl md:text-6xl lg:text-7xl"
          >
            <span className="block relative before:content-['\00a0\00a0\00a0\00a0\0009'] before:inline-block">
              Support creativity
            </span>

            {/* druga linia + logo mobile - mniejszy enter */}
            <span className="relative block mt-1 sm:mt-2 overflow-visible">
              {/* Logo mobile - tylko na mobile */}
              <Image
                src="/logo.png"
                alt=""
                priority
                width={240}
                height={240}
                aria-hidden
                className="
                  lg:hidden
                  pointer-events-none select-none absolute z-0
                  bottom-0 left-[-0.5rem] w-[min(88vw,240px)] h-auto object-left-bottom
                  opacity-90 drop-shadow-[0_10px_28px_rgba(0,0,0,.35)]
                "
              />
              <span className="relative z-10 text-[#FFD700]">Get paid instantly</span>
            </span>
          </h1>

          {/* "Enter" wysokość między H1 a subhero */}
          <p className="mt-6 lg:mt-8 text-base sm:text-xl md:text-2xl font-ui text-white/80 max-w-2xl">
            Instant micro-payments in <span className="text-[#004abe] font-semibold">USDC</span> for
            creators: streamers, YouTubers, digital models, musicians, artists, bloggers, coaches,
            educators, journalists, influencers — simply anyone creating valuable content.
          </p>

          {/* "Enter" wysokość między subhero a trust strip */}
          <div className="mt-6 lg:mt-8 flex flex-nowrap items-center gap-3 text-sm text-white/70 whitespace-nowrap overflow-x-auto">
            <a
              href="https://circle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10 hover:text-white"
            >
              <Image src="/c.png" alt="Circle" width={16} height={16} priority />
              <span>
                Powered by <span className="font-semibold">circle.com</span>
              </span>
            </a>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
              </svg>
              <span>Global On-Chain USDC Payments</span>
            </span>
          </div>

          {/* "Enter" wysokość między trust strip a buttonami - zwiększony na mobile */}
          <div className="mt-12 lg:mt-8 flex w-full flex-nowrap items-center justify-start gap-3">
            <PrimaryCta href="/register">Begin as a Creator</PrimaryCta>
            <SecondaryCta href="/explore">Explore as a Fan</SecondaryCta>
          </div>
        </div>
      </div>
    </section>
  );
}