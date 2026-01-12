import Link from "next/link";
import { useParams } from "next/navigation";
import RQProvider from "@/lib/api/reactQueryProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-main text-white">
      <RQProvider>{children}</RQProvider>
    </div>
  );
}
