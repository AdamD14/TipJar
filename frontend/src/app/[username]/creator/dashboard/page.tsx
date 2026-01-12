"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import apiClient from "@/lib/apiClient";
import { me } from "@/lib/auth";

interface DashboardData {
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  profile?: {
    goalLabel?: string;
    goalTarget?: number;
    bio?: string;
  };
}

export default function CreatorDashboard() {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Check if this is the current user's dashboard
  const decodedUsername = decodeURIComponent(username || "");
  const cleanUsername = decodedUsername.startsWith("@")
    ? decodedUsername.slice(1)
    : decodedUsername;

  const isOwner = user?.username === cleanUsername;

  useEffect(() => {
    // Wait for store to load from session storage
    if (!hasHydrated) return;

    if (!user) {
      // User is not in store. Try to fetch from API (e.g. if redirected from Social Login)
      me()
        .then((fetchedUser) => {
          if (fetchedUser) {
            useAuthStore.getState().setUser({
              ...fetchedUser,
              email: fetchedUser.email ?? undefined,
              username: fetchedUser.username ?? undefined,
              avatarUrl: fetchedUser.avatarUrl ?? undefined,
              role: fetchedUser.role === "CREATOR" ? "CREATOR" : "FAN",
            });
          } else {
            router.replace("/login");
          }
        })
        .catch(() => {
          router.replace("/login");
        });
      return;
    }

    if (!isOwner) {
      // Not the owner, redirect to public profile
      router.replace(`/@${cleanUsername}`);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/v1/creator/onboarding/status");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hasHydrated, user, isOwner, cleanUsername, router]);

  if (!isOwner) {
    return null; // Will redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-main text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {data?.displayName || cleanUsername}!
            </h1>
            <p className="text-gray-400 mt-1">
              Manage your creator profile and earnings
            </p>
          </div>
          <Link
            href={`/@${cleanUsername}`}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            View Public Profile
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">
              Total Earnings
            </h3>
            <p className="text-3xl font-bold mt-2 text-teal-400">$0.00</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">
              Tips This Month
            </h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">
              Subscribers
            </h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

        {/* Goal Progress */}
        {data?.profile?.goalLabel && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Current Goal</h3>
            <p className="text-gray-400">{data.profile.goalLabel}</p>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                style={{ width: "0%" }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              $0 / ${data.profile.goalTarget || 100}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/@${cleanUsername}/creator/profile`}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <h3 className="text-lg font-semibold">Edit Profile</h3>
            <p className="text-gray-400 mt-1">
              Update your bio, avatar, and social links
            </p>
          </Link>
          <Link
            href={`/@${cleanUsername}/creator/withdrawals`}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <h3 className="text-lg font-semibold">Withdrawals</h3>
            <p className="text-gray-400 mt-1">Manage your USDC withdrawals</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
