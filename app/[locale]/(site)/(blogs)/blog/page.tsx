import { Metadata } from "next";
import InnerHeadline from "@/components/blogs/blog-standard/InnerHeadline";
import Blog from "@/components/blogs/blog-standard/Blog";
import CTAWithMarquee from "@/components/blogs/blog-standard/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsListQuery } from "@/sanity/lib/queries";
import type { PostListItem } from "@/types/blogPreview";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const trUrl = `${SITE_URL}/blog`;
  const enUrl = `${SITE_URL}/en/blog`;
  const canonical = locale === "en" ? enUrl : trUrl;
  return {
    title: t("blog.title"),
    description: t("blog.description"),
    openGraph: {
      title: `${t("blog.title")} — Niodome`,
      description: t("blog.description"),
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

export default async function BlogStandardPage() {
  const locale = await getLocale();
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
        coverImage: urlFor(p.coverImage).width(1400).height(900).quality(80).auto("format").url(),
      }),
      href: p.slug ? `/blog/${p.slug}` : "/blog-article",
    }));
  } catch {
    // Sanity erişilemez → Blog bileşeni local data'ya döner
  }

  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <Blog posts={sanityPosts} />
        <CTAWithMarquee />
      </div>
    </>
  );
}
