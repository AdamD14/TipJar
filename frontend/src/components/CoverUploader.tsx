"use client";

import { useCallback, type ChangeEvent } from "react";
import clsx from "clsx";

type Props = {
  value?: string;
  onChange: (url: string) => void;
};

export default function CoverUploader({ value, onChange }: Props) {
  const upload = useCallback(
    async (_file: File) => {
      // TODO: Presigned URL flow — analogicznie jak w AvatarUploader
    },
    [onChange],
  );

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) upload(file);
    },
    [upload],
  );

  return (
    <div className="bg-teal-850 border border-white/[0.05] rounded-xl p-6">
      <p className="text-sm font-body text-text-ds-tertiary mb-2">
        Cover (3:1)
      </p>
      <div className="aspect-[3/1] rounded-lg overflow-hidden bg-teal-900">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-teal-600 text-sm">
            No cover
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="mt-3 text-sm text-text-ds-tertiary file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-body file:bg-teal-700 file:text-teal-25 hover:file:bg-teal-600 file:cursor-pointer file:transition-colors"
        onChange={handleFile}
      />
    </div>
  );
}
