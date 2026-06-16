import { Metadata } from "next";
import InnerHeadlineArticle from "@/components/blogs/blog-creative/InnerHeadlineArticle";
import BlogGrid from "@/components/blogs/blog-creative/BlogGrid";
import CTA from "@/components/blogs/blog-creative/CTA";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsListQuery } from "@/sanity/lib/queries";
import type { PostListItem } from "@/types/blogPreview";
import { getLocale } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Yaratıcı fikirler, tasarım ipuçları ve dijital dünyadan ilham veren içerikler Niodome Blog'da.",
  openGraph: {
    title: "Blog — Niodome",
    description:
      "Yaratıcı fikirler, tasarım ipuçları ve dijital dünyadan ilham veren içerikler Niodome Blog'da.",
    url: "${SITE_URL}/blog-creative",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "${SITE_URL}/blog-creative" },
};

export default async function BlogCreativePage() {
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
        coverImage: urlFor(p.coverImage).width(1170).height(800).auto("format").url(),
      }),
      href: p.slug ? `/blog/${p.slug}` : "/blog-article",
    }));
  } catch {
    // Sanity erişilemez → BlogGrid bileşeni local data'ya döner
  }

  return (
    <>
      <>
        <InnerHeadlineArticle />
        <BlogGrid posts={sanityPosts} />
        <CTA />
      </>
    </>
  );
}
