
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Wallet, 
  User, 
  Target, 
  Sparkles,
  Users,
  LineChart,
  Rss,
  Handshake,
  Dices,
  Zap,
  ShieldAlert,
  Briefcase,
  UsersRound,
  CalendarDays,
  BrainCircuit,
  ShoppingBag,
  SmartphoneNfc,
  FileText,
  Gavel,
  History,
  Terminal,
  Building2,
  TrendingUp,
  Contact2,
  Vote,
  FolderLock,
  HeartPulse,
  Video,
  Scale,
  MessageCircle,
  PackageCheck,
  Mic2,
  Share2,
  Medal,
  FileBadge
} from 'lucide-react';

export const COLORS = {
  primary: '#006D6D',
  secondary: '#FFD700', // brand-gold (CTA/Attention)
  brandDark: '#003737', // brand-dark (UI Base)
  brandPurple: '#4D194D', // brand-purple (Exclusively Web3/Blockchain)
  dark: '#020a0b',
  light: '#f8fafc',
};

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  category: 'main' | 'ai' | 'money' | 'social' | 'business' | 'dev';
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/', category: 'main' },
  { id: 'studio', label: 'Creator Studio', icon: <Sparkles size={18} />, path: '/studio', category: 'main' },
  { id: 'remote', label: 'Remote Control', icon: <SmartphoneNfc size={18} />, path: '/remote', category: 'main' },
  
  { id: 'aitraining', label: 'Gemini Brain', icon: <BrainCircuit size={18} />, path: '/aitraining', category: 'ai' },
  { id: 'predictive', label: 'Prognozy AI', icon: <TrendingUp size={18} />, path: '/predictive', category: 'ai' },
  { id: 'clips', label: 'AI Clip Studio', icon: <Video size={18} />, path: '/clips', category: 'ai' },
  { id: 'tts', label: 'TTS Studio', icon: <Mic2 size={18} />, path: '/tts', category: 'ai' },

  { id: 'wallet', label: 'Portfel USDC', icon: <Wallet size={18} />, path: '/wallet', category: 'money' },
  { id: 'monetization', label: 'Cele i Subskrypcje', icon: <Target size={18} />, path: '/monetization', category: 'money' },
  { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={18} />, path: '/marketplace', category: 'money' },
  { id: 'campaigns', label: 'Kampanie & Sponsorzy', icon: <Building2 size={18} />, path: '/campaigns', category: 'money' },

  { id: 'supporters', label: 'Wspierający', icon: <Users size={18} />, path: '/supporters', category: 'social' },
  { id: 'rewards', label: 'Nagrody & Odznaki', icon: <Medal size={18} />, path: '/rewards', category: 'social' },
  { id: 'feed', label: 'Ekskluzywne Posty', icon: <Rss size={18} />, path: '/feed', category: 'social' },
  { id: 'interactions', label: 'Grywalizacja', icon: <Dices size={18} />, path: '/interactions', category: 'social' },
  { id: 'polls', label: 'Ankiety & Feedback', icon: <Vote size={18} />, path: '/polls', category: 'social' },
  { id: 'events', label: 'Wydarzenia & Drops', icon: <CalendarDays size={18} />, path: '/events', category: 'social' },

  { id: 'crm', label: 'Business CRM', icon: <Contact2 size={18} />, path: '/crm', category: 'business' },
  { id: 'mediakit', label: 'Media Kit AI', icon: <Briefcase size={18} />, path: '/mediakit', category: 'business' },
  { id: 'tax', label: 'Podatki & Raporty', icon: <FileText size={18} />, path: '/tax', category: 'business' },
  { id: 'compliance', label: 'Zgodność (KYC)', icon: <FileBadge size={18} />, path: '/compliance', category: 'business' },
  { id: 'legal', label: 'Centrum Prawne', icon: <Scale size={18} />, path: '/legal', category: 'business' },
  { id: 'governance', label: 'Governance (DAO)', icon: <Gavel size={18} />, path: '/governance', category: 'business' },

  { id: 'distribution', label: 'Distribution Hub', icon: <Share2 size={18} />, path: '/distribution', category: 'dev' },
  { id: 'automation', label: 'Automatyzacja', icon: <Zap size={18} />, path: '/automation', category: 'dev' },
  { id: 'dev', label: 'Dev Center', icon: <Terminal size={18} />, path: '/dev', category: 'dev' },
  { id: 'vault', label: 'Asset Vault', icon: <FolderLock size={18} />, path: '/vault', category: 'dev' },
  { id: 'audit', label: 'Audit Log', icon: <History size={18} />, path: '/audit', category: 'dev' },
  { id: 'team', label: 'Mój Zespół', icon: <UsersRound size={18} />, path: '/team', category: 'dev' },
  { id: 'insights', label: 'Analityka', icon: <LineChart size={18} />, path: '/insights', category: 'dev' },
  { id: 'settings', label: 'Ustawienia', icon: <Settings size={18} />, path: '/settings', category: 'dev' },
];
