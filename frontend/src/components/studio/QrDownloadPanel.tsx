"use client";

import { useRef } from "react";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
// @ts-expect-error - QRGenerator component has dynamic props that TypeScript cannot verify
import QRGenerator from "@/components/studio/QRGenerator";

export default function QrDownloadPanel({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onQrReady = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  };

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
        <QRGenerator value={url} onCanvasReady={onQrReady} />
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
