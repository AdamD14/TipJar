import UserName from "./UserName";

import { cookies } from "next/headers";

async function getCurrentUser() {
  const origin =
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:3001";

  try {
    const cookieStore = await cookies();

    if (!cookieStore.has("access_token")) {
      return null;
    }

    const cookieString = cookieStore.toString();

    console.log("[UserHeader] Fetching from:", `${origin}/api/v1/auth/me`);
    console.log("[UserHeader] Cookies sent:", cookieString);

    const res = await fetch(`${origin}/api/v1/auth/me`, {
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
    });

    console.log("[UserHeader] Response status:", res.status);

    if (!res.ok) {
      console.log("[UserHeader] Response not OK");
      return null;
    }

    const data = await res.json();
    console.log("[UserHeader] Data received:", data);
    return data;
  } catch (error) {
    console.error("[UserHeader] Fetch error:", error);
    return null;
  }
}

export default async function UserHeader() {
  console.log("UserHeader – komponent renderowany");

  const user = await getCurrentUser();

  if (!user || !user.username) {
    console.log("Brak użytkownika – nie renderuję nazwy");
    return null;
  }

  console.log("Renderuję nazwę użytkownika:", user.username);

  return (
    <div className="fixed top-2 right-2 z-50">
      <UserName username={user.username} />
    </div>
  );
}
