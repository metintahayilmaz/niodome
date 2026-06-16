export type HeroGalleryImage = {
  /** Sanity array item key — React key için. Local fallback'te undefined. */
  _key?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
};

export type HeroVideoSource = {
  src: string;
  type: string;
};

export type HeroDigitalAgencyData = {
  headline: string;
  subline: string;
  scrollLabel: string;
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  backgroundVideo: {
    poster: string;
    sources: HeroVideoSource[];
  };
  galleryImages: HeroGalleryImage[];
};
