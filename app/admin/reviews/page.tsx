"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ADMIN_REVIEWS } from "@/data/adminMockData";
import { AdminReview, ReviewStatus } from "@/types/admin";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminBadge } from "@/components/admin/ui/AdminBadge";
import {
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trash2,
  Filter,
  Check,
  ShieldCheck,
} from "lucide-react";
import { clsx } from "clsx";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>(ADMIN_REVIEWS);
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredReviews = reviews.filter((r) => {
    if (activeTab !== "All" && r.status !== activeTab) return false;
    return true;
  });

  const handleUpdateStatus = (id: string, status: ReviewStatus) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleToggleFeatured = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1F1F1F]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
            Client Acclaim & Quality Feedback
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
            Review Moderation Queue
          </h1>
        </div>

        {/* Rating Score Summary */}
        <div className="flex items-center gap-3 bg-[#141414] border border-[#242424] px-4 py-2 rounded-2xl">
          <div className="flex items-center gap-1 text-[#D4AF37]">
            <Star className="w-4 h-4 fill-[#D4AF37]" />
            <span className="font-display font-bold text-base text-white">
              {averageRating}
            </span>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            / 5.0 (100% Verified Voyagers)
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-[#1F1F1F] pb-1">
        {["All", "Pending", "Approved", "Rejected"].map((tab) => {
          const count =
            tab === "All"
              ? reviews.length
              : reviews.filter((r) => r.status === tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2",
                isActive
                  ? "text-[#E5C058] border-[#D4AF37] bg-[#141414]"
                  : "text-neutral-400 border-transparent hover:text-neutral-200"
              )}
            >
              <span>{tab}</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#202020] text-neutral-400">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Review Cards Grid */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <AdminCard key={rev.id} noPadding className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Left Content */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-neutral-900 border border-[#333] shrink-0">
                  <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-0.5 text-[#D4AF37]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="font-bold text-sm text-white">{rev.author}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
                    <span className="text-[10px] text-neutral-400">• {rev.location}</span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-100 font-display">
                    &quot;{rev.title}&quot;
                  </h4>

                  <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
                    {rev.content}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-neutral-400">
                      Product: <strong className="text-white">{rev.productName}</strong>
                    </span>
                    {rev.isFeatured && (
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                        Featured on Homepage
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#1F1F1F]">
                <AdminBadge
                  variant={
                    rev.status === "Approved"
                      ? "success"
                      : rev.status === "Pending"
                      ? "warning"
                      : "danger"
                  }
                  dot
                >
                  {rev.status}
                </AdminBadge>

                <div className="flex items-center gap-1.5 mt-2">
                  {rev.status !== "Approved" && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, "Approved")}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-xs transition-colors flex items-center gap-1 border border-emerald-500/30"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {rev.status !== "Rejected" && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, "Rejected")}
                      className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 font-semibold text-xs transition-colors"
                    >
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleToggleFeatured(rev.id)}
                    className={clsx(
                      "p-1.5 rounded-xl transition-colors border",
                      rev.isFeatured
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : "bg-[#1E1E1E] text-neutral-400 hover:text-[#D4AF37] border-[#333]"
                    )}
                    title={rev.isFeatured ? "Remove from Featured" : "Feature on Homepage"}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 rounded-xl bg-[#1E1E1E] text-neutral-400 hover:text-red-400 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
