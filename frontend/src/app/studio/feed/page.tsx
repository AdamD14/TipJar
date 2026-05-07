"use client";


import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Send, 
  Lock, 
  Eye, 
  MoreHorizontal,
  Plus,
  MessageSquare
} from 'lucide-react';

const MOCK_POSTS = [
  { id: 1, type: 'image', text: 'Pierwsze szkice nowego projektu logo! Co sądzicie o turkusowym akcencie?', date: '2h temu', likes: 24, comments: 12, visibility: 'Subscribers' },
  { id: 2, type: 'text', text: 'Specjalny podcast dla Mecenasów już na Discordzie! Zapraszam do odsłuchu.', date: 'Wczoraj', likes: 12, comments: 4, visibility: 'Elite' },
];

const FeedPage: React.FC = () => {
  const [postText, setPostText] = useState("");

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Ekskluzywny Feed</h1>
          <p className="text-slate-500 font-medium mt-1">Publikuj treści dostępne tylko dla Twoich wspierających.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#006D6D] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#006D6D]/20">
           <Plus size={18} /> Nowy Post
        </button>
      </div>

      {/* COMPOSER (PDF str. 20) */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
         <textarea 
           value={postText}
           onChange={(e) => setPostText(e.target.value)}
           placeholder="Podziel się czymś z fanami..."
           className="w-full h-24 bg-slate-50 border-none focus:ring-2 focus:ring-[#006D6D]/20 rounded-[1.5rem] p-4 text-sm font-medium resize-none"
         />
         <div className="flex justify-between items-center">
            <div className="flex gap-2">
               <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><ImageIcon size={20} /></button>
               <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><Video size={20} /></button>
               <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><FileText size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
               <select className="bg-slate-50 border-none text-[10px] font-black uppercase tracking-widest text-[#006D6D] rounded-full px-4 py-2 cursor-pointer outline-none">
                  <option>Dla wszystkich wspierających</option>
                  <option>Tylko próg Silver+</option>
                  <option>Tylko próg Gold</option>
               </select>
               <button className="px-8 py-3 bg-[#006D6D] text-white rounded-xl font-black text-xs flex items-center gap-2 hover:bg-[#005a5a] transition-all">
                  <Send size={16} /> Opublikuj
               </button>
            </div>
         </div>
      </div>

      <div className="space-y-8">
         <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.3em] flex items-center gap-4">
            Ostatnie Aktywności <div className="h-px bg-slate-100 flex-1" />
         </h3>

         {MOCK_POSTS.map(post => (
           <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group">
              <div className="p-6 md:p-8 space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm"><img src="https://picsum.photos/100/100" alt="" /></div>
                       <div>
                          <p className="text-sm font-black text-slate-900">Alex Streamer <span className="mx-2 text-slate-300 font-normal">•</span> <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{post.date}</span></p>
                          <div className="flex items-center gap-1.5 mt-0.5 px-2 py-0.5 bg-[#006D6D]/5 text-[#006D6D] w-fit rounded-full">
                             <Lock size={10} />
                             <span className="text-[9px] font-black uppercase tracking-widest">{post.visibility} Only</span>
                          </div>
                       </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={20} /></button>
                 </div>

                 <p className="text-slate-700 leading-relaxed font-medium">{post.text}</p>
                 
                 {post.type === 'image' && <div className="aspect-video bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-50"><img src="https://picsum.photos/800/450" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" /></div>}

                 <div className="pt-6 border-t border-slate-50 flex items-center gap-6">
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#006D6D] transition-colors"><MessageSquare size={18} /> {post.comments} Komentarzy</button>
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-rose-500 transition-colors"><Eye size={18} /> {post.likes} Reakcji</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default FeedPage;
