// deno-lint-ignore-file
import {
  S3Client,
  PutObjectCommand,
} from "https://esm.sh/@aws-sdk/client-s3@3.485.0";
import { getSignedUrl } from "https://esm.sh/@aws-sdk/s3-request-presigner@3.485.0";
import { jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, cookie",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Pobranie tokena z nagłówka Authorization lub z ciasteczka (fallback)
    const authHeader = req.headers.get("authorization");
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      // Fallback: cookie (dla same-origin requests)
      const cookies = req.headers.get("cookie");
      token = cookies
        ?.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];
    }

    if (!token) {
      return new Response(
        JSON.stringify({
          error: "Missing access token (Authorization header or cookie)",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Weryfikacja JWT
    const jwtSecret = Deno.env.get("JWT_SECRET");
    if (!jwtSecret) {
      console.error("Missing JWT_SECRET in Edge Function secrets");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecret)
    );

    const userId = payload.sub || payload.id;
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Invalid token payload: missing userId" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Pobranie danych z body
    const { fileName, contentType, slotId } = await req.json();

    if (!fileName || !contentType || slotId === undefined) {
      return new Response(
        JSON.stringify({
          error: "Missing file details (fileName, contentType, slotId)",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Konfiguracja S3 (Storj)
    const S3 = new S3Client({
      region: "auto",
      endpoint:
        Deno.env.get("STORJ_ENDPOINT") || "https://gateway.storjshare.io",
      credentials: {
        accessKeyId: Deno.env.get("STORJ_ACCESS_KEY") ?? "",
        secretAccessKey: Deno.env.get("STORJ_SECRET_KEY") ?? "",
      },
    });

    // Generowanie klucza i presigned URL
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `avatars/${userId}/${slotId}/${timestamp}_${sanitizedFileName}`;

    const command = new PutObjectCommand({
      Bucket: Deno.env.get("STORJ_BUCKET"),
      Key: key,
      ContentType: contentType,
      ACL: "public-read",
    });

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 900 });

    // Rezerwacja slotu w NestJS
    const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
    const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");

    if (nestJsUrl && nestJsKey) {
      const reserveResponse = await fetch(
        `${nestJsUrl}/media/internal/reserve-slot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Internal-API-Key": nestJsKey,
          },
          body: JSON.stringify({
            userId,
            slotId,
            s3Key: key,
            fileName,
            contentType,
            fileSize: 0,
          }),
        }
      );

      if (!reserveResponse.ok) {
        console.error("NestJS Reserve Failed:", await reserveResponse.text());
        return new Response(
          JSON.stringify({ error: "Failed to reserve upload slot" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          }
        );
      }
    }

    // Przewidywany Cloudinary URL
    const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME");
    const mappingPrefix = "tipjar-avatar";
    const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${mappingPrefix}/${key}`;

    return new Response(
      JSON.stringify({
        uploadUrl: signedUrl,
        key: key,
        publicUrl: cloudinaryUrl,
        expiresAt: timestamp + 900 * 1000,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Edge Function Error:", err.message);

    const isAuthError =
      err.message.includes("token") || err.message.includes("access_token");
    const status = isAuthError ? 401 : 500;

    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: status,
    });
  }
});
