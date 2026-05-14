"use client";


import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Download, 
  Share2, 
  Sparkles, 
  BarChart3, 
  Users, 
  TrendingUp, 
  FileText,
  Mail,
  Copy,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MediaKitPage: React.FC = () => {
  const [brandPitch, setBrandPitch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateAIPitch = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Napisz profesjonalny Brand Pitch (2 zdania) dla twórcy krypto-streamera o imieniu Alex, który ma 248 subskrybentów i 88% pozytywnego sentymentu. Podkreśl lojalność społeczności.",
      });
      setBrandPitch(response.text || "Alex to lider opinii w niszy Web3, którego społeczność wykazuje rekordową lojalność. Z 88% pozytywnym sentymentem, Twoja marka zyska autentyczny głos w świecie krypto.");
    } catch {
      setBrandPitch("Twoja marka zasługuje na autentyczne dotarcie. Moja społeczność to 248 zaangażowanych subskrybentów, którzy ufają moim rekomendacjom.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { generateAIPitch(); }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-teal-25 tracking-tight italic font-heading">Media Kit AI</h1>
          <p className="text-teal-50 font-medium mt-1">Automatycznie wygenerowana wizytówka Twojego kanału dla marek.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-800 border border-teal-700 rounded-md font-bold text-xs text-teal-50 hover:bg-teal-700 transition-all font-heading">
             <Share2 size={18} /> Udostępnij Link
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-teal-25 rounded-md font-bold text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 font-heading">
             <Download size={18} /> Eksportuj PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           {/* PROFESSIONAL OVERVIEW */}
           <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5"><Briefcase size={150} /></div>
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-lg bg-teal-700 border-4 border-white shadow-xl overflow-hidden"><img src="https://picsum.photos/200/200" alt="Avatar" /></div>
                    <div>
                       <h2 className="text-3xl font-bold text-teal-25 italic font-heading">Alex Streamer</h2>
                       <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-teal-600/10 text-teal-500 rounded-full text-[9px] font-bold uppercase tracking-widest">Web3 Creator</span>
                          <span className="px-3 py-1 bg-[#FFD700]/10 text-[#A27A00] rounded-full text-[9px] font-bold uppercase tracking-widest">Finance Expert</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-teal-700 p-8 rounded-lg border border-teal-700 italic font-medium text-teal-50 leading-relaxed">
                   "{loading ? "Gemini generuje Twój pitch..." : brandPitch}"
                 </div>

                 <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 bg-teal-700 rounded-lg border border-teal-700">
                       <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-1">Total Reach</p>
                       <h4 className="text-2xl font-bold italic font-heading">12.5k</h4>
                    </div>
                    <div className="p-6 bg-teal-700 rounded-lg border border-teal-700">
                       <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-1">Engagement</p>
                       <h4 className="text-2xl font-bold italic font-heading">14.2%</h4>
                    </div>
                    <div className="p-6 bg-teal-700 rounded-lg border border-teal-700">
                       <p className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-1">Sentiment AI</p>
                       <h4 className="text-2xl font-bold italic text-success-600 font-heading">88%</h4>
                    </div>
                 </div>
              </div>
           </div>

           {/* AUDIENCE INSIGHTS */}
           <div className="bg-teal-800 p-10 rounded-lg border border-teal-700 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-teal-25 italic flex items-center gap-2 font-heading"><Users size={22} className="text-teal-500" /> Demografia Społeczności</h3>
              <div className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-teal-100 uppercase tracking-widest">Wiek Widzów</p>
                    {[
                      { label: '18-24', val: '45%' },
                      { label: '25-34', val: '38%' },
                      { label: '35+', val: '17%' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1.5">
                         <div className="flex justify-between text-[10px] font-bold text-teal-50 uppercase"><span>{item.label}</span><span>{item.val}</span></div>
                         <div className="h-2 bg-teal-700 rounded-full overflow-hidden"><div className="h-full bg-teal-600" style={{ width: item.val }} /></div>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-teal-100 uppercase tracking-widest">Główne Regiony</p>
                    {['Polska', 'USA', 'Niemcy', 'Wlk. Brytania'].map((c, i) => (
                      <div key={i} className="flex justify-between items-center text-xs font-bold text-teal-50 p-3 bg-teal-700 rounded-md">
                         <span>{c}</span>
                         <TrendingUp size={14} className="text-success-500" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-teal-850 p-8 rounded-lg text-teal-25 shadow-2xl relative overflow-hidden group">
              <Sparkles size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 italic text-gold-400 font-heading">Media Kit Verified</h3>
              <p className="text-sm text-teal-100 leading-relaxed font-medium">Te dane są weryfikowane przez protokół TipJar+ bezpośrednio z blockchaina i API platform społecznościowych. Brand ma 100% pewności, że Twoje statystyki są prawdziwe.</p>
           </div>

           <div className="bg-teal-800 p-8 rounded-lg border border-teal-700 shadow-sm space-y-6">
              <h3 className="font-bold text-teal-25 italic font-heading">Pakiety Współpracy</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Shoutout', price: '250 USDC' },
                   { name: 'Stream Sponsor', price: '1,500 USDC' },
                   { name: 'Long-term Partner', price: '5,000+ USDC' },
                 ].map((pkg, i) => (
                   <div key={i} className="flex justify-between items-center p-4 border border-teal-700 rounded-md hover:border-teal-500 cursor-pointer transition-all">
                      <span className="text-xs font-bold text-teal-50">{pkg.name}</span>
                      <span className="text-sm font-bold italic text-teal-500">{pkg.price}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-teal-850 text-teal-25 font-bold rounded-md text-[10px] uppercase tracking-widest hover:bg-black transition-all font-heading">Dodaj Pakiet</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MediaKitPage;
