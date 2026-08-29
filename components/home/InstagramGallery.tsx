"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Instagram, ShoppingBag, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface InstaPost {
  id: string;
  image: string;
  location: string;
  likes: number;
  productTagged: string;
}

export const InstagramGallery: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstaPost | null>(null);

  const posts: InstaPost[] = [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=800&auto=format&fit=crop",
      location: "Amalfi Coast, Italy",
      likes: 1420,
      productTagged: "Titanium Cabin Plus in Silver",
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800&auto=format&fit=crop",
      location: "St. Moritz, Switzerland",
      likes: 1840,
      productTagged: "Grand Tour Checked 85L in Obsidian",
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      location: "First Class Suite, Emirates A380",
      likes: 2750,
      productTagged: "Horizon Hybrid Cabin Spinner",
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      location: "Hôtel Plaza Athénée, Paris",
      likes: 1980,
      productTagged: "Atelier Vanity Travel Case 18L",
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=800&auto=format&fit=crop",
      location: "Lake Como, Villa d'Este",
      likes: 2190,
      productTagged: "Transatlantic Aluminum Trunk 95L",
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800&auto=format&fit=crop",
      location: "Ginza, Tokyo",
      likes: 3100,
      productTagged: "Executive Pilot Case 34L",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-accent flex items-center gap-1.5 mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>#LuxuryLuggageVoyage</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
              Curated From The Runway
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            <span>Follow @LuxuryLuggage</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-neutral-100 shadow-sm hover:shadow-xl transition-all"
            >
              <Image
                src={post.image}
                alt={post.location}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-white/80" />
                </div>

                <div>
                  <div className="text-[10px] font-bold text-accent truncate">
                    {post.location}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-300 mt-1">
                    <Heart className="w-3 h-3 fill-accent text-accent" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal View for Post */}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          maxWidth="lg"
          className="p-0 overflow-hidden"
        >
          <div className="relative aspect-square w-full bg-neutral-900">
            <Image
              src={selectedPost.image}
              alt={selectedPost.location}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 bg-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-accent font-semibold">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{selectedPost.productTagged}</span>
              </div>
              <h4 className="text-sm font-bold text-primary mt-1">
                {selectedPost.location}
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>{selectedPost.likes.toLocaleString()} likes</span>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
