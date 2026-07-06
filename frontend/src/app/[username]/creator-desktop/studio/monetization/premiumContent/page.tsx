import { redirect } from "next/navigation";

export default async function PremiumContentPage({
  params,
}: {
  params: Promise<{ username: string }> | { username: string };
}) {
  const resolvedParams = await params;
  const username = decodeURIComponent(resolvedParams.username || "");
  const cleanUsername = username.startsWith("@") ? username.slice(1) : username;
  redirect(`/@${cleanUsername}/creator-desktop/studio/monetization/premiumContent/products`);
}
