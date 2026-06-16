"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import type { PostListItem } from "@/types/blogPreview";

// Tarih formatı: "YYYY-MM-DD" → "06 January, 2026"
function formatPostDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  if (/^\d{2}\s[A-Z]/.test(dateStr)) return dateStr;
  const d = new Date(dateStr + "T12:00:00");
  if (isNaN(d.getTime())) return dateStr;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

// Slot başına farklı boyut yerel görsel (Sanity coverImage yoksa)
const LOCAL_SLOT_IMAGES = [
  { src: "/img/blog/preview/grid-x3/pr-01.webp", width: 1170, height: 800 },
  { src: "/img/blog/preview/grid-x3/pr-02.webp", width: 1200, height: 1200 },
  { src: "/img/blog/preview/grid-x3/pr-04.webp", width: 853, height: 1280 },
  { src: "/img/blog/preview/grid-x3/pr-03.webp", width: 1423, height: 800 },
];

// Fallback: Sanity boşsa local data
const LOCAL_BLOG_POSTS: PostListItem[] = [
  {
    _id: "local-ab-1",
    title: "Frontend innovations and user journeys",
    slug: "",
    categories: ["Design"],
    readTime: "5 min",
    author: "Studio",
    date: "03 January, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-ab-2",
    title: "Branding in creating digital experiences",
    slug: "",
    categories: ["Branding"],
    readTime: "4 min",
    author: "Studio",
    date: "15 January, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-ab-3",
    title: "Elevating digital workshops with engaging design",
    slug: "",
    categories: ["Strategy"],
    readTime: "6 min",
    author: "Studio",
    date: "28 January, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-ab-4",
    title: "Designing for the future of interactive digital spaces",
    slug: "",
    categories: ["Development"],
    readTime: "7 min",
    author: "Studio",
    date: "02 February, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
];

type Props = {
  posts?: PostListItem[];
};

export default function BlogPreview({ posts }: Props) {
  const resolvedPosts =
    posts && posts.length > 0 ? posts.slice(0, 4) : LOCAL_BLOG_POSTS;

  return (
    <>
      <PinnedSection blurSection className="mxd-section padding-bottom-preview">
        <PinnedSection.Inner>
          <div className="mxd-container grid-s-container">
            {/* Block - Section Title v04 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-subtitle-s">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item-s">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          Featured news
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 mxd-grid-item-s">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls pre-title justify-end anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/blog-standard`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              News Overview
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v04 End */}
            {/* Block - Blog Preview Grid x4 Start */}
            <div className="mxd-block">
              <div className="mxd-blog-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-blog-grid__gallery">
                    {resolvedPosts.map((post, i) => {
                      const slot = LOCAL_SLOT_IMAGES[i % LOCAL_SLOT_IMAGES.length];
                      const imgSrc = post.coverImage ?? slot.src;
                      const imgWidth = post.coverImage ? 1170 : slot.width;
                      const imgHeight = post.coverImage ? 800 : slot.height;
                      const href = post.href ?? (post.slug ? `/blog/${post.slug}` : "/blog-article");
                      return (
                        <CommonCardBatchAnimated
                          key={post._id}
                          className="col-12 col-lg-3 mxd-blog-item mxd-blog-item-s animate-card-4"
                          as="div"
                          columns={4}
                        >
                          <div className="mxd-blog-item__date">
                            <span className="meta-date">{formatPostDate(post.date)}</span>
                          </div>
                          <Link
                            className="mxd-blog-item__media active-cursor-permanent"
                            data-cursor-text="Read Post"
                            href={href}
                          >
                            <Image
                              className=""
                              alt="Blog Preview Image"
                              src={imgSrc}
                              width={imgWidth}
                              height={imgHeight}
                            />
                          </Link>
                          <div className="mxd-blog-item__caption">
                            <div className="mxd-blog-item__title">
                              <Link className="blog-name-s" href={href}>
                                {post.title}
                              </Link>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Blog Preview Grid x4 End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
