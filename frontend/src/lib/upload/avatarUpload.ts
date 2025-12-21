import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useAvatarStore } from "@/lib/store/avatarUploadStore";
import { useAuthStore } from "@/lib/store/authStore";
import { getUploadController } from "./uploadController";

const SUPABASE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;

export function validateImageFile(
  file: File,
  maxSizeMB: number = 5
): string | null {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.some((type) => file.type.includes(type))) {
    return "Unsupported file format. Use JPG, PNG, WebP or GIF.";
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File is too large. Maximum size is ${maxSizeMB}MB.`;
  }
  return null;
}

export const uploadAvatarProcess = async (
  slotId: number,
  file: File
): Promise<{
  success: boolean;
  storjKey: string;
  cloudinaryUrl: string;
  cloudinaryPublicId?: string;
  optimizedUrls?: Record<string, string>;
  mediaRecord?: unknown;
}> => {
  const store = useAvatarStore.getState();
  const uploadController = getUploadController();

  if (!SUPABASE_FUNCTIONS_URL) {
    throw new Error("Missing SUPABASE_FUNCTIONS_URL");
  }

  const controller = uploadController.create(slotId);

  try {
    store.setSlotStatus(slotId, {
      isUploading: true,
      error: null,
      uploadProgress: 5,
    });

    // Get token from authStore (set during login)
    let token = useAuthStore.getState().accessToken;

    // Fallback: If no token in store (e.g., OAuth login), try to refresh
    if (!token) {
      try {
        const refreshRes = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:3001"
          }/api/v1/auth/refresh-token`,
          { method: "POST", credentials: "include" }
        );
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          token = data.accessToken;
          useAuthStore.getState().setAccessToken(token);
        }
      } catch (e) {
        console.warn("Token refresh failed:", e);
      }
    }

    if (!token) {
      throw new Error("User not authenticated - please log in again");
    }

    // 1. Get Presigned URL (Edge -> Backend Reserve)
    console.log("[Upload] Step 1: Getting presigned URL...");
    const { data: presigned } = await axiosInstance.post(
      `${SUPABASE_FUNCTIONS_URL}/storj-presigned`,
      {
        slotId,
        fileName: file.name,
        contentType: file.type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        signal: controller.signal,
      }
    );
    console.log("[Upload] Step 1 SUCCESS. Key:", presigned.key);

    store.setSlotStatus(slotId, { uploadProgress: 20 });
    const storjKey = presigned.key;

    // 2. Upload to Storj (Direct)
    console.log("[Upload] Step 2: Uploading to Storj...");
    await axiosInstance.put(presigned.uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
        "x-amz-acl": "public-read",
      },
      signal: controller.signal,
      onUploadProgress: (ev) => {
        if (ev.total) {
          const percent = 20 + Math.round((ev.loaded / ev.total) * 70);
          store.setSlotStatus(slotId, { uploadProgress: percent });
        }
      },
      transformRequest: [(data) => data], // Raw file
    });
    console.log("[Upload] Step 2 SUCCESS. File uploaded to Storj.");

    store.setSlotStatus(slotId, { uploadProgress: 95 });

    // 3. Confirm Upload (Edge -> Backend Confirm)
    console.log("[Upload] Step 3: Confirming upload...");
    const { data: confirmData } = await axiosInstance.post(
      `${SUPABASE_FUNCTIONS_URL}/storj-upload-confirm`,
      {
        s3Key: storjKey,
        etag: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        signal: controller.signal,
      }
    );
    console.log("[Upload] Step 3 SUCCESS. Confirm data:", confirmData);

    store.setSlotStatus(slotId, {
      isUploading: false,
      uploadProgress: 100,
      cloudinaryUrl: confirmData.publicUrl || "",
      retryCount: 0,
    });

    uploadController.complete(slotId);

    return {
      success: true,
      storjKey,
      cloudinaryUrl: confirmData.publicUrl || "",
      cloudinaryPublicId: confirmData.id,
      optimizedUrls: {},
      mediaRecord: confirmData,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      store.setSlotStatus(slotId, { isUploading: false, error: "Cancelled" });
    } else {
      console.error(error);

      const msg = axios.isAxiosError(error)
        ? error.response?.data?.error ||
          error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          error.message
        : "Upload failed";

      store.setSlotStatus(slotId, {
        isUploading: false,
        error: msg,
        retryCount:
          (store.slots.find((s) => s.id === slotId)?.retryCount || 0) + 1,
      });
    }
    uploadController.complete(slotId);
    throw error;
  }
};
