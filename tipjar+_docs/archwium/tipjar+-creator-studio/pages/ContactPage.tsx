
import React, { useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#001F1F] text-[#DDE0DA] pt-24 pb-20">
      <PublicHeader />
      <section className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-5xl font-black italic text-white tracking-tighter text-center">Contact Us</h1>
        <p className="mt-4 text-center text-slate-400 font-medium">Masz pytanie? Napisz do nas, odpowiemy w ciągu 24h.</p>
        
        {sent ? (
          <div className="mt-12 rounded-[3rem] border-2 border-emerald-500/20 bg-emerald-500/5 p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
               <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-black text-white">Dziękujemy!</h2>
            <p className="text-slate-400 font-medium">Twoja wiadomość została wysłana. Nasz zespół odezwie się na Twój adres e-mail.</p>
            <button onClick={() => setSent(false)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">Wyślij kolejną</button>
          </div>
        ) : (
          <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email</label>
                 <input required type="email" placeholder="twoj@email.com" className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-all" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Temat</label>
                 <input required type="text" placeholder="Jak możemy pomóc?" className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-all" />
              </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Wiadomość</label>
               <textarea required rows={6} placeholder="Opisz swoje zapytanie szczegółowo..." className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white focus:outline-none focus:border-[#FFD700] transition-all resize-none" />
            </div>
            <button type="submit" className="w-full py-6 bg-[#FFD700] text-[#003737] font-black rounded-[2rem] text-sm uppercase tracking-widest shadow-xl shadow-[#FFD700]/10 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
              Wyślij Wiadomość <Send size={18} />
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
