"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
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
function formatDate(raw: string): string {
  // YYYY-MM-DD formatı mı? Sadece o zaman parse et.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const [year, month, day] = raw.split("-").map(Number);
  // UTC'den kaçınmak için yerel Date yerine doğrudan değerleri kullan
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  return `${String(day).padStart(2, "0")} ${months[month - 1]}, ${year}`;
}

// Bölüm-seviyesi sabitler data dosyasından gelmeye devam eder
const { sectionTitle, overviewLabel, overviewHref, items: localItems } =
  blogPreviewDigitalAgencyData;

const [titleLine1, titleLine2] = sectionTitle.split("\n");

type Props = {
  /** Sanity'den gelen post listesi.
   *  BlogPreview 2 yazı gösterdiğinden, 2 yazı gelmezse local data'ya düşer. */
  posts?: BlogPreviewItem[];
};

export default function BlogPreview({ posts }: Props) {
  const resolvedItems = posts && posts.length >= 2 ? posts : localItems;
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
                          {titleLine1}
                          <br />
                          {titleLine2}
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
                            href={overviewHref}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {overviewLabel}
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
                    data-cursor-text="Read Post"
                    href={post.href}
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
                              <span className="meta-author comma-tag">
                                {post.author}
                              </span>
                              <span className="meta-date">{formatDate(post.date)}</span>
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
