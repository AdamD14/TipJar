import axios from 'axios';
import { useAvatarStore } from '@/lib/store/avatarUploadStore';
import { getUploadController } from './uploadController';

const SUPABASE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function validateImageFile(file: File, maxSizeMB: number = 5): string | null {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.some(type => file.type.includes(type))) {
    return 'Unsupported file format. Use JPG, PNG, WebP or GIF.';
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File is too large. Maximum size is ${maxSizeMB}MB.`;
  }
  return null;
}

export const uploadAvatarProcess = async (
  slotId: number,
  file: File,
  token: string,

): Promise<void> => {
  const store = useAvatarStore.getState();
  const uploadController = getUploadController();
  
  if (!SUPABASE_FUNCTIONS_URL || !API_URL) {
    throw new Error('Missing environment variables');
  }

  const controller = uploadController.create(slotId);

  try {
    store.setSlotStatus(slotId, { isUploading: true, error: null, uploadProgress: 5 });

    const { data: presigned } = await axios.post(
      `${SUPABASE_FUNCTIONS_URL}/storj-presigned`,
      {
        slotId,
        fileName: file.name,
        contentType: file.type,
      },
      {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      }
    );

    store.setSlotStatus(slotId, { uploadProgress: 20 });

    await axios.put(presigned.uploadUrl, file, {
      headers: { 'Content-Type': file.type },
      signal: controller.signal,
      onUploadProgress: (ev) => {
        if (ev.total) {
          const percent = 20 + Math.round((ev.loaded / ev.total) * 70);
          store.setSlotStatus(slotId, { uploadProgress: percent });
        }
      },
    });

    store.setSlotStatus(slotId, { uploadProgress: 95 });

    const { data: registration } = await axios.post(
      `${API_URL}/media/register-upload`,
      {
        slotId,
        storjKey: presigned.key,
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: controller.signal
      }
    );

    store.setSlotStatus(slotId, { 
      isUploading: false, 
      uploadProgress: 100, 
      cloudinaryUrl: registration.url,
      retryCount: 0 
    });
    
    uploadController.complete(slotId);

  } catch (error) {
    if (axios.isCancel(error)) {
      store.setSlotStatus(slotId, { isUploading: false, error: 'Cancelled' });
    } else {
      console.error(error);
      const msg = axios.isAxiosError(error) 
        ? error.response?.data?.message || error.message 
        : 'Upload failed';
      
      store.setSlotStatus(slotId, { 
        isUploading: false, 
        error: msg,
        retryCount: (store.slots.find(s => s.id === slotId)?.retryCount || 0) + 1
      });
    }
    uploadController.complete(slotId);
    throw error;
  }
};