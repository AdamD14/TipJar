// frontend/src/app/page.tsx

import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import WhyTipJar from '@/components/landing/WhyTipJar';
import HowItWorks from '@/components/landing/HowItWorks';
import StartBuildingShowcase from '@/components/landing/StartBuildingShowcase';
import ExampleProfile from '@/components/landing/ExampleProfile';
import ExploreCreators from '@/components/landing/ExploreCreators';
import LearnSection from '@/components/landing/LearnPage'; // ← aktualna ścieżka

export default function Page() {
  return (
    <main id="main-content" className="bg-gradient-main">
      <Header />

      <Hero />

      {/* Anchors for smooth scrolling from Header (desktop + mobile) */}
      <section id="why" className="scroll-mt-28 md:scroll-mt-32">
        <WhyTipJar />
      </section>

      <section id="how" className="scroll-mt-28 md:scroll-mt-32">
        <HowItWorks />
      </section>

      <section id="studio" className="scroll-mt-28 md:scroll-mt-32">
        <StartBuildingShowcase handle="AdamDuda" creatorId="adam-duda-1" />
      </section>

      <ExampleProfile />

      <section id="explore" className="scroll-mt-28 md:scroll-mt-32">
        <ExploreCreators items={[]} />
      </section>

      <section id="learn" className="scroll-mt-28 md:scroll-mt-32">
        <LearnSection />
      </section>
    </main>
  );
}
