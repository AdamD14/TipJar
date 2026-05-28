"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { 
  Music, 
  Play, 
  Pause, 
  Coins, 
  Sparkles, 
  Volume2, 
  Search,
  ShoppingCart
} from "lucide-react";

const SOUNDS = [
  {
    id: 1,
    title: "Chilled Synthwave Intro",
    creator: "@alex_beats",
    category: "Background Beats",
    duration: "2:45",
    price: "2.00",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: 2,
    title: "Vip Club Stream Alert Theme",
    creator: "@kate_premium",
    category: "Stream Overlay Sound",
    duration: "0:12",
    price: "5.00",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    id: 3,
    title: "Gym Power Workout Hype Track",
    creator: "@coach_max",
    category: "Lofi / Hardstyle",
    duration: "4:10",
    price: "3.50",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
  }
];

export default function FanTylPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [purchasedMsg, setPurchasedMsg] = useState<string | null>(null);

  const togglePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const handleBuy = (title: string, price: string) => {
    setPurchasedMsg(`Successfully unlocked "${title}" for $${price} USDC! 🎵🎉`);
    setTimeout(() => setPurchasedMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Music className="text-teal-400 animate-bounce" />
              Beats & Audio Overlay Shop
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed">
              Unlock premium background music, custom stream alerts, and audio overlay soundbites using USDC.
            </p>
          </div>
        </div>

        {/* Purchased Toast */}
        {purchasedMsg && (
          <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-2xl flex items-center gap-2.5 shadow-2xl animate-in fade-in duration-300">
            <Sparkles size={16} className="text-teal-400 animate-spin" />
            <span className="text-xs font-black uppercase tracking-wider">{purchasedMsg}</span>
          </div>
        )}

        {/* Beats Audio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOUNDS.map((sound) => (
            <Card
              key={sound.id}
              className="border border-teal-500/10 bg-[#002424]/40 hover:border-teal-400/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400">
                  {sound.category}
                </span>

                <h3 className="text-sm font-black text-white mt-4">{sound.title}</h3>

                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={sound.avatar}
                    alt={sound.creator}
                    className="w-5 h-5 rounded-full border border-teal-400/20 object-cover"
                  />
                  <span className="text-xs text-teal-400 font-mono font-semibold">{sound.creator}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-teal-500/5 flex items-center justify-between">
                <button
                  onClick={() => togglePlay(sound.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    playingId === sound.id
                      ? "bg-teal-400 text-teal-950 scale-105"
                      : "bg-[#002424] text-teal-400 border border-teal-500/20 hover:scale-105"
                  }`}
                >
                  {playingId === sound.id ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[9px] text-teal-400/40 block font-bold uppercase tracking-wider">Price</span>
                    <span className="text-xs font-black text-white font-mono">${sound.price} USDC</span>
                  </div>

                  <button
                    onClick={() => handleBuy(sound.title, sound.price)}
                    className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-teal-950 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                    title="Purchase audio"
                  >
                    <ShoppingCart size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Unlock</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
