"use client";
import ProfileForm from "@/components/ui/forms/ProfileForm";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/forms/ErrorState";
import {
  useCreatorProfile,
  useUpdateProfile,
  uploadImage,
} from "@/lib/api/queries";
import { useToast } from "@/components/ui/notifications/Toast";
import { track } from "@/lib/analytics/track";

export default function ProfileSettingsPage() {
  const { data, isLoading, isError, refetch } = useCreatorProfile();
  const { mutateAsync, isPending } = useUpdateProfile();
  const toast = useToast();

  if (isLoading) return <LoadingSkeleton lines={8} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia profilu</h1>
      <ProfileForm
        initial={data}
        onUpload={uploadImage}
        onSubmit={async (payload) => {
          await mutateAsync(payload);
          toast.push({ type: "success", text: "Profil zapisany." });
          track("profile_save", { alias: payload.alias });
        }}
      />
      {isPending && <p className="text-sm opacity-70 mt-2">Zapisywanie…</p>}
    </div>
  );
}
