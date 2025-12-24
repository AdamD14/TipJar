import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { jwtVerify } from "jose";

// 1. Definicja nagłówków CORS (Inline dla pewności)
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://10.255.255.254:3000",
];

interface MyJWTPayload {
  sub: string;
  role?: string;
  email?: string;
  [key: string]: unknown;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin)
      ? origin
      : "http://localhost:3000",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, cookie",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };
  // 2. Obsługa Preflight musi być PIERWSZA
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      throw new Error(
        `Method ${req.method} not allowed. Only POST is supported.`,
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      throw new Error("Request body is empty or invalid JSON");
    }
    const { slotId, fileName, contentType } = body;

    // Walidacja Slotów
    if (slotId < 0 || slotId > 2) {
      throw new Error("Invalid slotId. Must be between 0 and 2.");
    }

    // 3. Bezpieczeństwo Tokena (Header + Cookie Fallback)
    const authHeader = req.headers.get("Authorization");
    let token = authHeader?.replace("Bearer ", "");

    // Jeśli brak w headerze, szukaj w ciasteczkach
    if (!token) {
      const cookies = req.headers.get("cookie");
      token = cookies?.split("; ").find((row) =>
        row.trim().startsWith("access_token=")
      )?.split("=")[1];
    }

    if (!token) {
      throw new Error("Missing token (Header & Cookie check failed)");
    }

    const secret = Deno.env.get("JWT_SECRET");
    if (!secret) {
      throw new Error("Missing JWT_SECRET in environment");
    }
    const encoder = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, encoder);
    const claims = payload as unknown as MyJWTPayload;
    const userId = claims.sub;

    // 4. Konfiguracja S3 (Storj)
    const storjEndpoint = Deno.env.get("STORJ_ENDPOINT");
    const storjAccessKey = Deno.env.get("STORJ_ACCESS_KEY");
    const storjSecretKey = Deno.env.get("STORJ_SECRET_KEY");
    const storjPublicUrlPrefix = Deno.env.get("STORJ_PUBLIC_URL_PREFIX");
    const storjBucket = Deno.env.get("STORJ_BUCKET");

    if (
      !storjEndpoint || !storjAccessKey || !storjSecretKey ||
      !storjPublicUrlPrefix || !storjBucket
    ) {
      throw new Error("Missing STORJ configuration in environment");
    }

    const S3 = new S3Client({
      endpoint: storjEndpoint,
      region: "global",
      forcePathStyle: true,
      credentials: {
        accessKeyId: storjAccessKey,
        secretAccessKey: storjSecretKey,
      },
    });

    const s3Key = `avatars/${userId}/${slotId}/${Date.now()}-${fileName}`;
    const publicUrl = `${storjPublicUrlPrefix}/${s3Key}`;

    // 5. Rezerwacja Slotu w NestJS
    const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
    const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");

    if (!nestJsUrl || !nestJsKey) {
      throw new Error("Missing NestJS configuration in Edge Function");
    }

    const reserveResponse = await fetch(
      `${nestJsUrl}/api/v1/media/reserve-slot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-API-Key": nestJsKey,
        },
        body: JSON.stringify({
          userId,
          slotId,
          s3Key,
          publicUrl,
        }),
      },
    );

    if (!reserveResponse.ok) {
      const errorText = await reserveResponse.text();
      throw new Error(`NestJS Reserve Failed: ${errorText}`);
    }

    // 6. Generowanie Presigned URL
    const command = new PutObjectCommand({
      Bucket: storjBucket,
      Key: s3Key,
      ContentType: contentType,
      ACL: "public-read",
    });

    const signedUrl = await getSignedUrl(S3, command, {
      expiresIn: 900,
    });

    return new Response(
      JSON.stringify({
        uploadUrl: signedUrl,
        key: s3Key,
        publicUrl,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }
});
