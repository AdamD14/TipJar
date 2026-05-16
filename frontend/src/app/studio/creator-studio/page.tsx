"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Sparkles, 
  Wallet, 
  Crown,
  Plus,
  Download,
  FileText,
  Play,
  Zap
} from 'lucide-react';
import { Target, Tv, Share2 } from 'lucide-react';
import { useWidgetStore } from '@/lib/store/widgetStore';
import TipModal from '@/components/payments/TipModal';
import GoalModal from '@/components/studio/modal/GoalModal';
import GoalCard from '@/components/studio/modal/GoalCard';
import type { Goal } from '@/lib/types';
import SubscribeModal, { TierPub } from '@/components/community/SubscribeModal';
import OverlayEditor from '@/components/studio/overlay/OverlayEditor';
import { QRCodeSVG } from 'qrcode.react';

type Tab = 'QR Hub' | 'Tip Modal' | 'Goals' | 'Subscriptions' | 'Overlay' | 'Social';
const TABS: Tab[] = ['QR Hub', 'Tip Modal', 'Goals', 'Subscriptions', 'Overlay', 'Social'];

const CreatorStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('QR Hub');
  const { config } = useWidgetStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'QR Hub': return <QRHub />;
      case 'Tip Modal': return <TipModalSection handle={config.handle} />;
      case 'Goals': return <GoalsHub />;
      case 'Subscriptions': return <SubscriptionsHub handle={config.handle} />;
      case 'Overlay': return <OverlaySection creatorId={config.handle} />;
      case 'Social': return <SocialSection />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Creator Studio</h1>
          <p className="text-teal-50 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Management Hub & Monetization Control</p>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-teal-800 rounded-lg shadow-inner border border-teal-700">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`relative flex-shrink-0 rounded-md px-6 py-2.5 text-[10px] transition-all ease-standard font-bold uppercase tracking-widest flex items-center justify-center gap-2 font-heading ${
                activeTab === t ? 'bg-teal-700 text-gold-400 shadow-lg' : 'text-teal-100 hover:text-teal-25'
              }`}
            >
              {t === 'QR Hub' && <QrCode size={14} />}
              {t === 'Tip Modal' && <Wallet size={14} />}
              {t === 'Goals' && <Target size={14} />}
              {t === 'Subscriptions' && <Crown size={14} />}
              {t === 'Overlay' && <Tv size={14} />}
              {t === 'Social' && <Share2 size={14} />}
              <span className="whitespace-nowrap italic">{t}</span>
            </button>
          ))}
        </div>
      </header>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-teal-800 border border-teal-700 rounded-lg p-6 lg:p-10 shadow-sm min-h-[600px]"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

function QRHub() {
  const { config } = useWidgetStore();
  const profileUrl = `${window.location.origin}/@/${config.handle}`;
  
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold font-heading italic text-teal-25">QR & Print Hub</h3>
          <p className="text-teal-50 font-medium mt-2 leading-relaxed">Pobierz kody QR w wysokiej rozdzielczości do umieszczenia na streamie lub w fizycznych lokalizacjach.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-3 py-5 bg-gold-400 text-teal-900 rounded-md font-bold text-xs uppercase tracking-widest shadow-lg shadow-gold-400/10 hover:scale-[1.02] transition-all ease-standard">
              <Download size={18} /> Pobierz PNG 2K
           </button>
           <button className="flex items-center justify-center gap-3 py-5 border-2 border-teal-600 text-teal-50 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-teal-700 hover:text-teal-25 transition-all ease-standard">
              <FileText size={18} /> Drukuj Plakat A4
           </button>
        </div>
        <div className="bg-teal-700 p-6 rounded-lg border border-teal-600 italic text-xs text-teal-100 font-bold">
           "Twój kod QR kieruje fana bezpośrednio do Twojego Tip Modala na Polygon."
        </div>
      </div>
      <div className="flex items-center justify-center bg-teal-800 rounded-lg border-2 border-dashed border-teal-600 p-10">
         <div className="bg-teal-700 p-8 rounded-lg shadow-2xl flex flex-col items-center gap-6">
            <QRCodeSVG value={profileUrl} size={200} includeMargin level="H" />
            <div className="text-[10px] font-mono text-teal-100 font-bold bg-teal-800 px-4 py-2 rounded-md border border-teal-600 italic">{profileUrl}</div>
         </div>
      </div>
    </div>
  );
}

function TipModalSection({ handle }: { handle: string }) {
  const [showTest, setShowTest] = useState(false);
  
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold font-heading italic text-teal-25">Dedykowany Tip Modal</h3>
          <p className="text-teal-50 font-medium mt-2 leading-relaxed">Interfejs fana zoptymalizowany pod szybkie wpłaty. Obsługuje GPay, Revolut i portfele krypto (Circle API Ready).</p>
        </div>
        <div className="p-8 bg-teal-700 rounded-lg text-teal-25 space-y-6 relative overflow-hidden group">
           <Zap size={100} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform ease-standard" />
           <div className="relative z-10 space-y-4">
              <h4 className="font-bold font-heading italic text-xl text-gold-400">Podgląd Płatności</h4>
              <p className="text-xs text-teal-50 leading-relaxed font-medium">Ustawienia: Presety $1-$20, Cent-based Logic, Multi-payment Icons.</p>
              <button 
                onClick={() => setShowTest(true)}
                className="w-full py-4 bg-gold-400 text-teal-900 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-gold-400/10 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all ease-standard"
              >
                <Play size={16} fill="currentColor" /> Testuj Płynność Modala
              </button>
           </div>
        </div>
      </div>
      <div className="bg-teal-800 rounded-lg border-2 border-dashed border-teal-600 p-6 flex items-center justify-center relative overflow-hidden">
         <div className="text-center opacity-10">
            <Wallet size={150} className="text-teal-100 mx-auto mb-4" />
            <p className="font-bold uppercase tracking-[0.4em] text-teal-100">Checkout Preview Area</p>
         </div>
         <TipModal creatorId={handle} open={showTest} onClose={() => setShowTest(false)} onSuccess={() => setShowTest(false)} />
      </div>
    </div>
  );
}

function GoalsHub() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Nowy Setup do Streamowania', raised: 425000, targetAmount: 1000000, description: 'Zbieramy na RTX 5090 i monitor 4K!', active: true }
  ]);
  const [showCreate, setShowCreate] = useState(false);

  const handleSaved = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-3xl font-bold font-heading italic text-teal-25">Goal Hub</h3>
           <p className="text-teal-50 font-medium">Zarządzaj celami finansowymi swojego kanału.</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transition-all ease-standard hover:bg-teal-500"
        >
          <Plus size={18} /> Dodaj Nowy Cel
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {goals.map(g => <GoalCard key={g.id} g={g} />)}
        
        {goals.length === 1 && (
           <div 
             onClick={() => setShowCreate(true)}
             className="border-4 border-dashed border-teal-700 rounded-lg flex flex-col items-center justify-center p-12 text-teal-100 hover:border-teal-500 hover:text-teal-500 transition-all ease-standard cursor-pointer group"
           >
              <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-500/10 transition-all"><Plus size={32} className="text-teal-100" /></div>
              <p className="font-bold uppercase text-xs tracking-[0.2em]">Stwórz Cel Drugorzędny</p>
           </div>
        )}
      </div>

      <AnimatePresence>
        {showCreate && <GoalModal onClose={() => setShowCreate(false)} onSaved={handleSaved} />}
      </AnimatePresence>
    </div>
  );
}

function SubscriptionsHub({ handle }: { handle: string }) {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const tiers: TierPub[] = [
    { id: '1', name: 'Supporter', price: 500, perks: ['Badge', 'Discord Role'], active: true },
    { id: '2', name: 'Elite Member', price: 2500, perks: ['Voting', 'Behind scenes', 'Priority chat'], active: true }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
         <div>
            <h3 className="text-3xl font-bold font-heading italic text-teal-25">Subscriptions</h3>
            <p className="text-teal-50 font-medium">Buduj stały dochód dzięki systemom subskrypcji w USDC.</p>
         </div>
         <div className="space-y-4">
            {tiers.map(t => (
              <div key={t.id} className="bg-teal-700 p-6 rounded-lg border border-teal-600 flex justify-between items-center group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-teal-800 flex items-center justify-center text-gold-400"><Crown size={24} /></div>
                    <div>
                       <h4 className="font-bold text-teal-25">{t.name}</h4>
                       <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest italic">{(t.price/100).toFixed(2)} USDC / msc</p>
                    </div>
                 </div>
                 <button className="px-5 py-2.5 bg-teal-800 text-teal-100 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-teal-600 hover:text-teal-25 transition-all ease-standard">Edytuj</button>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-teal-700 rounded-lg text-teal-100 font-bold uppercase text-[10px] tracking-widest hover:border-teal-500 hover:text-teal-500 transition-all ease-standard">+ Nowy Próg</button>
         </div>
      </div>
      <div className="bg-teal-800 rounded-lg border-2 border-dashed border-teal-600 p-6 flex flex-col items-center justify-center relative overflow-hidden">
         <div className="text-center opacity-10 mb-8">
            <Crown size={150} className="text-teal-100 mx-auto mb-4" />
            <p className="font-bold uppercase tracking-[0.4em] text-teal-100">Subscription Preview</p>
         </div>
         <button 
           onClick={() => setShowSubscribe(true)}
           className="px-10 py-5 bg-teal-700 text-gold-400 rounded-md font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all ease-standard flex items-center gap-3"
         >
           <Play size={16} fill="currentColor" /> Testuj Subscribe Modal
         </button>
         <SubscribeModal username={handle} open={showSubscribe} onClose={() => setShowSubscribe(false)} tiers={tiers} />
      </div>
    </div>
  );
}

function OverlaySection({ creatorId }: { creatorId: string }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold font-heading italic text-teal-25">OBS Studio Overlay</h3>
        <p className="text-teal-50 font-medium mt-2 italic text-xs uppercase tracking-widest">Personalizacja alertów na żywo.</p>
      </div>
      <OverlayEditor creatorId={creatorId} />
    </div>
  );
}

function SocialSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold font-heading italic text-teal-25">Social Distribution</h3>
        <p className="text-teal-50 font-medium mt-2 text-xs uppercase tracking-[0.2em]">Zwiększ zasięgi swojego profilu.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-center">
        <div className="p-8 bg-teal-700 rounded-lg border border-teal-600 space-y-4 hover:border-teal-500 transition-all ease-standard">
           <h4 className="font-bold text-teal-25 font-heading italic">Twitter / X Post</h4>
           <p className="text-xs text-teal-100">Automatyczny generator grafik z linkiem do profilu.</p>
           <button className="px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest transition-all ease-standard hover:bg-teal-500">Generuj Post</button>
        </div>
        <div className="p-8 bg-teal-700 rounded-lg border border-teal-600 space-y-4 hover:border-teal-500 transition-all ease-standard">
           <h4 className="font-bold text-teal-25 font-heading italic">Instagram Story</h4>
           <p className="text-xs text-teal-100">Pobierz format 9:16 zintegrowany z Twoim brandem.</p>
           <button className="px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest transition-all ease-standard hover:bg-teal-500">Pobierz Story</button>
        </div>
      </div>
    </div>
  );
}

export default CreatorStudio;
