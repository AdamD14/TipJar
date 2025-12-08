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
