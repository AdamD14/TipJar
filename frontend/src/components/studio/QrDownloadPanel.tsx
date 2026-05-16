"use client";

import { useRef, useCallback, useState, Suspense } from "react";
import Button from "@/components/ui/buttons/Button";
import Spinner from "@/components/ui/Spinner";
import React from "react";

const QRCode = React.lazy(() =>
  import("react-qrcode-logo").then((m) => ({ default: m.QRCode })),
);

export default function QrDownloadPanel({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fgColor] = useState("#003737");
  const [bgColor] = useState("#ffffff");

  const setCanvasRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const canvas = el.querySelector("canvas");
    if (canvas) canvasRef.current = canvas;
  }, []);

  const downloadPng = () => {
    const c = canvasRef.current;
    if (!c) return;
    const link = document.createElement("a");
    link.download = "tipjar-qr.png";
    link.href = c.toDataURL("image/png");
    link.click();
  };

  const downloadPdf = async () => {
    const c = canvasRef.current;
    if (!c) return;
    const w = window.open("", "_blank");
    if (!w) return;
    const img = c.toDataURL("image/png");
    w.document.write(`
<html><head><title>QR A4</title></head>
<body style="margin:0; display:flex; align-items:center; justify-content:center; height:100vh;">
<img src="${img}" style="width:300px;height:300px"/>
</body></html>
`);
    w.document.close();
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/[0.05] p-4 bg-teal-850">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-56">
              <Spinner size="md" />
            </div>
          }
        >
          <div ref={setCanvasRef}>
            <QRCode
              value={url}
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
          </div>
        </Suspense>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={downloadPng}>
          Download PNG
        </Button>
        <Button variant="secondary" size="sm" onClick={downloadPdf}>
          Download PDF
        </Button>
      </div>
    </div>
  );
}
