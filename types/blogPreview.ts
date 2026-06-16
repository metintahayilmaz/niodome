export type BlogPreviewItem = {
  /** Sanity doküman ID'si — React key için. Local fallback'te undefined. */
  _id?: string;
  title: string;
  slug: string;
  categories: string[];
  readTime: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  cursorImageSrc: string;
  href: string;
};

/**
 * Blog liste sayfaları (blog-standard, blog-creative) için post tipi.
 * BlogPreviewItem'dan farkı: _id zorunlu (Sanity'den geliyor).
 */
export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  categories: string[];
  readTime: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  cursorImageSrc: string;
  href: string;
};

export type BlogPreviewData = {
  sectionTitle: string;
  overviewLabel: string;
  overviewHref: string;
  items: BlogPreviewItem[];
};
