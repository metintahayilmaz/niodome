import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/services/InnerHeadline";
import ServicesDescriptionStack from "@/components/other-pages/services/ServicesDescriptionStack";
import ParallaxDividerImage from "@/components/other-pages/services/ParallaxDividerImage";
import BlogPreview from "@/components/other-pages/services/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/services/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { serviceDetailsQuery, postsListQuery } from "@/sanity/lib/queries";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { ServiceDetailItem } from "@/types/serviceDetail";
import type { PostListItem } from "@/types/blogPreview";
import { serviceListSchema } from "@/lib/jsonLd";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const trUrl = `${SITE_URL}/hizmetler`;
  const enUrl = `${SITE_URL}/en/services`;
  const canonical = locale === "en" ? enUrl : trUrl;
  return {
    title: t("services.title"),
    description: t("services.description"),
    openGraph: {
      title: `${t("services.title")} — Niodome`,
      description: t("services.description"),
      url: canonical,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical,
      languages: { "x-default": trUrl, tr: trUrl, en: enUrl },
    },
  };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  // --- service details ---
  let sanityServices: ServiceDetailItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        title: string | null;
        slug: string | null;
        shortDescription: string | null;
        body: unknown[] | null;
        tagsColA: string[] | null;
        tagsColB: string[] | null;
        image: Parameters<typeof urlFor>[0] | null;
        order: number | null;
      }[]
    >(serviceDetailsQuery, { locale });

    sanityServices = raw.map((s) => ({
      _id: s._id,
      title: s.title ?? "",
      slug: s.slug ?? "",
      shortDescription: s.shortDescription ?? undefined,
      body: s.body ?? null,
      tagsColA: s.tagsColA ?? [],
      tagsColB: s.tagsColB ?? [],
      order: s.order ?? 0,
      ...(s.image && {
        image: urlFor(s.image).width(1200).height(1300).auto("format").url(),
      }),
    }));
  } catch {
    // Sanity erişilemez → ServicesDescriptionStack local data'ya döner
  }

  // --- blog posts (ilk 3) ---
  let sanityPosts: PostListItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        title: string | null;
        slug: string | null;
        categories: string[] | null;
        readTime: string | null;
        author: string | null;
        date: string | null;
        excerpt: string | null;
        coverImage: Parameters<typeof urlFor>[0] | null;
        cursorImageSrc: Parameters<typeof urlFor>[0] | null;
        href: string | null;
      }[]
    >(postsListQuery, { locale });

    sanityPosts = raw.map((p) => ({
      _id: p._id,
      title: p.title ?? "",
      slug: p.slug ?? "",
      categories: p.categories ?? [],
      readTime: p.readTime ?? "",
      author: p.author ?? "",
      date: p.date ?? "",
      excerpt: p.excerpt ?? "",
      cursorImageSrc: p.cursorImageSrc
        ? urlFor(p.cursorImageSrc).width(500).height(500).auto("format").url()
        : "",
      ...(p.coverImage && {
        coverImage: urlFor(p.coverImage).width(1170).height(800).auto("format").url(),
      }),
      href: p.slug ? `/blog/${p.slug}` : "/blog-article",
    }));
  } catch {
    // Sanity erişilemez → BlogPreview local data'ya döner
  }

  const ldServices = serviceListSchema(
    sanityServices.map((s) => ({
      name: s.title,
      shortDescription: s.shortDescription,
    }))
  );

  return (
    <>
      {sanityServices.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldServices) }}
        />
      )}
      <>
        <InnerHeadline />
        <ServicesDescriptionStack services={sanityServices} />
        <ParallaxDividerImage />
        <BlogPreview posts={sanityPosts} />
        <CTAWithMarquee />
      </>
    </>
  );
}
