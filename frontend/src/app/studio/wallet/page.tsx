"use client";

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Filter,
  Copy,
  ShieldCheck,
  Zap,
  HelpCircle,
  Download,
  FileText
} from 'lucide-react';

const mockTransactions = [
  { id: '1', date: '18 Sie 2025, 14:30', type: 'tip', amount: 5.00, sender: 'User123', message: 'Dzięki za super stream!', status: 'completed' },
  { id: '2', date: '17 Sie 2025, 22:15', type: 'subscription', amount: 15.00, sender: 'Fan456', status: 'completed' },
  { id: '3', date: '15 Sie 2025, 10:00', type: 'withdrawal', amount: -100.00, sender: 'Portfel (Polygon)', status: 'pending' },
  { id: '4', date: '14 Sie 2025, 19:45', type: 'tip', amount: 25.00, sender: 'Alex_V', message: 'Wspieram rozwój kanału!', status: 'completed' },
  { id: '5', date: '12 Sie 2025, 23:55', type: 'tip', amount: 10.00, sender: 'Anonimowy', status: 'completed' },
];

const WalletPage: React.FC = () => {

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold font-heading text-teal-25 tracking-tight italic">Portfel USDC</h1>
          <p className="text-teal-50 font-medium mt-1">Twoje środki są rozliczane bezpośrednio na blockchainie (Web3).</p>
        </div>
        <div className="flex gap-3">
          <button className="px-8 py-3.5 bg-purple-300 text-teal-25 rounded-md font-bold flex items-center gap-2 hover:bg-purple-400 transition-all ease-standard shadow-xl shadow-black/20 text-xs uppercase tracking-widest">
            Zleć Wypłatę
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-purple-300 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-teal-25/10 rounded-md backdrop-blur-md border border-teal-25/10">
                  <Wallet size={24} />
                </div>
                <div className="flex items-center gap-1.5 bg-success-dark text-success-base text-[10px] font-black px-3 py-1.5 rounded-md border border-success-base/30 uppercase tracking-widest backdrop-blur-sm">
                  <ShieldCheck size={14} /> On-Chain Verified
                </div>
              </div>
              <div>
                <p className="text-teal-50 text-xs font-black tracking-widest uppercase italic">SALDO DOSTĘPNE</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-bold font-heading italic tracking-tighter">1,234.50</span>
                  <span className="text-xl font-bold text-gold-400 italic">USDC</span>
                </div>
              </div>
              <div className="pt-6 border-t border-teal-25/10 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[10px] text-teal-50 font-black uppercase tracking-widest">Aktywna Sieć</p>
                  <p className="text-sm font-bold text-teal-25 flex items-center gap-2"><Zap size={14} className="text-gold-400" /> Polygon Network</p>
                </div>
                <button className="p-3 bg-teal-25/5 rounded-md hover:bg-teal-25/15 transition-all ease-standard border border-teal-25/10"><Copy size={18} /></button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-all ease-standard duration-[2000ms]">
               <Wallet size={240} />
            </div>
          </div>

          <div className="bg-teal-800 backdrop-blur-xl p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-teal-25"><HelpCircle size={22} className="text-purple-300" /><h3 className="font-bold font-heading text-lg">Raporty Web3</h3></div>
            <p className="text-sm text-teal-50 leading-relaxed">Zgodność z protokołem Circle & CCTP. Twoje wypłaty są natychmiastowe i bezkosztowe (Gasless).</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-teal-700 text-teal-50 rounded-md font-bold text-[10px] uppercase tracking-widest border border-teal-600 hover:bg-teal-600 transition-all ease-standard">
                <FileText size={14} /> CSV
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-teal-700 text-teal-50 rounded-md font-bold text-[10px] uppercase tracking-widest border border-teal-600 hover:bg-teal-600 transition-all ease-standard">
                <Download size={14} /> PDF
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-teal-800 backdrop-blur-xl rounded-lg border border-teal-700 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-8 border-b border-teal-700 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-bold font-heading text-xl text-teal-25 italic">Blockchain Ledger</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-teal-50 rounded-md font-bold text-xs border border-teal-600 hover:bg-teal-600 transition-all ease-standard"><Filter size={16} /> Filtruj</button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full">
                <thead><tr className="bg-teal-700/50"><th className="px-8 py-5 text-left text-[10px] font-black text-teal-100 uppercase tracking-[0.2em]">Kategoria</th><th className="px-8 py-5 text-left text-[10px] font-black text-teal-100 uppercase tracking-[0.2em]">Transakcja</th><th className="px-8 py-5 text-left text-[10px] font-black text-teal-100 uppercase tracking-[0.2em]">Data</th><th className="px-8 py-5 text-right text-[10px] font-black text-teal-100 uppercase tracking-[0.2em]">USDC Netto</th></tr></thead>
                <tbody className="divide-y divide-teal-700">
                  {mockTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-teal-700/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-md ${tx.type === 'withdrawal' ? 'bg-purple-300/10 text-purple-300' : 'bg-success-dark text-success-base'}`}>{tx.type === 'withdrawal' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}</div>
                          <div><p className="text-sm font-bold text-teal-25 capitalize italic">{tx.type === 'tip' ? 'Micro-Tip' : tx.type === 'subscription' ? 'Subskrypcja' : 'Payout'}</p></div>
                        </div>
                      </td>
                      <td className="px-8 py-6"><div><p className="text-sm font-bold text-teal-50">{tx.sender}</p>{tx.message && <p className="text-xs text-teal-100 italic mt-1 group-hover:text-teal-50 transition-all">"{tx.message}"</p>}</div></td>
                      <td className="px-8 py-6 text-xs text-teal-100 font-bold">{tx.date}</td>
                      <td className="px-8 py-6 text-right"><p className={`text-lg font-bold font-heading italic tracking-tighter ${tx.amount < 0 ? 'text-error-base' : 'text-success-base'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}</p></td>
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

export default WalletPage;
