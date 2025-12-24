import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { jwtVerify } from "jose";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { slotId, fileName, contentType } = await req.json();

    // 1. Walidacja Slotów
    if (slotId < 0 || slotId > 2) {
      throw new Error("Invalid slotId. Must be between 0 and 2.");
    }

    // 2. Bezpieczeństwo Tokena
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Missing token");
    }

    const secret = new TextEncoder().encode(Deno.env.get("JWT_SECRET"));
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub;

    const S3 = new S3Client({
      endpoint: Deno.env.get("STORJ_ENDPOINT"),
      region: "global",
      forcePathStyle: true,
      credentials: {
        accessKeyId: Deno.env.get("STORJ_ACCESS_KEY")!,
        secretAccessKey: Deno.env.get("STORJ_SECRET_KEY")!,
      },
    });

    const s3Key = `avatars/${userId}/${slotId}/${Date.now()}-${fileName}`;
    const publicUrl = `${Deno.env.get("STORJ_PUBLIC_URL_PREFIX")}/${s3Key}`;

    const reservePromise = fetch(
      `${Deno.env.get("NESTJS_INTERNAL_URL")}/api/v1/media/reserve-slot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-API-Key": Deno.env.get("NESTJS_SECRET_KEY")!,
        },
        body: JSON.stringify({ userId, slotId, s3Key, publicUrl }),
      },
    );

    // @ts-ignore: EdgeRuntime is a global available in Supabase Edge Functions
    EdgeRuntime.waitUntil(reservePromise);

    const command = new PutObjectCommand({
      Bucket: Deno.env.get("STORJ_BUCKET"),
      Key: s3Key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 900 });

    return new Response(
      JSON.stringify({ uploadUrl: signedUrl, key: s3Key, publicUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders }, status: 400 },
    );
  }
});
