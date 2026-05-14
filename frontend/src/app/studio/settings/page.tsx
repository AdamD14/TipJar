"use client";

import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Bell, 
  Globe, 
  Smartphone, 
  Check, 
  Trash2, 
  LogOut, 
  Activity, 
  Lock, 
  Monitor,
  CircleDollarSign,
  Languages
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Ustawienia Konta</h1>
        <p className="text-teal-50 font-medium mt-1">Zabezpieczenia, integracje i preferencje Studio.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <nav className="lg:col-span-3 space-y-1">
           {[
             { id: 'security', label: 'Bezpieczeństwo', icon: <Shield size={18} /> },
             { id: 'global', label: 'Globalne & Podatki', icon: <Globe size={18} /> },
             { id: 'activity', label: 'Log Aktywności', icon: <Activity size={18} /> },
             { id: 'integrations', label: 'Integracje', icon: <span className="font-bold">I</span> },
             { id: 'notifications', label: 'Powiadomienia', icon: <Bell size={18} /> },
           ].map(item => (
             <button 
               key={item.id} 
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-3 px-6 py-4 rounded-md font-bold text-sm transition-all ease-standard font-heading ${activeTab === item.id ? 'bg-teal-800 text-gold-400 shadow-xl shadow-black/20' : 'text-teal-100 hover:bg-teal-700 hover:text-teal-25'}`}
             >
               {item.icon}
               {item.label}
             </button>
           ))}
           <div className="pt-10">
             <button className="w-full flex items-center gap-3 px-6 py-4 rounded-md font-bold text-sm text-error-base hover:bg-error-dark transition-all ease-standard"><LogOut size={18} /> Wyloguj się</button>
           </div>
        </nav>

        <div className="lg:col-span-9 space-y-10">
          {activeTab === 'security' && (
             <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm space-y-10 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-bold font-heading text-teal-25 mb-2 italic">Bezpieczeństwo Konta</h3><p className="text-sm text-teal-50 font-medium">Chroń swoje zarobki i dostęp do Creator Studio.</p></div>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-6 bg-teal-700 rounded-lg border border-teal-600">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-md bg-teal-800 border border-teal-600 flex items-center justify-center text-teal-50 shadow-sm"><Smartphone size={24} /></div>
                         <div><p className="text-sm font-bold text-teal-25">Weryfikacja Dwuetapowa (2FA)</p><p className="text-xs text-teal-50 font-medium mt-1">Zalecane dla kont z dużą ilością środków.</p></div>
                      </div>
                      <button className="px-6 py-2.5 bg-success-dark text-success-base rounded-md font-bold text-[10px] uppercase tracking-widest border border-success-base/30 flex items-center gap-2"><Check size={14} /> Aktywne</button>
                   </div>
                   <div className="flex items-center justify-between p-6 bg-teal-700 rounded-lg border border-teal-600">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-md bg-teal-800 border border-teal-600 flex items-center justify-center text-teal-100 shadow-sm"><Key size={24} /></div>
                         <div><p className="text-sm font-bold text-teal-25">Zmiana Hasła</p><p className="text-xs text-teal-50 font-medium mt-1">Ostatnia zmiana: 4 miesiące temu.</p></div>
                      </div>
                      <button className="px-6 py-2.5 bg-teal-800 border border-teal-600 text-teal-50 rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all ease-standard">Zmień</button>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'global' && (
             <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm space-y-10 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-bold font-heading text-teal-25 mb-2 italic">Lokalizacja & Podatki</h3><p className="text-sm text-teal-50 font-medium">Dostosuj TipJar+ do wymogów prawnych Twojego kraju.</p></div>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-teal-100 uppercase tracking-widest flex items-center gap-2"><Languages size={14} /> Język Interfejsu</label>
                      <select className="w-full bg-teal-700 border border-teal-600 rounded-md px-4 py-3 text-sm font-bold outline-none text-teal-25 focus:border-gold-400 transition-all">
                         <option>Polski (PL)</option>
                         <option>English (US)</option>
                         <option>Deutsch (DE)</option>
                         <option>Español (ES)</option>
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-teal-100 uppercase tracking-widest flex items-center gap-2"><CircleDollarSign size={14} /> Waluta Wyświetlania</label>
                      <select className="w-full bg-teal-700 border border-teal-600 rounded-md px-4 py-3 text-sm font-bold outline-none text-teal-25 focus:border-gold-400 transition-all">
                         <option>USDC (Natywna)</option>
                         <option>PLN (Estonowany kurs)</option>
                         <option>EUR (Estymowany kurs)</option>
                      </select>
                   </div>
                </div>
                <div className="p-6 bg-teal-700 rounded-lg border border-teal-600">
                   <div className="flex gap-4">
                      <Globe className="text-teal-50" />
                      <div>
                         <p className="text-sm font-bold font-heading italic text-teal-25">Automatyczny VAT / Sales Tax</p>
                         <p className="text-xs text-teal-50 font-medium leading-relaxed mt-1">Gdy włączone, system doliczy odpowiednią stawkę podatkową na podstawie IP wspierającego. Środki te są gromadzone na osobnym sub-koncie podatkowym.</p>
                         <button className="mt-4 px-6 py-2 bg-teal-600 text-teal-25 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-teal-500 transition-all">Włącz Tax Engine</button>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'activity' && (
             <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-bold font-heading text-teal-25 mb-2 italic">Dziennik Aktywności</h3><p className="text-sm text-teal-50 font-medium">Monitoruj ostatnie logowania i krytyczne akcje.</p></div>
                <div className="space-y-4">
                   {[
                     { event: 'Zlecenie wypłaty', device: 'Chrome / Windows', date: 'Dzisiaj, 10:45', icon: <Lock className="text-teal-50" /> },
                     { event: 'Udane logowanie', device: 'Safari / iPhone', date: 'Dzisiaj, 08:22', icon: <Monitor className="text-teal-100" /> },
                     { event: 'Zmiana ustawień widgetu', device: 'Chrome / Windows', date: 'Wczoraj, 19:30', icon: <Activity className="text-gold-400" /> },
                   ].map((log, i) => (
                     <div key={i} className="flex items-center justify-between p-5 hover:bg-teal-700 rounded-lg transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center">{log.icon}</div>
                           <div><p className="text-sm font-bold text-teal-25">{log.event}</p><p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest">{log.device}</p></div>
                        </div>
                        <span className="text-xs font-bold text-teal-100">{log.date}</span>
                     </div>
                   ))}
                </div>
             </div>
          )}

          {activeTab === 'integrations' && (
             <div className="bg-teal-800 p-8 md:p-10 rounded-lg border border-teal-700 shadow-sm space-y-10 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-bold font-heading text-teal-25 mb-2 italic">Połączone Konta</h3><p className="text-sm text-teal-50 font-medium">Umożliwia automatyczne zaciąganie danych i powiadomienia na streamie.</p></div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="p-6 border-2 border-dashed border-teal-700 rounded-lg flex items-center justify-center gap-3 hover:border-error-base transition-all cursor-pointer group">
                      <span className="text-xs font-bold text-teal-100 uppercase tracking-widest">Połącz YouTube</span>
                   </div>
                </div>
             </div>
          )}

          <div className="p-8 border-2 border-dashed border-error-base/30 rounded-lg bg-error-dark/30 flex items-center justify-between">
             <div><h4 className="font-bold font-heading text-error-base italic">Niebezpieczna strefa</h4><p className="text-xs text-teal-50 font-medium mt-1">Trwałe usunięcie konta i wszystkich danych.</p></div>
             <button className="px-8 py-3 bg-error-base text-teal-25 font-bold rounded-md text-xs uppercase tracking-widest hover:bg-error-base/80 transition-all ease-standard shadow-lg shadow-error-base/20">Usuń Konto</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
