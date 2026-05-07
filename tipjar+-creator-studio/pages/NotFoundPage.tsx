
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#001F1F] px-6 text-[#DDE0DA]">
      <div className="max-w-md text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 rounded-3xl bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500 shadow-2xl shadow-rose-500/10">
           <ShieldAlert size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-8xl font-black italic text-white tracking-tighter">404</h1>
          <h2 className="text-2xl font-black text-white">Strona nie istnieje</h2>
          <p className="text-slate-400 font-medium">Wygląda na to, że ten link wygasł lub adres jest niepoprawny.</p>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FFD700] text-[#003737] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
          <ArrowLeft size={16} /> Powrót na start
        </Link>
      </div>
    </main>
  );
}
