"use client";

import React from "react";
import Link from "next/link";
import { AdminCard } from "../ui/AdminCard";
import { AdminBadge } from "../ui/AdminBadge";
import { ADMIN_REVIEWS } from "@/data/adminMockData";
import { Star, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const RecentReviewsWidget: React.FC = () => {
  return (
    <AdminCard
      title="Recent Customer Acclaim & Reviews"
      subtitle="Pending moderation and verified client testimonials"
      action={
        <Link
          href="/admin/reviews"
          className="text-xs font-semibold text-[#D4AF37] hover:text-[#E5C058] flex items-center gap-1 transition-colors"
        >
          <span>Moderation Queue</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      }
      noPadding
    >
      <div className="divide-y divide-[#1F1F1F]">
        {ADMIN_REVIEWS.map((rev) => (
          <div key={rev.id} className="p-4 space-y-2 hover:bg-[#161616] transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-[#D4AF37]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-200">{rev.author}</span>
              </div>

              <AdminBadge
                variant={
                  rev.status === "Approved"
                    ? "success"
                    : rev.status === "Pending"
                    ? "warning"
                    : "danger"
                }
              >
                {rev.status}
              </AdminBadge>
            </div>

            <h5 className="text-xs font-semibold text-white truncate">&quot;{rev.title}&quot;</h5>
            <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
              {rev.content}
            </p>
            <p className="text-[10px] text-neutral-400">
              Product: <span className="text-neutral-300 font-medium">{rev.productName}</span> • {rev.location}
            </p>
          </div>
        ))}
      </div>
    </AdminCard>
  );
};
