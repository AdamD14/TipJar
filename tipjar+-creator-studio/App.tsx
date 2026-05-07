
import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, MenuItem, COLORS } from './constants';
import CreatorStudio from './pages/CreatorStudio';
import Dashboard from './pages/Dashboard';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import MonetizationPage from './pages/MonetizationPage';
import SupportersPage from './pages/SupportersPage';
import SettingsPage from './pages/SettingsPage';
import InsightsPage from './pages/InsightsPage';
import FeedPage from './pages/FeedPage';
import PartnerPage from './pages/PartnerPage';
import InteractionsPage from './pages/InteractionsPage';
import AutomationPage from './pages/AutomationPage';
import ModerationPage from './pages/ModerationPage';
import MediaKitPage from './pages/MediaKitPage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import AITrainingPage from './pages/AITrainingPage';
import MarketplacePage from './pages/MarketplacePage';
import MobileControlPage from './pages/MobileControlPage';
import CampaignsPage from './pages/CampaignsPage';
import TaxCenterPage from './pages/TaxCenterPage';
import GovernancePage from './pages/GovernancePage';
import SecurityAuditPage from './pages/SecurityAuditPage';
import DevCenterPage from './pages/DevCenterPage';
import PredictiveAIPage from './pages/PredictiveAIPage';
import BusinessCRMPage from './pages/BusinessCRMPage';
import FanPollsPage from './pages/FanPollsPage';
import AssetVaultPage from './pages/AssetVaultPage';
import RevenueHealthPage from './pages/RevenueHealthPage';
import AIClipStudioPage from './pages/AIClipStudioPage';
import LegalCenterPage from './pages/LegalCenterPage';
import BrandConnectPage from './pages/BrandConnectPage';
import FulfillmentCenterPage from './pages/FulfillmentCenterPage';
import TTSStudioPage from './pages/TTSStudioPage';
import ViewerProfilePage from './pages/ViewerProfilePage';
import ViewerInteractionPage from './pages/ViewerInteractionPage';
import DistributionHubPage from './pages/DistributionHubPage';
import CommunityRewardsPage from './pages/CommunityRewardsPage';
import CompliancePage from './pages/CompliancePage';
import WidgetPreview from './pages/WidgetPreview';
import OverlayPage from './pages/OverlayPage';

// New Pages
import WhyPage from './pages/WhyPage';
import HowPage from './pages/HowPage';
import AIPage from './pages/AIPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import StatusPage from './pages/StatusPage';
import LegalTermsPage from './pages/LegalTermsPage';
import LegalPrivacyPage from './pages/LegalPrivacyPage';
import LegalCookiesPage from './pages/LegalCookiesPage';
import LegalDMCAPage from './pages/LegalDMCAPage';
import NotFoundPage from './pages/NotFoundPage';

import NotificationsDrawer from './components/NotificationsDrawer';
import { useNotificationStore } from './stores/notificationStore';
import { 
  Bell, 
  Zap, 
  Menu, 
  X, 
  Plus, 
  Search, 
  Wallet, 
  ChevronDown, 
  LogOut, 
  LineChart, 
  Settings, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const SidebarSection: React.FC<{ title: string, items: MenuItem[], onClose: () => void }> = ({ title, items, onClose }) => {
  const location = useLocation();
  return (
    <div className="mb-6">
      <p className="px-4 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
      <div className="space-y-0.5">
        {items.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.id} 
              to={item.path} 
              onClick={onClose} 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-[13px] ${
                isActive ? 'bg-[#003737] text-[#FFD700] shadow-lg shadow-black/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-[#FFD700]' : 'text-slate-500'}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const location = useLocation();
  const isPublic = location.pathname.startsWith('/@') || 
                   location.pathname.startsWith('/interact') ||
                   ['/why', '/how', '/ai', '/support', '/contact', '/help', '/status'].includes(location.pathname) ||
                   location.pathname.startsWith('/legal');
  
  const isIframe = location.pathname.includes('preview') || location.pathname.includes('overlay');
  
  if (isIframe || isPublic) return null;

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden" 
            onClick={onClose} 
          />
        )}
      </AnimatePresence>
      <aside className={`fixed md:sticky top-0 left-0 z-[70] h-screen w-64 bg-[#003737]/90 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 ease-in-out flex flex-col text-slate-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 overflow-y-auto no-scrollbar flex-1">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={onClose} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700] flex items-center justify-center text-[#003737] font-black text-xl shadow-lg">T+</div>
              <span className="font-black text-xl tracking-tighter text-white">TipJar+</span>
            </Link>
            <button onClick={onClose} className="md:hidden p-2 text-slate-500 hover:text-white"><X size={24} /></button>
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

const HeaderDropdown = ({ trigger, children, isOpen, setIsOpen }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-72 bg-[#003737] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-[100] backdrop-blur-2xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const location = useLocation();
  const { setDrawerOpen, notifications } = useNotificationStore();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isPublic = location.pathname.startsWith('/@') || 
                   location.pathname.startsWith('/interact') ||
                   ['/why', '/how', '/ai', '/support', '/contact', '/help', '/status'].includes(location.pathname) ||
                   location.pathname.startsWith('/legal');

  if (location.pathname.includes('preview') || location.pathname.includes('overlay') || isPublic) return null;
  
  return (
    <header className="h-20 bg-white/80 border-b border-slate-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link to="/" className="md:hidden"><div className="w-9 h-9 rounded-xl bg-[#003737] flex items-center justify-center text-[#FFD700] font-black text-lg">T+</div></Link>
        <button onClick={onMenuOpen} className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"><Menu size={24} /></button>
        <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-slate-400">
          <Search size={16} />
          <input type="text" placeholder="Szukaj funkcji..." className="bg-transparent border-none text-xs font-bold outline-none w-48 text-slate-600" />
        </div>
      </div>

      <div className="hidden sm:block">
        <Link to="/studio" className="group relative flex items-center gap-3 px-6 py-2.5 bg-[#FFD700] text-[#003737] rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
          <Sparkles size={14} className="group-hover:animate-spin" />
          <span>Creator Studio</span>
          <span className="bg-[#003737] text-[8px] px-1.5 py-0.5 rounded-full text-white animate-bounce">Live</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <HeaderDropdown 
          isOpen={isWalletOpen} setIsOpen={setIsWalletOpen}
          trigger={
            <div className={`p-2.5 rounded-xl border transition-all ${isWalletOpen ? 'bg-[#4D194D] text-white border-[#4D194D]' : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}>
              <Wallet size={20} />
            </div>
          }
        >
          <div className="p-6 space-y-4">
             <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Saldo Web3</p>
                <Link to="/wallet" className="text-[10px] font-black text-[#FFD700] uppercase">Szczegóły</Link>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black italic tracking-tighter text-white">1,234.50</span>
                <span className="text-sm font-black text-[#FFD700] italic">USDC</span>
             </div>
             <button className="w-full py-4 bg-[#4D194D] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-black/20 flex items-center justify-center gap-2">
                Wypłata On-Chain <ArrowUpRight size={14} />
             </button>
          </div>
        </HeaderDropdown>

        <button 
          onClick={() => setDrawerOpen(true)}
          className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 relative border border-slate-100 transition-all active:scale-90"
        >
          <Bell size={20} />
          {unreadCount > 0 && <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">{unreadCount}</span>}
        </button>

        <div className="h-8 w-px bg-slate-100 mx-1"></div>

        <HeaderDropdown 
          isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}
          trigger={
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden shrink-0 ring-2 ring-transparent">
                <img src="https://picsum.photos/100/100" alt="Avatar" />
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          }
        >
          <div className="p-2">
             <div className="p-4 border-b border-white/5">
                <p className="text-sm font-black text-white">Alex Streamer</p>
                <div className="flex items-center gap-1.5 mt-1 text-[#FFD700]">
                   <ShieldCheck size={12} />
                   <p className="text-[9px] font-bold uppercase tracking-widest">Verified Pro</p>
                </div>
             </div>
             <div className="p-2 space-y-1">
                {[
                  { label: 'Ustawienia', icon: <Settings size={16} />, path: '/settings' },
                  { label: 'Analityka', icon: <LineChart size={16} />, path: '/insights' },
                  { label: 'Mój Profil', icon: <Plus size={16} />, path: '/profile' },
                ].map(item => (
                  <Link 
                    key={item.path} to={item.path} onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-bold text-xs transition-colors"
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

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50/50">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="flex-1 min-w-0 flex flex-col">
          <Header onMenuOpen={() => setIsMobileMenuOpen(true)} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<div className="p-4 md:p-10"><Dashboard /></div>} />
              <Route path="/studio" element={<CreatorStudio />} />
              <Route path="/feed" element={<div className="p-4 md:p-10"><FeedPage /></div>} />
              <Route path="/interactions" element={<div className="p-4 md:p-10"><InteractionsPage /></div>} />
              <Route path="/events" element={<div className="p-4 md:p-10"><EventsPage /></div>} />
              <Route path="/aitraining" element={<div className="p-4 md:p-10"><AITrainingPage /></div>} />
              <Route path="/predictive" element={<div className="p-4 md:p-10"><PredictiveAIPage /></div>} />
              <Route path="/clips" element={<div className="p-4 md:p-10"><AIClipStudioPage /></div>} />
              <Route path="/tts" element={<div className="p-4 md:p-10"><TTSStudioPage /></div>} />
              <Route path="/marketplace" element={<div className="p-4 md:p-10"><MarketplacePage /></div>} />
              <Route path="/rewards" element={<div className="p-4 md:p-10"><CommunityRewardsPage /></div>} />
              <Route path="/campaigns" element={<div className="p-4 md:p-10"><CampaignsPage /></div>} />
              <Route path="/crm" element={<div className="p-4 md:p-10"><BusinessCRMPage /></div>} />
              <Route path="/distribution" element={<div className="p-4 md:p-10"><DistributionHubPage /></div>} />
              <Route path="/fulfillment" element={<div className="p-4 md:p-10"><FulfillmentCenterPage /></div>} />
              <Route path="/tax" element={<div className="p-4 md:p-10"><TaxCenterPage /></div>} />
              <Route path="/compliance" element={<div className="p-4 md:p-10"><CompliancePage /></div>} />
              <Route path="/governance" element={<div className="p-4 md:p-10"><GovernancePage /></div>} />
              <Route path="/legal" element={<div className="p-4 md:p-10"><LegalCenterPage /></div>} />
              <Route path="/polls" element={<div className="p-4 md:p-10"><FanPollsPage /></div>} />
              <Route path="/audit" element={<div className="p-4 md:p-10"><SecurityAuditPage /></div>} />
              <Route path="/dev" element={<div className="p-4 md:p-10"><DevCenterPage /></div>} />
              <Route path="/vault" element={<div className="p-4 md:p-10"><AssetVaultPage /></div>} />
              <Route path="/health" element={<div className="p-4 md:p-10"><RevenueHealthPage /></div>} />
              <Route path="/mediakit" element={<div className="p-4 md:p-10"><MediaKitPage /></div>} />
              <Route path="/automation" element={<div className="p-4 md:p-10"><AutomationPage /></div>} />
              <Route path="/moderation" element={<div className="p-4 md:p-10"><ModerationPage /></div>} />
              <Route path="/team" element={<div className="p-4 md:p-10"><TeamPage /></div>} />
              <Route path="/insights" element={<div className="p-4 md:p-10"><InsightsPage /></div>} />
              <Route path="/monetization" element={<div className="p-4 md:p-10"><MonetizationPage /></div>} />
              <Route path="/supporters" element={<div className="p-4 md:p-10"><SupportersPage /></div>} />
              <Route path="/partners" element={<div className="p-4 md:p-10"><PartnerPage /></div>} />
              <Route path="/remote" element={<div className="p-4 md:p-10"><MobileControlPage /></div>} />
              <Route path="/wallet" element={<div className="p-4 md:p-10"><WalletPage /></div>} />
              <Route path="/profile" element={<div className="p-4 md:p-10"><ProfilePage /></div>} />
              <Route path="/settings" element={<div className="p-4 md:p-10"><SettingsPage /></div>} />
              
              {/* Marketing & Legal */}
              <Route path="/why" element={<WhyPage />} />
              <Route path="/how" element={<HowPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/legal/terms" element={<LegalTermsPage />} />
              <Route path="/legal/privacy" element={<LegalPrivacyPage />} />
              <Route path="/legal/cookies" element={<LegalCookiesPage />} />
              <Route path="/legal/dmca" element={<LegalDMCAPage />} />
              
              <Route path="/@:handle" element={<ViewerProfilePage />} />
              <Route path="/interact/:id" element={<ViewerInteractionPage />} />
              <Route path="/widget/preview" element={<WidgetPreview />} />
              <Route path="/overlay/:creatorId" element={<OverlayPage />} />
              
              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <NotificationsDrawer />
      </div>
    </HashRouter>
  );
};

export default App;
