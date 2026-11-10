import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type RawImage = Parameters<typeof urlFor>[0] & {
  asset: { _ref: string };
  alt?: { tr?: string; en?: string };
  caption?: { tr?: string; en?: string };
};

export async function getApprovedWorkImages(
  locale: string,
): Promise<{ src: string; alt: string; href: string }[]> {
  try {
    const projects = await client.fetch<
      { title: string; slug: string; images: RawImage[] }[]
    >(
      `*[_type == "project" && coalesce(isDemo, false) == false && defined(slug.current)] | order(order asc) {
        "title": coalesce(title[$locale], title.tr), "slug": slug.current, "images": galleryImages[0..3]
      }`,
      { locale },
    );
    const seen = new Set<string>();
    const language = locale === "en" ? "en" : "tr";
    return projects.flatMap((project) =>
      (project.images ?? []).flatMap((image) => {
        const ref = image.asset?._ref;
        if (!ref || seen.has(ref)) return [];
        seen.add(ref);
        return [
          {
            src: urlFor(image).width(1200).quality(85).auto("format").url(),
            alt:
              image.alt?.[language] ||
              image.caption?.[language] ||
              project.title,
            href: `/works/${project.slug}`,
          },
        ];
      }),
    );
  } catch {
    return [];
  }
}
