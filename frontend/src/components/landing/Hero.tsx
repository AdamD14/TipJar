"use client";

import HeroCtas from "@/components/cta/HeroCtas";

export default function Hero() {
  return (
     <section className="relative text-white pb-24 sm:pb-20" aria-labelledby="hero-heading">

      <div className="mx-auto">
        <div className="max-w-7xl">
          <h1
            id="hero-heading"
            className="
              font-ui font-bold tracking-tight leading-[1.15]
              text-5xl sm:text-6xl md:text-6xl lg:text-7xl
              mt-46 sm:mt-20 md:mt-16 lg:mt-20
            "
          >
            <span className="block">Support creativity</span>
            <span className="block mt-2 sm:mt-3">Get paid instantly</span>
          </h1>

          <p className="mt-3 sm:mt-4 md:mt-4 text-base sm:text-xl md:text-2xl font-ui text-white/80 max-w-2xl">
            Instant micro-payments in USDC for creators: streamers, YouTubers,
            digital models, musicians, artists, bloggers, coaches, educators,
            journalists, influencers — simply anyone creating valuable content.
          </p>

          {/* CTA większe (mobile +10%, >=sm +25%), wyrównane do lewej */}
          <div className="mt-6 sm:mt-6 flex w-full flex-nowrap items-center justify-center sm:justify-start gap-3">
            <div className="origin-left scale-105 sm:scale-115">
              <HeroCtas primaryHref="/register" secondaryHref="/explore" />
            </div>
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
