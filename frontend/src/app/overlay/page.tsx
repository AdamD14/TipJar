// Server Component: przekazuje searchParams do klienta
import OverlayClient from './view';

export default function OverlayPage({ searchParams }:{
  searchParams: { [k:string]: string | string[] | undefined }
}){
  const creator = String(searchParams.creator || '').replace(/^@/,'');
  const theme = (searchParams.theme==='light' || searchParams.theme==='gold') ? String(searchParams.theme) : 'dark';
  const posVal = String(searchParams.pos || 'TR');
  const pos = (['TR','TL','BR','BL'] as const).includes(posVal as any) ? posVal : 'TR';
  const showQr = String(searchParams.qr||'1') !== '0';
  const duration = Math.max(2000, Math.min(10000, Number(searchParams.dur||5000)));

  return (
    <html>
      <body style={{ margin:0, background:'transparent' }}>
        <OverlayClient creator={creator} theme={theme as any} pos={pos as any} showQr={showQr} duration={duration}/>
      </body>
    </html>
  );
}

