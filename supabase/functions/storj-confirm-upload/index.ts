import { jwtVerify } from "https://deno.land/x/jose@v5.2.0/index.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Obsługa CORS (Preflight)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { slotId } = await req.json();

    // 1. Walidacja Slotów (zgodnie z Twoją prośbą 0-2)
    if (slotId === undefined || slotId < 0 || slotId > 2) {
      throw new Error("Invalid slotId. Must be between 0 and 2.");
    }

    // 2. Walidacja Tokena JWT (Twój własny sekret z NestJS)
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Missing token");
    }

    const secret = new TextEncoder().encode(Deno.env.get("JWT_SECRET"));

    // Weryfikujemy token Twoim kluczem - jeśli wygasł lub jest zły, rzuci błąd
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.sub;

    if (!userId) {
      throw new Error("Token payload missing 'sub' (userId)");
    }

    // 3. Powiadomienie NestJS
    // NestJS teraz wie, że plik fizycznie jest już w Storj pod s3Key
    const response = await fetch(
      `${Deno.env.get("NESTJS_INTERNAL_URL")}/api/v1/media/confirm-upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-API-Key": Deno.env.get("NESTJS_SECRET_KEY")!,
        },
        body: JSON.stringify({ userId, slotId }),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`NestJS failed: ${errorData}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Image processed by Cloudinary",
        data: result,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders }, status: 400 },
    );
  }
});
