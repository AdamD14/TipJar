"use client";

import { useCallback, useRef, type ChangeEvent } from "react";
import Input from "@/components/ui/forms/Input";
import Card from "@/components/ui/forms/Card";
import Button from "@/components/ui/buttons/Button";

type Props = {
  value?: string;
  onChange: (url: string) => void;
};

export default function CoverUploader({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const objUrlRef = useRef<string | null>(null);

  const upload = useCallback(
    async (_file: File) => {
      // TODO: Presigned URL flow — same as AvatarUploader
    },
    [onChange],
  );

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (objUrlRef.current) {
        URL.revokeObjectURL(objUrlRef.current);
        objUrlRef.current = null;
      }
      const url = URL.createObjectURL(file);
      objUrlRef.current = url;
      onChange(url);
      upload(file);
    },
    [upload, onChange],
  );

  return (
    <Card variant="elevated">
      <p className="text-sm font-body text-text-ds-tertiary mb-2">
        Cover (3:1)
      </p>
      <div className="aspect-[3/1] rounded-lg overflow-hidden bg-teal-900">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-teal-100 text-sm">
            No cover
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />
      <Button
        variant="ghost"
        size="sm"
        className="mt-3"
        onClick={() => fileRef.current?.click()}
      >
        Choose file
      </Button>
    </Card>
  );
}
