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