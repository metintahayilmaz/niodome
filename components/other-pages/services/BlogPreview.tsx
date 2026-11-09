"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "@/components/common/LocalizedLink";
import { useLocale, useTranslations } from "next-intl";
import { formatPostDate } from "@/lib/formatPostDate";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import type { PostListItem } from "@/types/blogPreview";

// Tarih formatı: "YYYY-MM-DD" → "06 January, 2026"


// Slot başına yerel görsel (Sanity coverImage yoksa fallback)
const LOCAL_SLOT_IMAGES = [
  { src: "/img/blog/preview/grid-x3/pr-01.webp", width: 1170, height: 800 },
  { src: "/img/blog/preview/grid-x3/pr-02.webp", width: 1200, height: 1200 },
  { src: "/img/blog/preview/grid-x3/pr-03.webp", width: 1423, height: 800 },
];

type Props = {
  posts?: PostListItem[];
};

export default function BlogPreview({ posts }: Props) {
  const t = useTranslations("blogPreview");
  const locale = useLocale();
  const resolvedPosts = posts?.slice(0, 3) ?? [];
  if (!resolvedPosts.length) return null;

  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-title padding-bottom-preview"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v04 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-subtitle-s">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title pre-caption">
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
                          className="mxd-section-title__controls anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href="/blog"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {t("overview")}
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                        <div className="mxd-section-title__caption no-max-width pre-controls">
                          <CommonAnimatedText
                            as="p"
                            className="t-bold t-large mxd-split-lines"
                            animation="splitLines"
                          >
                            Inspiring ideas, creative insights, and the latest
                            in design and tech.
                            <span>
                              {t("blogIntro")}
                            </span>
                          </CommonAnimatedText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v04 End */}
            {/* Block - Blog Preview Grid x3 Start */}
            <div className="mxd-block">
              <div className="mxd-blog-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-blog-grid__gallery">
                    {resolvedPosts.map((post, i) => {
                      const slot = LOCAL_SLOT_IMAGES[i % LOCAL_SLOT_IMAGES.length];
                      const imgSrc = post.coverImage ?? slot.src;
                      const imgWidth = post.coverImage ? slot.width : slot.width;
                      const imgHeight = post.coverImage ? slot.height : slot.height;
                      const href = post.href ?? (post.slug ? `/blog/${post.slug}` : "/blog-article");
                      return (
                        <CommonCardBatchAnimated
                          key={post._id}
                          className="col-12 col-lg-4 mxd-blog-item animate-card-3"
                          as="div"
                          columns={3}
                        >
                          <div className="mxd-blog-item__date">
                            <span className="meta-date">{formatPostDate(post.date, locale)}</span>
                          </div>
                          <Link
                            className="mxd-blog-item__media active-cursor-permanent"
                            data-cursor-text={t("readPost")}
                            href={href}
                          >
                            <Image
                              className=""
                              alt={post.title}
                              src={imgSrc}
                              width={imgWidth}
                              height={imgHeight}
                            />
                          </Link>
                          <div className="mxd-blog-item__caption">
                            <div className="mxd-blog-item__title">
                              <Link className="blog-name-m" href={href}>
                                {post.title}
                              </Link>
                            </div>
                            {post.categories && post.categories.length > 0 && (
                              <div className="mxd-blog-item__tags">
                                {post.categories.slice(0, 3).map((cat) => (
                                  <TextScramble
                                    key={cat}
                                    className="tag tag-s tag-medium mxd-scramble"
                                  >
                                    {cat}
                                  </TextScramble>
                                ))}
                              </div>
                            )}
                          </div>
                        </CommonCardBatchAnimated>
                      );
                    })}
                  </div>
                </div>
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
