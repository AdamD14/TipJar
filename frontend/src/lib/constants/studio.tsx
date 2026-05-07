import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Wallet, 
  Target, 
  Sparkles,
  Users,
  LineChart,
  Rss,
  Dices,
  Zap,
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
  Video,
  Scale,
  Mic2,
  Share2,
  Medal,
  FileBadge
} from 'lucide-react';

export const COLORS = {
  primary: '#006D6D',
  secondary: '#FFD700',
  brandDark: '#003737',
  brandPurple: '#4D194D',
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
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/studio', category: 'main' },
  { id: 'studio', label: 'Creator Studio', icon: <Sparkles size={18} />, path: '/studio/creator-studio', category: 'main' },
  { id: 'remote', label: 'Remote Control', icon: <SmartphoneNfc size={18} />, path: '/studio/remote', category: 'main' },
  
  { id: 'aitraining', label: 'Gemini Brain', icon: <BrainCircuit size={18} />, path: '/studio/ai-training', category: 'ai' },
  { id: 'predictive', label: 'Prognozy AI', icon: <TrendingUp size={18} />, path: '/studio/predictive', category: 'ai' },
  { id: 'clips', label: 'AI Clip Studio', icon: <Video size={18} />, path: '/studio/clips', category: 'ai' },
  { id: 'tts', label: 'TTS Studio', icon: <Mic2 size={18} />, path: '/studio/tts', category: 'ai' },

  { id: 'wallet', label: 'Portfel USDC', icon: <Wallet size={18} />, path: '/studio/wallet', category: 'money' },
  { id: 'monetization', label: 'Cele i Subskrypcje', icon: <Target size={18} />, path: '/studio/monetization', category: 'money' },
  { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={18} />, path: '/studio/marketplace', category: 'money' },
  { id: 'campaigns', label: 'Kampanie & Sponsorzy', icon: <Building2 size={18} />, path: '/studio/campaigns', category: 'money' },

  { id: 'supporters', label: 'Wspierający', icon: <Users size={18} />, path: '/studio/supporters', category: 'social' },
  { id: 'rewards', label: 'Nagrody & Odznaki', icon: <Medal size={18} />, path: '/studio/rewards', category: 'social' },
  { id: 'feed', label: 'Ekskluzywne Posty', icon: <Rss size={18} />, path: '/studio/feed', category: 'social' },
  { id: 'interactions', label: 'Grywalizacja', icon: <Dices size={18} />, path: '/studio/interactions', category: 'social' },
  { id: 'polls', label: 'Ankiety & Feedback', icon: <Vote size={18} />, path: '/studio/polls', category: 'social' },
  { id: 'events', label: 'Wydarzenia & Drops', icon: <CalendarDays size={18} />, path: '/studio/events', category: 'social' },

  { id: 'crm', label: 'Business CRM', icon: <Contact2 size={18} />, path: '/studio/crm', category: 'business' },
  { id: 'mediakit', label: 'Media Kit AI', icon: <Briefcase size={18} />, path: '/studio/mediakit', category: 'business' },
  { id: 'tax', label: 'Podatki & Raporty', icon: <FileText size={18} />, path: '/studio/tax', category: 'business' },
  { id: 'compliance', label: 'Zgodność (KYC)', icon: <FileBadge size={18} />, path: '/studio/compliance', category: 'business' },
  { id: 'legal', label: 'Centrum Prawne', icon: <Scale size={18} />, path: '/studio/legal', category: 'business' },
  { id: 'governance', label: 'Governance (DAO)', icon: <Gavel size={18} />, path: '/studio/governance', category: 'business' },

  { id: 'distribution', label: 'Distribution Hub', icon: <Share2 size={18} />, path: '/studio/distribution', category: 'dev' },
  { id: 'automation', label: 'Automatyzacja', icon: <Zap size={18} />, path: '/studio/automation', category: 'dev' },
  { id: 'dev', label: 'Dev Center', icon: <Terminal size={18} />, path: '/studio/dev', category: 'dev' },
  { id: 'vault', label: 'Asset Vault', icon: <FolderLock size={18} />, path: '/studio/vault', category: 'dev' },
  { id: 'audit', label: 'Audit Log', icon: <History size={18} />, path: '/studio/audit', category: 'dev' },
  { id: 'team', label: 'Mój Zespół', icon: <UsersRound size={18} />, path: '/studio/team', category: 'dev' },
  { id: 'insights', label: 'Analityka', icon: <LineChart size={18} />, path: '/studio/insights', category: 'dev' },
  { id: 'settings', label: 'Ustawienia', icon: <Settings size={18} />, path: '/studio/settings', category: 'dev' },
];
