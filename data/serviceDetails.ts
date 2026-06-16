/**
 * serviceDetail seed data — services sayfası ServicesDescriptionStack için.
 * body: Sanity PortableText formatında (seed sırasında doğrudan yazılır).
 * Görseller: public/img/services/services-stack/ dizininden alınır.
 */

function block(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s0`, text, marks: [] }],
  };
}

export type SeedServiceDetail = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  body: ReturnType<typeof block>[];
  tagsColA: string[];
  tagsColB: string[];
  image: string;
  order: number;
};

export const serviceDetailsData: SeedServiceDetail[] = [
  {
    id: "innovative-design",
    title: "Innovative design",
    slug: "innovative-design",
    shortDescription: "We create visually compelling designs that enhance user experience.",
    body: [
      block("sd01a", "We create visually compelling designs that enhance user experience."),
      block("sd01b", "From UI/UX design to stunning websites, mobile apps, and print materials, we make sure your brand's visuals resonate with your audience."),
    ],
    tagsColA: ["UI/UX", "Web design", "Applications", "Print design"],
    tagsColB: ["Packaging", "Motion", "3D models"],
    image: "/img/services/services-stack/s01.webp",
    order: 1,
  },
  {
    id: "creative-development",
    title: "Creative development",
    slug: "creative-development",
    shortDescription: "We build high-performance websites and applications using modern technologies.",
    body: [
      block("sd02a", "We build high-performance websites and applications using modern technologies."),
      block("sd02b", "Our solutions are designed to be scalable and functional for optimal performance."),
    ],
    tagsColA: ["Frontend", "Interactions", "Backend", "E-Commerce"],
    tagsColB: ["Mobile Apps", "Maintenance", "Support"],
    image: "/img/services/services-stack/s02.webp",
    order: 2,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    slug: "brand-identity",
    shortDescription: "We ensure your business stands out with a unique visual identity.",
    body: [
      block("sd03a", "From logo design to comprehensive brand strategies, we ensure your business stands out with a unique visual identity and consistent messaging across all touchpoints."),
    ],
    tagsColA: ["Brand strategy", "Logo design", "Guidelines"],
    tagsColB: ["Visual identity", "Rebranding"],
    image: "/img/services/services-stack/s03.webp",
    order: 3,
  },
  {
    id: "marketing-solutions",
    title: "Marketing solutions",
    slug: "marketing-solutions",
    shortDescription: "We develop and execute tailored digital marketing strategies.",
    body: [
      block("sd04a", "We develop and execute tailored digital marketing strategies."),
      block("sd04b", "SEO and content marketing, social media management and paid campaigns - we help you reach and engage your target audience effectively."),
    ],
    tagsColA: ["Strategy", "Social media", "SEO Optimization"],
    tagsColB: ["Email", "Campaigns"],
    image: "/img/services/services-stack/s04.webp",
    order: 4,
  },
];
