
import React from 'react';
import { 
  FolderLock, 
  Search, 
  Plus, 
  FileImageIcon, 
  FileVideo, 
  FileAudio, 
  MoreVertical, 
  Download, 
  Trash2,
  Clock,
  ShieldCheck,
  HardDrive
} from 'lucide-react';

const ASSETS = [
  { name: 'Logo_Main_Trans.png', type: 'image', size: '2.4 MB', date: '10.08', version: 'v2.1' },
  { name: 'Stream_Intro_Final.mp4', type: 'video', size: '45 MB', date: '05.08', version: 'v1.0' },
  { name: 'Alert_Sound_USDC.wav', type: 'audio', size: '0.8 MB', date: 'Wczoraj', version: 'v1.2' },
  { name: 'Brand_Guidelines.pdf', type: 'doc', size: '1.2 MB', date: '01.08', version: 'v1.0' },
];

const AssetVaultPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Asset Vault</h1>
          <p className="text-slate-500 font-medium mt-1">Bezpieczne miejsce na Twoje logotypy, overlaye i multimedia.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-2">
              <Plus size={18} /> Nowy Folder
           </button>
           <button className="px-8 py-3.5 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
              Wgraj Plik
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* STORAGE STATS */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-[#0a0f10] p-8 rounded-[2.5rem] text-white shadow-2xl space-y-8 relative overflow-hidden group">
              <HardDrive size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Wykorzystanie Miejsca</p>
                 <h3 className="text-3xl font-black italic">1.2 <span className="text-sm opacity-50">/ 10 GB</span></h3>
                 <div className="h-2 bg-white/5 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[12%]" />
                 </div>
                 <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest">Plan: Pro Studio</p>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-800">Kategorie</h4>
              <div className="space-y-2">
                 {[
                   { label: 'Grafiki (UI)', count: 42, color: 'text-blue-500' },
                   { label: 'Video (Clips)', count: 12, color: 'text-rose-500' },
                   { label: 'Audio (Alerts)', count: 8, color: 'text-[#006D6D]' },
                 ].map((cat, i) => (
                   <button key={i} className="w-full flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                      <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900">{cat.label}</span>
                      <span className="text-xs font-black text-slate-400">{cat.count}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* FILE EXPLORER */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <div className="relative w-64">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input type="text" placeholder="Szukaj pliku..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none" />
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600"><Clock size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600"><ShieldCheck size={20} /></button>
                 </div>
              </div>

              <div className="overflow-x-auto flex-1">
                 <table className="w-full">
                    <thead><tr className="bg-slate-50/50"><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Nazwa Pliku</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Wersja</th><th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rozmiar</th><th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {ASSETS.map((file, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#006D6D] transition-all">
                                    {file.type === 'image' ? <FileImageIcon size={20} /> : file.type === 'video' ? <FileVideo size={20} /> : <FileAudio size={20} />}
                                 </div>
                                 <span className="text-sm font-black text-slate-800">{file.name}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[9px] font-black text-slate-400 uppercase">{file.version}</span>
                           </td>
                           <td className="px-8 py-6 text-xs font-bold text-slate-400">{file.size}</td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Download size={16} /></button>
                                 <button className="p-2 hover:bg-rose-50 rounded-lg text-rose-400"><Trash2 size={16} /></button>
                                 <div className="w-px h-4 bg-slate-200" />
                                 <span className="text-xs font-bold text-slate-400">{file.date}</span>
                              </div>
                              <span className="text-xs font-bold text-slate-400 group-hover:hidden">{file.date}</span>
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

export default AssetVaultPage;
