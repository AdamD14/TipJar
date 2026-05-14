"use client";

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Download, 
  Sparkles, 
  Layout, 
  Zap, 
  Monitor, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const EXTENSIONS = [
  { id: 1, name: 'Cyberpunk Overlay V2', category: 'Themes', price: 45, rating: 4.9, downloads: '1.2k', author: 'NexusDesign', image: 'https://picsum.photos/seed/cyber/400/250' },
  { id: 2, name: 'LoL Stats Live', category: 'Widgets', price: 15, rating: 4.7, downloads: '850', author: 'RiotDevs', image: 'https://picsum.photos/seed/lol/400/250' },
  { id: 3, name: 'Crypto Price Ticker', category: 'Widgets', price: 0, rating: 4.5, downloads: '5k', author: 'TipJarTeam', image: 'https://picsum.photos/seed/crypto/400/250' },
  { id: 4, name: 'Minimalist Social Cards', category: 'Social', price: 10, rating: 4.8, downloads: '3.1k', author: 'MinimalistCo', image: 'https://picsum.photos/seed/social/400/250' },
];

const MarketplacePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Marketplace</h1>
          <p className="text-teal-50 font-medium mt-1">Rozszerz możliwości swojego studio o wtyczki od społeczności.</p>
        </div>
        <div className="flex items-center gap-3 bg-teal-800 p-2 rounded-md border border-teal-700 shadow-sm">
           <Search size={18} className="text-teal-100 ml-2" />
           <input type="text" placeholder="Szukaj wtyczek..." className="bg-transparent border-none text-xs font-bold outline-none w-48" />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['Wszystkie', 'Themes', 'Widgets', 'Alerts', 'Social', 'AI Add-ons'].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap font-heading ${activeCategory === cat ? 'bg-teal-600 text-teal-25 shadow-lg shadow-teal-600/20' : 'bg-teal-800 text-teal-100 border border-teal-700 hover:bg-teal-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {EXTENSIONS.map(ext => (
          <div key={ext.id} className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col">
            <div className="aspect-video relative overflow-hidden">
               <img src={ext.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ext.name} />
               <div className="absolute top-4 right-4 px-3 py-1 bg-teal-800/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-teal-25 shadow-sm">
                  {ext.category}
               </div>
               {ext.price === 0 && (
                 <div className="absolute top-4 left-4 px-3 py-1 bg-success-base text-teal-25 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
                    Free
                 </div>
               )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col space-y-4">
               <div>
                  <h3 className="font-bold text-teal-25 text-sm group-hover:text-teal-500 transition-colors font-heading">{ext.name}</h3>
                  <p className="text-[10px] text-teal-100 font-bold uppercase mt-1">Autor: {ext.author}</p>
               </div>
               
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-amber-400">
                     <Star size={12} fill="currentColor" />
                     <span className="text-xs font-bold text-teal-50">{ext.rating}</span>
                     <span className="text-[10px] text-teal-100 font-bold">({ext.downloads})</span>
                  </div>
                  <span className="text-sm font-bold italic text-teal-500">{ext.price > 0 ? `${ext.price} USDC` : 'Darmowe'}</span>
               </div>

               <button className="w-full py-3.5 bg-teal-700 border border-teal-700 rounded-md text-[10px] font-bold uppercase tracking-widest text-teal-50 group-hover:bg-teal-850 group-hover:text-teal-25 transition-all font-heading">
                  Szczegóły & Zakup
               </button>
            </div>
          </div>
        ))}

        {/* SUBMISSION CTA */}
        <div className="bg-teal-800 rounded-lg p-8 text-teal-25 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden group cursor-pointer hover:ring-4 hover:ring-teal-600/20 transition-all">
           <Zap size={100} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-125 transition-transform" />
           <div className="w-16 h-16 rounded-md bg-white/10 flex items-center justify-center text-gold-400 border border-white/5"><ShoppingBag size={32} /></div>
           <div>
              <h3 className="text-xl font-bold italic font-heading">Zostań Twórcą!</h3>
              <p className="text-xs text-teal-100 font-medium mt-2">Tworzysz własne motywy? Sprzedawaj je w naszym Marketplace i zarabiaj 90% prowizji.</p>
           </div>
           <button className="px-6 py-3 bg-gold-400 text-teal-900 font-bold rounded-md text-[10px] uppercase tracking-widest font-heading">Aplikuj Teraz</button>
        </div>
      </div>

      {/* FEATURED BANNER */}
      <div className="bg-gradient-to-r from-teal-850 to-teal-800 p-10 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden">
         <Sparkles size={200} className="absolute -bottom-10 -right-10 opacity-5" />
         <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full border border-gold-400/10">
                  <Layout size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Studio Pro Exclusive</span>
               </div>
               <h2 className="text-4xl font-bold italic tracking-tighter font-heading">Premium UI Bundle 2025</h2>
               <p className="text-teal-100 font-medium text-lg leading-relaxed">Zestaw 12 interaktywnych widgetów zoptymalizowanych pod Gemini AI. Automatyczna zmiana kolorów na podstawie sentymentu czatu!</p>
               <div className="flex gap-4">
                  <button className="px-8 py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-xs uppercase tracking-widest shadow-xl shadow-gold-400/10 font-heading">Kup Bundle - 99 USDC</button>
                  <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-md text-xs font-bold uppercase tracking-widest font-heading">Obejrzyj Demo</button>
               </div>
            </div>
            <div className="hidden md:flex justify-end">
               <div className="relative w-80 h-64 bg-teal-850 rounded-lg border-8 border-teal-850 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                  <div className="p-6 space-y-4">
                     <div className="h-4 w-3/4 bg-white/20 rounded" />
                     <div className="h-4 w-1/2 bg-white/10 rounded" />
                     <div className="pt-4 flex gap-2">
                        <div className="w-8 h-8 rounded bg-white/10" />
                        <div className="w-8 h-8 rounded bg-white/10" />
                        <div className="w-8 h-8 rounded bg-white/10" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// Fixed missing default export caused by truncation
export default MarketplacePage;
