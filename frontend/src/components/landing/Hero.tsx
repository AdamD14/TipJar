"use client";

import Image from "next/image";
import Button from "@/components/ui/buttons/Button";

export default function Hero() {
  return (
    <section
      className="relative text-text-ds-primary min-h-screen lg:pb-0"
      aria-labelledby="hero-heading"
    >
      <img
        src="/hero.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />
      <div className="mx-auto px-4 md:px-8">
        <div className="relative max-w-7xl min-h-screen flex flex-col justify-start pt-16 lg:pt-20">
          <h1
            id="hero-heading"
            className="font-heading font-bold tracking-tight leading-[1.15] text-5xl sm:text-5xl md:text-6xl lg:text-8xl"
          >
            <span className="block relative before:content-['\00a0\00a0\0009'] before:inline-block bg-gradient-to-r from-gold-200 via-white to-gold-200 bg-clip-text text-transparent">
              Support creativity
            </span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-teal-200 via-white to-teal-200 bg-clip-text text-transparent drop-shadow-lg">
              Get paid instantly
            </span>
          </h1>

          <p className="mt-6 lg:mt-8 text-2xl sm:text-3xl md:text-4xl font-heading font-regular text-text-ds-secondary max-w-2xl">
        Instant micro-payments in USDC for creators:<br />
        podcasters, streamers, YouTubers, digital models,<br />
        musicians, artists, bloggers, coaches,<br />
        educators, journalists, influencers<br />
        - simply anyone creating valuable content.
          </p>

      <div className="mt-10 lg:mt-12 flex flex-wrap items-center gap-3 text-sm lg:text-base text-text-ds-tertiary">
        <a
          href="https://circle.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 lg:px-4 lg:py-1.5 ring-1 ring-white/10 hover:ring-white/20 transition-colors"
        >
          <Image
            src="/circle.webp"
            alt="Circle"
            width={16}
            height={16}
            priority
            className="lg:w-5 lg:h-5"
          />
          Powered by{" "}
          <span className="font-heading font-semibold">circle.com</span>
        </a>

        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 lg:px-4 lg:py-1.5 ring-1 ring-white/10">
          <Image
            src="/sm.webp"
            alt="Smart contract"
            width={16}
            height={16}
            priority
            className="lg:w-5 lg:h-5"
          />
          Smart contract transparency
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm lg:text-base text-text-ds-tertiary">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 lg:px-4 lg:py-1.5 ring-1 ring-white/10">
          <Image
            src="/usdc.webp"
            alt="USDC"
            width={16}
            height={16}
            priority
            className="lg:w-5 lg:h-5"
          />
          Global USDC payments
        </span>

        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 lg:px-4 lg:py-1.5 ring-1 ring-white/10">
          <Image
            src="/logo.webp"
            alt="TipJar"
            width={16}
            height={16}
            priority
            className="lg:w-5 lg:h-5"
          />
          2.5% transaction fee
        </span>
      </div>

          <div className="mt-16 lg:mt-12 flex w-full items-center justify-center gap-3 lg:gap-6">
            <Button variant="primary" size="lg" href="/register?role=CREATOR">
              Begin as a Creator
            </Button>
            <Button variant="secondary" size="lg" href="/register?role=FAN" className="px-9">
              Explore as a Fan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
