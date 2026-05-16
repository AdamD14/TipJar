"use client";

import { useState } from "react";
import Button from "@/components/ui/buttons/Button";
import TipModal from "./TipModal";

export default function TipLauncher({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
        Tip USDC
      </Button>
      <TipModal
        username={username}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
