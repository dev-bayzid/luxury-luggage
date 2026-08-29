"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ADMIN_MEDIA_FILES } from "@/data/adminMockData";
import { AdminMediaFile } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { Modal } from "@/components/ui/Modal";
import {
  UploadCloud,
  Search,
  Folder,
  FolderOpen,
  Copy,
  Trash2,
  ExternalLink,
  Check,
  Sparkles,
  Info,
} from "lucide-react";
import { clsx } from "clsx";

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<AdminMediaFile[]>(ADMIN_MEDIA_FILES);
  const [selectedFolder, setSelectedFolder] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<AdminMediaFile | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newFolder, setNewFolder] = useState<AdminMediaFile["folder"]>("Products");

  const folders = ["All", "Products", "Banners", "Lookbooks", "Atelier"];

  const filteredFiles = files.filter((f) => {
    if (selectedFolder !== "All" && f.folder !== selectedFolder) return false;
    if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const handleCopyUrl = (file: AdminMediaFile) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this asset from media library?")) {
      setFiles(files.filter((f) => f.id !== id));
      if (selectedFile?.id === id) setSelectedFile(null);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl) {
      const newFile: AdminMediaFile = {
        id: `med-${Date.now()}`,
        name: newUrl.split("/").pop()?.split("?")[0] || "luggage-asset.jpg",
        url: newUrl,
        folder: newFolder,
        size: "3.2 MB",
        dimensions: "2400 x 3000",
        type: "image/jpeg",
        uploadedAt: new Date().toISOString().split("T")[0],
      };
      setFiles([newFile, ...files]);
      setNewUrl("");
      setIsUploadModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Digital Assets & High-Resolution Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Media Library
          </h1>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4 stroke-[2.5]" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Folders Bar & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Folders */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 w-full md:w-auto scrollbar-none">
          {folders.map((fld) => {
            const isSelected = selectedFolder === fld;
            const count =
              fld === "All"
                ? files.length
                : files.filter((f) => f.folder === fld).length;

            return (
              <button
                key={fld}
                onClick={() => setSelectedFolder(fld)}
                className={clsx(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border",
                  isSelected
                    ? "bg-[#1C1C1C] text-[#E5C058] border-[#D4AF37]/40 shadow-sm"
                    : "bg-[#121212] text-neutral-400 border-[#222] hover:text-white"
                )}
              >
                {isSelected ? (
                  <FolderOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                ) : (
                  <Folder className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span>{fld}</span>
                <span className="text-[10px] font-mono text-neutral-400">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search filenames..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-[#121212] border border-[#222222] hover:border-[#333333] rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden cursor-pointer" onClick={() => setSelectedFile(file)}>
              <Image
                src={file.url}
                alt={file.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(file);
                  }}
                  className="p-2 rounded-xl bg-[#222] hover:bg-[#D4AF37] text-white hover:text-black transition-colors"
                  title="Copy Direct URL"
                >
                  {copiedId === file.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                  title="Delete Asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h4 className="text-xs font-bold text-neutral-200 truncate" title={file.name}>
                  {file.name}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-1">
                  <span>{file.folder}</span>
                  <span>{file.size}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between text-[10px] text-neutral-400">
                <span>{file.dimensions}</span>
                <button
                  onClick={() => handleCopyUrl(file)}
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  {copiedId === file.id ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Preview Modal */}
      {selectedFile && (
        <Modal
          isOpen={Boolean(selectedFile)}
          onClose={() => setSelectedFile(null)}
          title={selectedFile.name}
          subtitle={`Folder: ${selectedFile.folder} • Uploaded: ${selectedFile.uploadedAt}`}
          maxWidth="lg"
          className="bg-[#141414] border-[#2A2A2A]"
        >
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900 border border-[#333]">
              <Image src={selectedFile.url} alt={selectedFile.name} fill className="object-contain" />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#181818] border border-[#222]">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">File Size</span>
                <span className="font-mono text-white font-bold">{selectedFile.size}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#222]">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Dimensions</span>
                <span className="font-mono text-white font-bold">{selectedFile.dimensions}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#222]">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Format</span>
                <span className="font-mono text-white font-bold">{selectedFile.type}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={selectedFile.url}
                className="flex-1 bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs font-mono text-neutral-300 focus:outline-none"
              />
              <button
                onClick={() => handleCopyUrl(selectedFile)}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs rounded-xl transition-all"
              >
                {copiedId === selectedFile.id ? "Copied!" : "Copy URL"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Modal (Cloudinary / UploadThing / Direct URL) */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload High-Resolution Assets"
        subtitle="Supports RAW, JPEG, PNG, WebP via Cloudinary or UploadThing"
        maxWidth="md"
        className="bg-[#141414] border-[#2A2A2A]"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div className="border-2 border-dashed border-[#333] p-6 rounded-2xl text-center bg-[#181818]">
            <UploadCloud className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <p className="font-bold text-white">Drag & drop files or click to browse</p>
            <span className="text-[11px] text-neutral-400 block mt-1">Up to 32MB per asset (Lossless Color Calibration)</span>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Direct Image URL
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Folder Destination
            </label>
            <select
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value as AdminMediaFile["folder"])}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Products">Products</option>
              <option value="Banners">Banners</option>
              <option value="Lookbooks">Lookbooks</option>
              <option value="Atelier">Atelier</option>
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs rounded-xl shadow-gold-glow transition-all"
            >
              Add to Library
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
