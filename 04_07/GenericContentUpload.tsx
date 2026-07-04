"use client";

import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import type { ProductType } from "../../../types/premiumContent";

const ACCEPT: Record<Exclude<ProductType, "course" | "live-session">, string> =
  {
    gallery: "image/*",
    video: "video/*",
    audio: "audio/*",
    document: "application/pdf,.doc,.docx",
  };

interface GenericContentUploadProps {
  type: Exclude<ProductType, "course" | "live-session">;
  files: File[];
  onChange: (files: File[]) => void;
}

/**
 * Content editor dla gallery/video/audio/document. To jest placeholder
 * pod realny upload — podłącz pod wasz istniejący pipeline (S3 presigned
 * URL / Storj, cokolwiek jest już używane w appearance/ dla avatar/banner
 * upload). Zamierzenie: jeden wspólny komponent dla 4 typów zamiast
 * czterech osobnych uploaderów, bo różnią się tylko `accept`.
 */
export default function GenericContentUpload({
  type,
  files,
  onChange,
}: GenericContentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const multiple = type === "gallery";

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const dropped = Array.from(e.dataTransfer.files);
      onChange(multiple ? [...files, ...dropped] : dropped.slice(0, 1));
    },
    [files, multiple, onChange],
  );

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
        Content
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={clsx(
          "border-2 border-dashed rounded-2xl p-8 text-center transition-colors",
          dragActive
            ? "border-gold-400 bg-gold-400/5"
            : "border-white/10 hover:border-white/20",
        )}
      >
        <UploadCloud
          size={24}
          className={clsx(
            "mx-auto mb-2",
            dragActive ? "text-gold-400" : "text-white/30",
          )}
        />
        <p className="text-xs text-white/40">
          Drag &amp; drop {multiple ? "files" : "a file"} here
        </p>
        <input
          type="file"
          accept={ACCEPT[type]}
          multiple={multiple}
          className="hidden"
          id={`upload-${type}`}
          onChange={(e) => {
            const selected = Array.from(e.target.files ?? []);
            onChange(multiple ? [...files, ...selected] : selected);
          }}
        />
        <label
          htmlFor={`upload-${type}`}
          className="inline-block mt-2 text-xs text-gold-400 cursor-pointer hover:underline"
        >
          or browse
        </label>
      </div>

      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-2"
            >
              <FileIcon size={14} className="text-teal-400 shrink-0" />
              <span className="flex-1 truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-white/30 hover:text-red-300"
                aria-label="Remove file"
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
