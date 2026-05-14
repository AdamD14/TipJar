"use client";


import React, { useState } from 'react';
import { 
  Zap, 
  Webhook, 
  MessageSquare, 
  Code, 
  ChevronRight, 
  Plus, 
  Bot,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

const AutomationPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const apiKey = "tpj_live_8293js92ks02ks82ms";

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Automatyzacja (Webhooks)</h1>
          <p className="text-teal-50 font-medium mt-1">Połącz TipJar+ z Discordem, Telegramem lub własnym API.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-teal-850 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl font-heading">
           <Code size={18} /> Dokumentacja API
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* API KEY CARD (PDF str. 40) */}
        <div className="lg:col-span-4 bg-teal-800 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
           <Zap size={140} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700" />
           <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-bold italic font-heading">Twój Klucz API</h3>
              <p className="text-teal-100 text-xs font-medium leading-relaxed">Używaj tego klucza do autoryzacji zapytań serwerowych. Nigdy nie udostępniaj go publicznie.</p>
              
              <div className="bg-white/5 border border-white/10 rounded-md p-4 flex items-center justify-between">
                 <code className="text-[10px] font-mono text-gold-400 truncate max-w-[150px]">{apiKey}</code>
                 <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-lg transition-colors font-heading">
                    {copied ? <Check size={16} className="text-success-400" /> : <Copy size={16} className="text-teal-100" />}
                 </button>
              </div>
              <button className="w-full py-4 bg-gold-400 text-teal-900 font-bold rounded-md text-[10px] uppercase tracking-widest font-heading">Generuj Nowy Klucz</button>
           </div>
        </div>

        {/* INTEGRATIONS LIST (PDF str. 41) */}
        <div className="lg:col-span-8 space-y-4">
           {[
             { name: 'Discord Integration', desc: 'Automatyczne nadawanie ról po wpłacie.', icon: <MessageSquare className="text-[#5865F2]" />, status: 'Connected', badge: 'Popular' },
             { name: 'Telegram Bot', desc: 'Powiadomienia o nowych tipach na Twoim kanale.', icon: <Bot className="text-[#0088cc]" />, status: 'Setup Required', badge: 'New' },
             { name: 'Custom Webhooks', desc: 'Wysyłaj dane transakcji do własnego endpointu.', icon: <Webhook className="text-[#006D6D]" />, status: '2 Active', badge: 'Advanced' },
           ].map((int, i) => (
             <div key={i} className="bg-teal-800 p-6 rounded-lg border border-teal-700 shadow-sm flex items-center justify-between group hover:border-teal-500 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-md bg-teal-700 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">{int.icon}</div>
                   <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-teal-25 font-heading">{int.name}</h4>
                        <span className="text-[9px] font-bold bg-teal-700 text-teal-100 px-2 py-0.5 rounded-full uppercase tracking-widest">{int.badge}</span>
                      </div>
                      <p className="text-xs text-teal-100 font-medium">{int.desc}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`text-[10px] font-bold uppercase tracking-widest ${int.status === 'Connected' ? 'text-success-500' : 'text-teal-100'}`}>{int.status}</span>
                   <ChevronRight size={20} className="text-teal-100 group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* WEBHOOK LOGS (PDF str. 40) */}
      <div className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-teal-700 flex justify-between items-center">
            <h3 className="font-bold text-xl italic text-teal-25 font-heading">Ostatnie Delivery (Webhook Logs)</h3>
            <button className="text-xs font-bold text-teal-500 uppercase tracking-widest font-heading">Czyść Logi</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead><tr className="bg-teal-700"><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Event</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Status</th><th className="px-8 py-5 text-left text-[10px] font-bold text-teal-100 uppercase tracking-widest">Endpoint</th><th className="px-8 py-5 text-right text-[10px] font-bold text-teal-100 uppercase tracking-widest">Czas</th></tr></thead>
               <tbody className="divide-y divide-teal-700">
                  {[
                    { event: 'tip.received', status: '200 OK', url: 'https://api.mybot.com/webhook', time: '2m temu' },
                    { event: 'subscription.created', status: '200 OK', url: 'https://discord.com/api/webhooks/...', time: '15m temu' },
                    { event: 'tip.received', status: '500 ERR', url: 'https://api.mybot.com/webhook', time: '1h temu' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-teal-700 transition-colors">
                       <td className="px-8 py-6"><code className="text-[10px] font-bold text-teal-500 bg-success-50 px-2 py-1 rounded-md">{log.event}</code></td>
                       <td className="px-8 py-6"><span className={`text-xs font-bold ${log.status.includes('ERR') ? 'text-error-500' : 'text-success-500'}`}>{log.status}</span></td>
                       <td className="px-8 py-6 text-xs text-teal-100 font-mono truncate max-w-[200px]">{log.url}</td>
                       <td className="px-8 py-6 text-right text-xs text-teal-100 font-bold">{log.time}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AutomationPage;
