import UserName from "./UserName";

async function getCurrentUser() {
  console.log("Rozpoczynam fetch do backendu");

  try {
    const res = await fetch("http://localhost:3001/auth/ME", {
      credentials: "include",
      cache: "no-store",
    });

    console.log("Status odpowiedzi:", res.status);

    if (!res.ok) {
      console.log("Błąd HTTP – nie zalogowany lub zły endpoint");
      return null;
    }

    const data = await res.json();
    console.log("Otrzymane dane z backendu:", data);
    return data;
  } catch (error) {
    console.log("Błąd podczas fetch:", error);
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