"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "@/components/common/LocalizedLink";
import Image from "next/image";
import type { PostListItem } from "@/types/blogPreview";

export default function Blog({ posts = [] }: { posts?: PostListItem[] }) {
  const t = useTranslations("content");
  const locale = useLocale();
  return (
    <section className="mxd-section padding-bottom-default">
      <div className="mxd-container grid-l-container">
        {posts.length === 0 ? (
          <p className="mxd-grid-item">{t("emptyBlog")}</p>
        ) : (
          <div className="row g-4">
            {posts.map((post) => (
              <article className="col-12 col-md-6 mxd-grid-item" key={post._id}>
                <Link href={post.href}>
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={1400}
                      height={900}
                      sizes="(max-width: 767px) 100vw, 50vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <h2>{post.title}</h2>
                </Link>
                {post.date && (
                  <p>
                    {Number.isNaN(Date.parse(post.date))
                      ? post.date
                      : new Intl.DateTimeFormat(locale, {
                          dateStyle: "long",
                          timeZone: "UTC",
                        }).format(new Date(post.date))}
                  </p>
                )}
                {post.excerpt && <p>{post.excerpt}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
