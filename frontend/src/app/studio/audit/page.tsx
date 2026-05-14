"use client";

import React from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowRight, 
  Lock, 
  Smartphone, 
  Globe, 
  Zap,
  Activity
} from 'lucide-react';

const AUDIT_LOGS = [
  { id: 1, action: 'Wypłata środków', user: 'Alex (Właściciel)', amount: '500 USDC', time: '10:45', status: 'Success', icon: <Zap className="text-teal-500" /> },
  { id: 2, action: 'Zmiana uprawnień zespołu', user: 'Alex (Właściciel)', detail: 'Karol Mod -> Manager', time: '09:12', status: 'Success', icon: <Lock className="text-teal-100" /> },
  { id: 3, action: 'Logowanie z nowego urządzenia', user: 'Marek Editor', detail: 'Safari / MacOS / Poznań', time: 'Wczoraj', status: 'Verified', icon: <Smartphone className="text-gold-400" /> },
  { id: 4, action: 'Zmiana linku Webhook', user: 'Alex (Właściciel)', detail: 'api.discord.com/...', time: 'Wczoraj', status: 'Success', icon: <Activity className="text-teal-100" /> },
];

const SecurityAuditPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Audit Log</h1>
          <p className="text-teal-50 font-medium mt-1">Pełna historia operacji krytycznych na Twoim koncie.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-100" />
              <input type="text" placeholder="Szukaj zdarzenia..." className="bg-teal-800 border border-teal-700 rounded-md pl-12 pr-6 py-3 text-xs font-bold focus:outline-none focus:border-teal-500 w-64 shadow-sm" />
           </div>
           <button className="p-3 bg-teal-800 border border-teal-700 rounded-md text-teal-50 hover:bg-teal-700 shadow-sm"><Filter size={20} /></button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* SUMMARY STATS */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl space-y-6 relative overflow-hidden">
              <ShieldCheck size={80} className="absolute -bottom-4 -right-4 opacity-10" />
              <p className="text-[10px] font-bold text-success-400 uppercase tracking-widest mb-1">BEZPIECZEŃSTWO KONTA</p>
              <h3 className="text-3xl font-bold font-heading italic">100% OK</h3>
              <p className="text-xs text-teal-100 font-medium leading-relaxed">Brak nieautoryzowanych prób logowania w ciągu ostatnich 30 dni.</p>
           </div>
           
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h4 className="font-bold font-heading text-sm uppercase tracking-widest text-teal-25">Uwierzytelnianie</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-xs font-bold text-teal-50">
                    <span>2FA Status</span>
                    <span className="text-success-500">Włączone</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-bold text-teal-50">
                    <span>Zaufane IP</span>
                    <span className="text-teal-100">4 aktywne</span>
                 </div>
              </div>
              <button className="w-full py-4 bg-teal-700 text-teal-50 font-bold font-heading rounded-md text-[10px] uppercase tracking-widest">Zarządzaj Dostępem</button>
           </div>
        </div>

        {/* LOG TABLE */}
        <div className="lg:col-span-3">
           <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-teal-700">
                 <h3 className="font-bold font-heading text-xl italic text-teal-25">Ostatnie Zdarzenia</h3>
              </div>
              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Zdarzenie</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Użytkownik</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Szczegóły</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-widest">Czas</th></tr></thead>
                    <tbody className="divide-y divide-teal-700">
                       {AUDIT_LOGS.map(log => (
                         <tr key={log.id} className="hover:bg-teal-700/50 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-md bg-teal-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">{log.icon}</div>
                                 <span className="text-sm font-bold text-teal-25">{log.action}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-xs font-bold text-teal-50">{log.user}</p>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-[10px] font-bold text-teal-100 font-mono italic">{log.detail || log.amount}</p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <span className="text-xs font-bold text-teal-100">{log.time}</span>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditPage;
