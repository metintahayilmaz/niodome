export type ProjectStackItem = {
  /** Sanity doküman ID'si — React key için. */
  _id?: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  coverClassName?: string;
  tags: string[];
  href?: string;
};

/** ProjectsList bileşeni için (archive/list view). */
export type ProjectListItem = {
  _id: string;
  /** İki satırlı h3: [0] normal metin, [1] span içine girer. */
  titleLines: [string, string];
  /** tags[0] → niche, geri kalanı → meta etiketleri. */
  tags: string[];
  /** Cursor hover görseli (500×500). */
  cardImageSrc?: string;
  href: string;
};

/** Grid showcase bileşenleri için (metin+link, görseller yerel template'den). */
export type ProjectGridItem = {
  _id: string;
  title: string;
  href: string;
  cursorText: string;
  tags: string[];
};

export type NamedItem = { name: string; description: string };

export type NextProjectRef = {
  slug: string;
  title: string;
  imageSrc?: string;
  cursorText?: string;
};

/** Tam vaka çalışması — /works/[slug] sayfası için. */
export type ProjectDetail = {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  tagsColA: string[];
  tagsColB: string[];
  overviewLead?: string;
  overviewSpan?: string;
  liveUrl?: string;
  clientName?: string;
  industries?: string;
  projectDate?: string;
  challengeLead?: string;
  challengeSpan?: string;
  services: NamedItem[];
  solutionLead?: string;
  solutionSpan?: string;
  techStack: NamedItem[];
  galleryImages: string[]; // urlFor işlenmiş
  feedbackQuoteLead?: string;
  feedbackQuoteSpan?: string;
  feedbackAuthorName?: string;
  feedbackAuthorRole?: string;
  feedbackAuthorCompany?: string;
  feedbackAuthorCompanyUrl?: string;
  feedbackAuthorPhoto?: string;
  order: number;
  nextProject?: NextProjectRef;
};

export type ProjectShowcaseItem = {
  /** Sanity doküman ID'si — React key için. Local fallback'te undefined. */
  _id?: string;
  titleLines: [string, string];
  bgImageSrc: string;
  cardImageSrc: string;
  cardImageAlt: string;
  cursorText: string;
  href: string;
  tags: string[];
};
