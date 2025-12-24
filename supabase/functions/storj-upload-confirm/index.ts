// deno-lint-ignore-file
import { jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3005",
  "https://tipjar.plus"
];
function getCorsHeaders(req) {
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, cookie",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin"
  };
}
Deno.serve(async (req)=>{
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204
    });
  }
  try {
    // Pobranie tokena z nagłówka Authorization lub z ciasteczka (fallback)
    const authHeader = req.headers.get("authorization");
    let token;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      // Fallback: cookie (dla same-origin requests)
      const cookies = req.headers.get("cookie");
      token = cookies?.split("; ").find((row)=>row.startsWith("access_token="))?.split("=")[1];
    }
    if (!token) {
      return new Response(JSON.stringify({
        error: "Missing access token (Authorization header or cookie)"
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 401
      });
    }
    // Weryfikacja JWT
    const jwtSecret = Deno.env.get("JWT_SECRET");
    if (!jwtSecret) {
      return new Response(JSON.stringify({
        error: "Server configuration error: JWT_SECRET missing"
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 500
      });
    }
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    // Parse body
    const { s3Key, etag } = await req.json();
    if (!s3Key) {
      return new Response(JSON.stringify({
        error: "Missing s3Key"
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 400
      });
    }
    // Call NestJS internal confirm (non-blocking for dev)
    const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
    const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");
    const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME") || "domizoghk";
    if (nestJsUrl && nestJsKey) {
      try {
        const confirmResponse = await fetch(`${nestJsUrl}/media/internal/confirm-upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Internal-API-Key": nestJsKey
          },
          body: JSON.stringify({
            s3Key,
            etag
          })
        });
        if (confirmResponse.ok) {
          const result = await confirmResponse.json();
          return new Response(JSON.stringify(result), {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            },
            status: 200
          });
        }
        console.warn("NestJS Confirm Failed (non-blocking):", await confirmResponse.text());
      } catch (e) {
        console.warn("NestJS Confirm unreachable (dev mode ok):", e);
      }
    }
    // Fallback: Return Cloudinary URL directly (for dev when NestJS unreachable)
    const publicUrl = `https://res.cloudinary.com/${cloudName}/image/upload/tipjar-avatar/${s3Key}`;
    return new Response(JSON.stringify({
      publicUrl,
      id: s3Key,
      status: "confirmed_edge_only"
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 200
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({
      error: errorMessage
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 400
    });
  }
});
