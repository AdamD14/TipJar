"use client";
import { useRef } from "react";
// @ts-expect-error - QRGenerator component has dynamic props that TypeScript cannot verify
import QRGenerator from "@/components/QRGenerator";

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
      <div className="rounded-xl border border-white/10 p-4 bg-white/5">
        <QRGenerator value={url} onCanvasReady={onQrReady} />
      </div>
      <div className="flex gap-2">
        <button
          onClick={downloadPng}
          className="px-3 py-2 rounded-lg bg-[#FFD700] text-[#003737] font-semibold text-sm"
        >
          Download PNG
        </button>
        <button
          onClick={downloadPdf}
          className="px-3 py-2 rounded-lg border border-white/15 text-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
