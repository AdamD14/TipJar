import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get("platform");
  const returnTo = searchParams.get("returnTo") || "/";

  if (!platform) {
    return NextResponse.json(
      { error: "Platform parameter is missing" },
      { status: 400 }
    );
  }

  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Construct redirect URL with the connected platform query param
  const redirectUrl = new URL(returnTo, request.url);
  redirectUrl.searchParams.set("connected", platform);

  return NextResponse.redirect(redirectUrl);
}
