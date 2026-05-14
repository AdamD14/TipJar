"use client";


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Sparkles, 
  HelpCircle, 
  LineChart as ChartIcon, 
  Zap, 
  Wallet, 
  Video, 
  Mic2, 
  Users, 
  LayoutDashboard, 
  BrainCircuit, 
  Goal as GoalIcon, 
  ShoppingBag, 
  Radio, 
  ShieldCheck, 
  Gamepad2, 
  Megaphone, 
  CheckCircle2, 
  Copy,
  Plus,
  Crown
} from 'lucide-react';
import { useWidgetStore } from '@/lib/store/widgetStore';
import TipModal from '@/components/payments/TipModal';
import GoalModal from '@/components/creator/GoalModal';
import GoalCard from '@/components/creator/GoalCard';
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
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 lg:p-10 pb-32">
      <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
        <header className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#003737] tracking-tight italic">Creator Studio</h1>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mt-1">Management Hub & Monetization Control</p>
          </div>
          
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-[#003737]/5 rounded-[2.5rem] shadow-inner border border-slate-100">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`relative flex-shrink-0 rounded-full px-8 py-3 text-[10px] transition-all duration-300 font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                  activeTab === t ? 'bg-[#003737] text-[#FFD700] shadow-xl' : 'text-slate-400 hover:text-[#003737]'
                }`}
              >
                {t === 'QR Hub' && <QrCode size={14} />}
                {t === 'Tip Modal' && <CreditCard size={14} />}
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
          className="bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[3rem] p-6 lg:p-12 shadow-sm min-h-[600px]"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

function QRHub() {
  const { config } = useWidgetStore();
  const profileUrl = `${window.location.origin}/#/@${config.handle}`;
  
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-black italic text-[#003737]">QR & Print Hub</h3>
          <p className="text-slate-500 font-medium mt-2 leading-relaxed">Pobierz kody QR w wysokiej rozdzielczości do umieszczenia na streamie lub w fizycznych lokalizacjach.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-3 py-5 bg-[#FFD700] text-[#003737] rounded-3xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#FFD700]/10 hover:scale-[1.02] transition-all">
              <Download size={18} /> Pobierz PNG 2K
           </button>
           <button className="flex items-center justify-center gap-3 py-5 border-2 border-[#003737] text-[#003737] rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#003737] hover:text-white transition-all">
              <FileText size={18} /> Drukuj Plakat A4
           </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 italic text-xs text-slate-400 font-bold">
           "Twój kod QR kieruje fana bezpośrednio do Twojego Tip Modala na Polygon."
        </div>
      </div>
      <div className="flex items-center justify-center bg-[#f1f5f9] rounded-[3.5rem] border-2 border-dashed border-slate-200 p-10">
         <div className="bg-white p-8 rounded-[3rem] shadow-2xl flex flex-col items-center gap-6">
            <QRCodeSVG value={profileUrl} size={200} includeMargin level="H" />
            <div className="text-[10px] font-mono text-slate-400 font-bold bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic">{profileUrl}</div>
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
          <h3 className="text-3xl font-black italic text-[#003737]">Dedykowany Tip Modal</h3>
          <p className="text-slate-500 font-medium mt-2 leading-relaxed">Interfejs fana zoptymalizowany pod szybkie wpłaty. Obsługuje GPay, Revolut i portfele krypto (Circle API Ready).</p>
        </div>
        <div className="p-8 bg-[#003737] rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
           <Zap size={100} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700" />
           <div className="relative z-10 space-y-4">
              <h4 className="font-black italic text-xl text-[#FFD700]">Podgląd Płatności</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">Ustawienia: Presety $1-$20, Cent-based Logic, Multi-payment Icons.</p>
              <button 
                onClick={() => setShowTest(true)}
                className="w-full py-4 bg-[#FFD700] text-[#003737] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#FFD700]/10 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                <Play size={16} fill="currentColor" /> Testuj Płynność Modala
              </button>
           </div>
        </div>
      </div>
      <div className="bg-[#f1f5f9] rounded-[3.5rem] border-2 border-dashed border-slate-200 p-6 flex items-center justify-center relative overflow-hidden">
         <div className="text-center opacity-10">
            <CreditCard size={150} className="text-slate-400 mx-auto mb-4" />
            <p className="font-black uppercase tracking-[0.4em]">Checkout Preview Area</p>
         </div>
         <TipModal username={handle} open={showTest} onClose={() => setShowTest(false)} />
      </div>
    </div>
  );
}

function GoalsHub() {
  // Explicitly typing goals state using the exported Goal interface to prevent JSX assignment errors.
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: 'Nowy Setup do Streamowania 🐺', raised: 425000, targetAmount: 1000000, description: 'Zbieramy na RTX 5090 i monitor 4K!', active: true }
  ]);
  const [showCreate, setShowCreate] = useState(false);

  // Added type annotation for handleSaved to ensure consistency.
  const handleSaved = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-3xl font-black italic text-[#003737]">Goal Hub</h3>
           <p className="text-slate-500 font-medium">Zarządzaj celami finansowymi swojego kanału.</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="px-8 py-3 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2"
        >
          <Plus size={18} /> Dodaj Nowy Cel
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Fixed mapping: using GoalCard with proper Goal typing and React.FC to handle 'key' correctly. */}
        {goals.map(g => <GoalCard key={g.id} g={g} />)}
        
        {goals.length === 1 && (
           <div 
             onClick={() => setShowCreate(true)}
             className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-300 hover:border-[#006D6D] hover:text-[#006D6D] transition-all cursor-pointer group"
           >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-[#006D6D]/10 transition-all"><Plus size={32} /></div>
              <p className="font-black uppercase text-xs tracking-[0.2em]">Stwórz Cel Drugorzędny</p>
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
            <h3 className="text-3xl font-black italic text-[#003737]">Subscriptions</h3>
            <p className="text-slate-500 font-medium">Buduj stały dochód dzięki systemom subskrypcji w USDC.</p>
         </div>
         <div className="space-y-4">
            {tiers.map(t => (
              <div key={t.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#006D6D]"><Crown size={24} /></div>
                    <div>
                       <h4 className="font-black text-slate-800">{t.name}</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{(t.price/100).toFixed(2)} USDC / msc</p>
                    </div>
                 </div>
                 <button className="px-5 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#003737] hover:text-white transition-all">Edytuj</button>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-300 font-black uppercase text-[10px] tracking-widest hover:border-[#006D6D] hover:text-[#006D6D] transition-all">+ Nowy Próg</button>
         </div>
      </div>
      <div className="bg-[#f1f5f9] rounded-[3.5rem] border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center relative overflow-hidden">
         <div className="text-center opacity-10 mb-8">
            <Crown size={150} className="text-slate-400 mx-auto mb-4" />
            <p className="font-black uppercase tracking-[0.4em]">Subscription Preview</p>
         </div>
         <button 
           onClick={() => setShowSubscribe(true)}
           className="px-10 py-5 bg-[#003737] text-[#FFD700] rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
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
        <h3 className="text-2xl font-black italic text-[#003737]">OBS Studio Overlay</h3>
        <p className="text-slate-500 font-medium mt-2 italic text-xs uppercase tracking-widest">Personalizacja alertów na żywo.</p>
      </div>
      <OverlayEditor creatorId={creatorId} />
    </div>
  );
}

function SocialSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black italic text-[#003737]">Social Distribution</h3>
        <p className="text-slate-500 font-medium mt-2 text-xs uppercase tracking-[0.2em]">Zwiększ zasięgi swojego profilu.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-center">
        <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-4 hover:border-[#006D6D] transition-all">
           <h4 className="font-black text-slate-800 italic">Twitter / X Post</h4>
           <p className="text-xs text-slate-400">Automatyczny generator grafik z linkiem do profilu.</p>
           <button className="px-8 py-3 bg-[#006D6D] text-white rounded-xl font-black text-xs uppercase tracking-widest">Generuj Post</button>
        </div>
        <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-4 hover:border-[#006D6D] transition-all">
           <h4 className="font-black text-slate-800 italic">Instagram Story</h4>
           <p className="text-xs text-slate-400">Pobierz format 9:16 zintegrowany z Twoim brandem.</p>
           <button className="px-8 py-3 bg-[#006D6D] text-white rounded-xl font-black text-xs uppercase tracking-widest">Pobierz Story</button>
        </div>
      </div>
    </div>
  );
}

export default CreatorStudio;
