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