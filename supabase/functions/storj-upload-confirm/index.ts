import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Validate Auth (Supabase Token)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // 2. Parse Payload
    const { s3Key, etag } = await req.json();

    if (!s3Key) {
      throw new Error('Missing s3Key');
    }

    // 3. Call NestJS Internal API (Confirm Upload)
    const nestJsUrl = Deno.env.get('NESTJS_INTERNAL_URL');
    const nestJsKey = Deno.env.get('NESTJS_SECRET_KEY');

    if (!nestJsUrl || !nestJsKey) {
      console.error('Missing Env Vars: NESTJS_INTERNAL_URL or NESTJS_SECRET_KEY');
      throw new Error('Server configuration error');
    }

    const confirmResponse = await fetch(`${nestJsUrl}/media/internal/confirm-upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-API-Key': nestJsKey,
      },
      body: JSON.stringify({ s3Key, etag }),
    });

    if (!confirmResponse.ok) {
      const errorText = await confirmResponse.text();
      console.error('NestJS Confirm Failed:', errorText);
      throw new Error(`Backend confirmation failed: ${errorText}`);
    }

    const result = await confirmResponse.json();

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
