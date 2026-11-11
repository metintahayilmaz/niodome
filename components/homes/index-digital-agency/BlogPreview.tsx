"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { localizeHref } from "@/i18n/localizeHref";
import { formatPostDate } from "@/lib/formatPostDate";
import type { Locale } from "@/i18n/routing";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import { blogPreviewDigitalAgencyData } from "@/data/blogPreviewDigitalAgency";
import type { BlogPreviewItem } from "@/types/blogPreview";

/**
 * "2026-02-02" → "02 February, 2026"
 * Sanity date tipi ISO string döndürür; local data string metni döndürür.
 * Zaten okunaklı format ise (sayı ile başlamıyor) olduğu gibi döndürür.
 */


// Bölüm-seviyesi sabitler data dosyasından gelmeye devam eder
const {
  overviewHref,
} = blogPreviewDigitalAgencyData;



type Props = {
  /** Sanity'den gelen post listesi.
   *  BlogPreview 2 yazı gösterdiğinden, 2 yazı gelmezse local data'ya düşer. */
  posts?: BlogPreviewItem[];
};

export default function BlogPreview({ posts }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("blogPreview");
  const resolvedItems = posts ?? [];
  if (!resolvedItems.length) return null;
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          {t("title")}
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls pre-title justify-end anim-uni-slide-up"
                          as="div"
                          animation="slideUpLine"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={localizeHref(overviewHref, locale)}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {t("overview")}
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v01 End */}
            {/* Block - Blog Preview Grid x3 Start */}
            <div className="mxd-block">
              <div className="mxd-blog-list">
                {resolvedItems.map((post, index) => (
                  <Link
                    key={post._id ?? post.slug ?? `post-${index}`}
                    className="mxd-blog-list__item active-cursor-image active-cursor-permanent"
                    data-cursor-image={post.cursorImageSrc}
                    data-cursor-text={t("readPost")}
                    href={localizeHref(post.href, locale)}
                  >
                    <div className="mxd-blog-list__divider top" />
                    <div className="container-fluid px-0 mxd-blog-list__inner">
                      <div className="row gx-0">
                        <div className="col-12 mxd-grid-padding">
                          <div className="mxd-blog-list__meta">
                            {post.categories.map((cat) => (
                              <span key={cat} className="meta-tag comma-tag">
                                {cat}
                              </span>
                            ))}
                            <span className="meta-time">{post.readTime}</span>
                          </div>
                        </div>
                        <div className="col-12 col-xl-7 mxd-grid-padding">
                          <div className="mxd-blog-list__title">
                            <p>{post.title}</p>
                            <div className="mxd-blog-list__data">
                              <span className="meta-author comma-tag" lang={/^niodome$/i.test(post.author) ? "en" : undefined}>
                                {post.author}
                              </span>
                              <span className="meta-date">
                                {formatPostDate(post.date, locale)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-xl-5 mxd-grid-padding">
                          <div className="mxd-blog-list__excerpt">
                            <p className="t-medium">{post.excerpt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mxd-blog-list__divider bottom" />
                  </Link>
                ))}
              </div>
            </div>
            {/* Block - Blog Preview Grid x3 End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
