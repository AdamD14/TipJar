"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function TwitchConnect() {
  const [connected] = useState<boolean>(false);

  const handleConnect = () => {
    window.location.href = "/api/v1/auth/twitch";
  };

  return (
    <div className="rounded-xl border border-white/[0.05] bg-teal-800 p-4 shadow-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/twitch-logo.svg" alt="Twitch" width={24} height={24} />
          <div>
            <div className="font-heading font-semibold text-text-ds-primary">
              Twitch
            </div>
            <div className="font-body text-sm text-text-ds-tertiary">
              {connected ? "Connected" : "Not connected"}
            </div>
          </div>
        </div>
        {connected ? (
          <Button variant="ghost" size="sm">
            Disconnect
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={handleConnect}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
