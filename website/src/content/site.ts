// Single source of content for the FFS site. Facts come from the current
// flashings-and-fabrications.co.uk pages and the October 2026 discovery brief.
// Anything still awaiting confirmation from FFS is listed in CONTENT-NOTES.md.

export const company = {
  name: "Flashings & Fabrications",
  legalName: "Flashings & Fabrications Services Ltd",
  phone: "01903 726500",
  phoneHref: "tel:+441903726500",
  email: "info@flashings-and-fabrications.co.uk",
  quoteHref: "mailto:info@flashings-and-fabrications.co.uk?subject=Quote%20request",
  address: ["Units 1, 2 & 4 Harwood Centre", "Harwood Road", "Littlehampton", "West Sussex", "BN17 7AT"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Harwood+Centre+Harwood+Road+Littlehampton+BN17+7AT",
  companyNumber: "06733273",
  vatNumber: "897 4593 49",
};

// Placeholder photography (Unsplash licence) until the FFS photo shoot.
// None of these depict FFS premises, staff or projects.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=2400&q=80&fm=jpg&fit=max`;
export const isStock = (src: string) => src.startsWith("https://images.unsplash.com/");
export const stock = {
  roofline: unsplash("photo-1770910452211-2e8fd91bc347"),
  standingSeam: unsplash("photo-1602193230480-7840a38eb0c3"),
  fins: unsplash("photo-1642887534384-81c81882dd1a"),
  sunshades: unsplash("photo-1610120433992-814a4bc1856f"),
  cladding: unsplash("photo-1705304711052-93df5c1e18d8"),
  claddingCorner: unsplash("photo-1705304711063-bb383723727b"),
  perforated: unsplash("photo-1792418345454-b5b860fcc94f"),
  curved: unsplash("photo-1771410986796-7a092f4d96e5"),
  dormer: unsplash("photo-1779941373840-a93f6e0d5db0"),
  pressBrakeTeam: unsplash("photo-1695603414685-af28aff0f9d2"),
  pressBrakeHands: unsplash("photo-1695603414659-4d573962b517"),
  pressBrakeBend: unsplash("photo-1738162837340-da3e7a323a09"),
  cncControl: unsplash("photo-1695603414720-2fbd4db0a434"),
  measuring: unsplash("photo-1564182842834-681b7be6de4b"),
};

export type ProductFamily = "envelope" | "rainwater" | "fabrication";

export const families: Record<ProductFamily, { title: string; blurb: string }> = {
  envelope: {
    title: "Roofline & envelope",
    blurb: "Flashings, panels, louvres and the architectural details that finish a building.",
  },
  rainwater: {
    title: "Rainwater management",
    blurb: "Gutters, downpipes and membrane-lined systems made to suit the roof.",
  },
  fabrication: {
    title: "Fabrication & finishing",
    blurb: "Folded, punched and powder coated components made to your drawing.",
  },
};

export type Product = {
  slug: string;
  name: string;
  family: ProductFamily;
  summary: string;
  intro: string;
  image: string;
  heroImage: string;
  heroIsStock: boolean;
  specs: { label: string; items: string[] }[];
  suppliedTo: string[];
  relatedProjects: string[];
};

export const products: Product[] = [
  {
    slug: "flashings-and-trims",
    name: "Flashings & trims",
    family: "envelope",
    summary: "Steel and aluminium flashings folded to virtually any profile, in lengths up to 4m.",
    intro:
      "Our flashings and trims are made to order in steel or aluminium to suit internal and external requirements. Available in lengths up to 4m and in a wide choice of colours and finishes, we can fold a flashing to virtually any shape your detail needs.",
    image: "/images/ffs/flashings-min.jpg",
    heroImage: stock.dormer,
    heroIsStock: true,
    specs: [
      {
        label: "Profiles",
        items: [
          "Soffits and secret-fix soffits",
          "Fascias and secret-fix capping systems",
          "Ridge and verge flashings",
          "Drip, angle and edge flashings",
        ],
      },
      {
        label: "Materials",
        items: [
          "Aluminium",
          "Galvanised steel",
          "Mild steel",
          "Stainless steel",
          "Zinc",
          "Pre-coated steel",
          "Membrane-coated sheet",
        ],
      },
      {
        label: "Supply",
        items: ["Lengths up to 4m", "Material supplied by us or free-issue from you", "Delivered nationwide"],
      },
    ],
    suppliedTo: [
      "The Shard, London",
      "The Olympic Stadium, London",
      "Plymouth Life Centre",
      "Royal Mail Depot, Maidstone",
      "Lewes Police Station",
      "Central Sussex College, Haywards Heath",
      "Hadyn Ellis Building, Cardiff",
      "St Martin's Hospital, Canterbury",
      "Berkeley Homes, Kidbrooke",
      "David Wilson Homes, Reading",
      "Biffa Waste Management Centre, Horsham",
      "Interserve, Littlehampton",
    ],
    relatedProjects: ["plymouth-life-centre", "northbrook-college", "amex-stadium"],
  },
  {
    slug: "rainwater-systems",
    name: "Rainwater systems",
    family: "rainwater",
    summary: "Gutters, downpipes, hoppers and brackets in aluminium, galvanised or pre-coated steel.",
    intro:
      "From downpipes and brackets to gutters and rainguards, we make rainwater systems to suit your project in aluminium, galvanised or pre-coated steel, square or round, in a range of sizes.",
    image: "/images/ffs/gutters-min.jpg",
    heroImage: stock.roofline,
    heroIsStock: true,
    specs: [
      {
        label: "Materials & finishes",
        items: [
          "Aluminium, mill finish or powder coated",
          "Galvanised steel, plain or powder coated",
          "Pre-coated steel: 0.7 HPS, Leathergrain, PVDF, Prisma and more",
        ],
      },
      {
        label: "Components",
        items: [
          "Gutters and rainguards",
          "Downpipes, square or round",
          "Rainwater hoppers and soakers",
          "Brackets and fixings",
        ],
      },
      {
        label: "Jointing",
        items: ["Joggle joints with fixings and mastic", "Butt-strap joints"],
      },
    ],
    suppliedTo: [
      "Pencaerau Primary School, Cardiff",
      "Spire Technology, Verwood",
      "Northacre Recycling Centre, Westbury",
      "Lynx Training Centre, Yeovilton",
      "The Haves School, Eastbourne",
    ],
    relatedProjects: ["plymouth-life-centre", "worthing-yacht-club"],
  },
  {
    slug: "membrane-gutter-systems",
    name: "Membrane gutter systems",
    family: "rainwater",
    summary: "PVC membrane-lined gutters, single skin or insulated, for internal commercial applications.",
    intro:
      "Our PVC membrane-lined gutter systems suit a wide range of roofing materials and installations. Proven leak-free, they are designed for industrial and commercial internal applications and integrate with thermally efficient cladding systems and components.",
    image: "/images/ffs/rainwater-min.jpg",
    heroImage: stock.standingSeam,
    heroIsStock: true,
    specs: [
      {
        label: "Single skin",
        items: ["Lined in Trocal, Flag, Cefil, Fatra, Aquatite, Bauder or Rhenofol membranes"],
      },
      {
        label: "Insulated",
        items: [
          "Membrane skin",
          "Insulation in thicknesses to suit",
          "Bright White liner external casing",
        ],
      },
    ],
    suppliedTo: [
      "Blackfriars Railway Station, London",
      "BBC Television Centre, London",
      "Raymarine, Segensworth",
      "Torridge Transport, South Molton",
    ],
    relatedProjects: ["blackfriars-station"],
  },
  {
    slug: "louvre-systems",
    name: "Louvre systems",
    family: "envelope",
    summary: "Louvres and brise soleil for ventilation, weather protection and screening.",
    intro:
      "We make louvre systems for ventilation, weather protection and visual screening in aluminium, galvanised steel and pre-coated steel, integrated into the building or free-standing.",
    image: "/images/ffs/louvres001-min.jpg",
    heroImage: stock.sunshades,
    heroIsStock: true,
    specs: [
      {
        label: "Materials & finishes",
        items: [
          "Aluminium, mill finish or powder coated",
          "Galvanised steel, plain or powder coated",
          "Pre-coated steel: 0.7 HPS, Leathergrain, PVDF and others",
        ],
      },
      {
        label: "Types",
        items: ["Brise soleil", "Ridge ventilation", "Integrated and non-integrated louvres"],
      },
      { label: "Options", items: ["Bird and insect mesh for rear screening"] },
    ],
    suppliedTo: [
      "Virgin Atlantic VIP Lounge, Gatwick",
      "Wessex Grain Store, Somerset",
      "Boscombe Down, Salisbury",
    ],
    relatedProjects: [],
  },
  {
    slug: "rainscreen-panels",
    name: "Rainscreen panels",
    family: "envelope",
    summary: "Cost-effective rainscreen panels for new-build and refurbishment projects.",
    intro:
      "Our rainscreen panels suit both new-build and refurbishment projects and are available in a wide range of cladding materials, from powder coated aluminium to copper and zinc.",
    image: "/images/ffs/rainpanel-min.jpg",
    heroImage: stock.cladding,
    heroIsStock: true,
    specs: [
      {
        label: "Materials",
        items: [
          "Aluminium, mill finish or polyester powder coated",
          "Copper",
          "Zinc",
          "Aluminium composite (Alucobond)",
        ],
      },
      { label: "Fixing", items: ["Secret-fix panel systems"] },
    ],
    suppliedTo: ["Plymouth Life Centre", "Balham Hill, London", "Roden Court, London"],
    relatedProjects: ["plymouth-life-centre"],
  },
  {
    slug: "architectural-features",
    name: "Architectural features",
    family: "envelope",
    summary: "Bullnoses, curved and faceted fascias, radius gutters and bespoke mouldings.",
    intro:
      "From specialist fabrications for architectural features to bespoke mouldings and flashings, we make the details that give a building its character, curved, tapered or faceted to suit the design.",
    image: "/images/ffs/arhitect-min.jpg",
    heroImage: stock.curved,
    heroIsStock: true,
    specs: [
      {
        label: "Recent fabrications",
        items: [
          "Bullnoses",
          "Curved fascia and soffit systems",
          "Radius guttering systems",
          "Profile panels",
          "Tapered and faceted fascia and soffit systems",
        ],
      },
    ],
    suppliedTo: ["RAF Brize Norton Repatriation Centre", "Worthing Yacht Club"],
    relatedProjects: ["raf-brize-norton", "worthing-yacht-club"],
  },
  {
    slug: "bespoke-fabrication",
    name: "Bespoke fabrication",
    family: "fabrication",
    summary: "Folded and punched components, brackets and secondary support steelwork to your drawing.",
    intro:
      "We fold and punch sheet-metal components to your drawing, from small bent parts and brackets to the secondary support steelwork behind major envelope packages. One-off, small batch or repeat orders.",
    image: stock.measuring,
    heroImage: stock.pressBrakeBend,
    heroIsStock: true,
    specs: [
      {
        label: "Processes",
        items: ["CNC turret punching", "Press brake folding up to 4m", "Cutting and assembly"],
      },
      {
        label: "Typical work",
        items: [
          "Small bent components and brackets",
          "Secondary support steelwork",
          "Galvanised support systems",
          "Repeat batches to an existing order",
        ],
      },
    ],
    suppliedTo: [
      "Blackfriars Station, London",
      "Plymouth Life Centre",
      "Amex Stadium, Brighton",
      "Northbrook College, Worthing",
    ],
    relatedProjects: ["blackfriars-station", "amex-stadium", "northbrook-college"],
  },
  {
    slug: "powder-coating",
    name: "Powder coating",
    family: "fabrication",
    summary: "An in-house polyester powder coating line, so fabrication and finish stay under one roof.",
    intro:
      "Our in-house powder coating line means your components are fabricated and finished under one roof, with fewer handovers and tighter control of quality and lead time. Tell us the dimensions and finish you need and we'll confirm suitability.",
    image: stock.cncControl,
    heroImage: stock.fins,
    heroIsStock: true,
    specs: [
      {
        label: "Finish",
        items: ["Polyester powder coating", "Colour and gloss to your specification"],
      },
      {
        label: "Capacity",
        items: ["Large-format oven for long and large components", "Sizes confirmed per enquiry"],
      },
    ],
    suppliedTo: ["Blackfriars Station, London", "Plymouth Life Centre"],
    relatedProjects: ["blackfriars-station", "plymouth-life-centre"],
  },
];

export type Project = {
  slug: string;
  name: string;
  location: string;
  sector: string;
  year?: string;
  summary: string;
  story: string;
  scope: string[];
  products: string[];
  image?: string;
  imageWide: boolean;
};

export const projects: Project[] = [
  {
    slug: "blackfriars-station",
    name: "Blackfriars Station",
    location: "London",
    sector: "Transport",
    year: "2010",
    summary: "Secondary steelwork, insulated membrane gutters and powder coated fascias above the new concourse.",
    story:
      "Next time you're on the concourse at Blackfriars Station, look up. We manufactured and supplied the secondary support steelwork, insulated membrane gutters and polyester powder coated fascias and cappings for the station's rebuild.",
    scope: [
      "Secondary support steelwork",
      "Insulated membrane gutters",
      "Polyester powder coated fascias",
      "Polyester powder coated cappings",
    ],
    products: ["membrane-gutter-systems", "bespoke-fabrication", "powder-coating"],
    image: "/images/ffs/blackfriars-820x293_c.jpg",
    imageWide: true,
  },
  {
    slug: "plymouth-life-centre",
    name: "Plymouth Life Centre",
    location: "Plymouth, Devon",
    sector: "Leisure",
    summary: "A full envelope package: support steel, gutters, fascias, soffits and secret-fix rainscreen.",
    story:
      "For Plymouth's Life Centre we supplied a complete package: the secondary steel support, single-skin aluminium powder coated gutters and rainwater pipe system, aluminium fascia, soffit and capping systems, and secret-fix rainscreen panels.",
    scope: [
      "Secondary steel support",
      "Single-skin aluminium powder coated gutters",
      "Rainwater pipe system",
      "Aluminium fascia, soffit and capping systems",
      "Secret-fix rainscreen panels",
    ],
    products: ["rainwater-systems", "flashings-and-trims", "rainscreen-panels", "powder-coating"],
    image: "/images/ffs/plymouth_236-min.jpg",
    imageWide: false,
  },
  {
    slug: "amex-stadium",
    name: "Amex Stadium",
    location: "Brighton, East Sussex",
    sector: "Sport",
    summary: "Secondary support and screed partitioning flashings for Brighton's community stadium.",
    story:
      "We supplied the secondary support and screed partitioning flashings for Brighton & Hove Albion's Amex Community Stadium: components that disappear into a much larger build but have to be right first time.",
    scope: ["Secondary support", "Screed partitioning flashings"],
    products: ["bespoke-fabrication", "flashings-and-trims"],
    image: "/images/ffs/amex-820x293_c.jpg",
    imageWide: true,
  },
  {
    slug: "worthing-yacht-club",
    name: "Worthing Yacht Club",
    location: "Worthing, West Sussex",
    sector: "Leisure",
    summary: "A curved roof, soffits, fascia and rainwater pipes for the club's new headquarters.",
    story:
      "Worthing Yacht Club's new headquarters features our curved roof, soffits, fascia and rainwater pipes, fabricated in Littlehampton a few miles along the coast.",
    scope: ["Curved roof", "Soffits", "Fascia", "Rainwater pipes"],
    products: ["architectural-features", "flashings-and-trims", "rainwater-systems"],
    image: "/images/ffs/yacht_club-min.jpg",
    imageWide: true,
  },
  {
    slug: "northbrook-college",
    name: "Northbrook College",
    location: "Worthing, West Sussex",
    sector: "Education",
    summary: "A specialist galvanised support system and Trocal flashings for the Broadwater Campus.",
    story:
      "Northbrook College's Broadwater Campus in Worthing required a specialist galvanised support system and Trocal membrane flashings, both made at our Littlehampton works.",
    scope: ["Specialist galvanised support system", "Trocal flashings"],
    products: ["bespoke-fabrication", "flashings-and-trims"],
    image: "/images/ffs/northbrook-min.jpg",
    imageWide: false,
  },
  {
    slug: "raf-brize-norton",
    name: "RAF Brize Norton",
    location: "Oxfordshire",
    sector: "Defence",
    summary: "Bullnoses for the Repatriation Centre at RAF Brize Norton.",
    story:
      "We were proud to be chosen to supply the bullnoses for the Repatriation Centre at RAF Brize Norton.",
    scope: ["Architectural bullnoses"],
    products: ["architectural-features"],
    image: "/images/ffs/repat_1982014c-min.jpg",
    imageWide: false,
  },
];

export const machines = [
  {
    key: "punch",
    name: "CNC turret punch",
    figure: "CNC",
    text: "Punches holes, perforations and shapes directly from CAD drawings, for single parts or full production batches.",
  },
  {
    key: "fold",
    name: "4m press brakes",
    figure: "4m",
    text: "Folds flashings, fascias and copings in lengths up to 4m, as well as small bent components.",
  },
  {
    key: "coat",
    name: "Powder coating line",
    figure: "In-house",
    text: "A large-format oven for powder coating long and large components on site.",
  },
];

export const materials = [
  "Aluminium",
  "Galvanised steel",
  "Mild steel",
  "Stainless steel",
  "Zinc",
  "Copper",
  "Pre-coated steel",
  "Membrane-coated sheet",
];

// Every named project on the current site, de-duplicated, with the products supplied.
const caseStudyFor: Record<string, string> = {
  "Plymouth Life Centre": "plymouth-life-centre",
  "Blackfriars Station": "blackfriars-station",
  "Blackfriars Railway Station": "blackfriars-station",
  "Amex Stadium": "amex-stadium",
  "Northbrook College": "northbrook-college",
  "Worthing Yacht Club": "worthing-yacht-club",
  "RAF Brize Norton Repatriation Centre": "raf-brize-norton",
};

export type ListedProject = { name: string; place: string; products: string[]; href?: string };

export function projectList(): ListedProject[] {
  const rows = new Map<string, ListedProject>();
  for (const product of products) {
    for (const entry of product.suppliedTo) {
      const comma = entry.lastIndexOf(", ");
      const name = comma > -1 ? entry.slice(0, comma) : entry;
      const place = comma > -1 ? entry.slice(comma + 2) : "";
      const slug = caseStudyFor[name];
      const key = slug ?? name;
      const row = rows.get(key) ?? {
        name: name === "Blackfriars Railway Station" ? "Blackfriars Station" : name,
        place,
        products: [],
        href: slug ? `/projects/${slug}` : undefined,
      };
      if (!row.place && place) row.place = place;
      if (!row.products.includes(product.name)) row.products.push(product.name);
      rows.set(key, row);
    }
  }
  return [...rows.values()].map((row) => {
    const study = row.href ? projects.find((p) => `/projects/${p.slug}` === row.href) : undefined;
    return study ? { ...row, place: study.location } : row;
  });
}

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
