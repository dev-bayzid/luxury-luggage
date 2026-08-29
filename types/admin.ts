import { LuggageCategory, ProductDimensions } from "./index";

export type OrderStatus = "Pending" | "Paid" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

export interface AdminOrderItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

export interface OrderTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: OrderStatus;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
  carrier?: string;
  items: AdminOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  timeline: OrderTimelineEvent[];
  notes?: string;
}

export type ProductStatus = "Published" | "Draft" | "Archived";

export interface AdminProduct {
  id: string;
  sku: string;
  barcode?: string;
  name: string;
  slug: string;
  category: LuggageCategory;
  price: number;
  comparePrice?: number;
  cost?: number;
  stock: number;
  trackInventory: boolean;
  status: ProductStatus;
  isFeatured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  description: string;
  materials: string[];
  features: string[];
  dimensions: ProductDimensions;
  weight: string;
  colors: { name: string; hex: string; image: string }[];
  sizes?: { name: string; volume: string; dimensions: string; priceDiff?: number }[];
  specs: {
    shell: string;
    wheels: string;
    lock: string;
    handle: string;
    interior: string;
    zippers: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  itemCount: number;
  parentId?: string | null;
  subcategories?: { id: string; name: string; slug: string; itemCount: number }[];
  badge?: string;
  isFeatured: boolean;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tier: "VIP First Class" | "Executive Voyager" | "Member";
  totalOrders: number;
  lifetimeSpend: number;
  joinedDate: string;
  lastOrderDate: string;
  addresses: {
    type: "Default Shipping" | "Billing" | "Secondary";
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }[];
  notes?: string;
}

export type ReviewStatus = "Approved" | "Pending" | "Rejected";

export interface AdminReview {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  author: string;
  authorEmail: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  status: ReviewStatus;
  isFeatured: boolean;
  location: string;
}

export interface AdminInventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  image: string;
  category: LuggageCategory;
  stock: number;
  lowStockThreshold: number;
  warehouses: {
    zurich: number;
    frankfurt: number;
    newYork: number;
    tokyo: number;
  };
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastRestocked: string;
}

export interface AdminDiscount {
  id: string;
  code: string;
  type: "Percentage" | "Fixed Amount";
  value: number;
  minOrderValue: number;
  usedCount: number;
  usageLimit?: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  description: string;
}

export interface AdminMediaFile {
  id: string;
  name: string;
  url: string;
  folder: "Products" | "Banners" | "Lookbooks" | "Atelier";
  size: string;
  dimensions: string;
  type: "image/jpeg" | "image/png" | "image/webp";
  uploadedAt: string;
}

export interface CMSSectionConfig {
  id: string;
  name: string;
  type: "hero" | "brand_trust" | "categories" | "featured_products" | "best_sellers" | "new_arrivals" | "collections" | "why_choose_us" | "testimonials" | "instagram" | "newsletter";
  enabled: boolean;
  title: string;
  subtitle: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface AdminSettingsConfig {
  storeName: string;
  tagline: string;
  contactEmail: string;
  hotlinePhone: string;
  currency: string;
  taxRate: number;
  freeShippingThreshold: number;
  standardShippingFee: number;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string;
  };
}
