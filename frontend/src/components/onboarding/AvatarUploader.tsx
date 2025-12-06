"use client";
import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";

interface AvatarUploaderProps {
  name?: string;
  onUpload?: (url: string) => void;
}

export default function AvatarUploader({ name, onUpload }: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (onUpload) {
      setUploading(true);
      try {
        // We will implement the presigned URL flow here in the parent or a hook, 
        // but for now let's just expose the file or handle upload if we put logic here.
        // The prompt asked for "Implement upload through Presigned URL" in Step 3 Integration.
        // So I'll just expose the file via name/form for now, OR implement the upload logic here.
        // Better to implement logic here.
        
        // 1. Get presigned URL
        const res = await fetch('/api/onboarding/uploads/presigned-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        });
        
        if (!res.ok) throw new Error('Failed to get upload URL');
        const { url, signature, timestamp, folder, apiKey, public_id } = await res.json();
        
        // 2. Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('folder', folder);
        formData.append('public_id', public_id);
        
        const uploadRes = await fetch(url, {
           method: 'POST',
           body: formData,
        });
        
        if (!uploadRes.ok) throw new Error('Upload failed');
        const uploadData = await uploadRes.json();
        
        onUpload(uploadData.secure_url);
        
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
        {preview ? (
          <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl text-white/20">?</span>
        )}
      </div>
      <div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg" 
          onChange={handleFileChange}
          name={name} // fallback for form submission if we didn't use async upload
        />
        <Button 
          type="button" 
          variant="secondary" 
          size="sm" 
          onClick={() => fileInputRef.current?.click()}
          loading={uploading}
        >
          Upload Photo
        </Button>
        <p className="text-xs text-white/40 mt-2">Max 5MB. PNG/JPG</p>
      </div>
    </div>
  );
}
