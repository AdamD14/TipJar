// frontend/src/components/community/feed/UpdateEditorInline.tsx
// Expands inline under the creator bar — no modal, deliberately zero
// friction between having a thought and publishing it.

"use client";

import { useState } from "react";
import Button from "@/components/ui/buttons/Button";
import { useCreatePost } from "@/lib/api/community/posts.queries";

const MAX_LENGTH = 280;

export default function UpdateEditorInline({ onDone }: { onDone: () => void }) {
  const [content, setContent] = useState("");
  const createPost = useCreatePost();

  const remaining = MAX_LENGTH - content.length;
  const overLimit = remaining < 0;

  const submit = () => {
    if (!content.trim() || overLimit) return;
    createPost.mutate(
      { type: "UPDATE", content: content.trim() },
      {
        onSuccess: () => {
          setContent("");
          onDone();
        },
      },
    );
  };

  return (
    <div className="mt-3 rounded-lg border border-white/10 bg-teal-900/50 p-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={2}
        autoFocus
        className="w-full resize-none bg-transparent text-sm text-text-ds-primary placeholder:text-text-ds-tertiary focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between">
        <span
          className={[
            "text-[11px] tabular-nums",
            overLimit ? "text-rose-400" : "text-text-ds-tertiary",
          ].join(" ")}
        >
          {remaining}
        </span>
        <div className="flex gap-2">
          <Button variant="tertiary" size="sm" onClick={onDone}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!content.trim() || overLimit || createPost.isPending}
            onClick={submit}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
