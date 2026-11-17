import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsListQuery } from "@/sanity/lib/queries";
import type { PostListItem } from "@/types/blogPreview";

type RawPost = {
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
};

/** Latest posts in the shape BlogPreview expects; empty when Sanity is unreachable. */
export async function getBlogPreviewPosts(locale: string): Promise<PostListItem[]> {
  try {
    const raw = await client.fetch<RawPost[]>(postsListQuery, { locale });
    return raw.map((p) => ({
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
    return [];
  }
}
