"use client";

import React, { useRef, useState } from 'react';
import { useWidgetStore } from '@/lib/store/widgetStore';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Copy, Check, FileText, QrCode } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';

export default function WidgetGenerator() {
  const { config } = useWidgetStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const scriptTag = `<script src="https://tipjar.plus/widget.js" data-creator="${config.handle}" data-style="button"></script>`;
  const profileUrl = `https://tipjar.plus/@${config.handle}`;

  const downloadPDF = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    pdf.setFontSize(22);
    pdf.text(`Support @${config.handle}`, 20, 20);
    pdf.addImage(imgData, 'PNG', 20, 30, 100, 100);
    pdf.setFontSize(12);
    pdf.text(profileUrl, 20, 140);
    pdf.save(`${config.handle}_tipjar_promo.pdf`);
  };

  const copyScript = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg flex items-center gap-2">
          <QrCode size={20} className="text-teal-500" />
          Promotional Tools
        </h3>

        <div ref={containerRef} className="p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center gap-4 bg-white">
          <QRCodeSVG value={profileUrl} size={150} level="H" includeMargin />
          <div className="font-mono text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            {profileUrl}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            fullWidth
            onClick={downloadPDF}
          >
            <FileText size={18} /> Download PDF (A4)
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={copyScript}
          >
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
            {copied ? 'Copied' : 'Copy Script'}
          </Button>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 text-slate-300 font-mono text-[10px] break-all border border-slate-800 shadow-inner">
          <div className="text-slate-500 mb-2 font-heading font-bold uppercase tracking-widest">HTML CODE</div>
          {scriptTag}
        </div>
      </div>
    </div>
  );
}
