"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AvatarPreviewSlide from "./AvatarPreviewSlide";
import AvatarEditorModal from "./AvatarEditorModal";
import {
  validateImageFile,
  uploadAvatarImage,
} from "@/lib/upload/avatarUpload";
import { useAvatarStore } from "@/lib/store/avatarUploadStore";
import { getUploadController } from "@/lib/upload/uploadController";

interface AvatarUploaderProps {
  onUploadCompleteAction: (urls: string[]) => void;
  onUploadProgressAction?: (progress: number) => void;
  maxSlots?: number;
  maxSizeMB?: number;
  authToken: string | null;
}

// Local file storage for each slot
type SlotFileMap = Map<number, File>;

export default function AvatarUploader({
  onUploadCompleteAction,
  onUploadProgressAction,
  maxSlots = 3,
  maxSizeMB = 5,
  authToken,
}: AvatarUploaderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isUploadingAll, setIsUploadingAll] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // Store files locally, not in Zustand
  const filesRef = useRef<SlotFileMap>(new Map());

  // Zustand store
  const {
    slots,
    activeIndex,
    editingSlot,
    initializeSlotsIfEmpty,
    updateSlot,
    setActiveIndex,
    setEditingSlot,
    resetSlot,
    getSlotById,
    getSlotsForUpload,
    cancelUpload,
  } = useAvatarStore();

  // Initialize slots on mount
  useEffect(() => {
    const initializedSlots = initializeSlotsIfEmpty(maxSlots);
    console.log("Initialized slots:", initializedSlots.length);
  }, [initializeSlotsIfEmpty, maxSlots]);

  // Calculate smooth overall progress
  useEffect(() => {
    const filledSlots = slots.filter((slot) => slot.isFilled);
    if (filledSlots.length === 0) {
      setOverallProgress(0);
      return;
    }

    // Calculate weighted average of progress
    const totalProgress = filledSlots.reduce((sum, slot) => {
      if (slot.cloudinaryUrl) {
        return sum + 100; // Already uploaded
      }
      return sum + (slot.uploadProgress || 0);
    }, 0);

    const progress = Math.floor(totalProgress / filledSlots.length);
    setOverallProgress(progress);

    if (onUploadProgressAction) {
      onUploadProgressAction(progress);
    }

    // Notify parent when all uploads are complete
    const uploadedSlots = slots.filter((slot) => slot.cloudinaryUrl);
    if (uploadedSlots.length === filledSlots.length && filledSlots.length > 0) {
      const urls = uploadedSlots
        .map((slot) => slot.cloudinaryUrl)
        .filter(Boolean) as string[];
      onUploadCompleteAction(urls);
    }
  }, [slots, onUploadProgressAction, onUploadCompleteAction]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup blob URLs
      const { cleanupTemporaryData } = useAvatarStore.getState();
      cleanupTemporaryData();

      // Cancel all uploads
      const uploadController = getUploadController();
      uploadController.cancelAll();
    };
  }, []);

  // Handle file selection from user
  const handleFileSelect = async (slotId: number, file: File) => {
    const validationError = validateImageFile(file, maxSizeMB);
    if (validationError) {
      alert(validationError);
      return;
    }

    // Store file locally
    filesRef.current.set(slotId, file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Update slot with preview
    updateSlot(slotId, {
      name: file.name,
      isFilled: true,
      previewUrl,
      error: null,
    });

    // Open editor modal
    setTimeout(() => setEditingSlot(slotId), 10);
  };

  // Handle edit confirmation (crop completed)
  const handleEditConfirm = async (
    slotId: number,
    croppedBlob: Blob,
    fileName: string
  ) => {
    const slot = getSlotById(slotId);
    if (!slot) return;

    // Create new file from cropped blob
    const croppedFile = new File([croppedBlob], fileName, {
      type: croppedBlob.type,
    });

    // Store cropped file locally
    filesRef.current.set(slotId, croppedFile);

    // Create new preview URL and revoke old one
    const newPreviewUrl = URL.createObjectURL(croppedFile);

    // Update slot with new preview URL
    updateSlot(slotId, {
      name: fileName,
      previewUrl: newPreviewUrl,
      isFilled: true,
      // Reset upload state if previously failed
      error: null,
      cloudinaryUrl: null,
      uploadProgress: 0,
      isUploading: false,
    });

    // Close modal
    setEditingSlot(null);
  };

  // Handle file removal
  const handleRemove = (slotId: number) => {
    // Cancel any ongoing upload
    const uploadController = getUploadController();
    uploadController.cancel(slotId);

    // Remove local file
    filesRef.current.delete(slotId);
    resetSlot(slotId);
  };

  // Handle edit button click
  const handleEdit = (slotId: number) => {
    const slot = getSlotById(slotId);
    if (slot?.isFilled && !slot.isUploading) {
      setEditingSlot(slotId);
    }
  };

  // Handle upload cancellation
  const handleCancelUpload = (slotId: number) => {
    const uploadController = getUploadController();
    uploadController.cancel(slotId);
    cancelUpload(slotId);
  };

  // Handle retry for failed upload
  const handleRetry = async (slotId: number) => {
    const slot = getSlotById(slotId);
    const file = filesRef.current.get(slotId);

    if (!slot || !file || !authToken) {
      console.error("Cannot retry: missing slot, file, or auth token");
      return;
    }

    // Check retry limit
    if (slot.retryCount >= 3) {
      alert(
        "Maximum retry attempts reached. Please remove and re-add the image."
      );
      return;
    }

    try {
      await uploadAvatarImage(slotId, file, slot.name, authToken);
    } catch (error) {
      console.error("Retry failed:", error);
    }
  };

  // Upload single slot
  const uploadSlot = async (slotId: number): Promise<boolean> => {
    const slot = getSlotById(slotId);
    const file = filesRef.current.get(slotId);

    if (!slot || !file || !authToken || slot.cloudinaryUrl) {
      return false;
    }

    try {
      await uploadAvatarImage(slotId, file, slot.name, authToken);
      return true;
    } catch (error) {
      console.error(`Upload failed for slot ${slotId}:`, error);
      return false;
    }
  };

  // Upload all filled slots with concurrency control
  const handleUploadAll = async () => {
    if (!authToken) {
      alert("Authentication required. Please log in.");
      return;
    }

    const slotsToUpload = getSlotsForUpload();
    if (slotsToUpload.length === 0) {
      alert("No avatars to upload. Please add some images first.");
      return;
    }

    setIsUploadingAll(true);

    try {
      // Upload with concurrency control (max 3 at once)
      const concurrencyLimit = 3;
      const batches = [];

      for (let i = 0; i < slotsToUpload.length; i += concurrencyLimit) {
        batches.push(slotsToUpload.slice(i, i + concurrencyLimit));
      }

      for (const batch of batches) {
        const uploadPromises = batch.map((slot) => uploadSlot(slot.id));
        const results = await Promise.all(uploadPromises);

        const successful = results.filter(Boolean).length;
        console.log(`Batch uploaded: ${successful}/${batch.length} successful`);

        // Small delay between batches
        if (batch !== batches[batches.length - 1]) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      alert(`Upload completed!`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(
        "Some uploads failed. Please check individual slots and retry if needed."
      );
    } finally {
      setIsUploadingAll(false);
    }
  };

  // Handle slide change
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  // Get current editing slot data
  const editingSlotData =
    editingSlot !== null ? getSlotById(editingSlot) : null;

  // Calculate upload summary
  const totalFilled = slots.filter((s) => s.isFilled).length;
  const totalUploaded = slots.filter((s) => s.cloudinaryUrl).length;
  const totalInProgress = slots.filter((s) => s.isUploading).length;
  const totalErrors = slots.filter((s) => s.error && !s.isUploading).length;

  return (
    <div className="w-full space-y-6">
      {/* Main carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full rounded-xl overflow-hidden"
        >
          {slots.map((slot) => (
            <SwiperSlide key={slot.id}>
              <AvatarPreviewSlide
                slot={slot}
                onFileSelectAction={(file) => handleFileSelect(slot.id, file)}
                onRemoveAction={() => handleRemove(slot.id)}
                onEditAction={() => handleEdit(slot.id)}
                onCancelUploadAction={() => handleCancelUpload(slot.id)}
                onRetryAction={() => handleRetry(slot.id)}
                isActive={activeIndex === slot.id}
                maxSizeMB={maxSizeMB}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Active slot indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-1">
            {slots.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-gold" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Editor modal */}
      {editingSlotData && (
        <AvatarEditorModal
          isOpen={editingSlot !== null}
          onCloseAction={() => setEditingSlot(null)}
          slotId={editingSlotData.id}
          slotName={editingSlotData.name}
          previewUrl={editingSlotData.previewUrl}
          onConfirmAction={handleEditConfirm}
        />
      )}

      {/* Status and controls */}
      <div className="space-y-4">
        {/* Overall progress */}
        {overallProgress > 0 && overallProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Overall Progress</span>
              <span className="text-gold font-medium">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload summary */}
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                totalFilled > 0 ? "text-white" : "text-gray-500"
              }`}
            >
              {totalFilled}
            </div>
            <div className="text-gray-400">Added</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                totalUploaded > 0 ? "text-green-400" : "text-gray-500"
              }`}
            >
              {totalUploaded}
            </div>
            <div className="text-gray-400">Uploaded</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                totalInProgress > 0 ? "text-gold" : "text-gray-500"
              }`}
            >
              {totalInProgress}
            </div>
            <div className="text-gray-400">In Progress</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                totalErrors > 0 ? "text-red-400" : "text-gray-500"
              }`}
            >
              {totalErrors}
            </div>
            <div className="text-gray-400">Errors</div>
          </div>
        </div>

        {/* Upload button */}
        <button
          onClick={handleUploadAll}
          disabled={
            isUploadingAll ||
            !authToken ||
            totalFilled === 0 ||
            totalFilled === totalUploaded
          }
          className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-gray-900 font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isUploadingAll ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading {totalInProgress}/{totalFilled}...
            </>
          ) : totalUploaded === totalFilled ? (
            `All ${totalFilled} Avatar(s) Uploaded`
          ) : (
            `Upload ${totalFilled - totalUploaded} Avatar(s)`
          )}
        </button>

        {/* Instructions */}
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>• Click on empty slots to add avatars ({maxSlots} maximum)</p>
          <p>• Maximum file size: {maxSizeMB}MB per image</p>
          <p>• Supported formats: JPG, PNG, WebP, GIF</p>
          <p>• You can cancel uploads or retry failed ones</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";

interface AvatarEditorModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  slotId: number;
  slotName: string;
  previewUrl: string | null;
  onConfirmAction: (
    slotId: number,
    croppedBlob: Blob,
    fileName: string
  ) => Promise<void>;
}

export default function AvatarEditorModal({
  isOpen,
  onCloseAction,
  slotId,
  slotName,
  previewUrl,
  onConfirmAction,
}: AvatarEditorModalProps): React.JSX.Element | null {
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScale(1.2);
      setRotation(0);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!editorRef.current || !previewUrl || isProcessing) return;

    setIsProcessing(true);

    try {
      const canvas = editorRef.current.getImageScaledToCanvas();

      // Use WebP for better compression if supported
      const supportsWebP =
        typeof document !== "undefined" &&
        document
          .createElement("canvas")
          .toDataURL("image/webp")
          .indexOf("data:image/webp") === 0;

      const mimeType = supportsWebP ? "image/webp" : "image/jpeg";
      const extension = supportsWebP ? "webp" : "jpg";

      // Create blob with optimized settings
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error("Failed to create image blob"));
            }
          },
          mimeType,
          0.85 // Quality
        );
      });

      const fileName = `avatar-${slotId}-${Date.now()}.${extension}`;
      await onConfirmAction(slotId, blob, fileName);

      // Close modal after successful confirmation
      onCloseAction();
    } catch (error) {
      console.error("Failed to process image:", error);
      alert("Failed to process image. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onCloseAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Customize Avatar {slotId + 1}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{slotName}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-white text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg p-4 flex justify-center min-h-[400px]">
              {previewUrl ? (
                <AvatarEditor
                  ref={editorRef}
                  image={previewUrl}
                  width={400}
                  height={400}
                  border={20}
                  borderRadius={200}
                  scale={scale}
                  rotate={rotation}
                  className="rounded-lg"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="flex items-center justify-center text-gray-400">
                  No image to edit
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zoom: {scale.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  disabled={!previewUrl || isProcessing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rotation: {rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  disabled={!previewUrl || isProcessing}
                />
              </div>
            </div>
          </div>

          <div className="md:w-64 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag image to adjust crop</li>
                <li>• Use sliders for fine-tuning</li>
                <li>• Avatar will be cropped to a circle</li>
                <li>• Final format: 400x400px optimized</li>
                <li>• Keep important content in center</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleConfirm}
                disabled={!previewUrl || isProcessing}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-gray-900 font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </button>
              <button
                onClick={handleClose}
                disabled={isProcessing}
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UploadSlot, AvatarStore } from './types';

const MAX_SLOTS = 3;

// Helper to safely revoke blob URLs
const revokeBlobUrl = (url: string | null) => {
  if (url?.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.warn('Failed to revoke blob URL:', error);
    }
  }
};

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      // Initial state
      slots: [],
      activeIndex: 0,
      editingSlot: null,

      // Initialize only if slots are empty
      initializeSlotsIfEmpty: (max: number = MAX_SLOTS) => {
        const state = get();
        if (state.slots.length === 0) {
          const slots: UploadSlot[] = Array.from({ length: max }, (_, i) => ({
            id: i,
            name: `Avatar ${i + 1}`,
            isFilled: false,
            isUploading: false,
            uploadProgress: 0,
            error: null,
            previewUrl: null,
            cloudinaryUrl: null,
            retryCount: 0,
          }));
          set({ slots, activeIndex: 0, editingSlot: null });
        }
        return state.slots;
      },

      // Update specific slot with partial data
      updateSlot: (id: number, data: Partial<UploadSlot>) => {
        set((state) => ({
          slots: state.slots.map((slot) => {
            if (slot.id === id) {
              // Revoke old preview URL if being replaced
              if (data.previewUrl && data.previewUrl !== slot.previewUrl) {
                revokeBlobUrl(slot.previewUrl);
              }
              return { ...slot, ...data };
            }
            return slot;
          }),
        }));
      },

      // Set active index for carousel
      setActiveIndex: (index: number) => {
        set({ activeIndex: index });
      },

      // Set which slot is being edited
      setEditingSlot: (id: number | null) => {
        set({ editingSlot: id });
      },

      // Reset slot to empty state
      resetSlot: (id: number) => {
        const slot = get().getSlotById(id);
        if (slot) {
          revokeBlobUrl(slot.previewUrl);
        }

        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  id,
                  name: `Avatar ${id + 1}`,
                  isFilled: false,
                  isUploading: false,
                  uploadProgress: 0,
                  error: null,
                  previewUrl: null,
                  cloudinaryUrl: null,
                  retryCount: 0,
                }
              : slot
          ),
        }));
      },

      // Set final URL after successful upload
      setFinalUrl: (id: number, url: string) => {
        const slot = get().getSlotById(id);
        if (slot) {
          revokeBlobUrl(slot.previewUrl);
        }

        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  ...slot,
                  cloudinaryUrl: url,
                  isUploading: false,
                  uploadProgress: 100,
                  error: null,
                  retryCount: 0,
                }
              : slot
          ),
        }));
      },

      // Set error for a slot
      setError: (id: number, message: string) => {
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  ...slot,
                  error: message,
                  isUploading: false,
                }
              : slot
          ),
        }));
      },

      // Start upload process for a slot
      startUpload: (id: number) => {
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  ...slot,
                  isUploading: true,
                  uploadProgress: 0,
                  error: null,
                }
              : slot
          ),
        }));
      },

      // Cancel upload for a slot
      cancelUpload: (id: number) => {
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  ...slot,
                  isUploading: false,
                  uploadProgress: 0,
                  error: 'Upload cancelled',
                }
              : slot
          ),
        }));
      },

      // Increment retry count
      incrementRetry: (id: number) => {
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  ...slot,
                  retryCount: (slot.retryCount || 0) + 1,
                }
              : slot
          ),
        }));
      },

      // Update upload progress
      updateProgress: (id: number, progress: number) => {
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id
              ? {
                  ...slot,
                  uploadProgress: Math.min(100, Math.max(0, progress)),
                }
              : slot
          ),
        }));
      },

      // Getter for active slot
      getActiveSlot: () => {
        const { slots, activeIndex } = get();
        return slots[activeIndex];
      },

      // Getter for slot by ID
      getSlotById: (id: number) => {
        const { slots } = get();
        return slots.find((slot) => slot.id === id);
      },

      // Get slots ready for upload (isFilled && !cloudinaryUrl)
      getSlotsForUpload: () => {
        const { slots } = get();
        return slots.filter((slot) => slot.isFilled && !slot.cloudinaryUrl);
      },

      // Check if any uploads are in progress
      hasActiveUploads: () => {
        const { slots } = get();
        return slots.some((slot) => slot.isUploading);
      },

      // Cleanup all temporary data
      cleanupTemporaryData: () => {
        const { slots } = get();
        slots.forEach((slot) => {
          revokeBlobUrl(slot.previewUrl);
        });
      },
    }),
    {
      name: 'tipjar-avatar-upload-store',
      partialize: (state) => ({
        slots: state.slots.map((slot) => ({
          ...slot,
          previewUrl: null, // Don't persist blob URLs
          isUploading: false,
          uploadProgress: 0,
          error: null,
          // Keep cloudinaryUrl and other metadata
        })),
        activeIndex: state.activeIndex,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // Initialize empty slots only if store was empty
            if (state.slots.length === 0) {
              state.initializeSlotsIfEmpty(MAX_SLOTS);
            }
          }
        };
      },
    }
  )
);

// src/lib/store/types.ts

// Upload process status
export type UploadStatus = 'pending' | 'uploading' | 'success' | 'error' | 'cancelled';

// Definition of a single slot in the carousel
export interface UploadSlot {
  id: number;
  name: string;
  isFilled: boolean;
  isUploading: boolean;
  uploadProgress: number; // 0-100
  error: string | null;
  retryCount: number;

  // Temporary preview (blob URL)
  previewUrl: string | null;

  // Permanent data (from backend)
  cloudinaryUrl: string | null;
}

// Store state definition
export interface AvatarStoreState {
  slots: UploadSlot[];
  activeIndex: number;
  editingSlot: number | null;
}

// Store actions definition
export interface AvatarStoreActions {
  // Initialization
  initializeSlotsIfEmpty: (max?: number) => UploadSlot[];

  // Slot operations
  updateSlot: (id: number, data: Partial<UploadSlot>) => void;
  setActiveIndex: (index: number) => void;
  setEditingSlot: (id: number | null) => void;
  resetSlot: (id: number) => void;
  setFinalUrl: (id: number, url: string) => void;
  setError: (id: number, message: string) => void;

  // Upload management
  startUpload: (id: number) => void;
  cancelUpload: (id: number) => void;
  updateProgress: (id: number, progress: number) => void;
  incrementRetry: (id: number) => void;

  // Getters
  getActiveSlot: () => UploadSlot | undefined;
  getSlotById: (id: number) => UploadSlot | undefined;
  getSlotsForUpload: () => UploadSlot[];
  hasActiveUploads: () => boolean;

  // Cleanup
  cleanupTemporaryData: () => void;
}

// Combined type for Zustand hook
export type AvatarStore = AvatarStoreState & AvatarStoreActions;


import axios, { AxiosRequestConfig } from 'axios';
import { useAvatarStore } from '@/lib/store/avatarUploadStore';
import type { UploadSlot } from '@/lib/store/types';
import { getUploadController } from './uploadController';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

// File validation
export function validateImageFile(file: File, maxSizeMB: number = 5): string | null {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (!validTypes.some(type => file.type.includes(type))) {
    return 'Unsupported file format. Use JPG, PNG, WebP or GIF.';
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File is too large. Maximum size is ${maxSizeMB}MB.`;
  }

  return null;
}

// Helper to determine file extension from mime type
export function getFileExtension(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  return mimeToExt[mimeType] || 'jpg';
}

// Process EXIF orientation if needed
export async function fixImageOrientation(file: File): Promise<File> {
  try {
    // If the browser already handles EXIF, return original
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      return file;
    }
    return file;
  } catch (error) {
    console.warn('Failed to process EXIF data:', error);
    return file;
  }
}

// Create optimized blob with proper extension
export async function createOptimizedBlob(
  canvas: HTMLCanvasElement,
  mimeType: string = 'image/webp',
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      },
      mimeType,
      quality
    );
  });
}

// Helper for exponential backoff
const wait = (retryCount: number) => 
  new Promise(resolve => 
    setTimeout(resolve, BASE_DELAY_MS * Math.pow(2, retryCount))
  );

// Main upload function with retry logic
export const uploadAvatarImage = async (
  slotId: number,
  blob: Blob,
  fileName: string,
  token: string
): Promise<{ cloudinaryUrl: string }> => {
  const store = useAvatarStore.getState();
  const uploadController = getUploadController();
  const slot = store.getSlotById(slotId);

  if (!slot) {
    throw new Error('Slot not found');
  }

  // Check if already uploaded
  if (slot.cloudinaryUrl) {
    return { cloudinaryUrl: slot.cloudinaryUrl };
  }

  // Check retry limit
  if (slot.retryCount >= MAX_RETRIES) {
    store.setError(slotId, `Max retry attempts (${MAX_RETRIES}) reached`);
    throw new Error('Max retry attempts reached');
  }

  // Create abort controller for cancellation
  const abortController = uploadController.create(slotId);

  // Prepare FormData
  const formData = new FormData();
  formData.append('file', blob, fileName);
  formData.append('slotId', slotId.toString());
  formData.append('fileName', fileName);

  // Axios configuration with cancellation support
  const config: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    signal: abortController.signal,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        store.updateProgress(slotId, percent);
      }
    },
    timeout: 30000, // 30 seconds timeout
  };

  const attemptUpload = async (currentRetryCount: number = 0): Promise<{ cloudinaryUrl: string }> => {
    try {
      // Start upload
      store.startUpload(slotId);

      // Make API call
      const response = await axios.post(
        `${API_URL}/upload/avatar`,
        formData,
        config
      );

      if (!response.data.cloudinaryUrl) {
        throw new Error('No URL returned from server');
      }

      // Complete upload successfully
      store.setFinalUrl(slotId, response.data.cloudinaryUrl);
      uploadController.complete(slotId);

      return response.data;
    } catch (error) {
      // Handle cancellation
      if (axios.isCancel(error)) {
        store.cancelUpload(slotId);
        uploadController.complete(slotId);
        throw new Error('Upload cancelled');
      }

      // Handle retry logic
      if (currentRetryCount < MAX_RETRIES - 1) {
        // Increment retry count in store
        store.incrementRetry(slotId);

        // Wait with exponential backoff
        await wait(currentRetryCount);

        console.log(`Retrying upload for slot ${slotId}, attempt ${currentRetryCount + 2}`);
        return attemptUpload(currentRetryCount + 1);
      }

      // Determine error type
      let errorMessage = 'Upload failed';
      let errorType = 'server';

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || !error.response) {
          errorMessage = 'Network error - check your connection';
          errorType = 'network';
        } else if (error.response.status === 401) {
          errorMessage = 'Authentication failed - please log in again';
          errorType = 'auth';
        } else if (error.response.status === 413) {
          errorMessage = 'File too large - please use a smaller image';
          errorType = 'validation';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error - please try again later';
          errorType = 'server';
        } else {
          errorMessage = error.response.data?.message || error.response.statusText;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Mark as permanent failure
      store.setError(slotId, `${errorType.toUpperCase()}: ${errorMessage} (${MAX_RETRIES} retries failed)`);
      uploadController.complete(slotId);
      throw new Error(errorMessage);
    }
  };

  return attemptUpload(slot.retryCount || 0);
};

// Utility functions
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokePreviewUrl(url: string | null): void {
  if (url?.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.warn('Failed to revoke preview URL:', error);
    }
  }
}

// Check if upload can be retried
export function canRetryUpload(slot: UploadSlot): boolean {
  return (
    slot.error !== null &&
    !slot.isUploading &&
    (slot.retryCount || 0) < MAX_RETRIES
  );
}

// Get human-readable error message
export function getErrorMessage(error: string | null): string {
  if (!error) return '';

  if (error.includes('NETWORK:')) {
    return 'Network error - please check your connection';
  } else if (error.includes('AUTH:')) {
    return 'Authentication error - please log in again';
  } else if (error.includes('VALIDATION:')) {
    return 'File validation error - please check file format and size';
  } else if (error.includes('Upload cancelled')) {
    return 'Upload cancelled';
  }

  return error.replace(/^[A-Z]+: /, '');
}

class UploadController {
  private controllers = new Map<number, AbortController>();

  create(slotId: number): AbortController {
    this.cancel(slotId); // Cancel existing if any

    const controller = new AbortController();
    this.controllers.set(slotId, controller);
    return controller;
  }

  get(slotId: number): AbortController | undefined {
    return this.controllers.get(slotId);
  }

  cancel(slotId: number): void {
    const controller = this.controllers.get(slotId);
    if (controller) {
      controller.abort();
      this.controllers.delete(slotId);
    }
  }

  complete(slotId: number): void {
    this.controllers.delete(slotId);
  }

  cancelAll(): void {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }

  hasActive(slotId: number): boolean {
    return this.controllers.has(slotId);
  }
}

// Singleton instance
let instance: UploadController | null = null;

export const getUploadController = (): UploadController => {
  if (!instance) {
    instance = new UploadController();
  }
  return instance;
};

export const resetUploadController = (): void => {
  instance?.cancelAll();
  instance = null;
};


Doskonały pomysł! To jest bardzo dobra architektura - skalowalna, tania i wydajna. W pełni popieram ten kierunek.Architektura Media Pipeline - pełna implementacja1.Struktura projektutipjar/
├── frontend/           # Next.js 14 (już masz)
├── supabase/
│   ├── functions/      # Supabase Edge Functions
│   └── migrations/     # Supabase DB schemas
└── backend/           # NestJS API (reszta logiki)2.Supabase Edge Function - /storj-upload-sign// supabase/functions/storj-upload-sign/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { S3Client, PutObjectCommand } from "https://esm.sh/@aws-sdk/client-s3@3.478.0";
import { getSignedUrl } from "https://esm.sh/@aws-sdk/s3-request-presigner@3.478.0";const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", };serve(async (req) => { // Handle CORS preflight if (req.method === "OPTIONS") { return new Response("ok", { headers: corsHeaders }); }try { // 1. Verify JWT from Supabase Auth const authHeader = req.headers.get("Authorization"); if (!authHeader) { return new Response( JSON.stringify({ error: "No authorization header" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); }const supabaseClient = createClient( Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! );const token = authHeader.replace("Bearer ", ""); const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);if (authError || !user) { return new Response( JSON.stringify({ error: "Invalid token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); }// 2. Parse request body const body = await req.json(); const { slotId = 0, fileName = "avatar.webp", contentType = "image/webp", folder = "avatars" } = body;// Validate slot if (slotId < 0 || slotId > 2) { return new Response( JSON.stringify({ error: "Invalid slotId (0-2 only)" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); }// 3. Generate S3 key (path in Storj) const timestamp = Date.now(); const safeFileName = fileName.replace(/[^a-zA-Z0-9_.-]/g, "_"); const s3Key = ${folder}/${user.id}/${slotId}/${timestamp}_${safeFileName};// 4. Initialize Storj (S3-compatible) client const s3Client = new S3Client({ endpoint: Deno.env.get("STORJ_ENDPOINT") || "https://gateway.storjshare.io", region: Deno.env.get("STORJ_REGION") || "us-east-1", credentials: { accessKeyId: Deno.env.get("STORJ_ACCESS_KEY")!, secretAccessKey: Deno.env.get("STORJ_SECRET_KEY")!, }, forcePathStyle: true, });// 5. Generate presigned URL (valid for 15 minutes) const command = new PutObjectCommand({ Bucket: Deno.env.get("STORJ_BUCKET")!, Key: s3Key, ContentType: contentType, ACL: "public-read", Metadata: { "user-id": user.id, "slot-id": slotId.toString(), "upload-timestamp": timestamp.toString(), }, });const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 }); const publicUrl = ${Deno.env.get("STORJ_PUBLIC_URL") || https://${Deno.env.get("STORJ_BUCKET")}.${Deno.env.get("STORJ_GATEWAY") || "gateway.storjshare.io"}}/${s3Key};// 6. Create database record (pending state) const { error: dbError } = await supabaseClient .from("user_avatars") .upsert({ user_id: user.id, slot_id: slotId, s3_key: s3Key, public_url: publicUrl, file_name: fileName, content_type: contentType, status: "pending", metadata: { original_filename: fileName, upload_timestamp: timestamp, storage_provider: "storj", }, updated_at: new Date().toISOString(), }, { onConflict: "user_id,slot_id" });if (dbError) { console.error("Database error:", dbError); // Continue anyway - upload can still proceed }// 7. Return signed URL to frontend return new Response( JSON.stringify({ success: true, presignedUrl, publicUrl, s3Key, uploadId: ${user.id}_${slotId}_${timestamp}, expiresAt: Date.now() + 900000, // 15 minutes }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 } );} catch (error) { console.error("Edge Function error:", error); return new Response( JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); } });3.Edge Function - /storj-upload-confirm// supabase/functions/storj-upload-confirm/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", };serve(async (req) => { if (req.method === "OPTIONS") { return new Response("ok", { headers: corsHeaders }); }try { const authHeader = req.headers.get("Authorization"); if (!authHeader) { return new Response( JSON.stringify({ error: "No authorization header" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); }const supabaseClient = createClient( Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! );const token = authHeader.replace("Bearer ", ""); const { data: { user } } = await supabaseClient.auth.getUser(token);if (!user) { return new Response( JSON.stringify({ error: "Invalid token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); }const body = await req.json(); const { s3Key, success = true, etag, fileSize } = body;// Update database record const { error: dbError } = await supabaseClient .from("user_avatars") .update({ status: success ? "completed" : "failed", etag: etag, file_size: fileSize, uploaded_at: new Date().toISOString(), updated_at: new Date().toISOString(), }) .eq("s3_key", s3Key) .eq("user_id", user.id);if (dbError) { console.error("Database update error:", dbError); return new Response( JSON.stringify({ error: "Failed to update database" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); }// Optional: Trigger webhook to NestJS backend if (success && Deno.env.get("WEBHOOK_URL")) { fetch(Deno.env.get("WEBHOOK_URL")!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "avatar_uploaded", userId: user.id, s3Key, timestamp: new Date().toISOString(), }), }).catch(console.error); }return new Response( JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } } );} catch (error) { console.error("Confirmation error:", error); return new Response( JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } } ); } });4.Supabase Database Schema-- user_avatars table
CREATE TABLE IF NOT EXISTS user_avatars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_id INTEGER NOT NULL CHECK (slot_id >= 0 AND slot_id <= 2),
  s3_key TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT,
  content_type TEXT,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'uploading', 'completed', 'failed')),
  etag TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  uploaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),UNIQUE(user_id, slot_id), UNIQUE(s3_key) );-- Indexes for performance CREATE INDEX idx_user_avatars_user_id ON user_avatars(user_id); CREATE INDEX idx_user_avatars_status ON user_avatars(status); CREATE INDEX idx_user_avatars_s3_key ON user_avatars(s3_key);-- RLS Policies ALTER TABLE user_avatars ENABLE ROW LEVEL SECURITY;-- Users can only see their own avatars CREATE POLICY "Users can view own avatars" ON user_avatars FOR SELECT USING (auth.uid() = user_id);-- Users can insert/update their own avatars CREATE POLICY "Users can manage own avatars" ON user_avatars FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);5.Frontend - Zaktualizowany avatarUpload.ts// avatarUpload.ts - NOWA WERSJA
import axios from 'axios';
import { useAvatarStore } from '@/lib/store/avatarUploadStore';
import { getUploadController } from './uploadController';const SUPABASE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL || 'https://<project>.supabase.co/functions/v1';// 1. Get presigned URL from Supabase Edge Function const getPresignedUrl = async ( slotId: number, fileName: string, contentType: string, supabaseToken: string ): Promise<{ presignedUrl: string; publicUrl: string; s3Key: string; uploadId: string; }> => { const response = await axios.post( ${SUPABASE_FUNCTIONS_URL}/storj-upload-sign, { slotId, fileName, contentType, folder: 'avatars' }, { headers: { 'Authorization': Bearer ${supabaseToken}, 'Content-Type': 'application/json', }, } );return response.data; };// 2. Confirm upload to Edge Function const confirmUpload = async ( s3Key: string, success: boolean, etag?: string, fileSize?: number, supabaseToken?: string ) => { if (!supabaseToken) return;try { await axios.post( ${SUPABASE_FUNCTIONS_URL}/storj-upload-confirm, { s3Key, success, etag, fileSize, }, { headers: { 'Authorization': Bearer ${supabaseToken}, 'Content-Type': 'application/json', }, } ); } catch (error) { console.error('Failed to confirm upload (non-critical):', error); } };// 3. Main upload function export const uploadAvatarImage = async ( slotId: number, blob: Blob, fileName: string, supabaseToken: string | null ): Promise<{ publicUrl: string }> => { const store = useAvatarStore.getState(); const uploadController = getUploadController(); const slot = store.getSlotById(slotId);if (!slot || !supabaseToken) { throw new Error('Slot not found or no auth token'); }// Check retry limit if (slot.retryCount >= 3) { store.setError(slotId, Max retry attempts (3) reached); throw new Error('Max retry attempts reached'); }const abortController = uploadController.create(slotId);try { // Step 1: Get presigned URL from Edge Function store.startUpload(slotId); store.updateProgress(slotId, 10);const presignedData = await getPresignedUrl( slotId, fileName, blob.type, supabaseToken );store.updateProgress(slotId, 30);// Step 2: Upload directly to Storj using presigned URL const uploadResponse = await axios.put(presignedData.presignedUrl, blob, { headers: { 'Content-Type': blob.type, }, signal: abortController.signal, onUploadProgress: (progressEvent) => { if (progressEvent.total) { // Calculate progress (30% to 95%) const uploadPercent = Math.round((progressEvent.loaded * 65) / progressEvent.total); store.updateProgress(slotId, 30 + uploadPercent); } }, timeout: 60000, // 60 seconds for large files });// Get ETag from response headers const etag = uploadResponse.headers?.etag; const fileSize = blob.size;store.updateProgress(slotId, 95);// Step 3: Confirm upload to Edge Function await confirmUpload( presignedData.s3Key, true, etag, fileSize, supabaseToken );// Step 4: Update local state store.setFinalUrl(slotId, presignedData.publicUrl); store.updateProgress(slotId, 100); uploadController.complete(slotId);return { publicUrl: presignedData.publicUrl };} catch (error) { // Handle cancellation if (axios.isCancel(error)) { store.cancelUpload(slotId); uploadController.complete(slotId); throw new Error('Upload cancelled'); }// Handle retry logic if (slot.retryCount < 2) { store.incrementRetry(slotId); uploadController.complete(slotId);// Exponential backoff await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, slot.retryCount)) );console.log(Retrying upload for slot ${slotId}, attempt ${slot.retryCount + 1}); return uploadAvatarImage(slotId, blob, fileName, supabaseToken); }// Permanent failure store.setError(slotId, Upload failed after 3 attempts); uploadController.complete(slotId); throw error; } };// 4. Load user's avatars from Supabase export const loadUserAvatars = async (supabaseToken: string) => { try { const { createClient } = await import('@supabase/supabase-js');const supabase = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! );// Set session for RLS await supabase.auth.setSession({ access_token: supabaseToken, refresh_token: '', });const { data: avatars, error } = await supabase .from('user_avatars') .select('*') .eq('status', 'completed') .order('slot_id', { ascending: true });if (error) throw error;return avatars.map(avatar => ({ id: avatar.slot_id, name: avatar.file_name || Avatar ${avatar.slot_id + 1}, isFilled: true, isUploading: false, uploadProgress: 100, error: null, previewUrl: null, cloudinaryUrl: avatar.public_url, // Still called cloudinaryUrl for compatibility retryCount: 0, })); } catch (error) { console.error('Failed to load avatars:', error); return []; } };6.Frontend - Update AvatarUploader.tsx// In AvatarUploader.tsx - Dodaj useEffect do ładowania avatarów
useEffect(() => {
  const loadExistingAvatars = async () => {
    if (authToken) {
      try {
        const existingAvatars = await loadUserAvatars(authToken);
        existingAvatars.forEach(avatar => {
          updateSlot(avatar.id, avatar);
        });
      } catch (error) {
        console.error('Failed to load avatars:', error);
      }
    }
  };loadExistingAvatars(); }, [authToken]);// Zmień handleRemove aby usuwało z Supabase const handleRemove = async (slotId: number) => { if (authToken) { try { // Usuń z Supabase const { createClient } = await import('@supabase/supabase-js'); const supabase = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! );await supabase.auth.setSession({ access_token: authToken, refresh_token: '', });await supabase .from('user_avatars') .delete() .eq('slot_id', slotId); } catch (error) { console.error('Failed to delete from Supabase:', error); } }// Local cleanup const uploadController = getUploadController(); uploadController.cancel(slotId); filesRef.current.delete(slotId); resetSlot(slotId); };7.Environment Variables.env.local (Frontend):NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL=https://your-project.supabase.co/functions/v1Supabase Edge Functions Environment:Deploy with environment variablessupabase functions deploy storj-upload-sign --env-file ./supabase/.env.env file for Edge FunctionsSTORJ_ENDPOINT=https://gateway.storjshare.io STORJ_ACCESS_KEY=your-access-key STORJ_SECRET_KEY=your-secret-key STORJ_BUCKET=your-bucket-name STORJ_GATEWAY=gateway.storjshare.io STORJ_REGION=us-east-1 STORJ_PUBLIC_URL=https://your-bucket.gateway.storjshare.ioSUPABASE_URL=https://your-project.supabase.co SUPABASE_SERVICE_ROLE_KEY=your-service-role-keyWEBHOOK_URL=https://your-nestjs-backend.com/api/webhooks/avatar-uploaded8.Deployment Steps1. Install Supabase CLInpm install -g supabase2. Login to Supabasesupabase login3. Deploy Edge Functionssupabase functions deploy storj-upload-sign supabase functions deploy storj-upload-confirm4. Set environment variablessupabase secrets set --env-file ./supabase/.env5. Run database migrationssupabase db push9.Advantages of This Architecture✅ Zero bandwidth cost - files go directly to Storj ✅ Serverless scalability - Edge Functions auto-scale ✅ Built-in RLS - Supabase handles security ✅ Real-time updates - can use Supabase Realtime for live progress ✅ Cost-effective - pay per execution, not 24/7 server ✅ Simple maintenance - no server management10.Optional: Webhook to NestJS BackendJeśli Twój NestJS backend potrzebuje wiedzieć o uploadach:// NestJS Webhook Controller
@Controller('webhooks')
export class WebhookController {
  @Post('avatar-uploaded')
  @UseGuards(WebhookAuthGuard) // Verify webhook signature
  async handleAvatarUpload(@Body() payload: any) {
    // Sync with your main database if needed
    await this.prisma.avatar.upsert({
      where: { 
        userId_slotId: { 
          userId: payload.userId, 
          slotId: payload.slotId 
        } 
      },
      update: { 
        publicUrl: payload.publicUrl,
        storageProvider: 'storj',
        updatedAt: new Date(),
      },
      create: {
        userId: payload.userId,
        slotId: payload.slotId,
        publicUrl: payload.publicUrl,
        storageProvider: 'storj',
        s3Key: payload.s3Key,
      },
    });return { received: true }; } }To jest produkcyjny, skalowalny system. Frontend komunikuje się tylko z Supabase, pliki lecą bezpośrednio do Storj, a Supabase zarządza metadanymi i autentykacją.
    

Doskonała Architektura Media Pipeline: Scalable, Serverless, Secure

W pełni popieramy ten kierunek.

Osiągnąłeś optymalny model Uploadu Bezpośredniego (Direct Upload) z wykorzystaniem Podpisanych URL (Presigned URLs). Architektura jest skalowalna, eliminuje wąskie gardła w backendzie i jest wysoce kosztowo-efektywna, ponieważ pliki nigdy nie przechodzą przez Twoją warstwę NestJS/Supabase, oszczędzając przepustowość serwera.

Przepływ danych w architekturze Presigned URLPoniższy schemat wizualizuje, jak autoryzowany klient uzyskuje tymczasowe uprawnienia do pominięcia serwera i bezpiecznego przesłania pliku bezpośrednio do Storj.
Cykl życia uploadu: Krok po kroku

1. Żądanie Podpisania (Edge Function)
Frontend wysyła żądanie do Edge Function/storj-upload-sign wraz z tokenem JWT użytkownika. Funkcja weryfikuje użytkownika, generuje unikalny klucz S3, tworzy rekord 'pending' w DB, a następnie generuje i zwraca bezpieczny, czasowy (15 min) Podpisany URL.

2. Bezpośredni Upload (Frontend do Storj)
Frontend wykorzystuje otrzymany Presigned URL do wykonania bezpośredniego żądania PUT do Storj (S3). Cały duży ładunek pliku trafia bezpośrednio do chmury, omijając w pełni backend. Postęp jest śledzony po stronie klienta (w axios).

3. Potwierdzenie (Edge Function & NestJS)
Po udanym zakończeniu uploadu, frontend wysyła żądanie do Edge Function/storj-upload-confirmz kluczem S3 i opcjonalnym ETag. Funkcja aktualizuje status rekordu w DB na 'completed' i opcjonalnie wyzwala Webhook do NestJS w celu dalszego asynchronicznego przetwarzania (np. generowania miniaturek).

Funkcja Edge:
/storj-upload-sign (Supabase Edge Function)Ta funkcja jest kluczowa dla bezpieczeństwa: uwierzytelnia użytkownika, autoryzuje upload, generuje klucz S3, inicjuje rekord w DB i zwraca Presigned URL. Używa service_role_key do bezpiecznej komunikacji z DB.
// Fragment: Weryfikacja JWT, generowanie klucza S3 i Podpisanego URL
// 1. Verify JWT from Supabase Auth
// 2. Parse request body
// 3. Generate S3 key (path in Storj)
// 4. Initialize Storj (S3-compatible) client
// 5. Generate presigned URL (valid for 15 minutes)
// ... [kod Edge Function] ...
/storj-upload-confirm (Supabase Edge Function)Ta funkcja kończy transakcję: zmienia status w bazie na 'completed' i jest odpowiedzialna za uruchomienie dalszych procesów (np. webhooka do NestJS) po uploadzie.
// Fragment: Aktualizacja rekordu DB po uploadzie
// ... [weryfikacja użytkownika] ...
// Update database record
    .update({
        status: success ? "completed" : "failed",
        etag: etag,
        file_size: fileSize,
        uploaded_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    })
    .eq("s3_key", s3Key)
    .eq("user_id", user.id);
// ... [kod Edge Function] ...
Kluczowe zalety tej Architektury•Zero kosztów przepustowości serwera: Pliki trafiają prosto do Storj/S3, oszczędzając NestJS i Supabase ruchu.•Skalowalność Serverless: Edge Functions i Supabase auto-skalują się, aby obsłużyć miliony żądań podpisania.•Wbudowane RLS: Supabase natywnie zarządza uprawnieniami (kto może widzieć/usuwać co).•Pełna serverless: Eliminacja zarządzania własnym serwerem do obsługi uploadu dużych plików.Zaawansowana obsługa błędów: Wbudowana logika ponawiania (retry) po stronie klienta z wykładniczym czasem oczekiwania (Exponential Backoff).
Schema bazy danych: user_avatarsTabela przechowuje niezbędne metadane pliku, ścieżkę do Storj (s3_key) i co najważniejsze: status uploadu (pending/completed).
-- Fragment: user_avatars table
CREATE TABLE IF NOT EXISTS user_avatars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_id INTEGER NOT NULL CHECK (slot_id >= 0 AND slot_id <= 2),
  s3_key TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'uploading', 'completed', 'failed')),
  UNIQUE(user_id, slot_id),
);
-- Fragment: RLS Policies ALTER TABLE user_avatars ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view own avatars" ON user_avatars FOR SELECT USING (auth.uid() = user_id); CREATE POLICY "Users can manage own avatars" ON user_avatars FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);Uwaga: Zaimplementowane polityki RLS (Row Level Security) gwarantują, że użytkownicy mogą modyfikować tylko swoje własne awatary, co jest krytycznym elementem bezpieczeństwa.

Logika uploadu (avatarUpload.ts)Logika po stronie klienta jest podzielona na kroki: żądanie URL, upload (z mierzeniem postępu i możliwością anulowania) oraz potwierdzenie. Kluczowe jest użycie axios.put bezpośrednio na Storj.// Fragment: Główna funkcja uploadu z obsługą Presigned URL
// Step 1: Get presigned URL from Edge Function const presignedData = await getPresignedUrl(slotId, fileName, blob.type, supabaseToken);
// Step 2: Upload directly to Storj using presigned URL const uploadResponse = await axios.put(presignedData.presignedUrl, blob, { // ... [nagłówki i mierzenie postępu] ... signal: abortController.signal, onUploadProgress: (progressEvent) => { ... }, });// Step 3: Confirm upload to Edge Function await confirmUpload(presignedData.s3Key, true, etag, fileSize, supabaseToken);// ... [kod frontendu] ...
Logika usuwania i wczytywaniaWczytywanie awatarów korzysta z RLS (Row Level Security) Supabase, co zapewnia, że użytkownik pobiera tylko swoje pliki. Usuwanie jest prostą operacją DELETE w Supabase, co automatycznie czyści rekord i usuwa plik z kontekstu użytkownika.// Fragment: Funkcja handleRemove
await supabase
  .from('user_avatars')
  .delete()
  .eq('slot_id', slotId);
  
Funkcja Edge: storj-upload-signFunkcja storj-upload-sign jest strażnikiem bezpieczeństwa i punktem inicjującym cały proces uploadu. Jej głównym celem jest bezpieczne delegowanie uprawnień do przesyłania plików z serwera bezpośrednio do Storj/S3, bez ujawniania jakichkolwiek kluczy dostępu po stronie klienta (frontend).

Krok 1: Uwierzytelnienie JWT
Funkcja pobiera token JWT z nagłówka Authorization i używa Supabase, aby zweryfikować jego ważność. W przypadku niepowodzenia zwraca błąd 401. To zapewnia, że tylko zalogowani użytkownicy mogą zainicjować upload.
Krok 2: Walidacja Żądania
Parsowane są dane z ciała żądania, w tym slotId, fileName i contentType. slot Id jest krytycznie walidowane, aby upewnić się, że jest w zakresie 0-2, zapobiegając nieautoryzowanemu użyciu slotów.
Krok 3: Generowanie Klucza S3
Tworzony jest unikalny klucz S3 (ścieżka pliku) o strukturze ${folder}/$ {user.id}/${slotId}/$ {timestamp}_${safeFileName}. Użycie user.iditimestamp zapewnia, że ścieżka jest unikalna i powiązana z konkretnym użytkownikiem.
Krok 4: Generowanie Presigned URL
Funkcja tworzy PutObjectCommand i używa getSignedUrl z pakietu AWS SDK do wygenerowania adresu URL, który upoważnia klienta do wykonania operacji PUT przez 15 minut. W tym momencie uprawnienia Storj są tylko tymczasowo delegowane do klienta.
Krok 5: Rejestracja Rekordu w DB
Rekord uploadu jest natychmiast zapisywany lub aktualizowany w tabeli user_avatars ze statusem 'pending'. To jest kluczowy krok kontrolny, umożliwiający śledzenie postępu i zarządzanie potencjalnymi błędami (np. nieukończony upload).
Krok 6: Zwrócenie Danych
Funkcja zwraca Presigned URL, który jest używany do bezpośredniego uploadu, oraz Publiczny URL, który jest używany do wyświetlenia awatara po jego pomyślnym przesłaniu.

Dlaczego ta funkcja jest bezpieczna?Mechanizm Podpisanych URL w połączeniu z funkcjami Edge jest fundamentalnie bezpieczniejszy niż tradycyjny upload przez serwer:•Izolacja Kluczy: Klucze dostępowe Storj (STORJ_ACCESS_KEY, STORJ_SECRET_KEY) są przechowywane tylko w bezpiecznym środowisku Edge Function (Supabase Secrets) i nigdy nie są widoczne w kodzie frontendowym.Ograniczenie Czasowe: Wygenerowany Presigned URL jest ważny tylko przez 15 minut (expiresIn: 900), minimalizując ryzyko jego nadużycia.•Kontrola Autoryzacji: Każde żądanie uploadu musi być poprzedzone poprawnym uwierzytelnieniem JWT, co uniemożliwia anonimowe inicjowanie procesu.Wbudowana Metadana: Kluczowe dane (user-id, slot-id) są wbudowane w metadane obiektu S3 i w rekord DB, zapewniając audyt i poprawność powiązania pliku z użytkownikiem.

Funkcja Edge: storj-upload-confirmFunkcja storj-upload-confirm służy jako 'ostateczny uścisk dłoni' między frontendem a backendem. Jej kluczową rolą jest przyjęcie informacji o zakończeniu bezpośredniego uploadu do Storj (status, ETag, rozmiar pliku) i zaktualizowanie rekordu w bazie danych Supabase. To oficjalnie przenosi plik ze stanu 'pending' do 'completed'. 

5 kroków finalizacji uploadu
Krok 1: Weryfikacja Autoryzacji
O2odobnie jak w funkcji sign, weryfikowany jest token JWT, aby upewnić się, że to ten sam, uwierzytelniony użytkownik próbuje potwierdzić upload swojego pliku. Zapobiega to przejęciu lub fałszywemu potwierdzeniu.Krok 2: Po czybranie Metadanych Uploadu. Do drzewunkcja pobie sexyra z frontendu unikalny klucz S3 (s3Key), status (success), ETag i rozmiar pliku (fileSize). ETag i rozmiar są dowodem na pomyślne zakończenie transferu pliku do Storj. Dec