export interface UploadSlot {
  id: number;
  name: string;
  isFilled: boolean;
  isUploading: boolean;
  uploadProgress: number; // 0-100
  error: string | null;
  retryCount: number;
  
  // Tymczasowy podgląd (blob URL)
  previewUrl: string | null;
  
  // Finalny URL z backendu (Cloudinary)
  cloudinaryUrl: string | null;
}

export interface AvatarStoreState {
  slots: UploadSlot[];
  activeIndex: number;
  editingSlot: number | null;
  // Przechowalnia plików (niezapisywana w localStorage)
  fileRegistry: Record<number, File>;
}

export interface AvatarStoreActions {
  // Inicjalizacja
  initializeSlotsIfEmpty: (count: number) => void;
  setInitialSlots: (urls: string[]) => void;
  
  // Zarządzanie plikami
  setFileForSlot: (slotId: number, file: File, previewUrl: string) => void;
  removeFileFromSlot: (slotId: number) => void;
  
  // UI Actions
  setEditingSlot: (id: number | null) => void;
  setActiveIndex: (index: number) => void;
  
  // Logika Uploadu
  performUploadAll: () => Promise<void>;
  retrySlot: (slotId: number) => Promise<void>;
  
  // Helpersy wewnętrzne (używane przez service)
  setSlotStatus: (id: number, status: Partial<UploadSlot>) => void;
  cleanupTemporaryData: () => void;
}

export type AvatarStore = AvatarStoreState & AvatarStoreActions;