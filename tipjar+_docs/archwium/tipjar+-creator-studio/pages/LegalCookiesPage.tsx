
import React from 'react';
import PublicHeader from '../components/PublicHeader';

export default function LegalCookiesPage() {
  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <article className="mx-auto max-w-3xl px-6 py-20 space-y-10">
        <header className="space-y-4">
           <p className="text-[10px] font-black text-[#006D6D] uppercase tracking-[0.4em]">Tracking / Policy</p>
           <h1 className="text-6xl font-black italic text-white tracking-tighter">Cookies</h1>
        </header>
        
        <div className="prose prose-invert max-w-none space-y-8 font-medium text-slate-400 leading-relaxed">
          <p>Stosujemy niezbędne pliki cookies, aby umożliwić Ci logowanie do Creator Studio oraz zapewnić bezpieczeństwo Twoich transakcji. Nie sprzedajemy Twoich danych partnerom reklamowym.</p>
          <h2 className="text-2xl font-black text-white italic">Rodzaje ciasteczek</h2>
          <ul>
            <li><strong>Techniczne:</strong> Niezbędne do działania sesji.</li>
            <li><strong>Analityczne:</strong> Pomagają nam zrozumieć, jak twórcy korzystają z panelu Studio.</li>
            <li><strong>Web3 Connect:</strong> Pamiętają Twoje preferencje wyboru portfela.</li>
          </ul>
        </div>
      </article>
    </main>
  );
}
