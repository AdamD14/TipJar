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