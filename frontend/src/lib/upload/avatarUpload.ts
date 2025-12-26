import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useAvatarStore } from "@/lib/store/avatarUploadStore";
import { useAuthStore } from "@/lib/store/authStore";
import { getUploadController } from "./uploadController";

const EDGE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_EDGE_FUNCTIONS_URL;

export function validateImageFile(
  file: File,
  maxSizeMB: number = 5,
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
  file: File,
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

  if (!EDGE_FUNCTIONS_URL) {
    throw new Error("Missing NEXT_PUBLIC_EDGE_FUNCTIONS_URL");
  }

  console.log(
    "[DEBUG] AvatarUpload Script Loaded - v2 (Cookie Fallback Active)",
  );

  const controller = uploadController.create(slotId);

  try {
    store.setSlotStatus(slotId, {
      isUploading: true,
      error: null,
      uploadProgress: 5,
    });

    // Use auth data from main auth store for freshness
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.warn("No access token in store, relying on Cookies...");
    }

    // 1. Get Presigned URL (Edge -> Backend Reserve)
    console.log("[Upload] Step 1: Getting presigned URL...");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const { data: presigned } = await axiosInstance.post(
      `${EDGE_FUNCTIONS_URL}/storj-presigned`,
      {
        slotId,
        fileName: file.name,
        contentType: file.type,
      },
      {
        headers,
        withCredentials: true,
        signal: controller.signal,
      },
    );
    console.log("[Upload] Step 1 SUCCESS. Key:", presigned.key);

    store.setSlotStatus(slotId, { uploadProgress: 20 });
    const storjKey = presigned.key;

    // 2. Upload to Storj (Direct PUT)
    console.log("[Upload] Step 2: Uploading to Storj...");
    await axios.put(presigned.uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      signal: controller.signal,
      onUploadProgress: (ev) => {
        if (ev.total) {
          const percent = 20 + Math.round((ev.loaded / ev.total) * 70);
          store.setSlotStatus(slotId, { uploadProgress: percent });
        }
      },
      transformRequest: [(data) => data], // Kluczowe dla binarnego uploadu
    });
    console.log("[Upload] Step 2 SUCCESS.");

    store.setSlotStatus(slotId, { uploadProgress: 95 });

    // 3. Confirm Upload (Edge -> Backend Confirm)
    console.log("[Upload] Step 3: Confirming upload...");
    const { data: confirmData } = await axiosInstance.post(
      `${EDGE_FUNCTIONS_URL}/storj-upload-confirm`,
      {
        s3Key: storjKey,
        etag: "", // Opcjonalnie można pobrać z nagłówka odpowiedzi PUT (ETag)
      },
      {
        headers,
        withCredentials: true,
        signal: controller.signal,
      },
    );
    console.log("[Upload] Step 3 SUCCESS. Confirm data:", confirmData);
    console.log("[Upload] avatarUrl from response:", confirmData.avatarUrl);

    store.setSlotStatus(slotId, {
      isUploading: false,
      uploadProgress: 100,
      cloudinaryUrl: confirmData.avatarUrl || "", // Cloudinary optimized URL
      storjKey: storjKey,
      retryCount: 0,
    });
    console.log(
      "[Upload] Store updated with cloudinaryUrl:",
      confirmData.avatarUrl,
    );

    uploadController.complete(slotId);

    return {
      success: true,
      storjKey,
      cloudinaryUrl: confirmData.avatarUrl || "",
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
        ? error.response?.data?.error || error.response?.data?.message ||
          error.message
        : "Upload failed";

      store.setSlotStatus(slotId, {
        isUploading: false,
        error: typeof msg === "string" ? msg : JSON.stringify(msg),
        retryCount: (store.slots.find((s) =>
          s.id === slotId
        )?.retryCount || 0) + 1,
      });
    }
    uploadController.complete(slotId);
    throw error;
  }
};
