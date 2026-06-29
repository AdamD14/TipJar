"use client";

import CreatorCard from '@/components/ui/card/CreatorCard';
import CreatorPulseWidget from '@/components/ui/card/CreatorPulseWidget';
import FinancialCard from '@/components/ui/card/FinancialCard';

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div className="w-full"><CreatorCard variant="default" /></div>
        <div className="w-full"><CreatorPulseWidget /></div>
        <div className="w-full"><FinancialCard variant="stat" /></div>
      </div>
    </main>
  );
}
