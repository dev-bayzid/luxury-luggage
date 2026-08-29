"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Star, Plus, Image as ImageIcon } from "lucide-react";
import { clsx } from "clsx";

interface ImageUploaderProps {
  images: string[];
  thumbnail: string;
  onChange: (images: string[], thumbnail: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  thumbnail,
  onChange,
}) => {
  const [urlInput, setUrlInput] = useState("");
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const handleAddSample = (url: string) => {
    if (!images.includes(url)) {
      const next = [...images, url];
      onChange(next, thumbnail || url);
    }
  };

  const handleRemove = (url: string) => {
    const next = images.filter((img) => img !== url);
    const nextThumb = thumbnail === url ? next[0] || "" : thumbnail;
    onChange(next, nextThumb);
  };

  const handleSetThumbnail = (url: string) => {
    onChange(images, url);
  };

  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      const next = [...images, urlInput.trim()];
      onChange(next, thumbnail || urlInput.trim());
      setUrlInput("");
      setIsAddingUrl(false);
    }
  };

  // Sample luxury luggage assets for instant addition
  const sampleLuggageAssets = [
    "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <div className="space-y-4">
      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => setIsAddingUrl(true)}
        className="border-2 border-dashed border-[#2C2C2C] hover:border-[#D4AF37]/60 bg-[#141414] hover:bg-[#181818] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#202020] text-[#D4AF37] mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h4 className="text-xs font-bold text-white mt-3 uppercase tracking-wider">
          Upload High-Resolution Imagery
        </h4>
        <p className="text-[11px] text-neutral-400 mt-1 max-w-sm mx-auto">
          Drag & drop RAW/JPEG/PNG files, connect to Cloudinary/UploadThing, or add image URL.
        </p>
        <span className="inline-block mt-3 px-3 py-1 bg-[#222222] hover:bg-[#D4AF37] text-neutral-300 hover:text-black rounded-lg text-xs font-semibold transition-colors">
          Browse Files / Add URL
        </span>
      </div>

      {/* URL Input Form */}
      {isAddingUrl && (
        <form onSubmit={handleAddCustomUrl} className="flex gap-2 p-3 rounded-xl bg-[#181818] border border-[#2A2A2A]">
          <input
            type="url"
            placeholder="Paste image URL (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-[#121212] border border-[#333] rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#D4AF37] text-black font-bold text-xs rounded-lg hover:bg-[#E5C058] transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsAddingUrl(false)}
            className="px-3 py-1.5 bg-[#222] text-neutral-400 hover:text-white text-xs rounded-lg transition-colors"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {images.map((img, idx) => {
            const isThumb = img === thumbnail;
            return (
              <div
                key={idx}
                className={clsx(
                  "relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border transition-all group",
                  isThumb ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30" : "border-[#262626]"
                )}
              >
                <Image src={img} alt="Product preview" fill className="object-cover" />

                {/* Primary Thumbnail Badge */}
                {isThumb && (
                  <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-wider bg-[#D4AF37] text-black px-2 py-0.5 rounded-md shadow-md">
                    Cover
                  </span>
                )}

                {/* Action Controls on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  {!isThumb && (
                    <button
                      type="button"
                      onClick={() => handleSetThumbnail(img)}
                      className="p-1.5 rounded-lg bg-[#222] hover:bg-[#D4AF37] text-white hover:text-black transition-colors"
                      title="Set as Primary Cover"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(img)}
                    className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                    title="Remove Image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-xs text-neutral-400">
          <span>Quick add curated sample images: </span>
          <div className="flex justify-center gap-2 mt-2">
            {sampleLuggageAssets.map((asset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddSample(asset)}
                className="text-[11px] px-2.5 py-1 rounded bg-[#1C1C1C] hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors border border-[#333]"
              >
                Luggage Asset #{i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
