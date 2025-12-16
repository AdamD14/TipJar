import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { jwtVerify } from "jose";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zmiana: Używamy natywnego Deno.serve zamiast importu z std
Deno.serve(async (req) => {
  // 1. Obsługa CORS (Preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Walidacja Nagłówka
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];

    // 3. Lokalna Weryfikacja JWT (Shared Secret)
    const jwtSecret = Deno.env.get('JWT_SECRET');
    if (!jwtSecret) {
      console.error('Missing JWT_SECRET in Edge Function secrets');
      throw new Error('Server configuration error');
    }

    // Weryfikacja podpisu tokena
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret)
    );

    const userId = payload.sub || payload.id;
    if (!userId) throw new Error('Invalid token payload: missing userId');

    // 4. Pobranie danych z body
    const { fileName, contentType, slotId } = await req.json();
    
    if (!fileName || !contentType || slotId === undefined) {
      throw new Error('Missing file details (fileName, contentType, slotId)');
    }

    // 5. Konfiguracja Klienta S3 (Storj)
    const S3 = new S3Client({
      region: 'auto',
      endpoint: Deno.env.get('STORJ_ENDPOINT') || 'https://gateway.storjshare.io',
      credentials: {
        accessKeyId: Deno.env.get('STORJ_ACCESS_KEY') ?? '',
        secretAccessKey: Deno.env.get('STORJ_SECRET_KEY') ?? '',
      },
    });

    // 6. Generowanie Klucza i Presigned URL
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `avatars/${userId}/${slotId}/${timestamp}_${sanitizedFileName}`;

    const command = new PutObjectCommand({
      Bucket: Deno.env.get('STORJ_BUCKET'),
      Key: key,
      ContentType: contentType,
    });

    // URL ważny przez 15 minut
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 900 });

    // 7. Przewidywany URL Cloudinary
    const cloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME');
    const mappingPrefix = 'tipjar-avatar';
    const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${mappingPrefix}/${key}`;

    return new Response(
      JSON.stringify({
        uploadUrl: signedUrl,
        key: key,
        publicUrl: cloudinaryUrl,
        expiresAt: timestamp + 900 * 1000,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error('Edge Function Error:', error.message);
    
    const status = (error.code === 'ERR_JWS_INVALID' || error.message.includes('token')) ? 401 : 500;

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: status,
    });
  }
});