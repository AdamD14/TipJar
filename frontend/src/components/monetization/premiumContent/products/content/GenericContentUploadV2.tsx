"use client";

import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { UploadCloud, File as FileIcon, X, Loader2 } from "lucide-react";
import type { ProductType } from "@/types/premiumContent";

const ACCEPT: Record<Exclude<ProductType, "course" | "live-session">, string> = {
  gallery: "image/*",
  video: "video/*",
  audio: "audio/*",
  document: "application/pdf,.doc,.docx",
};

interface GenericContentUploadV2Props {
  type: Exclude<ProductType, "course" | "live-session">;
  files: File[];
  onChange: (files: File[]) => void;
  isSaving?: boolean;
  isUploading?: boolean;
  error?: string;
}

export default function GenericContentUploadV2({
  type,
  files,
  onChange,
  isSaving = false,
  isUploading = false,
  error,
}: GenericContentUploadV2Props) {
  const [dragActive, setDragActive] = useState(false);
  const multiple = type === "gallery";

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (isSaving || isUploading) return;
      const dropped = Array.from(e.dataTransfer.files);
      const accepted = dropped.filter((file) => {
        const accept = ACCEPT[type];
        const mimeTypes = accept.split(",").map((m) => m.trim());
        return mimeTypes.some((m) => (m.endsWith("/*") ? file.type.startsWith(m.slice(0, -1)) : file.type === m));
      });
      onChange(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
    },
    [files, multiple, onChange, type, isSaving, isUploading]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isSaving || isUploading) return;
      const selected = Array.from(e.target.files ?? []);
      const accepted = selected.filter((file) => {
        const accept = ACCEPT[type];
        const mimeTypes = accept.split(",").map((m) => m.trim());
        return mimeTypes.some((m) => (m.endsWith("/*") ? file.type.startsWith(m.slice(0, -1)) : file.type === m));
      });
      onChange(multiple ? [...files, ...accepted] : accepted);
    },
    [files, multiple, onChange, type, isSaving, isUploading]
  );

  const removeFile = (index: number) => {
    if (isSaving || isUploading) return;
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1 flex items-center gap-2">
        Content
        {error && <span className="text-xs text-red-400" role="alert">{error}</span>}
        {(isSaving || isUploading) && (
          <Loader2 size={12} className="animate-spin text-teal-400" aria-hidden="true" />
        )}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!isSaving && !isUploading) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={clsx(
          "border-2 border-dashed rounded-2xl p-8 text-center transition-colors",
          isSaving || isUploading
            ? "border-white/10 opacity-50 cursor-not-allowed"
            : dragActive
            ? "border-gold-400 bg-gold-400/5"
            : "border-white/10 hover:border-white/20"
        )}
        aria-label={`Drag and drop ${multiple ? "files" : "a file"} here`}
      >
        <UploadCloud
          size={24}
          className={clsx(
            "mx-auto mb-2",
            dragActive ? "text-gold-400" : "text-white/30"
          )}
        />
        <p className="text-xs text-white/40">
          Drag & drop {multiple ? "files" : "a file"} here
        </p>
        <input
          type="file"
          accept={ACCEPT[type]}
          multiple={multiple}
          className="hidden"
          id={`upload-${type}`}
          onChange={handleFileSelect}
          disabled={isSaving || isUploading}
          aria-label={`Choose ${multiple ? "files" : "a file"} to upload`}
        />
        <label
          htmlFor={`upload-${type}`}
          className={clsx(
            "inline-block mt-2 text-xs cursor-pointer hover:underline",
            isSaving || isUploading ? "text-white/20 cursor-not-allowed" : "text-gold-400"
          )}
        >
          or browse
        </label>
      </div>

      {files.length > 0 && (
        <ul className="space-y-1.5" role="list" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-2"
            >
              <FileIcon size={14} className="text-teal-400 shrink-0" />
              <span className="flex-1 truncate">{file.name}</span>
              {isUploading && i === files.length - 1 && (
                <Loader2 size={14} className="animate-spin text-teal-400" aria-hidden="true" />
              )}
              <button
                type="button"
                onClick={() => removeFile(i)}
                disabled={isSaving || isUploading}
                className="text-white/30 hover:text-red-300 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={`Remove ${file.name}`}
                aria-disabled={isSaving || isUploading}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}