// deno-lint-ignore-file
// Unified Edge Functions Server for local development
// Run: deno run --allow-all server.ts

import {
  S3Client,
  PutObjectCommand,
} from "https://esm.sh/@aws-sdk/client-s3@3.529.1";
import { getSignedUrl } from "https://esm.sh/@aws-sdk/s3-request-presigner@3.529.1";
import { jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3005",
  "https://tipjar.plus",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, cookie",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

async function getTokenPayload(req: Request) {
  const authHeader = req.headers.get("authorization");
  let token: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    const cookies = req.headers.get("cookie");
    token = cookies
      ?.split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
  }

  if (!token) throw new Error("Missing access token");

  const jwtSecret = Deno.env.get("JWT_SECRET");
  if (!jwtSecret) throw new Error("Missing JWT_SECRET");

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(jwtSecret)
  );
  return payload;
}

// ===== STORJ PRESIGNED =====
async function handlePresigned(
  req: Request,
  corsHeaders: Record<string, string>
) {
  const payload = await getTokenPayload(req);
  const userId = payload.sub || payload.id;
  if (!userId) throw new Error("Invalid token payload");

  const { fileName, contentType, slotId } = await req.json();
  if (!fileName || !contentType || slotId === undefined) {
    return new Response(JSON.stringify({ error: "Missing file details" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const S3 = new S3Client({
    region: "auto",
    endpoint: Deno.env.get("STORJ_ENDPOINT") || "https://gateway.storjshare.io",
    credentials: {
      accessKeyId: Deno.env.get("STORJ_ACCESS_KEY") ?? "",
      secretAccessKey: Deno.env.get("STORJ_SECRET_KEY") ?? "",
    },
  });

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

  // Call NestJS reserve-slot (non-blocking)
  const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
  const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");
  if (nestJsUrl && nestJsKey) {
    try {
      await fetch(`${nestJsUrl}/media/internal/reserve-slot`, {
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
      });
    } catch (e) {
      console.warn("NestJS reserve unreachable:", e);
    }
  }

  return new Response(
    JSON.stringify({
      uploadUrl: signedUrl,
      key,
      expiresAt: timestamp + 900000,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    }
  );
}

// ===== STORJ UPLOAD CONFIRM =====
async function handleConfirm(
  req: Request,
  corsHeaders: Record<string, string>
) {
  await getTokenPayload(req); // Validate JWT

  const { s3Key, etag } = await req.json();
  if (!s3Key) {
    return new Response(JSON.stringify({ error: "Missing s3Key" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
  const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");
  const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME") || "domizoghk";

  if (nestJsUrl && nestJsKey) {
    try {
      const res = await fetch(`${nestJsUrl}/media/internal/confirm-upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-API-Key": nestJsKey,
        },
        body: JSON.stringify({ s3Key, etag }),
      });
      if (res.ok) {
        const result = await res.json();
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    } catch (e) {
      console.warn("NestJS confirm unreachable:", e);
    }
  }

  // Fallback
  const publicUrl = `https://res.cloudinary.com/${cloudName}/image/upload/tipjar-avatar/${s3Key}`;
  return new Response(
    JSON.stringify({ publicUrl, id: s3Key, status: "confirmed_edge_only" }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    }
  );
}

// ===== MAIN SERVER =====
Deno.serve({ port: 8000 }, async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const url = new URL(req.url);
  const path = url.pathname;

  try {
    if (path.endsWith("/storj-presigned")) {
      return await handlePresigned(req, corsHeaders);
    } else if (path.endsWith("/storj-upload-confirm")) {
      return await handleConfirm(req, corsHeaders);
    } else {
      return new Response(JSON.stringify({ error: "Not found", path }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Edge error:", err.message);
    const isAuth = err.message.includes("token");
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: isAuth ? 401 : 500,
    });
  }
});

console.log("🚀 Edge Functions running on http://localhost:8000");
console.log("   - POST /storj-presigned");
console.log("   - POST /storj-upload-confirm");
