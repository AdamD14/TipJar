"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination"; // Opcjonalnie: paginacja kropkowa może tu nie pasować wizualnie

import AvatarPreviewSlide from "./AvatarPreviewSlide";
import AvatarEditorModal from "./AvatarEditorModal";
import { useAvatarStore } from "@/lib/store/avatarUploadStore";
import { validateImageFile } from "@/lib/upload/avatarUpload";

interface AvatarUploaderProps {
  onUploadCompleteAction: (urls: string[]) => void;
  maxSlots?: number;
  authToken: string | null;
  userId: string;
}

export default function AvatarUploader({
  onUploadCompleteAction,
  maxSlots = 3,
  authToken,
  userId,
}: AvatarUploaderProps) {
  const {
    slots,
    activeIndex,
    editingSlot,
    initializeSlotsIfEmpty,
    setFileForSlot,
    removeFileFromSlot,
    setEditingSlot,
    setActiveIndex,
    performUploadAll,
    retrySlot,
  } = useAvatarStore();

  useEffect(() => {
    initializeSlotsIfEmpty(maxSlots);
  }, [maxSlots, initializeSlotsIfEmpty]);

  useEffect(() => {
    const uploaded = slots
      .filter((s) => s.cloudinaryUrl)
      .map((s) => s.cloudinaryUrl!);
    const filled = slots.filter((s) => s.isFilled);

    if (filled.length > 0 && uploaded.length === filled.length) {
      onUploadCompleteAction(uploaded);
    }
  }, [slots, onUploadCompleteAction]);

  const handleFileSelect = (slotId: number, file: File) => {
    const err = validateImageFile(file);
    if (err) return alert(err);
    const preview = URL.createObjectURL(file);
    setFileForSlot(slotId, file, preview);
    setTimeout(() => setEditingSlot(slotId), 100);
  };

  const handleEditConfirm = async (
    slotId: number,
    blob: Blob,
    fileName: string
  ) => {
    const file = new File([blob], fileName, { type: blob.type });
    const preview = URL.createObjectURL(file);
    setFileForSlot(slotId, file, preview);
  };

  const handleUploadAll = () => {
    if (!authToken || !userId) return alert("Log in required");
    performUploadAll(authToken, userId);
  };

  const editingSlotData =
    editingSlot !== null ? slots.find((s) => s.id === editingSlot) : null;
  const isUploading = slots.some((s) => s.isUploading);
  const readyToUpload = slots.filter(
    (s) => s.isFilled && !s.cloudinaryUrl
  ).length;

  return (
    <div className="w-full space-y-8 py-10">
      {/* Kontener Swipera. 
        Dodajemy padding x, żeby boczne elementy nie ucinały się na krawędzi ekranu.
      */}
      <div className="relative px-12">
        <Swiper
          modules={[Navigation]} // Usunąłem Pagination, bo psuje ten efekt
          spaceBetween={-60} // KLUCZOWE: Ujemny odstęp tworzy nakładanie się (overlap ~20%)
          slidesPerView={1.6} // Pokazujemy 1 cały i kawałki bocznych
          centeredSlides={true} // Aktywny slajd zawsze na środku
          navigation // Strzałki
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          className="w-full !overflow-visible" // !overflow-visible pozwala elementom wystawać
          style={
            {
              // Hack CSS, żeby boczne slajdy były "pod spodem" (niższy z-index)
              "--swiper-wrapper-z-index": 10,
            } as React.CSSProperties
          }
        >
          {slots.map((slot, index) => {
            // Sprawdzamy, czy dany slajd jest tym aktywnym na środku
            const isActiveSlide = activeIndex === index;

            return (
              // Ustawiamy z-index: aktywny na wierzchu (20), boczne pod spodem (10)
              <SwiperSlide
                key={slot.id}
                className={`transition-all duration-500 ${
                  isActiveSlide ? "z-20" : "z-10"
                }`}
              >
                <AvatarPreviewSlide
                  slot={slot}
                  isActive={isActiveSlide}
                  onFileSelectAction={(f) => handleFileSelect(slot.id, f)}
                  onRemoveAction={() => removeFileFromSlot(slot.id)}
                  onEditAction={() => setEditingSlot(slot.id)}
                  onRetryAction={() =>
                    authToken && retrySlot(slot.id, authToken, userId)
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {editingSlotData && (
        <AvatarEditorModal
          isOpen={!!editingSlotData}
          onCloseAction={() => setEditingSlot(null)}
          slotId={editingSlotData.id}
          slotName={editingSlotData.name}
          previewUrl={editingSlotData.previewUrl}
          onConfirmAction={handleEditConfirm}
        />
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={handleUploadAll}
          disabled={isUploading || readyToUpload === 0}
          className="px-12 py-4 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-teal-900 font-bold text-lg transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Processing..." : `Upload ${readyToUpload} Photos`}
        </button>
      </div>
    </div>
  );
}
