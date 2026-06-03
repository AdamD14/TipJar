
import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  ExternalLink,
  Filter,
  Copy,
  ShieldCheck,
  Zap,
  HelpCircle,
  TrendingDown,
  Download,
  FileText
} from 'lucide-react';
import { Transaction } from '../types';

const mockTransactions: Transaction[] = [
  { id: '1', date: '18 Sie 2025, 14:30', type: 'tip', amount: 5.00, sender: 'User123', message: 'Dzięki za super stream!', status: 'completed' },
  { id: '2', date: '17 Sie 2025, 22:15', type: 'subscription', amount: 15.00, sender: 'Fan456', status: 'completed' },
  { id: '3', date: '15 Sie 2025, 10:00', type: 'withdrawal', amount: -100.00, sender: 'Portfel (Polygon)', status: 'pending' },
  { id: '4', date: '14 Sie 2025, 19:45', type: 'tip', amount: 25.00, sender: 'Alex_V', message: 'Wspieram rozwój kanału!', status: 'completed' },
  { id: '5', date: '12 Sie 2025, 23:55', type: 'tip', amount: 10.00, sender: 'Anonimowy', status: 'completed' },
];

const WalletPage: React.FC = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = (type: 'CSV' | 'PDF') => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(`Wygenerowano raport ${type} (PDF str. 33). Pobieranie rozpocznie się automatycznie.`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Portfel USDC</h1>
          <p className="text-slate-500 font-medium mt-1">Twoje środki są rozliczane bezpośrednio na blockchainie (Web3).</p>
        </div>
        <div className="flex gap-3">
          <button className="px-8 py-3.5 bg-[#4D194D] text-white rounded-2xl font-black flex items-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-black/20 text-xs uppercase tracking-widest">
            Zleć Wypłatę
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#4D194D] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <Wallet size={24} />
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-400/20 text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-400/30 uppercase tracking-widest backdrop-blur-sm">
                  <ShieldCheck size={14} /> On-Chain Verified
                </div>
              </div>
              <div>
                <p className="text-purple-200 text-xs font-black tracking-widest uppercase italic">SALDO DOSTĘPNE</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-black italic tracking-tighter">1,234.50</span>
                  <span className="text-xl font-black text-[#FFD700] italic">USDC</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[10px] text-purple-300 font-black uppercase tracking-widest">Aktywna Sieć</p>
                  <p className="text-sm font-bold text-white flex items-center gap-2"><Zap size={14} className="text-[#FFD700]" /> Polygon Network</p>
                </div>
                <button className="p-3 bg-white/5 rounded-2xl hover:bg-white/15 transition-all border border-white/5"><Copy size={18} /></button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]">
               <Wallet size={240} />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-slate-900"><HelpCircle size={22} className="text-[#4D194D]" /><h3 className="font-black text-lg">Raporty Web3</h3></div>
            <p className="text-sm text-slate-500 leading-relaxed">Zgodność z protokołem Circle & CCTP. Twoje wypłaty są natychmiastowe i bezkosztowe (Gasless).</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleExport('CSV')}
                className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all"
              >
                <FileText size={14} /> CSV
              </button>
              <button 
                onClick={() => handleExport('PDF')}
                className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all"
              >
                <Download size={14} /> PDF
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="font-black text-xl text-slate-800 italic">Blockchain Ledger</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs border border-slate-100 hover:bg-slate-100 transition-all"><Filter size={16} /> Filtruj</button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full">
                <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategoria</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transakcja</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Data</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">USDC Netto</th></tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {mockTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-2xl ${tx.type === 'withdrawal' ? 'bg-[#4D194D]/10 text-[#4D194D]' : 'bg-emerald-50 text-emerald-500'}`}>{tx.type === 'withdrawal' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}</div>
                          <div><p className="text-sm font-black text-slate-800 capitalize italic">{tx.type === 'tip' ? 'Micro-Tip' : tx.type === 'subscription' ? 'Subskrypcja' : 'Payout'}</p></div>
                        </div>
                      </td>
                      <td className="px-8 py-6"><div><p className="text-sm font-bold text-slate-600">{tx.sender}</p>{tx.message && <p className="text-xs text-slate-400 italic mt-1 group-hover:text-slate-500 transition-all">"{tx.message}"</p>}</div></td>
                      <td className="px-8 py-6 text-xs text-slate-400 font-bold">{tx.date}</td>
                      <td className="px-8 py-6 text-right"><p className={`text-lg font-black italic tracking-tighter ${tx.amount < 0 ? 'text-[#4D194D]' : 'text-emerald-600'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}</p></td>
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
