import QRCode from 'qrcode';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle') ?? 'creator';
  const url = `https://tipjar.plus/@${handle}`;
  try {
    const png = await QRCode.toBuffer(url, { width: 256 });
    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Failed to generate QR', { status: 500 });
  }
}
