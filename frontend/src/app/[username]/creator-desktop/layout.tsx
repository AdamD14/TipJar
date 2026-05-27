import RQProvider from "@/lib/api/reactQueryProvider";
import Navbar from "@/components/ui/layout/Navbar";

export default function CreatorDesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RQProvider>
      <Navbar />
      <main className="pt-14">{children}</main>
    </RQProvider>
  );
}
