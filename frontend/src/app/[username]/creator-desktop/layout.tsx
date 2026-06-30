"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RQProvider from "@/lib/api/reactQueryProvider";
import Navbar from "@/components/ui/layout/Navbar";
import CreatorSidebar from "@/components/ui/layout/CreatorSidebar";

function PathBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="px-4 md:px-8 py-2 flex items-center justify-center font-body text-sm tracking-wide">
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const decoded = decodeURIComponent(seg);
        return (
          <span key={href} className="flex items-center">
            {i > 0 && <span className="mx-1.5 text-text-quaternary/40">/</span>}
            {isLast ? (
              <span className="text-text-secondary font-medium">{decoded}</span>
            ) : (
              <Link href={href} className="text-text-quaternary hover:text-gold-400 transition-colors duration-200">
                {decoded}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default function CreatorDesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RQProvider>
      <Navbar />
      <div className="pt-14 flex min-h-screen">
        <CreatorSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <PathBreadcrumb />
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </RQProvider>
  );
}
