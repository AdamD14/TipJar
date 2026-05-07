
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-20 bg-[#001F1F]/80 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#006D6D] flex items-center justify-center text-white font-black text-xl shadow-lg">T+</div>
        <span className="font-black text-2xl tracking-tighter text-white italic">TipJar+</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
        <Link to="/why" className="hover:text-white transition-colors">Why</Link>
        <Link to="/how" className="hover:text-white transition-colors">How</Link>
        <Link to="/ai" className="hover:text-white transition-colors">AI Studio</Link>
        <Link to="/support" className="hover:text-white transition-colors">Support</Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link to="/studio" className="px-6 py-2.5 bg-[#FFD700] text-[#003737] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FFD700]/10">
          Enter Studio
        </Link>
      </div>
    </header>
  );
}
