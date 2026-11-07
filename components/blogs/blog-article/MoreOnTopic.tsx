import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { postsListQuery } from "@/sanity/lib/queries";
import Link from "@/components/common/LocalizedLink";
import BlurSection from "@/components/animations/BlurSection";

export default async function MoreOnTopic({ currentId }: { currentId?: string }) {
  const locale = await getLocale();
  const t = await getTranslations("projectContent");
  let posts: { _id: string; title: string; slug: string }[] = [];
  try {
    const rows = await client.fetch<typeof posts>(postsListQuery, { locale });
    posts = rows.filter(post => post._id !== currentId && post.title && post.slug).slice(0, 3);
  } catch { /* Show related posts when real content is available. */ }
  if (!posts.length) return null;
  return <BlurSection className="mxd-section padding-bottom-default">
    <div className="mxd-container grid-l-container">
      <h2 className="mxd-grid-item">{t("allArticles")}</h2>
      <div className="row g-4">{posts.map(post => <div className="col-12 col-md-4 mxd-grid-item" key={post._id}>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </div>)}</div>
    </div>
  </BlurSection>;
}
