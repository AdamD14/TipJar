"use client";
import { useEffect, useState } from 'react';

export default function TwitchConnect() {
  const [connected, setConnected] = useState<boolean>(false);
  useEffect(() => {
    fetch('/api/v1/auth/twitch/status')
      .then((r) => r.json())
      .then((s) => setConnected(!!s.connected))
      .catch(() => {});
  }, []);
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Twitch</div>
          <div className="text-sm text-white/60">{connected ? 'Connected' : 'Not connected'}</div>
        </div>
        {connected ? (
          <button className="px-3 py-2 rounded-lg border border-white/15 text-sm">Disconnect</button>
        ) : (
          <a href="/api/v1/auth/twitch" className="px-3 py-2 rounded-lg bg-[#9146FF] text-white text-sm">
            Connect Twitch
          </a>
        )}
      </div>
    </div>
  );
}

