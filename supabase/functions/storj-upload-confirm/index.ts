// deno-lint-ignore-file
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, cookie",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  /* 2. API Key Validation */
  const apikey =
    req.headers.get("apikey") || new URL(req.url).searchParams.get("apikey");

  if (!apikey) {
    return new Response(
      JSON.stringify({
        message: "No API key found in request",
        hint: "No `apikey` request header or url param was found.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      }
    );
  }

  const expectedAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (expectedAnonKey && apikey !== expectedAnonKey) {
    return new Response(JSON.stringify({ message: "Invalid API key" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 401,
    });
  }

  try {
    // 1. Pobranie Tokena z Ciasteczek
    const cookies = req.headers.get("cookie");
    const token = cookies
      ?.split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Missing access_token in cookies");
    }

    // 2. Walidacja JWT (Shared Secret)
    const jwtSecret = Deno.env.get("JWT_SECRET");
    if (!jwtSecret) {
      throw new Error("Server configuration error: JWT_SECRET missing");
    }

    // Weryfikacja
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    // Jeśli weryfikacja przejdzie, user jest autoryzowany.
    // Confirm upload zazwyczaj wymaga tylko s3Key/etag i faktu bycia zalogowanym (lub bycia właścicielem).
    // Backend (confirm-upload) może dodatkowo sprawdzić czy ten user jest właścicielem slotu, jeśli przekażemy userId.
    // Ale aktualny payload to tylko { s3Key, etag }. Backend NestJS ufa, że jeśli Edge Function puści requests z kluczem internal, to jest OK.

    // 2. Parse Payload
    const { s3Key, etag } = await req.json();

    if (!s3Key) {
      throw new Error("Missing s3Key");
    }

    // 3. Call NestJS Internal API (Confirm Upload)
    const nestJsUrl = Deno.env.get("NESTJS_INTERNAL_URL");
    const nestJsKey = Deno.env.get("NESTJS_SECRET_KEY");

    if (!nestJsUrl || !nestJsKey) {
      console.error(
        "Missing Env Vars: NESTJS_INTERNAL_URL or NESTJS_SECRET_KEY"
      );
      throw new Error("Server configuration error");
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
      throw new Error(`Backend confirmation failed: ${errorText}`);
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
