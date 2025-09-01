// components/hero/Hero.tsx
"use client";

import Image from "next/image";
import HeroCtas from "@/components/cta/HeroCtas";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white" aria-labelledby="hero-heading">
      <div className="mx-auto  px-6 pt-28 pb-20">
        <div className="max-w-3xl">
         

          <h1 id="hero-heading" className="text-5xl md:text-7xl font-ui  leading-[1.05]">
            support creativity,
            <br className="hidden sm:block" />
            <span className="text-white">get paid instantly</span>
          </h1>

          <p className="mt-6 text-lg font-ui md:text-2xl text-white/80 max-w-2xl">
            Instant micro-payments in USDC for creators streamers, YouTubers,
            digital models, musicians, artists, bloggers, coaches, educators,
            journalists, influencers.
          </p>

          <div className="mt-10">
            <HeroCtas primaryHref="/register" secondaryHref="/explore" />
          </div>

          <div className="mt-10 flex items-center gap-5 text-white/70">
            <Image
              src="/usdc.png"
              width={48}
              height={48}
              alt="USDC"
              className="opacity-80"
              priority
            />
            <span className="text-sm">Powered by Circle · USDC on/off-ramp</span>
          </div>
        </div>
      </div>

      <DecorAurora />
    </section>
  );
}

function DecorAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full
                      bg-[radial-gradient(circle,#2CA4A4_0%,transparent_60%)]
                      opacity-25 blur-3xl"
      />
      <div
        className="absolute -left-24 bottom-[-80px] h-[420px] w-[420px] rounded-full
                      bg-[radial-gradient(circle,#83509F_0%,transparent_60%)]
                      opacity-20 blur-3xl"
      />
      <div className="absolute right-[10%] top-[46%] h-24 w-24 rounded-full bg-white/6 ring-1 ring-white/15 backdrop-blur-sm" />
      <div className="absolute right-[13%] top-[48%] h-24 w-24 rounded-full bg-white/4 ring-1 ring-white/10 translate-x-10 -translate-y-6" />
    </div>
  );
}
