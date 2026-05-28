"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Link2, 
  Sparkles,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

export default function FanSettingsPage({
  params,
}: {
  params: { username: string };
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forms state
  const [displayName, setDisplayName] = useState("Premium Backer");
  const [bio, setBio] = useState("Supporting the finest creators across gym, streams, and aesthetics.");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [twitchConnected, setTwitchConnected] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Profile settings successfully updated! ✨");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    setSuccessMsg(is2FAEnabled ? "2FA has been disabled." : "2FA has been successfully enabled! 🔐");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Settings className="text-teal-400" />
              Settings
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed">
              Personalize your display identity, secure your Web3 smart account, or link social accounts.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-2xl flex items-center gap-2.5 shadow-2xl animate-in fade-in duration-300">
            <CheckCircle size={16} className="text-teal-400" />
            <span className="text-xs font-black uppercase tracking-wider">{successMsg}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-teal-500/5 pb-2 overflow-x-auto scrollbar-none">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "security", label: "Security", icon: ShieldCheck },
            { id: "connections", label: "Connections", icon: Link2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all shrink-0 flex items-center gap-2
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-400 text-teal-950 shadow-md shadow-teal-500/10"
                      : "bg-[#002424]/40 border-teal-500/10 text-teal-400/60 hover:border-teal-400/30 hover:text-white"
                  }
                `}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <Card className="border border-teal-500/10 bg-[#002424]/40 rounded-3xl p-6 sm:p-8">
          
          {/* PROFILE FORM */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-black uppercase tracking-wider text-teal-400/80">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-teal-500/10 focus:border-teal-400 rounded-xl focus:outline-none placeholder-teal-800/40 text-white text-xs transition-all shadow-inner font-bold"
                    placeholder="Enter your public display name..."
                    required
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-black uppercase tracking-wider text-teal-400/80">Biography</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/40 border border-teal-500/10 focus:border-teal-400 rounded-xl focus:outline-none placeholder-teal-800/40 text-white text-xs transition-all shadow-inner leading-relaxed"
                    placeholder="Tell creators who you are..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:to-teal-400 text-teal-950 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-teal-500/10 transition-all active:scale-95"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          )}

          {/* SECURITY FORM */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-black/30 border border-teal-500/10 rounded-2xl gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[11px] text-teal-400/60">Adds an extra layer of protection to your USDC wallet authorization flow.</p>
                </div>
                <button
                  onClick={handleToggle2FA}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    is2FAEnabled 
                      ? "bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20"
                      : "bg-teal-500 text-teal-950 border-teal-500 hover:bg-teal-400"
                  }`}
                >
                  {is2FAEnabled ? "Disable" : "Enable"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-black/30 border border-teal-500/10 rounded-2xl gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Active Sessions</h4>
                  <p className="text-[11px] text-teal-400/60">Log out from all other active browser sessions instantly.</p>
                </div>
                <button
                  onClick={() => {
                    setSuccessMsg("Successfully logged out of all other sessions.");
                    setTimeout(() => setSuccessMsg(null), 3000);
                  }}
                  className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                >
                  Log out all
                </button>
              </div>
            </div>
          )}

          {/* CONNECTIONS FORM */}
          {activeTab === "connections" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-black/30 border border-teal-500/10 rounded-2xl gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Google Authenticator</h4>
                  <p className="text-[11px] text-teal-400/60">Link your Google account for quick secure social logins.</p>
                </div>
                <button
                  onClick={() => {
                    setGoogleConnected(!googleConnected);
                    setSuccessMsg(googleConnected ? "Google account unlinked." : "Google account linked successfully!");
                    setTimeout(() => setSuccessMsg(null), 3000);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    googleConnected 
                      ? "bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20"
                      : "bg-teal-500 text-teal-950 border-teal-500 hover:bg-teal-400"
                  }`}
                >
                  {googleConnected ? "Disconnect" : "Connect"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-black/30 border border-teal-500/10 rounded-2xl gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Twitch Streaming Integration</h4>
                  <p className="text-[11px] text-teal-400/60">Unlock special chat perks and support notification overlays on Twitch streams.</p>
                </div>
                <button
                  onClick={() => {
                    setTwitchConnected(!twitchConnected);
                    setSuccessMsg(twitchConnected ? "Twitch disconnected." : "Twitch account connected successfully!");
                    setTimeout(() => setSuccessMsg(null), 3000);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    twitchConnected 
                      ? "bg-teal-500/10 border-teal-500/20 text-teal-400 hover:bg-teal-500/20"
                      : "bg-teal-500 text-teal-950 border-teal-500 hover:bg-teal-400"
                  }`}
                >
                  {twitchConnected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          )}

        </Card>

      </div>
    </div>
  );
}
