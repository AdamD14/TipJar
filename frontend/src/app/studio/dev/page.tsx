"use client";

import React, { useState } from 'react';
import { 
  Terminal, 
  Code, 
  Webhook, 
  Zap, 
  Copy, 
  Check, 
  ExternalLink, 
  Play, 
  RefreshCcw,
  BookOpen,
  Settings2
} from 'lucide-react';

const DevCenterPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'api' | 'webhooks' | 'sandbox'>('api');
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippet = `
fetch('https://api.tipjar.plus/v1/tips', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
}).then(res => res.json());
  `.trim();

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Dev Center</h1>
          <p className="text-teal-50 font-medium mt-1">Narzędzia API i Webhooks dla zaawansowanych integracji.</p>
        </div>
        <div className="flex p-1.5 bg-teal-700 rounded-md gap-1">
          {['api', 'webhooks', 'sandbox'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-teal-800 text-teal-25 shadow-lg' : 'text-teal-100 hover:text-teal-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           {/* CODE PLAYGROUND */}
           <div className="bg-teal-850 rounded-lg shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-8 border-b border-teal-700 flex justify-between items-center bg-teal-850">
                 <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                       <div className="w-3 h-3 rounded-full bg-error-500" />
                       <div className="w-3 h-3 rounded-full bg-amber-500" />
                       <div className="w-3 h-3 rounded-full bg-success-base" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-50 uppercase tracking-[0.3em] ml-4">TipJar+ API v1 / cURL Example</span>
                 </div>
                 <button onClick={() => handleCopy(codeSnippet)} className="text-teal-50 hover:text-teal-25 transition-colors">
                    {copied ? <Check size={18} className="text-success-500" /> : <Copy size={18} />}
                 </button>
              </div>
              <div className="p-10 flex-1 font-mono text-sm leading-relaxed text-[#DDE0DA]">
                 <pre className="no-scrollbar overflow-x-auto">
                    <code>{codeSnippet}</code>
                 </pre>
              </div>
              <div className="p-8 bg-white/5 border-t border-white/5 flex justify-between items-center">
                 <p className="text-xs text-teal-50 font-bold">Wszystkie żądania muszą być wysyłane przez HTTPS.</p>
                 <button className="flex items-center gap-2 font-bold font-heading text-xs text-gold-400 uppercase tracking-widest hover:underline">
                    Pełna dokumentacja <ExternalLink size={14} />
                 </button>
              </div>
           </div>

           {/* WEBHOOK TESTER */}
           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                 <h3 className="text-xl font-bold font-heading text-teal-25 italic">Webhook Simulator</h3>
                 <button className="px-6 py-2.5 bg-teal-700 text-teal-50 rounded-md font-bold font-heading text-[10px] uppercase tracking-widest border border-teal-700 flex items-center gap-2">
                    <Play size={14} /> Testuj Endpoint
                 </button>
              </div>
              <p className="text-sm text-teal-100 font-medium leading-relaxed">System wyśle testowy payload `tip.received` na Twój aktywny adres URL, abyś mógł zweryfikować logikę serwerową.</p>
              <div className="p-6 bg-teal-700 rounded-lg border border-teal-700 font-mono text-[10px] text-teal-50">
                 POST https://my-server.com/hooks/tipjar <br/>
                 Payload: {"{ \"type\": \"tip.received\", \"amount\": 10.00, \"currency\": \"USDC\" }"}
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-teal-600 p-8 rounded-lg text-teal-25 shadow-2xl space-y-8 relative overflow-hidden group">
              <Terminal size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                 <h3 className="text-xl font-bold font-heading italic">Developer Beta</h3>
                 <p className="text-success-100 text-sm font-medium leading-relaxed mt-4">
                    Jako użytkownik Pro masz dostęp do prywatnych endpointów Gemini AI, które pozwalają budować własne boty czatu na bazie Twojego Gemini Brain.
                 </p>
                 <button className="mt-8 px-6 py-3 bg-teal-700 text-teal-25 rounded-md font-bold font-heading text-[10px] uppercase tracking-widest w-full">Zapisz się do Bety</button>
              </div>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h3 className="font-bold font-heading text-teal-25 text-sm uppercase tracking-widest">Twoje Webhooki</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Discord Bot', status: 'Healthy' },
                   { name: 'Local Analytics', status: 'Retry-Wait' }
                 ].map((w, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-teal-700 rounded-md border border-teal-700">
                      <span className="text-xs font-bold text-teal-50">{w.name}</span>
                      <span className={`text-[9px] font-bold uppercase ${w.status === 'Healthy' ? 'text-success-500' : 'text-amber-500'}`}>{w.status}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 border-2 border-dashed border-teal-700 rounded-md text-[10px] font-bold font-heading uppercase text-teal-100 hover:border-teal-500 hover:text-teal-500 transition-all">+ Dodaj Endpoint</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DevCenterPage;
