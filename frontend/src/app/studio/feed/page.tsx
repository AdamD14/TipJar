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
          <h1 className="font-heading text-4xl font-bold text-teal-25 tracking-tight italic">Ekskluzywny Feed</h1>
          <p className="text-teal-50 font-medium mt-1">Publikuj treści dostępne tylko dla Twoich wspierających.</p>
        </div>
        <button className="font-heading flex items-center gap-2 px-6 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20">
           <Plus size={18} /> Nowy Post
        </button>
      </div>

      {/* COMPOSER (PDF str. 20) */}
      <div className="bg-teal-800 p-6 rounded-lg border border-teal-700 shadow-sm space-y-4">
         <textarea 
           value={postText}
           onChange={(e) => setPostText(e.target.value)}
           placeholder="Podziel się czymś z fanami..."
           className="w-full h-24 bg-teal-700 border-none focus:ring-2 focus:ring-teal-500/20 rounded-md p-4 text-sm font-medium resize-none"
         />
         <div className="flex justify-between items-center">
            <div className="flex gap-2">
               <button className="p-3 bg-teal-700 hover:bg-teal-600 rounded-md text-teal-100 transition-colors"><ImageIcon size={20} /></button>
               <button className="p-3 bg-teal-700 hover:bg-teal-600 rounded-md text-teal-100 transition-colors"><Video size={20} /></button>
               <button className="p-3 bg-teal-700 hover:bg-teal-600 rounded-md text-teal-100 transition-colors"><FileText size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
               <select className="bg-teal-700 border-none text-[10px] font-bold uppercase tracking-widest text-teal-500 rounded-full px-4 py-2 cursor-pointer outline-none">
                  <option>Dla wszystkich wspierających</option>
                  <option>Tylko próg Silver+</option>
                  <option>Tylko próg Gold</option>
               </select>
               <button className="font-heading px-8 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs flex items-center gap-2 hover:bg-teal-500 transition-all">
                  <Send size={16} /> Opublikuj
               </button>
            </div>
         </div>
      </div>

      <div className="space-y-8">
         <h3 className="font-heading font-bold text-teal-100 text-xs uppercase tracking-[0.3em] flex items-center gap-4">
            Ostatnie Aktywności <div className="h-px bg-teal-700 flex-1" />
         </h3>

         {MOCK_POSTS.map(post => (
           <div key={post.id} className="bg-teal-800 rounded-lg border border-teal-700 shadow-sm overflow-hidden group">
              <div className="p-6 md:p-8 space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-md bg-teal-700 overflow-hidden border-2 border-white shadow-sm"><img src="https://picsum.photos/100/100" alt="" /></div>
                       <div>
                          <p className="text-sm font-bold text-teal-25">Alex Streamer <span className="mx-2 text-teal-100 font-normal">•</span> <span className="text-xs text-teal-100 font-bold uppercase tracking-widest">{post.date}</span></p>
                          <div className="flex items-center gap-1.5 mt-0.5 px-2 py-0.5 bg-teal-600/10 text-teal-500 w-fit rounded-full">
                             <Lock size={10} />
                             <span className="text-[9px] font-bold uppercase tracking-widest">{post.visibility} Only</span>
                          </div>
                       </div>
                    </div>
                    <button className="p-2 text-teal-100 hover:text-teal-50 transition-colors"><MoreHorizontal size={20} /></button>
                 </div>

                 <p className="text-teal-50 leading-relaxed font-medium">{post.text}</p>
                 
                 {post.type === 'image' && <div className="aspect-video bg-teal-700 rounded-lg overflow-hidden border border-teal-700"><img src="https://picsum.photos/800/450" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" /></div>}

                 <div className="pt-6 border-t border-teal-700 flex items-center gap-6">
                    <button className="flex items-center gap-2 text-xs font-bold text-teal-100 hover:text-teal-500 transition-colors"><MessageSquare size={18} /> {post.comments} Komentarzy</button>
                    <button className="flex items-center gap-2 text-xs font-bold text-teal-100 hover:text-rose-500 transition-colors"><Eye size={18} /> {post.likes} Reakcji</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default FeedPage;
