import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import WhySection from '@/components/landing/WhySection';
import HowSection from '@/components/landing/HowSection';
import ExploreSection from '@/components/landing/ExploreSection';
import LearnSection from '@/components/landing/LearnSection';
import Footer from '@/components/landing/Footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <HowSection />
        <ExploreSection />
        <LearnSection />
      </main>
      <Footer />
    </>
  );
}
