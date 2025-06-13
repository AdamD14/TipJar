import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { WhyTipJarSection } from '@/components/landing/WhyTipJarSection';
import { NavbarPublic } from '@/components/layout/NavbarPublic';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPublic />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhyTipJarSection />
      </main>
      {Footer ? <Footer /> : null}
    </div>
  );
}
