// frontend/src/components/community/feed/PostCreatorBar.tsx
// Always visible above the feed, never hidden in a modal by default —
// minimizes friction between having a thought and publishing it.

"use client";

import { useState } from "react";
import { FileText, Zap, Megaphone, Image as ImageIcon } from "lucide-react";
import UpdateEditorInline from "./UpdateEditorInline";
import PostEditorModal from "./PostEditorModal";
import type { PostType } from "@/lib/api/community/posts.contracts";

const TYPE_BUTTONS: { type: PostType; icon: typeof FileText; label: string }[] = [
  { type: "POST", icon: FileText, label: "Post" },
  { type: "UPDATE", icon: Zap, label: "Update" },
  { type: "ANNOUNCEMENT", icon: Megaphone, label: "Announcement" },
  { type: "MEDIA", icon: ImageIcon, label: "Media" },
];

export default function PostCreatorBar() {
  const [activeType, setActiveType] = useState<PostType | null>(null);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-teal-800/40 p-3">
      <p className="px-1 text-sm text-text-ds-tertiary">
        Share something with your community...
      </p>

      <div className="mt-2 flex gap-2">
        {TYPE_BUTTONS.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-text-ds-secondary hover:bg-white/5"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {activeType === "UPDATE" && (
        <UpdateEditorInline onDone={() => setActiveType(null)} />
      )}
      {(activeType === "POST" || activeType === "ANNOUNCEMENT" || activeType === "MEDIA") && (
        <PostEditorModal type={activeType} onClose={() => setActiveType(null)} />
      )}
    </div>
  );
}
