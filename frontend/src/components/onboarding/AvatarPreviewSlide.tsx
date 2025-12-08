"use client";

import React, { useRef } from "react";
import Image from 'next/image';
import type { UploadSlot } from "@/lib/store/types";

interface AvatarPreviewSlideProps {
  slot: UploadSlot;
  onFileSelectAction: (file: File) => void;
  onRemoveAction: () => void;
  onEditAction: () => void;
  onCancelUploadAction: () => void;
  onRetryAction: () => void;
  isActive: boolean;
  maxSizeMB?: number;
}

export default function AvatarPreviewSlide({
  slot,
  onFileSelectAction,
  onRemoveAction,
  onEditAction,
  onCancelUploadAction,
  onRetryAction,
  isActive,
  maxSizeMB = 5,
}: AvatarPreviewSlideProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelectAction(file);
      e.target.value = "";
    }
  };

  const handleClick = () => {
    if (!slot.isFilled && !slot.isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Use regular img for blob URLs
  const displayUrl = slot.cloudinaryUrl || slot.previewUrl;

  // Empty slot state
  if (!slot.isFilled) {
    return (
      <div
        onClick={handleClick}
        className={`relative w-full h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors ${
          isActive
            ? "border-gold bg-gold/5"
            : "border-gray-600 hover:border-gray-500"
        } ${slot.isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {slot.isUploading ? "Uploading..." : "Add Avatar"}
          </h3>
          <p className="text-gray-400 text-sm max-w-xs">
            {slot.isUploading
              ? `Progress: ${slot.uploadProgress}%`
              : `Click to select image (max ${maxSizeMB}MB)`}
          </p>
          {slot.error && (
            <p className="text-red-400 text-xs mt-2 max-w-xs text-center">
              {slot.error}
            </p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
          disabled={slot.isUploading}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-[400px] rounded-2xl overflow-hidden border-2 ${
        isActive ? "border-gold" : "border-transparent"
      } ${slot.isUploading ? "opacity-90" : ""}`}
    >
      {/* Image display using Next.js Image for blob URLs */}
      {displayUrl && (
        <div className="relative w-full h-full">
          <Image
            src={displayUrl}
            alt={`Avatar slot ${slot.id + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            crossOrigin="anonymous"
            unoptimized={true}
          />
        </div>
      )}

      {/* Overlay with action buttons */}
      {!slot.isUploading && !slot.error && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
            <button
              onClick={onEditAction}
              className="px-4 py-2 bg-white/90 text-gray-900 font-medium rounded-lg hover:bg-white transition backdrop-blur-sm"
            >
              Edit
            </button>
            <button
              onClick={onRemoveAction}
              className="px-4 py-2 bg-red-500/90 text-white font-medium rounded-lg hover:bg-red-500 transition backdrop-blur-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Upload progress bar */}
      {slot.isUploading && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-900/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 h-full">
            <span className="text-sm text-gray-300">
              Uploading... {slot.uploadProgress}%
            </span>
            <button
              onClick={onCancelUploadAction}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Cancel
            </button>
          </div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-gold-dark transition-all duration-300"
            style={{ width: `${slot.uploadProgress}%` }}
          />
        </div>
      )}

      {/* Error state with retry option */}
      {slot.error && !slot.isUploading && (
        <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <div className="text-red-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-300 text-sm mb-3">{slot.error}</p>
            <div className="flex gap-2">
              <button
                onClick={onRetryAction}
                disabled={slot.retryCount >= 3}
                className="px-4 py-2 bg-gold text-gray-900 font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {slot.retryCount >= 3 ? 'Max Retries' : 'Retry'}
              </button>
              <button
                onClick={onRemoveAction}
                className="px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-gold text-gray-900 text-sm font-semibold rounded-full backdrop-blur-sm">
            Active
          </span>
        </div>
      )}

      {/* Success indicator */}
      {slot.cloudinaryUrl && !slot.error && !slot.isUploading && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
            Uploaded
          </span>
        </div>
      )}
    </div>
  );
}