import React, { useRef } from "react";
import Image from "next/image";
import { Upload, User, Camera, X, Check, Loader2 } from "lucide-react";
import { UploadSlot } from "@/lib/store/types";

interface AvatarPreviewSlideProps {
  slot: UploadSlot;
  offset: number;
  onFileSelectAction: (file: File) => void;
  onRemoveAction: () => void;
  onEditAction: () => void;
  onClickAction: () => void;
  onRetryAction?: () => void;
}

const AvatarPreviewSlide: React.FC<AvatarPreviewSlideProps> = ({
  slot,
  offset,
  onFileSelectAction,
  onRemoveAction,
  onEditAction,
  onClickAction,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isActive = offset === 0;

  const handleContainerClick = () => {
    // If not active, clicking it centers it
    if (!isActive) {
      onClickAction();
      return;
    }
    // If active and empty/not uploading, OR if it has error (retry), open file dialog
    // Prevent opening if clicking on buttons (handled by stopPropagation)
    if ((!slot.isFilled || slot.error) && !slot.isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelectAction(e.target.files[0]);
    }
    e.target.value = "";
  };

/**
 * CSS positioning logic — carousel offset
 */
  let positionClasses = "";
  const baseTransform = "left-1/2 top-1/2 -translate-y-1/2";

  if (isActive) {
    positionClasses = `${baseTransform} -translate-x-1/2 scale-100 z-30 opacity-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] border-teal-500/50 ring-1 ring-teal-500/20`;
  } else if (offset === -1) {
    positionClasses = `${baseTransform} -translate-x-[135%] scale-90 z-20 opacity-60 grayscale-[40%] hover:opacity-80 cursor-pointer border-transparent`;
  } else if (offset === 1) {
    positionClasses = `${baseTransform} translate-x-[35%] scale-90 z-20 opacity-60 grayscale-[40%] hover:opacity-80 cursor-pointer border-transparent`;
  } else {
    positionClasses = `${baseTransform} -translate-x-1/2 scale-50 z-10 opacity-0 pointer-events-none`;
  }

  const bgClasses = slot.isFilled
    ? "bg-slate-900"
    : "bg-gradient-to-b from-slate-900 to-slate-950";

  return (
    <div
      className={`
            absolute w-64 h-96 rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
            flex flex-col items-center justify-center overflow-hidden border-2 group shadow-xl
            ${positionClasses} ${bgClasses}
        `}
      onClick={handleContainerClick}
      style={{ transformOrigin: "center center" }}
    >
      {/* Glow effect for active card */}
      {isActive && (
        <div className="absolute -inset-2 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent rounded-3xl blur-xl pointer-events-none" />
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
      />

      {/* --- STATE: EMPTY --- */}
      {!slot.isFilled && (
        <div
          className={`flex flex-col items-center text-center p-6 transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-60 translate-y-2"
          }`}
        >
          <div
            className={`
                    w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500
                    ${
                      isActive
                        ? "bg-teal-500/10 text-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.15)] scale-110"
                        : "bg-slate-800 text-slate-500"
                    }
                `}
          >
            {isActive ? <Upload size={32} /> : <User size={32} />}
          </div>

          {isActive && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-lg font-heading font-bold text-text-ds-primary mb-2 tracking-tight">
                Add Photo
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                Format 1:1
                <br />
                PNG/JPG
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="py-2.5 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-teal-500/20 transform hover:-translate-y-0.5 active:scale-95"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- STATE: FILLED (PREVIEW) --- */}
      {slot.isFilled && (slot.previewUrl || slot.cloudinaryUrl) && (
        <>
          <Image
            src={slot.previewUrl || slot.cloudinaryUrl || ""}
            alt="Preview"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized // Need for blob URLs or external
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
        </>
      )}

      {/* --- STATE: UPLOADING --- */}
      {slot.isUploading && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30">
          <Loader2 size={40} className="text-teal-400 animate-spin mb-4" />
          <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              style={{ width: `${slot.uploadProgress}%` }}
            />
          </div>
          <span className="text-teal-400 text-[10px] font-heading font-bold mt-3 tracking-widest uppercase">
            Uploading {slot.uploadProgress}%
          </span>
        </div>
      )}

      {/* --- ERROR MESSAGE --- */}
      {slot.error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-950/80 backdrop-blur-sm z-20 p-4">
          <div className="text-center">
            <p className="text-red-400 font-heading font-bold mb-2">Upload Failed</p>
            <p className="text-red-200 text-xs">{slot.error}</p>
          </div>
        </div>
      )}

      {/* --- ACTIONS (Edit/Remove) --- */}
      {isActive && slot.isFilled && !slot.isUploading && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30 animate-in fade-in zoom-in duration-300 pointer-events-auto">
          {!slot.error && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditAction();
              }}
              className="p-2.5 bg-slate-950/50 backdrop-blur-md hover:bg-teal-500 hover:text-white text-teal-400 rounded-xl border border-teal-500/20 transition-all shadow-lg hover:shadow-teal-500/20"
              title="Edit"
            >
              <Camera size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveAction();
            }}
            className="p-2.5 bg-slate-950/50 backdrop-blur-md hover:bg-red-500 hover:text-white text-red-400 rounded-xl border border-red-500/20 transition-all shadow-lg hover:shadow-red-500/20"
            title="Remove"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* --- STATUS: SUCCESS --- */}
      {slot.cloudinaryUrl && !slot.isUploading && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-emerald-500 text-black p-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-in zoom-in">
            <Check size={14} strokeWidth={4} />
          </div>
        </div>
      )}

      {/* --- SLOT LABEL (ALWAYS VISIBLE) --- */}
      <div className="absolute bottom-5 left-0 right-0 text-center z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-[10px] font-heading font-bold text-slate-300 uppercase tracking-widest shadow-lg">
          {slot.name}
        </span>
      </div>
    </div>
  );
};

export default AvatarPreviewSlide;
