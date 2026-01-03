"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TwitchConnect() {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/v1/auth/twitch/status")
      .then((r) => r.json())
      .then((s) => setConnected(!!s.connected))
      .catch(() => {});
  }, []);

  const handleConnect = () => {
    window.location.href = "/api/v1/auth/twitch";
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/twitch-logo.svg" alt="Twitch" width={24} height={24} />
          <div>
            <div className="font-medium text-white">Twitch</div>
            <div className="text-sm text-white/60">
              {connected ? "Connected" : "Not connected"}
            </div>
          </div>
        </div>
        {connected ? (
          <button className="px-3 py-2 rounded-lg border border-white/15 text-sm text-gray-300 hover:bg-white/5">
            Disconnect
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="px-4 py-2 rounded-lg bg-[#9146FF] text-white text-sm font-medium hover:bg-[#7c3aed]"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
