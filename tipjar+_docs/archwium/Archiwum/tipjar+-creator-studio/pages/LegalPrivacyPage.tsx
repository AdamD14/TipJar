
import React from 'react';
import PublicHeader from '../components/PublicHeader';

export default function LegalPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <article className="mx-auto max-w-3xl px-6 py-20 space-y-10">
        <header className="space-y-4">
           <p className="text-[10px] font-black text-[#006D6D] uppercase tracking-[0.4em]">GDPR / RODO</p>
           <h1 className="text-6xl font-black italic text-white tracking-tighter">Privacy Policy</h1>
           <p className="text-slate-500 text-sm italic">Ostatnia aktualizacja: 24 sierpnia 2025</p>
        </header>
        
        <div className="prose prose-invert max-w-none space-y-8 font-medium text-slate-400 leading-relaxed">
          <p>Twoja prywatność jest dla nas priorytetem. W świecie Web3 dbamy o to, aby Twoje dane osobowe były bezpieczne, a adresy portfeli używane tylko w celach niezbędnych do realizacji usług.</p>
          
          <h2 className="text-2xl font-black text-white italic">Dane zbierane</h2>
          <p>Zbieramy dane niezbędne do weryfikacji KYC (Know Your Customer) tylko wtedy, gdy przekraczasz limity obrotu. Są one przechowywane w formie zaszyfrowanej przy użyciu standardów AES-256.</p>

          <h2 className="text-2xl font-black text-white italic">Prawa użytkownika</h2>
          <p>Zgodnie z RODO, masz prawo do wglądu, poprawiania oraz trwałego usunięcia swoich danych z naszych serwerów. Pamiętaj, że dane zapisane bezpośrednio na blockchainie są niezmienne i publiczne.</p>
        </div>
      </article>
    </main>
  );
}
