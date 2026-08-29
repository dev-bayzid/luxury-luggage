export interface ProductColor {
  name: string;
  hex: string;
  borderHex?: string;
  image: string;
}

export interface ProductDimensions {
  height: string;
  width: string;
  depth: string;
  weight: string;
  volume: string;
}

export interface ProductAirlineFit {
  cabinApproved: boolean;
  airlines: string[];
}

export type LuggageCategory =
  | 'Cabin Luggage'
  | 'Checked Luggage'
  | 'Aluminum Trunks'
  | 'Hybrid Spinners'
  | 'Heritage Cases';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: LuggageCategory;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  story: string;
  dimensions: ProductDimensions;
  materials: string[];
  features: string[];
  colors: ProductColor[];
  sizes?: { name: string; volume: string; dimensions: string; priceDiff?: number }[];
  images: string[];
  specs: {
    shell: string;
    wheels: string;
    lock: string;
    handle: string;
    interior: string;
    zippers: string;
  };
  airlineFit: ProductAirlineFit;
  warranty: string;
}

export interface CustomerReview {
  id: string;
  productId?: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  location: string;
  productName?: string;
  productImage?: string;
  helpfulCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  itemCount: number;
  badge?: string;
}

export interface TravelCollection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  itemCount: number;
  tag: string;
}

export interface CartItem {
  id: string; // unique combo of productId + color + size
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  color: {
    name: string;
    hex: string;
  };
  size: string;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  colors: string[];
  materials: string[];
  sortBy: 'featured' | 'bestselling' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}
