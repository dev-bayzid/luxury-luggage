import { CustomerReview } from "@/types";

export const REVIEWS: CustomerReview[] = [
  {
    id: "rev-01",
    productId: "aur-01",
    author: "Maximilian Von Berg",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    date: "February 18, 2026",
    title: "Quiet perfection across 40 flights this year.",
    content: "The Hinomoto wheels glide so smoothly on airport marble it feels weightless. The aluminum patina after 100,000 miles makes it look even more distinguished. Easily the finest piece of luggage I've ever owned.",
    verified: true,
    location: "Zurich, Switzerland",
    productName: "The Titanium Cabin Plus",
    productImage: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=300&auto=format&fit=crop",
    helpfulCount: 42
  },
  {
    id: "rev-02",
    productId: "aur-04",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    date: "January 29, 2026",
    title: "The deep trunk format changed how I pack forever.",
    content: "Took the Transatlantic Trunk to Lake Como. The 80/20 deep well easily fits hats, footwear, and evening wear without crushing. Received compliments from every hotel concierge.",
    verified: true,
    location: "Milan, Italy",
    productName: "The Transatlantic Trunk Large 95L",
    productImage: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=300&auto=format&fit=crop",
    helpfulCount: 28
  },
  {
    id: "rev-03",
    productId: "aur-02",
    author: "Julian Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    date: "January 14, 2026",
    title: "Survives brutal baggage handlers without a flinch.",
    content: "I was skeptical about polycarbonate durability for long international hauls, but after London to Tokyo to Sydney, the Grand Tour Checked returned completely flawless. The internal compression dividers are second to none.",
    verified: true,
    location: "Tokyo, Japan",
    productName: "The Grand Tour Checked 85L",
    productImage: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=300&auto=format&fit=crop",
    helpfulCount: 19
  },
  {
    id: "rev-04",
    productId: "aur-08",
    author: "Sophia Sterling",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    rating: 5,
    date: "December 20, 2025",
    title: "The rapid-access laptop pocket is pure genius.",
    content: "Passing through security without opening my entire carry-on suitcase is a gamechanger. The dual TSA lock secures both the front and main compartments with one code.",
    verified: true,
    location: "New York, USA",
    productName: "The Horizon Hybrid Cabin Spinner",
    productImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop",
    helpfulCount: 35
  }
];
