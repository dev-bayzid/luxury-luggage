export interface FAQItem {
  id: string;
  category: 'Orders & Shipping' | 'Warranty & Care' | 'TSA Locks & Sizing' | 'Materials & Design';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-01",
    category: "Orders & Shipping",
    question: "What are your shipping destinations and complimentary delivery policies?",
    answer: "Aurelia & Co. provides complimentary white-glove express courier shipping on all orders exceeding $300 worldwide. Domestic orders typically arrive within 2–3 business days. International orders are handled via express air courier with all duties and import taxes prepaid by us."
  },
  {
    id: "faq-02",
    category: "Warranty & Care",
    question: "What does the Aurelia Unconditional Lifetime Guarantee cover?",
    answer: "Our lifetime guarantee covers any functional damage caused by airline baggage handlers or normal travel wear, including cracks in aluminum or polycarbonate shells, broken wheels, damaged telescopic handles, zipper malfunctions, and defective TSA locks. We offer worldwide repairs through our flagship boutiques or concierge mail-in service."
  },
  {
    id: "faq-03",
    category: "TSA Locks & Sizing",
    question: "How do I reset or set the combination on my integrated TSA lock?",
    answer: "All Aurelia cases arrive pre-set to 0-0-0. To reset: 1) Slide the open button in and hold the reset pin with a pen tip until it clicks. 2) Turn dials to your desired 3-digit combination. 3) Release the slider; the reset pin will click back into position. Your custom code is now secured."
  },
  {
    id: "faq-04",
    category: "TSA Locks & Sizing",
    question: "Will the Cabin Plus fit in domestic and international overhead bins?",
    answer: "Yes, The Titanium Cabin Plus and The Horizon Hybrid are engineered within standard IATA dimensions (56 x 39 x 23 cm) and fit into 99% of commercial international overhead bins, including airlines such as Delta, United, American Airlines, Lufthansa, British Airways, Emirates, and Singapore Airlines."
  },
  {
    id: "faq-05",
    category: "Materials & Design",
    question: "How should I clean and care for my aluminum or leather piece?",
    answer: "For aluminum luggage: use a damp microfiber cloth with mild soapy water. Minor scuffs and flight stickers can be gently removed with our proprietary aluminum cleaning polish. For Italian Vachetta leather: condition twice annually with natural beeswax or leather cream to enhance the rich amber patina."
  },
  {
    id: "faq-06",
    category: "Orders & Shipping",
    question: "What is your return and trial policy?",
    answer: "We offer a 100-day risk-free trial on all non-personalized luggage. If you are not thoroughly captivated by your Aurelia piece, we will arrange complimentary return pickup from your residence and issue a 100% refund."
  }
];

export const AIRLINE_SIZE_GUIDE = [
  { airline: "Delta Air Lines", carryOnMax: "56 x 35 x 23 cm (22 x 14 x 9 in)", maxWeight: "No weight limit", status: "Fits Cabin Plus" },
  { airline: "United Airlines", carryOnMax: "56 x 35 x 22 cm (22 x 14 x 9 in)", maxWeight: "No weight limit", status: "Fits Cabin Plus" },
  { airline: "American Airlines", carryOnMax: "56 x 36 x 23 cm (22 x 14 x 9 in)", maxWeight: "No weight limit", status: "Fits Cabin Plus" },
  { airline: "Lufthansa", carryOnMax: "55 x 40 x 23 cm (21.6 x 15.7 x 9 in)", maxWeight: "8 kg (17.6 lbs)", status: "Fits Cabin Plus" },
  { airline: "British Airways", carryOnMax: "56 x 45 x 25 cm (22 x 18 x 10 in)", maxWeight: "23 kg (51 lbs)", status: "Fits Cabin Plus" },
  { airline: "Emirates", carryOnMax: "55 x 38 x 20 cm (21.6 x 15 x 8 in)", maxWeight: "7 kg (15 lbs)", status: "Fits Cabin Plus" },
  { airline: "Singapore Airlines", carryOnMax: "55 x 40 x 20 cm (21.6 x 15.7 x 8 in)", maxWeight: "7 kg (15 lbs)", status: "Fits Cabin Plus" },
  { airline: "Air France / KLM", carryOnMax: "55 x 35 x 25 cm (21.7 x 13.8 x 9.9 in)", maxWeight: "12 kg (26.4 lbs)", status: "Fits Cabin Plus" }
];
