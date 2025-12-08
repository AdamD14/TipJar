"use client";

import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";

interface AvatarEditorModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  slotId: number;
  slotName: string;
  previewUrl: string | null;
  onConfirmAction: (
    slotId: number,
    croppedBlob: Blob,
    fileName: string
  ) => Promise<void>;
}

export default function AvatarEditorModal({
  isOpen,
  onCloseAction,
  slotId,
  slotName,
  previewUrl,
  onConfirmAction,
}: AvatarEditorModalProps): React.JSX.Element | null {
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScale(1.2);
      setRotation(0);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!editorRef.current || !previewUrl || isProcessing) return;

    setIsProcessing(true);

    try {
      const canvas = editorRef.current.getImageScaledToCanvas();

      // Use WebP for better compression if supported
      const supportsWebP =
        typeof document !== "undefined" &&
        document
          .createElement("canvas")
          .toDataURL("image/webp")
          .indexOf("data:image/webp") === 0;

      const mimeType = supportsWebP ? "image/webp" : "image/jpeg";
      const extension = supportsWebP ? "webp" : "jpg";

      // Create blob with optimized settings
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error("Failed to create image blob"));
            }
          },
          mimeType,
          0.85 // Quality
        );
      });

      const fileName = `avatar-${slotId}-${Date.now()}.${extension}`;
      await onConfirmAction(slotId, blob, fileName);

      // Close modal after successful confirmation
      onCloseAction();
    } catch (error) {
      console.error("Failed to process image:", error);
      alert("Failed to process image. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onCloseAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Customize Avatar {slotId + 1}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{slotName}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-white text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg p-4 flex justify-center min-h-[400px]">
              {previewUrl ? (
                <AvatarEditor
                  ref={editorRef}
                  image={previewUrl}
                  width={400}
                  height={400}
                  border={20}
                  borderRadius={200}
                  scale={scale}
                  rotate={rotation}
                  className="rounded-lg"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="flex items-center justify-center text-gray-400">
                  No image to edit
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zoom: {scale.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  disabled={!previewUrl || isProcessing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rotation: {rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  disabled={!previewUrl || isProcessing}
                />
              </div>
            </div>
          </div>

          <div className="md:w-64 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag image to adjust crop</li>
                <li>• Use sliders for fine-tuning</li>
                <li>• Avatar will be cropped to a circle</li>
                <li>• Final format: 400x400px optimized</li>
                <li>• Keep important content in center</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleConfirm}
                disabled={!previewUrl || isProcessing}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-gray-900 font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </button>
              <button
                onClick={handleClose}
                disabled={isProcessing}
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
