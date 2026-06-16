export type ServiceDetailItem = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  /** Sanity PortableText blokları — ServicesBodyRenderer ile render edilir */
  body: unknown[] | null;
  tagsColA: string[];
  tagsColB: string[];
  /** urlFor ile dönüştürülmüş 1200×1300 URL — yoksa undefined */
  image?: string;
  order: number;
};
