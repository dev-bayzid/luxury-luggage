import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "aur-01",
    slug: "aurelia-titanium-cabin-plus",
    name: "The Titanium Cabin Plus",
    tagline: "Anodized aerospace aluminum with whisper-quiet Japanese ball-bearing wheels.",
    category: "Cabin Luggage",
    categorySlug: "cabin-luggage",
    price: 680,
    originalPrice: 750,
    rating: 4.9,
    reviewCount: 342,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    description: "Engineered from high-grade anodized aluminum-magnesium alloy, the Titanium Cabin Plus is the pinnacle of timeless travel luxury. Featuring dual integrated TSA combination lock latches, bespoke leather handles handcrafted in Florence, and a precision-calibrated interior compression system.",
    story: "Designed in our Zurich studio and precision-crafted with high-tensile alloy, this piece withstands up to 250kg of external pressure while gliding effortlessly through airport concourses.",
    dimensions: {
      height: "56 cm / 22.0 in",
      width: "39 cm / 15.3 in",
      depth: "23 cm / 9.0 in",
      weight: "4.3 kg / 9.4 lbs",
      volume: "42 L"
    },
    materials: [
      "Aerospace-grade Anodized Aluminum-Magnesium Alloy",
      "Full-grain Tuscan Vachetta Leather Grab Handles",
      "Water-resistant Recycled High-Density Jacquard Twill Lining",
      "Reinforced Corner Bumpers with Dual Riveting"
    ],
    features: [
      "Patented 360° Hinomoto Lisof® Silent Spinner Wheels",
      "Integrated Dual TSA 008 Master Key Combination Locks",
      "Multi-stage Ergonomic Aircraft Aluminum Telescopic Handle",
      "Dual-sided Modular Divider Compression Panels with YKK Zippers",
      "Waterproof Laundry & Shoe Compartments Included",
      "Concealed Add-a-Bag Leather Luggage Strap"
    ],
    colors: [
      {
        name: "Silver Titanium",
        hex: "#D8D8D8",
        borderHex: "#B8B8B8",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Matte Obsidian",
        hex: "#1C1C1C",
        borderHex: "#333333",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Champagne Gold",
        hex: "#C8A96A",
        borderHex: "#A98A4D",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    sizes: [
      { name: "Cabin Standard", volume: "36L", dimensions: "55 x 35 x 20 cm", priceDiff: -40 },
      { name: "Cabin Plus", volume: "42L", dimensions: "56 x 39 x 23 cm", priceDiff: 0 },
      { name: "Cabin Expandable", volume: "48L", dimensions: "56 x 39 x 26 cm", priceDiff: 50 }
    ],
    images: [
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "100% Virgin Aerospace Aluminum-Magnesium Alloy (1.2mm thickness)",
      wheels: "4x Japanese Hinomoto Lisof® 360° ultra-silent polyurethane wheels",
      lock: "Dual TSA-approved keyless combination lock latches (no zipper breach)",
      handle: "3-stage telescopic system with zero handle play",
      interior: "100% recycled polyester jacquard with antibacterial silver-ion coating",
      zippers: "YKK Racquet Coil water-resistant interior zips"
    },
    airlineFit: {
      cabinApproved: true,
      airlines: ["Delta", "United", "American Airlines", "Lufthansa", "Emirates", "British Airways", "Air France", "Singapore Airlines"]
    },
    warranty: "Unconditional Lifetime Guarantee against all functional airline damage."
  },
  {
    id: "aur-02",
    slug: "aurelia-grand-tour-checked-large",
    name: "The Grand Tour Checked 85L",
    tagline: "Resilient German Makrolon® polycarbonate with expansive dual capacity.",
    category: "Checked Luggage",
    categorySlug: "checked-luggage",
    price: 540,
    originalPrice: 620,
    rating: 4.8,
    reviewCount: 219,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    description: "Crafted for extended global journeys, the Grand Tour Checked 85L provides unmatched strength-to-weight performance. Built with 100% German Makrolon® polycarbonate, this piece flexes upon impact without cracking, returning instantly to its original sculptural contour.",
    story: "Tested through 5,000 drop cycles and sub-zero thermal extremes to ensure your most treasured travel wardrobe arrives immaculate in any climate.",
    dimensions: {
      height: "76 cm / 29.9 in",
      width: "51 cm / 20.0 in",
      depth: "28 cm / 11.0 in",
      weight: "4.9 kg / 10.8 lbs",
      volume: "85 L"
    },
    materials: [
      "100% German Bayer Makrolon® Polycarbonate Shell",
      "Custom Electroplated Metal Trims & Anodized Corner Protectors",
      "Full Grain Italian Leather Clasp Handles",
      "Premium Diamond-Ripstop Interior Jacquard"
    ],
    features: [
      "Dual Compression Flex Dividers with Zippered Mesh Pockets",
      "Integrated Ultra-Flat TSA Combination Lock",
      "Patented 360° Multi-terrain Silent Double Spinners",
      "Integrated Digital Luggage Scale in Top Leather Handle",
      "Removable Compression Laundry Bag and Shoe Pouches"
    ],
    colors: [
      {
        name: "Matte Obsidian",
        hex: "#18181B",
        borderHex: "#3F3F46",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Alpine Slate",
        hex: "#475569",
        borderHex: "#64748B",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Desert Sand",
        hex: "#D6C7B2",
        borderHex: "#B8A58D",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    sizes: [
      { name: "Checked Medium (68L)", volume: "68L", dimensions: "68 x 46 x 26 cm", priceDiff: -50 },
      { name: "Checked Large (85L)", volume: "85L", dimensions: "76 x 51 x 28 cm", priceDiff: 0 },
      { name: "Trunk Large (98L)", volume: "98L", dimensions: "74 x 42 x 36 cm", priceDiff: 70 }
    ],
    images: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "Multi-layered German Covestro Makrolon® Polycarbonate",
      wheels: "4x 60mm Japanese double-bearing whisper wheels",
      lock: "Embedded flush TSA 007 combination dial",
      handle: "High-grade tubular aluminum telescoping system",
      interior: "Oeko-Tex certified antibacterial microfiber and mesh",
      zippers: "Explosion-proof double-coil YKK ToughZips"
    },
    airlineFit: {
      cabinApproved: false,
      airlines: ["Checked Baggage Compliant worldwide (under standard 62 linear inches)"]
    },
    warranty: "Unconditional Lifetime Guarantee."
  },
  {
    id: "aur-03",
    slug: "aurelia-executive-pilot-case-34l",
    name: "The Executive Pilot Case 34L",
    tagline: "Compact hard-shell aluminum roller engineered for aviation cockpit and first-class travel.",
    category: "Cabin Luggage",
    categorySlug: "cabin-luggage",
    price: 520,
    originalPrice: 590,
    rating: 4.9,
    reviewCount: 184,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 12,
    description: "Tailored for frequent business flyers and international captains. Top-opening accordion compartments provide immediate access to laptops, documents, and headphones without unzipping the main garment suite.",
    story: "Engineered to slide effortlessly down commercial aircraft aisles and fit beneath regional jet seats when overhead bins are full.",
    dimensions: {
      height: "42 cm / 16.5 in",
      width: "44 cm / 17.3 in",
      depth: "23 cm / 9.0 in",
      weight: "3.4 kg / 7.5 lbs",
      volume: "34 L"
    },
    materials: [
      "100% Anodized Aluminum-Magnesium Outer Case",
      "Full-grain Semi-Aniline Italian Nappa Leather Accents",
      "Recycled Antimicrobial Microfiber Organizers",
      "Solid Brass Hinges and Riveted Edge Guards"
    ],
    features: [
      "Top-Opening Quick Access Accordion Tech Suite",
      "Dedicated 16\" MacBook Pro & Tablet Sleeve",
      "Integrated Dual-Port USB-C Charging Passthrough",
      "Zero-Play Telescoping Aluminum Handle",
      "Whisper-Quiet 360° Ball-Bearing Wheels"
    ],
    colors: [
      {
        name: "Titanium Silver",
        hex: "#D8D8D8",
        borderHex: "#B8B8B8",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Matte Obsidian",
        hex: "#111111",
        borderHex: "#2D2D2D",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "Reinforced 1.2mm Aviation Aluminum Alloy",
      wheels: "4x Hinomoto Lisof® 50mm double wheels",
      lock: "Dual TSA 008 Integrated Combination Locks",
      handle: "Multi-stage aircraft aluminum telescoping handle",
      interior: "Padded microfiber with modular dividers",
      zippers: "Hermetic latch closure (no exterior zippers)"
    },
    airlineFit: {
      cabinApproved: true,
      airlines: ["Meets 100% of global airline carry-on standards"]
    },
    warranty: "Lifetime Craftsmanship Guarantee."
  },
  {
    id: "aur-04",
    slug: "aurelia-transatlantic-trunk-large-95l",
    name: "The Transatlantic Trunk Large 95L",
    tagline: "Deep 80/20 trunk silhouette designed for extended grand tours.",
    category: "Aluminum Trunks",
    categorySlug: "aluminum-trunks",
    price: 790,
    originalPrice: 880,
    rating: 5.0,
    reviewCount: 97,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 6,
    description: "The classic steamship trunk reimagined for modern commercial and private aviation. The 80/20 deep well packing volume accommodates bulky garments, shoes, and suiting without folding stress.",
    story: "Tested over 10,000 km of international tarmac and designed to stack seamlessly with our cabin luggage pieces.",
    dimensions: {
      height: "75 cm / 29.5 in",
      width: "41 cm / 16.1 in",
      depth: "36 cm / 14.2 in",
      weight: "5.4 kg / 11.9 lbs",
      volume: "95 L"
    },
    materials: [
      "Heavy-Gauge Ribbed Anodized Aluminum Alloy",
      "Solid Anodized Corner Protectors with Steel Rivets",
      "Full-grain Tuscan Leather Grab Handles",
      "Quilted Alcantara-Feel Interior Lining"
    ],
    features: [
      "Deep-Well Trunk Architecture with 80/20 Packing Split",
      "Triple TSA Keyless Combination Lock Latches",
      "Modular Interior Partition Shelves with Compression Straps",
      "Quad 360° Shock-Absorbing Japanese Double Spinners",
      "Integrated Garment Suiter with Wooden Hanger"
    ],
    colors: [
      {
        name: "Classic Silver",
        hex: "#D8D8D8",
        borderHex: "#B8B8B8",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Obsidian Black",
        hex: "#18181B",
        borderHex: "#3F3F46",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "1.4mm Heavy-Duty Fluted Aluminum Shell",
      wheels: "4x 65mm Shock-Absorbing Rubber Core Spinners",
      lock: "3x Independent TSA Combination Latches",
      handle: "Continuous-stop Telescopic Ergonomic Handle",
      interior: "Padded Quilted Micro-Suede with Dividers",
      zippers: "No zippers (Hermetic tongue-and-groove seal)"
    },
    airlineFit: {
      cabinApproved: false,
      airlines: ["Checked Baggage Compliant (Standard 62 linear inches)"]
    },
    warranty: "Unconditional Lifetime Guarantee."
  },
  {
    id: "aur-05",
    slug: "aurelia-aluminum-trunk-vintage-88l",
    name: "The Heritage Aluminum Trunk 88L",
    tagline: "A nod to grand voyages with fluted alloy and hand-stitched leather corners.",
    category: "Heritage Cases",
    categorySlug: "heritage-cases",
    price: 890,
    originalPrice: 980,
    rating: 5.0,
    reviewCount: 64,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    description: "Evoking the glamorous golden age of travel, the Heritage Trunk features a distinctive deep-body silhouette optimized for packing tailored suits, boots, and bulky garments. Fitted with triple TSA latch locks and custom hand-stitched leather corners.",
    story: "The deep 80/20 trunk format allows packing without crushing delicate clothing, engineered specifically for luxury private aviation and grand international hotels.",
    dimensions: {
      height: "73 cm / 28.7 in",
      width: "41 cm / 16.1 in",
      depth: "37 cm / 14.5 in",
      weight: "5.8 kg / 12.7 lbs",
      volume: "88 L"
    },
    materials: [
      "Heavy-Gauge Aircraft Anodized Aluminum with Fluted Ridges",
      "Hand-Hammered Riveted Corner Guards",
      "Italian Saddle Leather Handles and Reinforcements",
      "Quilted Alcantara-Feel Interior Lining"
    ],
    features: [
      "Triple Integrated Keyless TSA Combination Lock Latches",
      "Quad 360° Ball-Bearing Shock Absorber Wheels",
      "Adjustable Deep-Well Removable Partition Shelves",
      "Integrated Garment Suiter with Wooden Hanger Included",
      "Dust Protection Neoprene Waterproof Perimeter Seal"
    ],
    colors: [
      {
        name: "Classic Silver",
        hex: "#E0E0E0",
        borderHex: "#C0C0C0",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Brushed Champagne",
        hex: "#C8A96A",
        borderHex: "#A08040",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "1.4mm Heavy-Duty Fluted Aluminum Shell",
      wheels: "4x 65mm Shock-Absorbing Rubber Core Spinners",
      lock: "3x Independent TSA Combination Latches",
      handle: "Continuous-stop Telescopic Ergonomic Handle",
      interior: "Padded Quilted Micro-Suede with Dividers",
      zippers: "No zippers (Hermetic tongue-and-groove seal)"
    },
    airlineFit: {
      cabinApproved: false,
      airlines: ["Checked Baggage Compliant"]
    },
    warranty: "Unconditional Lifetime Replacement."
  },
  {
    id: "aur-06",
    slug: "aurelia-vanguard-checked-medium-68l",
    name: "The Vanguard Checked Medium 68L",
    tagline: "The perfect balance of capacity and effortless maneuvering for 7-14 day journeys.",
    category: "Checked Luggage",
    categorySlug: "checked-luggage",
    price: 490,
    originalPrice: 560,
    rating: 4.9,
    reviewCount: 168,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 18,
    description: "Built with German Makrolon® polycarbonate and fortified by an anodized aluminum perimeter frame with dual keyless TSA latches instead of vulnerable exterior zippers.",
    story: "Engineered for mid-length international stays, offering optimal packing volume without exceeding airline weight thresholds.",
    dimensions: {
      height: "68 cm / 26.7 in",
      width: "45 cm / 17.7 in",
      depth: "26 cm / 10.2 in",
      weight: "4.2 kg / 9.2 lbs",
      volume: "68 L"
    },
    materials: [
      "German Bayer Makrolon® Multi-layer Polycarbonate",
      "Anodized Aluminum Center Frame & Corner Protectors",
      "Hand-burnished Italian Vachetta Leather Handles",
      "Antibacterial Silver-Ion Coated Jacquard Lining"
    ],
    features: [
      "Aluminum Frame with Dual TSA Combination Latches (Zipperless)",
      "360° Hinomoto Lisof® Japanese Ball-Bearing Spinners",
      "Dual Full-Compression Compression Boards with Zip Pockets",
      "Integrated Ergonomic Weight Indicator Handle",
      "Lifetime Airline Damage Coverage"
    ],
    colors: [
      {
        name: "Matte Obsidian",
        hex: "#1A1A1A",
        borderHex: "#333333",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Titanium Silver",
        hex: "#D8D8D8",
        borderHex: "#B8B8B8",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "German Covestro Makrolon® Polycarbonate + Aluminum Frame",
      wheels: "4x 55mm Hinomoto Japanese Silent Spinners",
      lock: "Dual TSA 008 Integrated Combination Latches",
      handle: "3-position ergonomic aircraft aluminum handle",
      interior: "Water-repellent jacquard twill with dividers",
      zippers: "Zipperless frame construction"
    },
    airlineFit: {
      cabinApproved: false,
      airlines: ["Checked Baggage Compliant worldwide"]
    },
    warranty: "Unconditional Lifetime Guarantee."
  },
  {
    id: "aur-07",
    slug: "aurelia-atelier-vanity-travel-case-18l",
    name: "The Atelier Vanity Travel Case 18L",
    tagline: "Rigid aluminum beauty and valuables case with trolley pass-through strap.",
    category: "Heritage Cases",
    categorySlug: "heritage-cases",
    price: 360,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 112,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 15,
    description: "The ultimate companion for fine jewelry, cosmetics, and flight essentials. Crafted from anodized aluminum with reinforced leather corners and an elastic rear strap that docks seamlessly atop your cabin suitcase handle.",
    story: "Inspired by vintage vanity cases from 1930s grand train voyages, updated with modern TSA keyless combination security.",
    dimensions: {
      height: "26 cm / 10.2 in",
      width: "35 cm / 13.7 in",
      depth: "19 cm / 7.5 in",
      weight: "1.9 kg / 4.1 lbs",
      volume: "18 L"
    },
    materials: [
      "100% Anodized Aluminum Outer Shell",
      "Full-grain Tuscan Saddle Leather Trims",
      "Spill-Resistant Water-Proof Interior Lining",
      "Removable Acrylic Vanity Mirror & Modular Trays"
    ],
    features: [
      "Integrated TSA Combination Center Latch",
      "Elastic Trolley Sleeve for Stacking atop Cabin Suitcase",
      "Removable Padded Jewelry & Cosmetics Organizer Tray",
      "Detachable Italian Leather Shoulder Strap",
      "Four Solid Metal Protective Base Feet"
    ],
    colors: [
      {
        name: "Champagne Gold",
        hex: "#C8A96A",
        borderHex: "#A98A4D",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Silver Titanium",
        hex: "#D8D8D8",
        borderHex: "#B8B8B8",
        image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "1.2mm Anodized Aircraft Aluminum",
      wheels: "N/A - Hard Case with Base Protective Feet",
      lock: "Integrated TSA Center Combination Latch",
      handle: "Top Italian leather grab handle + shoulder strap",
      interior: "Spill-proof lined compartments with mirror",
      zippers: "Hermetic latch closure"
    },
    airlineFit: {
      cabinApproved: true,
      airlines: ["Personal Item compliant on all commercial flights"]
    },
    warranty: "Lifetime Craftsmanship Guarantee."
  },
  {
    id: "aur-08",
    slug: "aurelia-horizon-hybrid-cabin-spinner",
    name: "The Horizon Hybrid Cabin Spinner",
    tagline: "Hard-shell polycarbonate shell with quick-access front tech pocket.",
    category: "Hybrid Spinners",
    categorySlug: "hybrid-spinners",
    price: 460,
    originalPrice: 520,
    rating: 4.7,
    reviewCount: 156,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 11,
    description: "The modern traveler's dream: indestructible German polycarbonate protection on the back, paired with a front-opening rapid access compartment for laptops, documents, and headphones without opening your main suitcase.",
    story: "Created specifically for frequent business travelers who need to breeze through airport security in 30 seconds flat.",
    dimensions: {
      height: "55 cm / 21.6 in",
      width: "37 cm / 14.5 in",
      depth: "23 cm / 9.0 in",
      weight: "3.7 kg / 8.1 lbs",
      volume: "39 L"
    },
    materials: [
      "German Bayer Polycarbonate Main Shell",
      "Reinforced Front Tech Pocket with Magnetic Latch",
      "Anodized Aluminum Handle Tubes",
      "Japanese Hinomoto Lisof® Wheels"
    ],
    features: [
      "Front-Opening Zippered Laptop Compartment (holds 16\" device)",
      "Integrated USB-C Fast-Charge Passthrough Port",
      "Dual TSA Combination Lock that secures BOTH compartments",
      "Removable Compression Divider Pad",
      "Internal Laundry & Accessory Pockets"
    ],
    colors: [
      {
        name: "Matte Black",
        hex: "#1A1A1A",
        borderHex: "#333333",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop"
      },
      {
        name: "Alpine Slate",
        hex: "#475569",
        borderHex: "#64748B",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      shell: "Virgin Polycarbonate with textured anti-scratch finish",
      wheels: "4x 360° Hinomoto Lisof® silent ball-bearing wheels",
      lock: "Dual-way TSA Combination Lock",
      handle: "3-position ergonomic aircraft aluminum handle",
      interior: "100% Recycled Poly-twill with waterproof pocket",
      zippers: "YKK Racquet Coil tamper-resistant zippers"
    },
    airlineFit: {
      cabinApproved: true,
      airlines: ["Meets 99% of global airline carry-on regulations"]
    },
    warranty: "Unconditional Lifetime Guarantee."
  }
];
