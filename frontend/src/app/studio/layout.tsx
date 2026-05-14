"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, MenuItem } from '@/lib/constants/studio';
import NotificationsDrawer from '@/components/studio/NotificationsDrawer';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { 
  Bell, 
  Menu, 
  X, 
  Plus, 
  Search, 
  Wallet, 
  ChevronDown, 
  LineChart, 
  Settings, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const SidebarSection: React.FC<{ title: string, items: MenuItem[], onClose: () => void }> = ({ title, items, onClose }) => {
  const pathname = usePathname() || '';
  return (
    <div className="mb-6">
      <p className="px-4 mb-2 text-[10px] font-black text-teal-100 uppercase tracking-[0.2em]">{title}</p>
      <div className="space-y-0.5">
        {items.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.id} 
              href={item.path} 
              onClick={onClose} 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all font-bold text-[13px] font-heading ${
                isActive ? 'bg-teal-800 text-gold-400 shadow-lg shadow-black/20' : 'text-teal-100 hover:bg-teal-700 hover:text-teal-25'
              }`}
            >
              <span className={isActive ? 'text-gold-400' : 'text-teal-100'}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const pathname = usePathname() || '';
  
  const isIframe = pathname.includes('preview') || pathname.includes('overlay');
  
  if (isIframe) return null;

  const grouped = {
    'Główne': MENU_ITEMS.filter(i => i.category === 'main'),
    'Inteligencja AI': MENU_ITEMS.filter(i => i.category === 'ai'),
    'Finanse': MENU_ITEMS.filter(i => i.category === 'money'),
    'Społeczność': MENU_ITEMS.filter(i => i.category === 'social'),
    'Biznes & Prawo': MENU_ITEMS.filter(i => i.category === 'business'),
    'Administracja': MENU_ITEMS.filter(i => i.category === 'dev'),
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-teal-900/80 backdrop-blur-md z-[60] md:hidden" 
            onClick={onClose} 
          />
        )}
      </AnimatePresence>
      <aside className={`fixed md:sticky top-0 left-0 z-[70] h-screen w-64 bg-teal-800/90 backdrop-blur-2xl border-r border-teal-700 transition-transform duration-300 ease-standard flex flex-col text-teal-50 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 overflow-y-auto no-scrollbar flex-1">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gold-400 flex items-center justify-center text-teal-900 font-heading font-bold text-xl shadow-lg">T+</div>
              <span className="font-heading font-bold text-xl tracking-tighter text-teal-25">TipJar+</span>
            </Link>
            <button onClick={onClose} className="md:hidden p-2 text-teal-100 hover:text-teal-25"><X size={24} /></button>
          </div>
          <nav className="pb-10">
            {Object.entries(grouped).map(([title, items]) => (
              <SidebarSection key={title} title={title} items={items} onClose={onClose} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

const HeaderDropdown = ({ trigger, children, isOpen, setIsOpen }: { trigger: React.ReactNode, children: React.ReactNode, isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-72 bg-teal-800 border border-teal-700 rounded-xl shadow-modal overflow-hidden z-dropdown backdrop-blur-2xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const pathname = usePathname() || '';
  const { setDrawerOpen, notifications } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (pathname.includes('preview') || pathname.includes('overlay')) return null;
  
  return (
    <header className="h-20 bg-teal-800/80 border-b border-teal-700 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link href="/" className="md:hidden"><div className="w-9 h-9 rounded-md bg-teal-800 flex items-center justify-center text-gold-400 font-heading font-bold text-lg">T+</div></Link>
        <button onClick={onMenuOpen} className="p-2 text-teal-100 hover:bg-teal-700 rounded-md transition-colors"><Menu size={24} /></button>
        <div className="hidden lg:flex items-center gap-2 bg-teal-800 border border-teal-700 rounded-md px-4 py-2 text-teal-100">
          <Search size={16} />
          <input type="text" placeholder="Szukaj funkcji..." className="bg-transparent border-none text-xs font-bold outline-none w-48 text-teal-25 placeholder:text-teal-100" />
        </div>
      </div>

      <div className="hidden sm:block">
        <Link href="/studio/creator-studio" className="group relative flex items-center gap-3 px-6 py-2.5 bg-gold-400 text-teal-900 rounded-md font-bold font-heading text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all ease-standard">
          <Sparkles size={14} className="group-hover:animate-spin" />
          <span>Creator Studio</span>
          <span className="bg-teal-900 text-[8px] px-1.5 py-0.5 rounded-full text-gold-400 animate-bounce">Live</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <HeaderDropdown 
          isOpen={isWalletOpen} setIsOpen={setIsWalletOpen}
          trigger={
            <div className={`p-2.5 rounded-md border transition-all ease-standard ${isWalletOpen ? 'bg-purple-300 text-teal-25 border-purple-300' : 'bg-teal-800 text-teal-100 border-teal-700 hover:bg-teal-700'}`}>
              <Wallet size={20} />
            </div>
          }
        >
          <div className="p-6 space-y-4">
             <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest">Saldo Web3</p>
                <Link href="/studio/wallet" className="text-[10px] font-black text-gold-400 uppercase">Szczegóły</Link>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-heading italic tracking-tighter text-teal-25">1,234.50</span>
                <span className="text-sm font-black text-gold-400 italic">USDC</span>
             </div>
             <button className="w-full py-4 bg-purple-300 text-teal-25 font-bold rounded-md text-[10px] uppercase tracking-widest shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all ease-standard hover:bg-purple-400">
                Wypłata On-Chain <ArrowUpRight size={14} />
             </button>
          </div>
        </HeaderDropdown>

        <button 
          onClick={() => setDrawerOpen(true)}
          className="p-2.5 text-teal-100 hover:text-teal-25 rounded-md hover:bg-teal-700 relative border border-teal-700 transition-all ease-standard active:scale-98"
        >
          <Bell size={20} />
          {unreadCount > 0 && <span className="absolute top-2 right-2 w-4 h-4 bg-error-base text-teal-25 text-[8px] font-black flex items-center justify-center rounded-full border-2 border-teal-900">{unreadCount}</span>}
        </button>

        <div className="h-8 w-px bg-teal-700 mx-1"></div>

        <HeaderDropdown 
          isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}
          trigger={
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-gold-400 to-purple-300 border-2 border-teal-800 shadow-sm overflow-hidden shrink-0 flex items-center justify-center font-bold font-heading text-teal-900 text-sm shadow-black/20">
                AS
              </div>
              <ChevronDown size={14} className={`text-teal-100 transition-transform ease-standard ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          }
        >
          <div className="p-2">
             <div className="p-4 border-b border-teal-700">
                <p className="text-sm font-bold font-heading text-teal-25">Alex Streamer</p>
                <div className="flex items-center gap-1.5 mt-1 text-gold-400">
                   <ShieldCheck size={12} />
                   <p className="text-[9px] font-bold uppercase tracking-widest">Verified Pro</p>
                </div>
             </div>
             <div className="p-2 space-y-1">
                {[
                  { label: 'Ustawienia', icon: <Settings size={16} />, path: '/studio/settings' },
                  { label: 'Analityka', icon: <LineChart size={16} />, path: '/studio/insights' },
                  { label: 'Mój Profil', icon: <Plus size={16} />, path: '/studio/profile' },
                ].map(item => (
                  <Link 
                    key={item.path} href={item.path} onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-teal-700 text-teal-100 font-bold text-xs transition-colors"
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
             </div>
          </div>
        </HeaderDropdown>
      </div>
    </header>
  );
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-teal-900">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className="flex-1 min-w-0 flex flex-col">
        <Header onMenuOpen={() => setIsMobileMenuOpen(true)} />
        <div className="flex-1 p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
      <NotificationsDrawer />
    </div>
  );
}
