import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AvatarStore, UploadSlot } from "./types";
import { uploadAvatarProcess } from "@/lib/upload/avatarUpload";

const MAX_SLOTS = 3;

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set, get) => ({
      slots: [],
      activeIndex: 0,
      editingSlot: null,
      fileRegistry: {}, // To nie będzie zapisywane w localStorage (dzięki partialize)
      authToken: null,
      userId: undefined,

      initializeSlotsIfEmpty: (count = MAX_SLOTS) => {
        const { slots } = get();
        if (slots.length > 0) return;

        const newSlots: UploadSlot[] = Array.from(
          { length: count },
          (_, i) => ({
            id: i,
            name: `Avatar ${i + 1}`,
            isFilled: false,
            isUploading: false,
            uploadProgress: 0,
            error: null,
            previewUrl: null,
            cloudinaryUrl: null,
            retryCount: 0,
          }),
        );
        set({ slots: newSlots });
      },

      setInitialSlots: (urls: string[]) => {
        const { slots } = get();
        if (slots.length > 0) return;

        const newSlots: UploadSlot[] = Array.from(
          { length: MAX_SLOTS },
          (_, i) => {
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
          },
        );
        set({ slots: newSlots });
      },

      setFileForSlot: (slotId, file, previewUrl) => {
        console.log("setFileForSlot – dodano plik do slotu", slotId);
        set((state) => ({
          fileRegistry: {
            ...state.fileRegistry,
            [slotId]: file, // Zawsze nadpisujemy – nowy File po cropie/edycji
          },
          slots: state.slots.map((s) =>
            s.id === slotId
              ? {
                ...s,
                isFilled: true,
                previewUrl,
                name: file.name || s.name,
                error: null,
                uploadProgress: 0,
                retryCount: 0,
                // Clear previous Cloudinary URL and Storj key on edit
                cloudinaryUrl: null,
                storjKey: null,
              }
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
                ? {
                  ...s,
                  isFilled: false,
                  previewUrl: null,
                  cloudinaryUrl: null,
                  error: null,
                }
                : s
            ),
          };
        });
      },

      setSlotStatus: (id, status) => {
        set((state) => ({
          slots: state.slots.map((s) => s.id === id ? { ...s, ...status } : s),
        }));
      },

      setEditingSlot: (id) => set({ editingSlot: id }),
      setActiveIndex: (index) => set({ activeIndex: index }),

      cleanupTemporaryData: () => {
        const { slots } = get();
        slots.forEach((s) => {
          if (s.previewUrl?.startsWith("blob:")) {
            URL.revokeObjectURL(s.previewUrl);
          }
        });
        set({ fileRegistry: {} });
      },

      validateSlots: () => {
        const { slots, fileRegistry } = get();
        const hasGhostSlots = slots.some(
          (s) => s.isFilled && !s.cloudinaryUrl && !fileRegistry[s.id],
        );

        if (hasGhostSlots) {
          console.log(
            "Znaleziono Ghost Slots (brak pliku w pamięci) – resetowanie...",
          );
          set((state) => ({
            slots: state.slots.map((s) => {
              if (s.isFilled && !s.cloudinaryUrl && !state.fileRegistry[s.id]) {
                return {
                  ...s,
                  isFilled: false,
                  previewUrl: null,
                  error: null, // Resetujemy też błąd, by user mógł dodać od nowa
                  uploadProgress: 0,
                };
              }
              return s;
            }),
          }));
        }
      },

      // --- LOGIKA BIZNESOWA ---

      performUploadAll: async () => {
        const { slots, fileRegistry } = get();
        console.log("performUploadAll wywołane");
        console.log("slots:", slots);
        console.log("fileRegistry keys:", Object.keys(fileRegistry));

        // Wybieramy sloty, które mają plik, ale nie mają jeszcze URL
        const slotsToUpload = slots.filter(
          (s) =>
            s.isFilled &&
            !s.cloudinaryUrl &&
            !s.isUploading &&
            fileRegistry[s.id],
        );
        console.log("slotsToUpload length:", slotsToUpload.length);

        if (slotsToUpload.length === 0) {
          console.log("NIC DO UPLOADU – slotsToUpload puste");
          return;
        }

        // Uruchamiamy uploady równolegle
        await Promise.all(
          slotsToUpload.map((slot) => {
            const file = fileRegistry[slot.id];
            return uploadAvatarProcess(slot.id, file).catch(() => {});
          }),
        );
      },

      retrySlot: async (slotId) => {
        const { fileRegistry } = get();
        const file = fileRegistry[slotId];
        if (file) {
          await uploadAvatarProcess(slotId, file).catch(() => {});
        }
      },
      setAuthToken: (token) => set({ authToken: token }),
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "avatar-store",
      // Ważne: Nie zapisujemy fileRegistry (blobów/plików) do localStorage
      partialize: (state) => ({
        slots: state.slots.map((s) => ({
          ...s,
          previewUrl: null, // Bloby wygasają po odświeżeniu, więc ich nie zapisujemy
          isUploading: false,
        })),
        activeIndex: state.activeIndex,
      }),
    },
  ),
);
