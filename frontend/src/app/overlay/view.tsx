"use client";
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = { creator:string; theme:'dark'|'light'|'gold'; pos:'TR'|'TL'|'BR'|'BL'; showQr:boolean; duration:number; };
type TipEvt = { id:string; from?:string; amount:number; note?:string; ts?:string };

export default function OverlayClient({ creator, theme, pos, showQr, duration }: Props){
  const [queue,setQueue]=useState<TipEvt[]>([]);
  const wsRef = useRef<WebSocket|null>(null);

  useEffect(()=>{
    let closed=false, pollTimer: any=null, sse: EventSource | null = null;

    try {
      const base = process.env.NEXT_PUBLIC_API_URL || '';
      const wsUrl = base ? `${base.replace(/^http/,'ws')}/ws/overlay?creator=${encodeURIComponent(creator)}` : '';
      if (wsUrl) {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
        ws.onmessage = (ev)=> { try { const msg = JSON.parse(ev.data); if (msg.type==='tip') setQueue(q=>[...q, msg.data as TipEvt]); } catch {} };
        ws.onerror = ()=>{ ws.close(); };
        ws.onclose = ()=>{
          if (closed) return;
          const devUrl = base ? `${base}/api/v1/overlay/stream?creator=${encodeURIComponent(creator)}` : `/api/dev/overlay/stream?creator=${encodeURIComponent(creator)}`;
          sse = new EventSource(devUrl);
          sse.onmessage = (e)=>{ try{ const msg=JSON.parse(e.data); if (msg.type==='tip') setQueue(q=>[...q, msg.data as TipEvt]); }catch{} };
          sse.onerror = ()=>{
            sse?.close();
            pollTimer = setInterval(async ()=>{
              try {
                const poll = base ? `${base}/api/v1/overlay/pending?creator=${encodeURIComponent(creator)}` : '';
                if (!poll) return;
                const res = await fetch(poll, { cache:'no-store' });
                const items: TipEvt[] = await res.json();
                if (Array.isArray(items) && items.length) setQueue(q=>[...q, ...items]);
              } catch {}
            }, 3000);
          };
        };
      }
    } catch { /* ignore */ }

    return ()=>{ closed=true; wsRef.current?.close(); sse?.close(); if (pollTimer) clearInterval(pollTimer); };
  }, [creator]);

  const current = useMemo(()=> queue[0], [queue]);
  useEffect(()=>{
    if (!current) return;
    const t = setTimeout(()=> setQueue(q=>q.slice(1)), duration);
    return ()=> clearTimeout(t);
  }, [current, duration]);

  const posStyle = pos==='TR' ? {top:16,right:16} : pos==='TL'? {top:16,left:16} : pos==='BR'? {bottom:16,right:16} : {bottom:16,left:16};
  const themeClass = theme==='gold' ? 'bg-[#FFD700] text-[#003737]' : (theme==='light' ? 'bg-white text-[#003737]' : 'bg-white/10 text-white');

  return (
    <div className="relative w-screen h-screen" style={{ background:'transparent' }}>
      {!current ? null : (
        <div className={`rounded-2xl px-6 py-4 shadow-xl`} style={{ position:'absolute', ...posStyle }}>
          <div className={`rounded-2xl px-5 py-3 ${themeClass}`}>
            <div className="text-sm opacity-80">@{creator}</div>
            <div className="text-2xl font-extrabold leading-tight">+{current.amount.toFixed(2)} USDC</div>
            {current.note && <div className="text-sm opacity-80 mt-1 max-w-xs line-clamp-2">“{current.note}”</div>}
            {showQr && (
              <div className="text-[11px] opacity-75 mt-2">tipjar.plus/@{creator}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

