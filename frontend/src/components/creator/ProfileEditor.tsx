"use client";
import { useState } from "react";

export default function ProfileEditor() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Display name</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Website (optional)</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" value={website} onChange={(e)=>setWebsite(e.target.value)} />
      </label>
      <label className="block md:col-span-2">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Bio</span>
        <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" rows={4} value={bio} onChange={(e)=>setBio(e.target.value)} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Avatar URL</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" value={avatar} onChange={(e)=>setAvatar(e.target.value)} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-[#DDE0DA]">Cover URL</span>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" value={banner} onChange={(e)=>setBanner(e.target.value)} />
      </label>
      <button type="button" className="mt-2 w-fit rounded-xl bg-gradient-to-r from-[#002828] to-[#007474] px-5 py-3 font-semibold text-white">Save profile</button>
    </form>
  );
}

