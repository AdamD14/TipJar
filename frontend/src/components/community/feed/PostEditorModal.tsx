// frontend/src/components/community/feed/PostEditorModal.tsx
// Handles POST, ANNOUNCEMENT and MEDIA creation in one form — the fields
// shown change per type, limits are enforced client-side AND re-checked
// server-side in PostsService (never trust the client alone).
//
// ASSUMPTION: no shared <Modal> component was shown to me, so this is a
// self-contained overlay. If you already have one under
// @/components/ui/, swap the outer two divs for it.

"use client";

import { useState } from "react";
import { X, ImagePlus, Loader2 } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import { uploadImage } from "@/lib/api/queries";
import { useCreatePost } from "@/lib/api/community/posts.queries";
import type { PostType, PostVisibility } from "@/lib/api/community/posts.contracts";

const MEDIA_MAX = { POST: 5, MEDIA: 10 } as const;

export default function PostEditorModal({
  type,
  onClose,
}: {
  type: Extract<PostType, "POST" | "ANNOUNCEMENT" | "MEDIA">;
  onClose: () => void;
}) {
  const [content, setContent] = useState("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<PostVisibility>("PUBLIC");
  const [uploading, setUploading] = useState(false);
  const createPost = useCreatePost();

  const maxMedia = type === "MEDIA" ? MEDIA_MAX.MEDIA : type === "POST" ? MEDIA_MAX.POST : 0;

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const remaining = maxMedia - mediaUrls.length;
      const toUpload = Array.from(files).slice(0, remaining);
      const urls = await Promise.all(toUpload.map((f) => uploadImage(f)));
      setMediaUrls((prev) => [...prev, ...urls]);
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    if (!content.trim()) return;
    createPost.mutate(
      {
        type,
        content: content.trim(),
        mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
        visibility,
      },
      { onSuccess: onClose },
    );
  };

  const title =
    type === "ANNOUNCEMENT" ? "New announcement" : type === "MEDIA" ? "New media post" : "New post";

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-teal-900 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-text-ds-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-text-ds-tertiary hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            type === "ANNOUNCEMENT"
              ? "What do your fans need to know?"
              : "Share something with your community..."
          }
          rows={5}
          autoFocus
          className="w-full resize-none rounded-lg border border-white/10 bg-teal-950/50 p-3 text-sm text-text-ds-primary placeholder:text-text-ds-tertiary focus:outline-none focus:ring-1 focus:ring-gold-400/40"
        />

        {maxMedia > 0 && (
          <div className="mt-3">
            {mediaUrls.length > 0 && (
              <div className="mb-2 grid grid-cols-4 gap-2">
                {mediaUrls.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={url} src={url} alt="" className="aspect-square rounded-md object-cover" />
                ))}
              </div>
            )}
            {mediaUrls.length < maxMedia && (
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-text-ds-tertiary hover:border-white/40">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                {uploading ? "Uploading..." : `Add media (${mediaUrls.length}/${maxMedia})`}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  disabled={uploading}
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </label>
            )}
          </div>
        )}

        {type !== "ANNOUNCEMENT" && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-text-ds-tertiary">Visibility:</span>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as PostVisibility)}
              className="rounded-md border border-white/10 bg-teal-950/50 px-2 py-1 text-text-ds-primary"
            >
              <option value="PUBLIC">Public</option>
              <option value="SUBSCRIBERS_ONLY">Subscribers only</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="tertiary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!content.trim() || uploading || createPost.isPending}
            onClick={submit}
          >
            {createPost.isPending ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
