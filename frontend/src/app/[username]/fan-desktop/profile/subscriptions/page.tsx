"use client";

import FanFollowingPage from "../following/page";

export default function FanSubscriptionsPage({
  params,
}: {
  params: { username: string };
}) {
  return <FanFollowingPage params={params} />;
}
