import CreatorShell from "@/components/creator/CreatorShell";
import ProfileEditor from "@/components/creator/ProfileEditor";

export default function Page() {
  return (
    <CreatorShell title="Profile">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <ProfileEditor />
      </div>
    </CreatorShell>
  );
}

