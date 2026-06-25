"use client";

import QuickActionsCard from '@/components/ui/card/QuickActionsCard';
import { FrozenGlassErrorCard } from '@/components/ui/card/FrozenGlassErrorCard';

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        <div className="w-full"><QuickActionsCard /></div>
        <div className="w-full"><FrozenGlassErrorCard /></div>
      </div>
    </main>
  );
}
