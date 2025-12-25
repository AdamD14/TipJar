"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { useAvatarStore } from "@/lib/store/avatarUploadStore";
import { validateImageFile } from "@/lib/upload/avatarUpload";

import AvatarPreviewSlide from "./AvatarPreviewSlide";
import AvatarEditorModal from "./AvatarEditorModal";

interface AvatarUploaderProps {
  onUploadCompleteAction: (urls: string[]) => void;
  maxSlots?: number;
  initialUrls?: string[];
  authToken?: string | null;
  userId?: string;
}

// Helper to calculate circular offset
const getCircularOffset = (
  index: number,
  focusedIndex: number,
  length: number
) => {
  let offset = (index - focusedIndex) % length;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
};

export default function AvatarUploader({
  onUploadCompleteAction,
  maxSlots = 3,
  initialUrls = [],
  authToken = null,
  userId = undefined,
}: AvatarUploaderProps) {
  const {
    slots,
    fileRegistry,
    initializeSlotsIfEmpty,
    setInitialSlots,
    setFileForSlot,
    removeFileFromSlot,
    performUploadAll,
    setAuthToken,
    setUserId,
  } = useAvatarStore();

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<number | null>(null);
  const [tempPreviewUrl, setTempPreviewUrl] = useState<string | null>(null);

  // Initialize slots
  useEffect(() => {
    if (initialUrls.length > 0 && slots.length === 0) {
      setInitialSlots(initialUrls);
    } else {
      initializeSlotsIfEmpty(maxSlots);
      // Validate persistence (clear ghosts)
      useAvatarStore.getState().validateSlots();
    }
  }, [
    maxSlots,
    initialUrls,
    initializeSlotsIfEmpty,
    setInitialSlots,
    slots.length,
  ]);

  // Sync auth data
  useEffect(() => {
    setAuthToken(authToken);
  }, [authToken, setAuthToken]);

  useEffect(() => {
    if (userId) setUserId(userId);
  }, [userId, setUserId]);

  // Cleanup temp preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (tempPreviewUrl) URL.revokeObjectURL(tempPreviewUrl);
    };
  }, [tempPreviewUrl]);

  // Completion check - trigger only when all filled slots have valid cloudinaryUrl
  useEffect(() => {
    const filledSlots = slots.filter((s) => s.isFilled);

    if (filledSlots.length === 0) {
      // Nic nie wypełnione – nie wyzwalaj
      return;
    }

    const uploadedUrls = filledSlots
      .map((s) => s.cloudinaryUrl)
      .filter((url): url is string => !!url && url.length > 0);

    console.log("[DEBUG] Filled slots:", filledSlots.length, "Uploaded URLs:", uploadedUrls.length);
    console.log("[DEBUG] cloudinaryUrls:", filledSlots.map(s => s.cloudinaryUrl?.substring(0, 50)));

    if (uploadedUrls.length === filledSlots.length) {
      onUploadCompleteAction(uploadedUrls);
    }
  }, [slots, onUploadCompleteAction]);

  const handleFileSelect = useCallback(
    (id: number, file: File) => {
      const err = validateImageFile(file);
      if (err) return alert(err);

      // Revoke previous if exists
      if (tempPreviewUrl) URL.revokeObjectURL(tempPreviewUrl);

      setEditingSlotId(id);
      setTempPreviewUrl(URL.createObjectURL(file));
      setModalOpen(true);
    },
    [tempPreviewUrl]
  );

  const handleEditorConfirm = (
    slotId: number,
    blob: Blob,
    fileName: string
  ) => {
    const file = new File([blob], fileName, { type: blob.type });
    // Preview URL for the slot will be managed by store (store doesn't assume revoke ownership usually, but we should be careful)
    // The store 'setFileForSlot' takes a previewUrl.
    const previewUrl = URL.createObjectURL(file);

    setFileForSlot(slotId, file, previewUrl);
    setModalOpen(false);

    // Cleanup local temp
    if (tempPreviewUrl) {
      URL.revokeObjectURL(tempPreviewUrl);
      setTempPreviewUrl(null);
    }
    setEditingSlotId(null);
  };

  const handleEditSlot = (slotId: number) => {
    const existingFile = fileRegistry[slotId];
    if (existingFile) {
      if (tempPreviewUrl) URL.revokeObjectURL(tempPreviewUrl);

      setEditingSlotId(slotId);
      setTempPreviewUrl(URL.createObjectURL(existingFile));
      setModalOpen(true);
    } else {
      // Fallback if no file in registry (e.g. initialUrl mode)
      alert(
        "Cannot edit this avatar (missing source file). Please remove and add a new one."
      );
    }
  };

  const handleFinalUpload = async () => {
    console.log(
      "handleFinalUpload – stan store przed uploadem:",
      useAvatarStore.getState()
    );
    try {
      await performUploadAll();
    } catch (e) {
      console.error("Upload failed", e);
      alert("An error occurred during upload. Please try again.");
    }
  };

  const handlePrev = () =>
    setFocusedIndex((p) => (p - 1 + slots.length) % slots.length);
  const handleNext = () => setFocusedIndex((p) => (p + 1) % slots.length);

  const canSave = slots.some(
    (s) => s.isFilled && !s.isUploading && !s.cloudinaryUrl
  );
  const allUploaded = slots.every((s) => s.isFilled && s.cloudinaryUrl);

  const slotNameForModal =
    editingSlotId !== null ? `Avatar ${editingSlotId + 1}` : "";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-teal-500/30 overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center w-full relative z-10 px-4">
        <h2 className="text-2xl font-bold text-white/90 mb-10 tracking-wide text-center">
          Upload Your Avatars
        </h2>

        <div className="flex items-center justify-center w-full max-w-5xl py-4 relative h-[500px]">
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 lg:left-20 z-40 p-3 rounded-full bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:bg-teal-500 transition-all backdrop-blur-sm shadow-lg hover:shadow-teal-500/20 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full max-w-2xl h-full mx-auto pointer-events-none">
            {slots.map((slot, index) => {
              const offset = getCircularOffset(
                index,
                focusedIndex,
                slots.length
              );
              return (
                <div key={slot.id} className="pointer-events-auto">
                  <AvatarPreviewSlide
                    slot={slot}
                    offset={offset}
                    onClickAction={() => setFocusedIndex(index)}
                    onFileSelectAction={(file) =>
                      handleFileSelect(slot.id, file)
                    }
                    onRemoveAction={() => removeFileFromSlot(slot.id)}
                    onEditAction={() => handleEditSlot(slot.id)}
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute right-4 lg:right-20 z-40 p-3 rounded-full bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:bg-teal-500 transition-all backdrop-blur-sm shadow-lg hover:shadow-teal-500/20 active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex gap-2 mb-8 md:hidden mt-[-40px] z-50 relative">
          {slots.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setFocusedIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === focusedIndex ? "w-8 bg-teal-400" : "w-2 bg-slate-700"
              }`}
            />
          ))}
        </div>

        <div className="w-full max-w-xs space-y-4 pb-12 z-50 relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFinalUpload();
            }}
            disabled={!canSave}
            className={`
                    group w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden shadow-2xl
                    ${
                      canSave
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:-translate-y-1"
                        : allUploaded
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default pointer-events-none"
                        : "bg-slate-800/50 text-slate-500 border border-white/5 cursor-not-allowed"
                    }
                `}
          >
            {slots.some((s) => s.isUploading) ? (
              <>
                <Loader2 className="animate-spin" /> Processing...
              </>
            ) : canSave ? (
              <>
                <span className="relative z-10">Save Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </>
            ) : allUploaded ? (
              <>
                Done <Check strokeWidth={3} />
              </>
            ) : (
              <>Save Profile</>
            )}
          </button>
        </div>
      </main>

      <AvatarEditorModal
        isOpen={modalOpen}
        onCloseAction={() => {
          setModalOpen(false);
          if (tempPreviewUrl) URL.revokeObjectURL(tempPreviewUrl);
          setTempPreviewUrl(null);
          setEditingSlotId(null);
        }}
        slotId={editingSlotId ?? -1}
        slotName={slotNameForModal}
        previewUrl={tempPreviewUrl} // Passed safely
        onConfirmAction={handleEditorConfirm}
      />
    </div>
  );
}
