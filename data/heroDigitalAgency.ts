import type { HeroDigitalAgencyData } from "@/types/heroDigitalAgency";

export const heroDigitalAgencyData: HeroDigitalAgencyData = {
  headline: "Design, tech & some magic",
  subline: "Ready for the game changing project?",
  scrollLabel: "Scroll to explore",

  coverImage: {
    src: "/img/hero/hero-03_cover.webp",
    alt: "Azurio Template Sample Image",
    width: 1920,
    height: 1200,
  },

  backgroundVideo: {
    poster: "video/1280x720_hero-02.webp",
    sources: [
      { src: "video/1280x720_hero-02.mp4", type: "video/mp4" },
      { src: "video/1280x720_hero-02.webm", type: "video/webm" },
    ],
  },

  galleryImages: [
    {
      src: "/img/hero/hero-03_1.webp",
      alt: "Azurio Template Sample Image",
      width: 1280,
      height: 800,
      href: "/project-details",
    },
    ...Array.from({ length: 19 }, (_, i) => ({
      src: `/img/hero/hero-03_${i + 2}.webp`,
      alt: "Azurio Template Sample Image",
      width: 1280,
      height: 800,
    })),
  ],
};
