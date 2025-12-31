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
  ) => void; // Changed return type to void to match usage
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
      onConfirmAction(slotId, blob, fileName);

      // Close modal after successful confirmation (handled by parent usually, but safe to call here if needed, but parent sets open=false)
      // The parent implementation in AvatarUploader calls setModalOpen(false) in onConfirmAction logic or after.
      // But typically onConfirmAction is sync in AvatarUploader.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="rounded-2xl p-6 w-full max-w-2xl border-[0.5px] border-[#7aaaab]"
        style={{
          background: "linear-gradient(135deg, #001919 0%, #093439 100%)",
        }}
      >
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-white text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-black/30 rounded-lg p-4 flex justify-center min-h-[400px]">
              {previewUrl ? (
                <AvatarEditor
                  ref={editorRef}
                  image={previewUrl}
                  width={300}
                  height={400}
                  border={20}
                  borderRadius={0}
                  color={[0, 0, 0, 0.6]}
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
                  max="2"
                  step="any"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-teal-400"
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
                  className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  disabled={!previewUrl || isProcessing}
                />
              </div>
            </div>
          </div>

          <div className="md:w-64 space-y-4">
            <div className="bg-black/20 p-4 rounded-lg border border-[#7aaaab]/30">
              <h3 className="font-medium text-white mb-2">Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag image to adjust crop</li>
                <li>• Use sliders for fine-tuning</li>
                <li>• Avatar: 3:4 ratio (vertical)</li>
                <li>• Width: horizontal | Height: vertical</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!previewUrl || isProcessing}
                className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#f9c513] text-[#003737] font-semibold rounded-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? "Processing..." : "Save & Continue"}
              </button>
              <button
                type="button"
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
