import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useAvatarStore } from "@/lib/store/avatarUploadStore";
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

  const controller = uploadController.create(slotId);

  try {
    store.setSlotStatus(slotId, {
      isUploading: true,
      error: null,
      uploadProgress: 5,
    });

    // Use auth data from store (set by AvatarUploader component)
    const { authToken: token, userId } = store;

    if (!token) {
      throw new Error("User not authenticated - please log in again");
    }

    // 1. Get Presigned URL (Edge -> Backend Reserve)
    console.log("[Upload] Step 1: Getting presigned URL...");
    const { data: presigned } = await axiosInstance.post(
      `${EDGE_FUNCTIONS_URL}/storj-presigned`,
      {
        slotId,
        fileName: file.name,
        contentType: file.type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        signal: controller.signal,
      },
    );
    console.log("[Upload] Step 1 SUCCESS. Key:", presigned.key);

    store.setSlotStatus(slotId, { uploadProgress: 20 });
    const storjKey = presigned.key;

    // 2. Upload to Storj (Direct) - use plain axios, not axiosInstance
    console.log("[Upload] Step 2: Uploading to Storj...");
    await axios.put(presigned.uploadUrl, file, {
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
      transformRequest: [(data) => data], // Raw file - no JSON transform
    });
    console.log("[Upload] Step 2 SUCCESS. File uploaded to Storj.");

    store.setSlotStatus(slotId, { uploadProgress: 95 });

    // 3. Confirm Upload (Edge -> Backend Confirm)
    console.log("[Upload] Step 3: Confirming upload...");
    const { data: confirmData } = await axiosInstance.post(
      `${EDGE_FUNCTIONS_URL}/storj-confirm-upload`,
      {
        s3Key: storjKey,
        etag: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        signal: controller.signal,
      },
    );
    console.log("[Upload] Step 3 SUCCESS. Confirm data:", confirmData);

    store.setSlotStatus(slotId, {
      isUploading: false,
      uploadProgress: 100,
      cloudinaryUrl: confirmData.publicUrl || "",
      storjKey: storjKey,
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
        retryCount: (store.slots.find((s) =>
          s.id === slotId
        )?.retryCount || 0) + 1,
      });
    }
    uploadController.complete(slotId);
    throw error;
  }
};
