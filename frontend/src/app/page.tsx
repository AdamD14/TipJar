'use client';

import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import WhyTipJar from '@/components/landing/WhyTipJar';
import HowItWorks from '@/components/landing/HowItWorks';
import StartBuildingShowcase from '@/components/landing/StartBuildingShowcase';
import ExploreCreators from '@/components/landing/ExploreCreators';
import LearnTeaser from '@/components/landing/LearnTeaser';
import Footer from '@/components/ui/layout/Footer';

export default function Page() {
  return (
  <main id="main-content">
  <Header />

      <Hero />

      <section id="why">
        <WhyTipJar />
      </section>

      <section id="how">
        <HowItWorks />
      </section>

      <section id="studio">
        <StartBuildingShowcase />
      </section>

      <section id="explore">
        <ExploreCreators />
      </section>

      <section id="learn">
      <LearnTeaser />
    </section>

    <Footer />
  </main>
  );
}
