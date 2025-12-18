import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvatarStore, UploadSlot } from './types';
import { uploadAvatarProcess } from '@/lib/upload/avatarUpload';

const MAX_SLOTS = 3;

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      slots: [],
      activeIndex: 0,
      editingSlot: null,
      fileRegistry: {}, // To nie będzie zapisywane w localStorage (dzięki partialize)

      initializeSlotsIfEmpty: (count = MAX_SLOTS) => {
        const { slots } = get();
        if (slots.length > 0) return;

        const newSlots: UploadSlot[] = Array.from({ length: count }, (_, i) => ({
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
        set({ slots: newSlots });
      },

      setInitialSlots: (urls: string[]) => {
        const { slots } = get();
        if (slots.length > 0) return;

        const newSlots: UploadSlot[] = Array.from({ length: MAX_SLOTS }, (_, i) => {
           const url = urls[i] || null;
           return {
            id: i,
            name: `Avatar ${i + 1}`,
            isFilled: !!url,
            isUploading: false,
            uploadProgress: url ? 100 : 0,
            error: null,
            previewUrl: null,
            cloudinaryUrl: url,
            retryCount: 0,
          };
        });
        set({ slots: newSlots });
      },

      setFileForSlot: (slotId, file, previewUrl) => {
        set((state) => ({
          fileRegistry: { ...state.fileRegistry, [slotId]: file },
          slots: state.slots.map((s) =>
            s.id === slotId
              ? { ...s, isFilled: true, previewUrl, name: file.name, error: null, uploadProgress: 0 }
              : s
          ),
        }));
      },

      removeFileFromSlot: (slotId) => {
        set((state) => {
          const newRegistry = { ...state.fileRegistry };
          delete newRegistry[slotId];
          return {
            fileRegistry: newRegistry,
            slots: state.slots.map((s) =>
              s.id === slotId
                ? { ...s, isFilled: false, previewUrl: null, cloudinaryUrl: null, error: null }
                : s
            ),
          };
        });
      },

      setSlotStatus: (id, status) => {
        set((state) => ({
          slots: state.slots.map((s) => (s.id === id ? { ...s, ...status } : s)),
        }));
      },

      setEditingSlot: (id) => set({ editingSlot: id }),
      setActiveIndex: (index) => set({ activeIndex: index }),

      cleanupTemporaryData: () => {
        const { slots } = get();
        slots.forEach((s) => {
          if (s.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(s.previewUrl);
        });
        set({ fileRegistry: {} });
      },

      // --- LOGIKA BIZNESOWA ---

      performUploadAll: async (token) => {
        const { slots, fileRegistry } = get();
        
        // Wybieramy sloty, które mają plik, ale nie mają jeszcze URL
        const slotsToUpload = slots.filter(
          (s) => s.isFilled && !s.cloudinaryUrl && !s.isUploading && fileRegistry[s.id]
        );

        // Uruchamiamy uploady równolegle
        await Promise.all(
          slotsToUpload.map((slot) => {
            const file = fileRegistry[slot.id];
            return uploadAvatarProcess(slot.id, file, token).catch(() => {});
          })
        );
      },

      retrySlot: async (slotId, token) => {
        const { fileRegistry } = get();
        const file = fileRegistry[slotId];
        if (file) {
          await uploadAvatarProcess(slotId, file, token).catch(() => {});
        }
      },
    }),
    {
      name: 'avatar-store',
      // Ważne: Nie zapisujemy fileRegistry (blobów/plików) do localStorage
      partialize: (state) => ({
        slots: state.slots.map(s => ({
            ...s, 
            previewUrl: null, // Bloby wygasają po odświeżeniu, więc ich nie zapisujemy
            isUploading: false 
        })),
        activeIndex: state.activeIndex,
      }),
    }
  )
);