import Image from 'next/image';
import Button from './Button';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center text-white bg-gradient-to-br from-tj-violet to-gray-900"
      style={{ minHeight: '100vh' }}
    >
      <Image
        src="/assets/globe.svg"
        alt="World Map Background"
        fill
        className="object-cover opacity-20 -z-10"
      />

      <div className="relative z-10 max-w-3xl px-6">
        <div className="relative inline-block mb-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            TipJar<span className="text-tj-gold">+</span>
          </h1>
          <Image
            src="/assets/usdc.png"
            alt="USDC Logo"
            width={80}
            height={80}
            className="absolute bottom-0 right-[-2rem] opacity-50"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Support Creativity, Get Paid Instantly
        </h2>
        <p className="text-base md:text-lg mb-8">
          tipjar+ is a platform for instant micro-payments in USDC to your favorite creators: streamers, YouTubers, digital models, musicians, artists, bloggers, coaches, educators, journalists, influencers – simply for all content makers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button variant="primary" size="md">
            Begin as a Creator
          </Button>
          <Button variant="secondary" size="md">
            Explore as a Fan
          </Button>
        </div>
      </div>
    </section>
  );
}
