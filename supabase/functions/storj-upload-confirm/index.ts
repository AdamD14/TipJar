import { jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://10.255.255.254:3000",
];

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
    // 2. Pobierz Token (Header lub Cookie)
    const authHeader = req.headers.get("authorization");
    let token;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      const cookies = req.headers.get("cookie");
      token = cookies?.split("; ").find((row) =>
        row.trim().startsWith("access_token=")
      )?.split("=")[1];
    }

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing access token" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // 3. Weryfikacja JWT (dla pewności, że to user woła)
    const jwtSecret = Deno.env.get("JWT_SECRET");
    if (!jwtSecret) {
      throw new Error("Missing JWT_SECRET in environment");
    }
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));

    // 4. Pobierz body
    const { s3Key, etag } = await req.json();
    if (!s3Key) {
      return new Response(JSON.stringify({ error: "Missing s3Key" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // 5. Wywołaj NestJS Confirm (Sync/Async handled by NestJS)
    const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
    const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");

    if (!nestJsUrl || !nestJsKey) {
      throw new Error("Missing NestJS configuration");
    }

    // FIX PATH: /api/v1/media/confirm-upload
    const confirmResponse = await fetch(
      `${nestJsUrl}/api/v1/media/confirm-upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-API-Key": nestJsKey,
        },
        body: JSON.stringify({
          s3Key,
          etag,
        }),
      },
    );

    if (!confirmResponse.ok) {
      const errorText = await confirmResponse.text();
      throw new Error(`NestJS Confirm Failed: ${errorText}`);
    }

    const result = await confirmResponse.json();

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
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
        status: 400, // lub 401/500 w zależności od błędu
      },
    );
  }
});
