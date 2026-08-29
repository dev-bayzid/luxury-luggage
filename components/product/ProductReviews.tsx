"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { REVIEWS } from "@/data/reviews";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2, ThumbsUp, Sparkles, PenTool } from "lucide-react";

interface ProductReviewsProps {
  product: Product;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const { showToast } = useToast();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewContent.trim()) {
      showToast("Incomplete Review", "Please provide a title and review commentary.", "error");
      return;
    }
    showToast("Review Submitted", "Thank you for sharing your voyage experience.", "success");
    setIsWriteReviewOpen(false);
    setReviewTitle("");
    setReviewContent("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-luxury space-y-10">
      {/* Top Review Header & Rating Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-neutral-200">
        {/* Rating Score */}
        <div className="lg:col-span-4 text-center lg:text-left space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-accent flex items-center justify-center lg:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Acclaim</span>
          </span>
          <div className="text-5xl font-black text-primary font-display">
            {product.rating.toFixed(1)}
          </div>
          <Rating rating={product.rating} size="lg" showText={false} className="justify-center lg:justify-start" />
          <div className="text-xs text-neutral-500">
            Based on {product.reviewCount} verified international journeys
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="lg:col-span-5 space-y-2">
          {[
            { stars: 5, pct: 92 },
            { stars: 4, pct: 6 },
            { stars: 3, pct: 2 },
            { stars: 2, pct: 0 },
            { stars: 1, pct: 0 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-neutral-600 font-semibold">{bar.stars} stars</span>
              <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-8 text-neutral-400 font-mono text-[11px]">{bar.pct}%</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="lg:col-span-3 text-center lg:text-right">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsWriteReviewOpen(true)}
            className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold"
          >
            <PenTool className="w-3.5 h-3.5 mr-1.5" />
            <span>Write a Review</span>
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-primary">Recent Global Reviews</h3>
        <div className="divide-y divide-neutral-100">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="py-6 first:pt-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200">
                    <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-primary">{rev.author}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Voyager
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400">{rev.location} • {rev.date}</div>
                  </div>
                </div>

                <Rating rating={rev.rating} size="sm" showText={false} />
              </div>

              <h4 className="text-sm font-bold text-primary">&ldquo;{rev.title}&rdquo;</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">&ldquo;{rev.content}&rdquo;</p>

              <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        title="Share Your Voyage Experience"
        subtitle={`Reviewing: ${product.name}`}
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Rating rating={star <= reviewRating ? 5 : 0} size="md" showText={false} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
              Headline
            </label>
            <input
              type="text"
              placeholder="e.g. Unmatched poise from London to Tokyo"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
              Review Commentary
            </label>
            <textarea
              rows={4}
              placeholder="Describe the handling, wheel silence, packing capacity, and durability..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="w-full border border-neutral-200 rounded-xl p-4 text-xs text-primary focus:outline-none focus:border-accent resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsWriteReviewOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
