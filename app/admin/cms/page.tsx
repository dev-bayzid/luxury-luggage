"use client";

import React, { useState, useEffect } from "react";
import { CMS_DEFAULT_SECTIONS } from "@/data/adminMockData";
import { CMSSectionConfig } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import {
  GripVertical,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Sliders,
  Type,
  Link as LinkIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";

const STORAGE_KEY = "luxury_luggage_cms_sections";

export default function CMSPage() {
  const [sections, setSections] = useState<CMSSectionConfig[]>(CMS_DEFAULT_SECTIONS);
  const [isSaved, setIsSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>("sec-hero");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSections(JSON.parse(saved));
      }
    } catch (e) {
      // LocalStorage fallback
    }
  }, []);

  const handleToggleEnable = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    )
      return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setSections(updated);
  };

  const handleFieldChange = (
    id: string,
    field: keyof CMSSectionConfig,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
    } catch (e) {}
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all homepage layout and copy back to default atelier settings?")) {
      setSections(CMS_DEFAULT_SECTIONS);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  const enabledCount = sections.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Visual Content Management & Section Architecture
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Homepage Visual Builder
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-xs font-semibold text-neutral-300 hover:text-[#E5C058] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Preview Storefront</span>
          </Link>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89328] hover:from-[#E5C058] hover:to-[#D4AF37] text-neutral-950 font-bold text-xs shadow-gold-glow transition-all"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                <span>Layout Published</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>Save Homepage Layout</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overview Stat Bar */}
      <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-neutral-300">
            Active Storefront Sections:{" "}
            <strong className="text-white">
              {enabledCount} of {sections.length} enabled
            </strong>
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 font-mono">
          Drag handles or arrows to rearrange sequence
        </span>
      </div>

      {/* Sections Reorderable List */}
      <div className="space-y-4">
        <AnimatePresence>
          {sections.map((section, idx) => {
            const isExpanded = expandedId === section.id;

            return (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  "bg-[#121212] border rounded-2xl overflow-hidden transition-all",
                  section.enabled
                    ? isExpanded
                      ? "border-[#D4AF37]/50 shadow-xl"
                      : "border-[#222222] hover:border-[#333]"
                    : "border-[#1A1A1A] opacity-60 bg-[#0E0E0E]"
                )}
              >
                {/* Section Header Row */}
                <div className="p-4 flex items-center justify-between gap-4">
                  {/* Drag Handle & Order */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-0.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, "up")}
                        className="p-1 rounded hover:bg-[#202020] text-neutral-400 hover:text-white disabled:opacity-20 transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === sections.length - 1}
                        onClick={() => handleMove(idx, "down")}
                        className="p-1 rounded hover:bg-[#202020] text-neutral-400 hover:text-white disabled:opacity-20 transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-neutral-400 w-5 text-center">
                      #{idx + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-display">
                          {section.name}
                        </h4>
                        <AdminBadge
                          variant={section.enabled ? "success" : "neutral"}
                          size="sm"
                        >
                          {section.enabled ? "Active on Homepage" : "Disabled"}
                        </AdminBadge>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate max-w-md mt-0.5">
                        &quot;{section.title}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Actions: Enable Toggle + Expand Edit */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleEnable(section.id)}
                      className={clsx(
                        "p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors",
                        section.enabled
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white"
                      )}
                      title={section.enabled ? "Disable Section" : "Enable Section"}
                    >
                      {section.enabled ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Hidden</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : section.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] text-xs font-semibold text-neutral-200 transition-colors"
                    >
                      {isExpanded ? "Collapse" : "Edit Copy"}
                    </button>
                  </div>
                </div>

                {/* Inline Editable Fields Container */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#1F1F1F] bg-[#0E0E0E] space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Section Headline / Title
                        </label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => handleFieldChange(section.id, "title", e.target.value)}
                          className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      {section.badge !== undefined && (
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-neutral-400 mb-1">
                            Uppercase Gold Badge Tag
                          </label>
                          <input
                            type="text"
                            value={section.badge || ""}
                            onChange={(e) => handleFieldChange(section.id, "badge", e.target.value)}
                            className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-[#E5C058] font-semibold focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Subtitle / Narrative Text
                      </label>
                      <textarea
                        rows={2}
                        value={section.subtitle}
                        onChange={(e) => handleFieldChange(section.id, "subtitle", e.target.value)}
                        className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl p-3 text-xs text-neutral-200 leading-relaxed focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* CTA Links if applicable */}
                    {section.ctaText !== undefined && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1A1A1A]">
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-neutral-400 mb-1">
                            Primary CTA Button Label
                          </label>
                          <input
                            type="text"
                            value={section.ctaText || ""}
                            onChange={(e) => handleFieldChange(section.id, "ctaText", e.target.value)}
                            className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-neutral-400 mb-1">
                            Primary CTA Target URL
                          </label>
                          <input
                            type="text"
                            value={section.ctaLink || ""}
                            onChange={(e) => handleFieldChange(section.id, "ctaLink", e.target.value)}
                            className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl px-3.5 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
