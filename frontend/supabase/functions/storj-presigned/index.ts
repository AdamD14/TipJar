// supabase/functions/storj-presigned/index.ts
import { serve } from "https://jsr.io/@std/http@1.0.7/server.ts";
import { 
  S3Client, 
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Weryfikacja JWT (Auth0 token)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.split(" ")[1];
    
    // Weryfikacja przez Twój backend (Auth0/Passport)
    const verifyResponse = await fetch(`${Deno.env.get("BACKEND_URL")}/api/auth/verify-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!verifyResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { userId } = await verifyResponse.json();

    // 2. Parsowanie request body
    const { operation = "upload", slotId, fileName, contentType, expiresIn = 300 } = await req.json();
    
    if (!slotId || !fileName) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Generowanie klucza S3 (ścieżki w Storj)
    const timestamp = Date.now();
    const safeFileName = fileName
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .toLowerCase();
    
    // Struktura: avatars/{userId}/{slotId}/{timestamp}_{filename}
    const s3Key = `avatars/${userId}/${slotId}/${timestamp}_${safeFileName}`;

    // 4. Inicjalizacja Storj S3 client (PRYWATNY dostęp)
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: Deno.env.get("STORJ_ENDPOINT") || 'https://gateway.storjshare.io',
      forcePathStyle: true,
      credentials: {
        accessKeyId: Deno.env.get("STORJ_ACCESS")!,
        secretAccessKey: Deno.env.get("STORJ_SECRET")!,
      },
    });

    // 5. Generowanie presigned URL dla PRYWATNEGO pliku
    let command;
    const bucket = Deno.env.get("STORJ_BUCKET")!;

    switch (operation) {
      case "upload":
        if (!contentType) {
          return new Response(
            JSON.stringify({ error: "Missing 'contentType' for upload" }),
            { status: 400, headers: corsHeaders }
          );
        }
        
        command = new PutObjectCommand({
          Bucket: bucket,
          Key: s3Key,
          ContentType: contentType,
          // BRAK ACL - plik PRYWATNY (dostęp tylko przez Cloudinary z credentials)
          Metadata: {
            user_id: userId,
            slot_id: slotId.toString(),
            uploaded_at: timestamp.toString(),
            for_cloudinary: "true",
          },
        });
        break;

      case "delete":
        command = new DeleteObjectCommand({
          Bucket: bucket,
          Key: s3Key,
        });
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Invalid operation. Use 'upload' or 'delete'" }),
          { status: 400, headers: corsHeaders }
        );
    }

    const signedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: parseInt(String(expiresIn)) 
    });

    // 6. Zwróć odpowiedź (NIE zwracamy publicUrl - plik prywatny)
    return new Response(
      JSON.stringify({
        success: true,
        signedUrl,
        s3Key,
        bucket,
        operation,
        expiresIn: parseInt(String(expiresIn)),
        userId,
        timestamp,
        // Kluczowe: Cloudinary będzie pobierał z Storj używając swoich credentials
        cloudinaryFetchUrl: `s3://${bucket}/${s3Key}` // Format dla Cloudinary S3 source
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Edge Function error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate signed URL",
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});