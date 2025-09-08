// app/page.tsx
import Header from "@/components/landing/Header.tsx";
import Hero from "@/components/landing/Hero.tsx";
import WhyTipJar from "@/components/landing/WhyTipJar.tsx";
import HowItWorks from "@/components/landing/HowItWorks";
import StartBuildingShowcase from "@/components/landing/StartBuildingShowcase";
import Image from "next/image";
import heroImg from "public/1.png";
import usdcImg from "public/usdc.png";

export default function HomePage() {
  return (
    <main className="bg-gradient-main">
      <div className="relative pb-40 sm:pb-56 md:pb-72">
        {/* Tło hero */}
        <Image
          src={heroImg}
          alt=""
          priority
          sizes="100vw"
          className="block w-auto h-max object-left-top pointer-events-none select-none"
        />

        {/* Warstwa treści nad obrazem */}
 <div className="absolute top-0 sm:top-6 md:top-10 left-4 right-4 sm:left-12 sm:right-12 bottom-0 lg:left-20 lg:right-20">
          <Header />
          <Hero />

        {/* USDC: efekt połysku tylko na ikonie */}
<div className="group absolute right-5 top-3 w-[100px] h-[100px] sm:top-6 sm:right-8 sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden">
  <Image
    src={usdcImg}
    alt="USDC Icon"
    width={280}
    height={280}
    priority
    className="absolute inset-0 w-full h-full object-contain opacity-90 filter brightness-110 pointer-events-none select-none"
  />
  {/* połysk na hover, przycięty do koła */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
    <div className="absolute -inset-y-8 -left-1 w-1/2 h-[150%] rotate-6 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-800 ease-out group-hover:translate-x-[200%] will-change-transform" />
  </div>
</div>
        </div>
      </div>

      {/* Sekcje niżej */}
      <WhyTipJar />
      <HowItWorks />
      <StartBuildingShowcase handle={""} creatorId={""} />
    </main>
  );
}
