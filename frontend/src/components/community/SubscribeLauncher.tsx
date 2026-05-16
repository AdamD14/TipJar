"use client";

import { useState } from "react";
import Button from "@/components/ui/buttons/Button";
import SubscribeModal, { TierPub } from "./SubscribeModal";

export default function SubscribeLauncher({
  username,
  tiers,
}: {
  username: string;
  tiers: TierPub[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" size="md" onClick={() => setOpen(true)}>
        Subscribe
      </Button>
      <SubscribeModal
        username={username}
        tiers={tiers}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
