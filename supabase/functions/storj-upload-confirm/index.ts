// deno-lint-ignore-file
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
      return new Response(
        JSON.stringify({
          error: "Server configuration error: JWT_SECRET missing",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    await jwtVerify(token, new TextEncoder().encode(jwtSecret));

    // Parse body
    const { s3Key, etag } = await req.json();

    if (!s3Key) {
      return new Response(JSON.stringify({ error: "Missing s3Key" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Call NestJS internal confirm
    const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
    const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");

    if (!nestJsUrl || !nestJsKey) {
      console.error(
        "Missing Env Vars: NESTJS_INTERNAL_URL or NESTJS_SECRET_KEY"
      );
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const confirmResponse = await fetch(
      `${nestJsUrl}/media/internal/confirm-upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-API-Key": nestJsKey,
        },
        body: JSON.stringify({ s3Key, etag }),
      }
    );

    if (!confirmResponse.ok) {
      const errorText = await confirmResponse.text();
      console.error("NestJS Confirm Failed:", errorText);
      return new Response(
        JSON.stringify({ error: `Backend confirmation failed: ${errorText}` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const result = await confirmResponse.json();

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
