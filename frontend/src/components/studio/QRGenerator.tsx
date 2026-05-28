"use client";

import React, { useState, Suspense } from "react";
import clsx from "clsx";
import Input from "@/components/ui/forms/Input";
import Button from "@/components/ui/buttons/Button";
import Spinner from "@/components/ui/Spinner";

const QRCode = React.lazy(() =>
  import("react-qrcode-logo").then((m) => ({ default: m.QRCode })),
);

export default function QRGenerator() {
  const [profileUrl, setProfileUrl] = useState("");
  const [qrValue, setQrValue] = useState<string>();
  const [fgColor, setFgColor] = useState("#003737");
  const [bgColor, setBgColor] = useState("#ffffff");

  const handleGenerate = () => {
    if (!profileUrl.trim()) return;
    setQrValue(profileUrl.trim());
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full max-w-sm mx-auto">
      <Input
        value={profileUrl}
        placeholder="Profile link"
        onChange={(e) => setProfileUrl(e.target.value)}
      />

      <div className="flex flex-row gap-4 w-full items-center">
        <div className="flex flex-col gap-1">
          <span className="font-body text-sm text-text-ds-secondary">
            QR color
          </span>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-10 w-20 rounded-md bg-teal-800 border border-teal-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-body text-sm text-text-ds-secondary">
              Background
            </span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-20 rounded-md bg-teal-800 border border-teal-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-app"
            />
        </div>
      </div>

      <Button variant="tertiary" fullWidth onClick={handleGenerate}>
        Generate
      </Button>

      {qrValue && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-56">
              <Spinner size="md" />
            </div>
          }
        >
          <QRCode
            value={qrValue}
            size={220}
            bgColor={bgColor}
            fgColor={fgColor}
            logoImage="/assets/tipit.png"
            logoWidth={80}
            logoHeight={80}
            logoPadding={2}
            logoPaddingStyle="square"
            ecLevel="H"
            enableCORS
          />
        </Suspense>
      )}
    </div>
  );
}
