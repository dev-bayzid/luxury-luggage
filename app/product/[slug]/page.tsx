import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumb } from "@/components/common/Breadcrumb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found | AURELIA & CO." };

  return {
    title: `${product.name} | AURELIA & CO. Luxury Luggage`,
    description: `${product.tagline} Handcrafted luxury travel gear with unconditional lifetime warranty.`,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-secondary-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Shop", href: "/shop" },
              { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
              { label: product.name },
            ]}
          />
        </div>

        {/* Top Product Hero: Gallery (Left) & Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
              isNew={product.isNew}
            />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="mb-16">
          <ProductTabs product={product} />
        </div>

        {/* Customer Acclaim / Reviews */}
        <div className="mb-16">
          <ProductReviews product={product} />
        </div>

        {/* Related Products Recommendations */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}
