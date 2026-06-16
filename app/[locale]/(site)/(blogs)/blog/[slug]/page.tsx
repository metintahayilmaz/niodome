import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postSlugsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import BlogArticlePage from "@/components/blogs/blog-article/BlogArticleSlug";
import MoreOnTopic from "@/components/blogs/blog-article/MoreOnTopic";
import CTAWithMarquee from "@/components/blogs/blog-article/CTAWithMarquee";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { getLocale } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

// --- Tip ---
type PostDoc = {
  _id: string;
  title: string;
  slug: string;
  categories: string[];
  readTime: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage: Parameters<typeof urlFor>[0] | null;
  body: unknown[] | null;
};

// --- Statik parametre üretimi ---
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(postSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// --- SEO meta ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  try {
    const post = await client.fetch<PostDoc | null>(postBySlugQuery, { slug, locale });
    if (!post) return { title: "Post Not Found" };

    const ogImage = post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).auto("format").url()
      : undefined;

    return {
      title: post.title,
      description: post.excerpt ?? "",
      openGraph: {
        title: post.title,
        description: post.excerpt ?? "",
        type: "article",
        publishedTime: post.date ?? undefined,
        authors: post.author ? [post.author] : undefined,
        url: `${SITE_URL}/blog/${slug}`,
        ...(ogImage && {
          images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        }),
      },
      twitter: { card: "summary_large_image" },
      alternates: {
        canonical: locale === "en"
          ? `${SITE_URL}/en/blog/${slug}`
          : `${SITE_URL}/blog/${slug}`,
        languages: {
          "x-default": `${SITE_URL}/blog/${slug}`,
          tr: `${SITE_URL}/blog/${slug}`,
          en: `${SITE_URL}/en/blog/${slug}`,
        },
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

// --- Sayfa bileşeni ---
export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();

  let post: PostDoc | null = null;
  try {
    const raw = await client.fetch<PostDoc | null>(postBySlugQuery, { slug, locale });
    if (raw) {
      post = {
        ...raw,
        coverImage: raw.coverImage
          ? (urlFor(raw.coverImage)
              .width(1920)
              .height(1200)
              .auto("format")
              .url() as unknown as Parameters<typeof urlFor>[0])
          : null,
      };
    }
  } catch {
    // fetch hatası → notFound
  }

  if (!post) notFound();

  // coverImage artık string URL
  const coverImageUrl = post.coverImage as unknown as string | null;

  const ldArticle = articleSchema({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? undefined,
    coverImageUrl: coverImageUrl,
    date: post.date ?? undefined,
    author: post.author ?? undefined,
  });
  const ldBreadcrumb = breadcrumbSchema([
    { name: "Ana Sayfa", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <div className="mxd-page-content inner-page-content">
        <BlogArticlePage
          title={post.title}
          slug={post.slug}
          categories={post.categories ?? []}
          readTime={post.readTime ?? ""}
          author={post.author ?? ""}
          date={post.date ?? ""}
          excerpt={post.excerpt ?? ""}
          coverImageUrl={coverImageUrl}
          body={post.body}
        />
        <MoreOnTopic />
        <CTAWithMarquee />
      </div>
    </>
  );
}
