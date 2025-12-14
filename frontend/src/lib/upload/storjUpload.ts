import { useAvatarStore } from '@/lib/store/avatarUploadStore';
import { getUploadController } from './uploadController';
import { registerUploadWithBackend } from './storjToCloudinary';
import axios from 'axios';

const SUPABASE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;

interface UploadMetadata {
  userId: string;
  slotId: number;
  fileName: string;
  contentType: string;
  fileSize: number;
}

// 1. Pobierz signed URL z Edge Function
const getStorjSignedUrl = async (
  token: string,
  metadata: UploadMetadata
): Promise<{ 
  signedUrl: string; 
  s3Key: string; 
  cloudinaryFetchUrl: string;
}> => {
  if (!SUPABASE_FUNCTIONS_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL');
  }

  const response = await axios.post(
    `${SUPABASE_FUNCTIONS_URL}/storj-presigned`,
    {
      operation: 'upload',
      slotId: metadata.slotId,
      fileName: metadata.fileName,
      contentType: metadata.contentType,
      expiresIn: 300,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  return response.data;
};

// 2. Główna funkcja uploadu
export const uploadAvatarToStorj = async (
  slotId: number,
  blob: Blob,
  fileName: string,
  token: string,
  userId: string 
): Promise<{ cloudinaryUrl: string }> => {
  const store = useAvatarStore.getState();
  const uploadController = getUploadController();
  const slot = store.getSlotById(slotId);

  if (!slot) {
    throw new Error('Slot not found');
  }

  // Logika Retry
  if (slot.retryCount >= 3) {
    store.setError(slotId, `Max retry attempts (3) reached`);
    throw new Error('Max retry attempts reached');
  }

  const abortController = uploadController.create(slotId);

  try {
    store.startUpload(slotId);
    store.updateProgress(slotId, 10);

    // Krok 1: Pobierz signed URL z Edge Function
    const { signedUrl, s3Key } = await getStorjSignedUrl(token, {
      userId,
      slotId,
      fileName,
      contentType: blob.type,
      fileSize: blob.size,
    });

    store.updateProgress(slotId, 30);

    // Krok 2: Bezpośredni upload do Storj (PUT)
    const uploadResponse = await axios.put(signedUrl, blob, {
      headers: {
        'Content-Type': blob.type,
        'Content-Length': blob.size.toString(),
      },
      signal: abortController.signal,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const uploadPercent = Math.round((progressEvent.loaded * 65) / progressEvent.total);
          store.updateProgress(slotId, 30 + uploadPercent);
        }
      },
      timeout: 60000,
    });

    store.updateProgress(slotId, 70);

    // Krok 3: Zarejestruj upload w backendzie
    const { cloudinaryUrl, cloudinaryPublicId } = await registerUploadWithBackend(
      token,
      {
        userId,
        slotId,
        storjKey: s3Key,
        fileName,
        fileSize: blob.size,
        contentType: blob.type,
        etag: uploadResponse.headers?.etag,
      }
    );

    store.updateProgress(slotId, 95);

    // Krok 4: Zakończenie
    store.setFinalUrl(slotId, cloudinaryUrl);
    store.updateProgress(slotId, 100);
    uploadController.complete(slotId);

    return { cloudinaryUrl };

  } catch (error) {
    // Obsługa błędów i Retry (uproszczona)
    if (axios.isCancel(error)) {
      store.cancelUpload(slotId);
      uploadController.complete(slotId);
      throw new Error('Upload cancelled');
    }

    if (slot.retryCount < 2) {
      store.incrementRetry(slotId);
      uploadController.complete(slotId);
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, slot.retryCount))
      );
      return uploadAvatarToStorj(slotId, blob, fileName, token, userId);
    }

    const errorMessage = axios.isAxiosError(error) ? error.message : 'Upload failed';
    store.setError(slotId, errorMessage);
    uploadController.complete(slotId);
    throw error;
  }
};

// 3. Funkcja do usuwania (opcjonalnie)
export const deleteAvatarFromStorj = async (
  token: string,
  s3Key: string
): Promise<void> => {
  if (!SUPABASE_FUNCTIONS_URL) return;
  
  await axios.post(
    `${SUPABASE_FUNCTIONS_URL}/storj-presigned`,
    {
      operation: 'delete',
      key: s3Key,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};