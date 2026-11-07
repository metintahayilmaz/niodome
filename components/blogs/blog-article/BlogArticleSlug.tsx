"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import BlurSection from "@/components/animations/BlurSection";
import BlogArticleBody from "./BlogArticleBody";

type Props = {
  title: string; slug: string; categories: string[]; readTime: string;
  author: string; date: string; excerpt: string; coverImageUrl: string | null;
  body: unknown[] | null;
};

export default function BlogArticleSlug({ title, categories, readTime, author, date, excerpt, coverImageUrl, body }: Props) {
  const locale = useLocale();
  const t = useTranslations("innerContent");
  const formattedDate = date && !Number.isNaN(Date.parse(date))
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(date)) : date;
  return <BlurSection className="mxd-section padding-bottom-default">
    <div className="mxd-container grid-l-container">
      <nav className="inner-headline__breadcrumbs mxd-grid-item" aria-label={locale === "tr" ? "Sayfa yolu" : "Breadcrumb"}>
        <Link href="/">{t("home")}</Link>{" / "}<Link href="/blog">Blog</Link>
      </nav>
      <article className="mxd-grid-item" style={{ maxWidth: "100rem", marginInline: "auto" }}>
        <header className="mxd-article__headline">
          <div className="mxd-article__tags">{categories.map(category => <span className="tag tag-m meta-tag comma-tag" key={category}>{category}</span>)}</div>
          <h1 className="small">{title}</h1>
          <p>{[author, formattedDate, readTime].filter(Boolean).join(" · ")}</p>
          {excerpt && <p className="t-large">{excerpt}</p>}
        </header>
        {coverImageUrl && <Image src={coverImageUrl} alt={title} width={1400} height={900} sizes="(max-width: 1000px) 100vw, 1000px" style={{ width: "100%", height: "auto" }} />}
        <div className="mxd-article"><BlogArticleBody body={body} /></div>
      </article>
    </div>
  </BlurSection>;
}
