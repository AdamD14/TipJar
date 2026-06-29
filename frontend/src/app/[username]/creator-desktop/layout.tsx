import RQProvider from "@/lib/api/reactQueryProvider";
import Navbar from "@/components/ui/layout/Navbar";
import CreatorSidebar from "@/components/ui/layout/CreatorSidebar";

export default function CreatorDesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RQProvider>
      <Navbar />
      <div className="flex min-h-screen pt-14">
        <CreatorSidebar />
        <main className="flex-1 min-w-0 lg:ml-0 p-4 md:p-8">
          {children}
        </main>
      </div>
    </RQProvider>
  );
}
