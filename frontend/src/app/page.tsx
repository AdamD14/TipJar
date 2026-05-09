// frontend/src/app/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import WhyTipJar from '@/components/landing/WhyTipJar';
import HowItWorks from '@/components/landing/HowItWorks';
import StartBuildingShowcase from '@/components/landing/StartBuildingShowcase';
import ExampleProfile from '@/components/landing/ExampleProfile';
import ExploreCreators from '@/components/landing/ExploreCreators';
import LearnSection from '@/components/landing/LearnPage';

export default function Page() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <main id="main-content" >
      <Header />

      <Hero />

      {/* Anchors for smooth scrolling from Header (desktop + mobile) */}
      <section id="why">
        <WhyTipJar />
      </section>

      <section id="how">
        <HowItWorks />
      </section>

      {/* 
      <section id="studio">
        <StartBuildingShowcase handle="AdamDuda" creatorId="adam-duda-1" />
      </section>
      */}

      {/* Example Profile Modal - pokazuje się tylko gdy isProfileOpen = true */}
      <ExampleProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Button do testowania modalu (możesz usunąć później) */}
      <div className="text-center">
        <button
          onClick={() => setIsProfileOpen(true)}
          className="bg-[#FFD700] text-black rounded-lg font-bold hover:bg-[#FFC700] transition-all"
        >
          Test Profile Modal
        </button>
      </div>

      <section id="explore">
        <ExploreCreators />
      </section>

      <section id="learn">
        <LearnSection />
      </section>
    </main>
  );
}
