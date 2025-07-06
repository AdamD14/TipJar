import { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';
import { rateLimit } from '../../utils/rateLimiter';

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  if (!rateLimit(ip)) {
    return new Response('Too many requests', { status: 429 });
  }

  const nonce = randomBytes(16).toString('hex');
  return Response.json({ nonce });
}
