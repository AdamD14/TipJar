import axios from 'axios';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export interface CloudinaryTransformation {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  format?: string;
  [key: string]: any;
}

export interface UploadResult {
  storjKey: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  transformations?: CloudinaryTransformation[];
}

/**
 * Wygeneruj URL Cloudinary dla pliku w Storj
 * Cloudinary będzie fetcherował z S3 (Storj) i cache'ował
 */
export const generateCloudinaryUrl = (
  storjKey: string,
  transformations: CloudinaryTransformation[] = []
): string => {
  // Base Cloudinary URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/`;
  
  // Dodaj transformacje jeśli istnieją
  if (transformations.length > 0) {
    const transformString = transformations
      .map(t => {
        const parts = [];
        if (t.width) parts.push(`w_${t.width}`);
        if (t.height) parts.push(`h_${t.height}`);
        if (t.crop) parts.push(`c_${t.crop}`);
        if (t.quality) parts.push(`q_${t.quality}`);
        if (t.format) parts.push(`f_${t.format}`);
        return parts.join(',');
      })
      .filter(Boolean)
      .join('/');
    
    if (transformString) {
      url += `${transformString}/`;
    }
  }
  
  // Kluczowe: Cloudinary S3 source URL (storj://bucket/key)
  const s3Url = `s3://${process.env.NEXT_PUBLIC_STORJ_BUCKET}/${storjKey}`;
  
  // Zwracamy URL, z którego Cloudinary pobierze obraz
  return `${url}${encodeURIComponent(s3Url)}`;
};

/**
 * Zarejestruj upload w backendzie i pobierz Cloudinary URL
 */
export const registerUploadWithBackend = async (
  token: string,
  data: {
    userId: string;
    slotId: number;
    storjKey: string;
    fileName: string;
    fileSize: number;
    contentType: string;
    etag?: string;
  }
): Promise<UploadResult> => {
  const response = await axios.post(
    `${BACKEND_API}/api/media/register-upload`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  return response.data;
};

/**
 * Pobierz zoptymalizowane URL'e dla różnych rozmiarów avatarów
 */
export const getOptimizedAvatarUrls = (
  cloudinaryPublicId: string,
) => {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  
  return {
    // Thumbnail (lista, miniaturki)
    thumbnail: `${baseUrl}/c_fill,w_100,h_100,g_face/${cloudinaryPublicId}`,
    
    // Standardowy avatar
    standard: `${baseUrl}/c_fill,w_300,h_300,g_face/${cloudinaryPublicId}`,
    
    // HD version
    hd: `${baseUrl}/c_limit,w_800,h_800,q_auto:good/${cloudinaryPublicId}`,
    
    // Original (z ograniczeniami)
    original: `${baseUrl}/c_limit,w_1920,q_auto:best/${cloudinaryPublicId}`,
    
    // WebP wersja (nowoczesne przeglądarki)
    webp: `${baseUrl}/c_limit,w_800,q_auto:best,f_webp/${cloudinaryPublicId}`,
    
    // Placeholder (blurhash lub niska jakość)
    placeholder: `${baseUrl}/c_limit,w_20,q_auto:low,blur_100/${cloudinaryPublicId}`,
  };
};