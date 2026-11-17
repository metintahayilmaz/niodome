import map from "@/data/serviceWorks.json";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export type ServiceWork = {
  slug: string;
  title: string;
  tags: string[];
  src: string;
  alt: string;
  href: string;
};

type Raw = {
  slug: string;
  title: string | null;
  tags: string[] | null;
  alt: string | null;
  image: Parameters<typeof urlFor>[0] | null;
};

/**
 * Projects shown on a service page. Only projects whose published tags name
 * the service are mapped in data/serviceWorks.json; a service without a mapped
 * project falls back to the general archive and is labelled as such.
 */
export async function getServiceWorks(
  id: string,
  locale: string,
): Promise<{ works: ServiceWork[]; related: boolean }> {
  const slugs = (map as Record<string, string[]>)[id] ?? [];
  const related = slugs.length > 0;
  try {
    const raw = await client.fetch<Raw[]>(
      `*[_type == "project" && slug.current != "namli-zeytin" && coalesce(isDemo, false) == false && defined(slug.current) && defined(cardImageSrc) && ($all || slug.current in $slugs)] | order(order asc, _createdAt asc) {
        "slug": slug.current,
        "title": coalesce(title[$locale], title.tr),
        "tags": coalesce(tags[$locale], tags.tr),
        "alt": coalesce(cardImageAlt[$locale], cardImageAlt.tr),
        "image": cardImageSrc
      }`,
      { locale, slugs, all: !related },
    );
    const ordered = related
      ? slugs.flatMap((slug) => raw.filter((p) => p.slug === slug))
      : raw;
    const works = ordered
      .filter((p) => p.image)
      .slice(0, related ? 4 : 6)
      .map((p) => ({
        slug: p.slug,
        title: p.title ?? "",
        tags: (p.tags ?? []).filter(Boolean).slice(0, 3),
        src: urlFor(p.image!).width(1400).height(1050).quality(85).auto("format").url(),
        alt: p.alt || p.title || "",
        href: `/works/${p.slug}`,
      }));
    return { works, related };
  } catch {
    return { works: [], related };
  }
}
