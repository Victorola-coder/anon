"use client";

import { useState, useRef, Dispatch, SetStateAction } from "react";
import Button from "./button";
import { toast } from "sonner";
import { Image, X, Upload } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  setImageUrl: Dispatch<SetStateAction<string>>;
  maxSize?: number; // in MB
}

export function ImageUpload({
  onImageSelect,
  maxSize = 5,
  setImageUrl,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (default 5MB)
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Image must be smaller than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);

    try {
      setLoading(true);
      // Upload function to get url
      const formData = new FormData();
      formData.append("file", file);

      formData.append("upload_preset", "anonymous");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/devfemzy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadedImage = await uploadResponse.json();
      console.log({ uploadedImage });
      setImageUrl(uploadedImage.secure_url);
    } catch (e: any) {
      toast.error(e.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {!preview ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-light"
        >
          <Upload size={24} />
          <span className="text-sm">
            {loading ? "Uploading ..." : "Click to upload image"}
          </span>
        </Button>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-navy/80 rounded-full hover:bg-navy transition-colors"
            disabled={loading}
          >
            <X size={16} className="text-slate-lighter" />
          </button>
        </div>
      )}
    </div>
  );
}
