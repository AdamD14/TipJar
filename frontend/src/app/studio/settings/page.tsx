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
        <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Ustawienia Konta</h1>
        <p className="text-slate-500 font-medium mt-1">Zabezpieczenia, integracje i preferencje Studio.</p>
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
               className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === item.id ? 'bg-[#003737] text-white shadow-xl shadow-[#003737]/20' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
             >
               {item.icon}
               {item.label}
             </button>
           ))}
           <div className="pt-10">
             <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm text-rose-500 hover:bg-rose-50 transition-all"><LogOut size={18} /> Wyloguj się</button>
           </div>
        </nav>

        <div className="lg:col-span-9 space-y-10">
          {activeTab === 'security' && (
             <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-black text-slate-900 mb-2 font-black italic">Bezpieczeństwo Konta</h3><p className="text-sm text-slate-400 font-medium">Chroń swoje zarobki i dostęp do Creator Studio.</p></div>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#006D6D] shadow-sm"><Smartphone size={24} /></div>
                         <div><p className="text-sm font-black text-slate-800">Weryfikacja Dwuetapowa (2FA)</p><p className="text-xs text-slate-400 font-medium mt-1">Zalecane dla kont z dużą ilością środków.</p></div>
                      </div>
                      <button className="px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-[10px] uppercase tracking-widest border border-emerald-100 flex items-center gap-2"><Check size={14} /> Aktywne</button>
                   </div>
                   <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="flex gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm"><Key size={24} /></div>
                         <div><p className="text-sm font-black text-slate-800">Zmiana Hasła</p><p className="text-xs text-slate-400 font-medium mt-1">Ostatnia zmiana: 4 miesiące temu.</p></div>
                      </div>
                      <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Zmień</button>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'global' && (
             <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-black text-slate-900 mb-2 font-black italic">Lokalizacja & Podatki (PDF str. 42-43)</h3><p className="text-sm text-slate-400 font-medium">Dostosuj TipJar+ do wymogów prawnych Twojego kraju.</p></div>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Languages size={14} /> Język Interfejsu</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#006D6D]">
                         <option>Polski (PL)</option>
                         <option>English (US)</option>
                         <option>Deutsch (DE)</option>
                         <option>Español (ES)</option>
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><CircleDollarSign size={14} /> Waluta Wyświetlania</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#006D6D]">
                         <option>USDC (Natywna)</option>
                         <option>PLN (Estonowany kurs)</option>
                         <option>EUR (Estymowany kurs)</option>
                      </select>
                   </div>
                </div>
                <div className="p-6 bg-[#006D6D]/5 rounded-3xl border border-[#006D6D]/10">
                   <div className="flex gap-4">
                      <Globe className="text-[#006D6D]" />
                      <div>
                         <p className="text-sm font-black italic">Automatyczny VAT / Sales Tax</p>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Gdy włączone, system doliczy odpowiednią stawkę podatkową na podstawie IP wspierającego. Środki te są gromadzone na osobnym sub-koncie podatkowym.</p>
                         <button className="mt-4 px-6 py-2 bg-[#006D6D] text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Włącz Tax Engine</button>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'activity' && (
             <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-black text-slate-900 mb-2 italic">Dziennik Aktywności (PDF str. 17)</h3><p className="text-sm text-slate-400 font-medium">Monitoruj ostatnie logowania i krytyczne akcje.</p></div>
                <div className="space-y-4">
                   {[
                     { event: 'Zlecenie wypłaty', device: 'Chrome / Windows', date: 'Dzisiaj, 10:45', icon: <Lock className="text-[#006D6D]" /> },
                     { event: 'Udane logowanie', device: 'Safari / iPhone', date: 'Dzisiaj, 08:22', icon: <Monitor className="text-slate-400" /> },
                     { event: 'Zmiana ustawień widgetu', device: 'Chrome / Windows', date: 'Wczoraj, 19:30', icon: <Activity className="text-[#FFD700]" /> },
                   ].map((log, i) => (
                     <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">{log.icon}</div>
                           <div><p className="text-sm font-black text-slate-800">{log.event}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.device}</p></div>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{log.date}</span>
                     </div>
                   ))}
                </div>
             </div>
          )}

          {activeTab === 'integrations' && (
             <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 animate-in slide-in-from-right-4 duration-300">
                <div><h3 className="text-xl font-black text-slate-900 mb-2 italic">Połączone Konta</h3><p className="text-sm text-slate-400 font-medium">Umożliwia automatyczne zaciąganie danych i powiadomienia na streamie.</p></div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="p-6 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center gap-3 hover:border-[#FF0000] transition-all cursor-pointer group">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Połącz YouTube</span>
                   </div>
                </div>
             </div>
          )}

          <div className="p-8 border-2 border-dashed border-rose-100 rounded-[3rem] bg-rose-50/30 flex items-center justify-between">
             <div><h4 className="font-black text-rose-500 italic">Niebezpieczna strefa</h4><p className="text-xs text-slate-400 font-medium mt-1">Trwałe usunięcie konta i wszystkich danych.</p></div>
             <button className="px-8 py-3 bg-rose-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20">Usuń Konto</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
