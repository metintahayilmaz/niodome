"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import type { PostListItem } from "@/types/blogPreview";

// Tarih formatı: "YYYY-MM-DD" → "06 January, 2026". Zaten formatlıysa olduğu gibi döner.
function formatPostDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  const d = new Date(dateStr + "T12:00:00");
  if (isNaN(d.getTime())) return dateStr;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

// Yerel fallback — Sanity boşsa kullanılır
const LOCAL_POSTS: PostListItem[] = [
  {
    _id: "local-b01",
    title: "My journey into the future of art",
    slug: "my-journey-into-the-future-of-art",
    categories: ["Midjourney", "Motion", "Editorial"],
    readTime: "5min read",
    author: "John Lemon",
    date: "January 06, 2026",
    excerpt:
      "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
    coverImage: "/img/blog/1400x900_pf-01.webp",
    cursorImageSrc: "/img/blog/preview/500x500_pr01.webp",
    href: "/blog-article",
  },
  {
    _id: "local-b02",
    title: "Frontend innovations and user journeys",
    slug: "frontend-innovations-and-user-journeys",
    categories: ["Press", "Insights"],
    readTime: "5 mins",
    author: "John Lemon",
    date: "02 February, 2026",
    excerpt:
      "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
    coverImage: "/img/blog/1400x900_pf-01.webp",
    cursorImageSrc: "/img/blog/preview/500x500_pr01.webp",
    href: "/blog-article",
  },
  {
    _id: "local-b03",
    title: "Elevating digital workshops with engaging design",
    slug: "elevating-digital-workshops-with-engaging-design",
    categories: ["News", "Insights"],
    readTime: "3 mins",
    author: "Jenny Pineapple",
    date: "28 January, 2026",
    excerpt:
      "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
    coverImage: "/img/blog/1400x900_pf-01.webp",
    cursorImageSrc: "/img/blog/preview/500x500_pr02.webp",
    href: "/blog-article",
  },
  {
    _id: "local-b04",
    title: "Crafting immersive 3d worlds with modern tools",
    slug: "crafting-immersive-3d-worlds-with-modern-tools",
    categories: ["3D", "Design", "Digital Workshop"],
    readTime: "5 mins",
    author: "John Lemon",
    date: "15 January, 2026",
    excerpt:
      "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
    coverImage: "/img/blog/1400x900_pf-01.webp",
    cursorImageSrc: "/img/blog/preview/500x500_pr03.webp",
    href: "/blog-article",
  },
  {
    _id: "local-b05",
    title: "Bringing ideas to life with motion design and creativity",
    slug: "bringing-ideas-to-life-with-motion-design-and-creativity",
    categories: ["Motion Design", "Workshop"],
    readTime: "3 mins",
    author: "Jenny Pineapple",
    date: "03 January, 2026",
    excerpt:
      "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
    coverImage: "/img/blog/1400x900_pf-01.webp",
    cursorImageSrc: "/img/blog/preview/500x500_pr04.webp",
    href: "/blog-article",
  },
  {
    _id: "local-b06",
    title: "Mastering the art of minimalist web design with impact",
    slug: "mastering-the-art-of-minimalist-web-design-with-impact",
    categories: ["Web Design", "Branding", "UI"],
    readTime: "7 mins",
    author: "John Lemon",
    date: "21 December, 2025",
    excerpt:
      "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
    coverImage: "/img/blog/1400x900_pf-01.webp",
    cursorImageSrc: "/img/blog/preview/500x500_pr05.webp",
    href: "/blog-article",
  },
];

// Sidebar "recent posts" için yerel thumbnail görselleri (boyut farklı, ayrı set)
const SIDEBAR_THUMBS = [
  "/img/blog/300x300_rp-01.webp",
  "/img/blog/300x300_rp-02.webp",
  "/img/blog/300x300_rp-03.webp",
];

type Props = {
  /** Sanity'den gelen post listesi. Verilmezse LOCAL_POSTS kullanılır. */
  posts?: PostListItem[];
};

export default function Blog({ posts }: Props) {
  const resolvedPosts = posts && posts.length > 0 ? posts : LOCAL_POSTS;
  const featuredPost = resolvedPosts[0];
  const simplePosts = resolvedPosts.slice(1);
  const recentPosts3 = resolvedPosts.slice(0, 3);

  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section padding-bottom-default">
          <div className="mxd-container grid-l-container">
            <CommonLoadFade index={0}>
              <div className="mxd-posts-area loading-fade">
                {/* Posts Container Start */}
                <div className="mxd-posts-container mxd-grid-item">
                  {/* Featured Post Start */}
                  <article className="mxd-post post-featured">
                    <Link
                      className="post-featured__container active-cursor-permanent"
                      data-cursor-text="Read Post"
                      href={featuredPost.href}
                    >
                      <div className="post-featured__thumb">
                        <Image
                          alt="Featured Post Thumb"
                          src={featuredPost.coverImage ?? "/img/blog/1400x900_pf-01.webp"}
                          width={1400}
                          height={900}
                        />
                        <div className="post-featured__cover" />
                      </div>
                      <div className="post-featured__content">
                        <div className="post-featured__meta">
                          <div className="post-featured__data">
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              {formatPostDate(featuredPost.date)}
                            </TextScramble>
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              {featuredPost.readTime}
                            </TextScramble>
                          </div>
                          <div className="post-featured__categories">
                            {featuredPost.categories.map((cat) => (
                              <TextScramble
                                key={cat}
                                className="tag tag-s-mobile tag-permanent mxd-scramble"
                              >
                                {cat}
                              </TextScramble>
                            ))}
                          </div>
                        </div>
                        <div className="post-featured__info">
                          <h2 className="post-featured__title permanent">
                            {featuredPost.title}
                          </h2>
                          <div className="post-featured__excerpt">
                            <p className="t-medium t-permanent">
                              {featuredPost.excerpt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                  {/* Featured Post End */}
                  {/* Regular Posts Group Start */}
                  <div className="mxd-posts-list">
                    {simplePosts.map((post) => (
                      <article key={post._id} className="mxd-post post-simple">
                        <div className="post-simple__divider top" />
                        <Link
                          className="post-simple__container active-cursor-image active-cursor-permanent"
                          data-cursor-image={post.cursorImageSrc ?? ""}
                          data-cursor-text="Read Post"
                          href={post.href}
                        >
                          <div className="container-fluid px-0 post-simple__inner">
                            <div className="row gx-0">
                              <div className="col-12">
                                <div className="post-simple__meta">
                                  {post.categories.slice(0, 3).map((cat) => (
                                    <span key={cat} className="meta-tag comma-tag">
                                      {cat}
                                    </span>
                                  ))}
                                  <span className="meta-time">{post.readTime}</span>
                                </div>
                              </div>
                              <div className="col-12 col-xxl-7">
                                <div className="post-simple__title">
                                  <h3>{post.title}</h3>
                                  <div className="post-simple__data">
                                    <span className="meta-author comma-tag">
                                      {post.author}
                                    </span>
                                    <span className="meta-date">
                                      {formatPostDate(post.date)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xxl-5">
                                <div className="post-simple__excerpt">
                                  <p className="t-medium">{post.excerpt}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="post-simple__divider bottom" />
                      </article>
                    ))}
                  </div>
                  {/* Regular Posts Group End */}
                  {/* Blog Pagination Start */}
                  <div className="mxd-blog-pagination">
                    <div className="mxd-blog-pagination__inner">
                      <nav className="mxd-blog-pagination__items">
                        <a
                          className="mxd-blog-pagination__item blog-pagination-control prev btn btn-line-icon btn-line-default slide-left"
                          href="#0"
                          aria-label="Previous Page"
                        >
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M7.2,18v-3.6h3.6v3.6h-3.6ZM3.6,7.2H0v3.6h3.6v3.6h3.6v-3.6h10.8v-3.6H7.2v-3.6h-3.6s0,3.6,0,3.6ZM7.2,3.6h3.6V0h-3.6v3.6Z" />
                            </svg>
                          </i>
                          <TextScramble className="btn-caption mxd-scramble">
                            Prev
                          </TextScramble>
                        </a>
                        <a
                          href="#0"
                          className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble"
                        >
                          <span className="btn-caption">01</span>
                        </a>
                        <a
                          href="#0"
                          className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble active"
                        >
                          <span className="btn-caption">02</span>
                        </a>
                        <a
                          href="#0"
                          className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble"
                        >
                          <span className="btn-caption">03</span>
                        </a>
                        <a
                          className="mxd-blog-pagination__item blog-pagination-control next btn btn-line-icon btn-line-default slide-right"
                          href="#0"
                          aria-label="Next Page"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Next
                          </TextScramble>
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </a>
                      </nav>
                    </div>
                  </div>
                  {/* Blog Pagination End */}
                </div>
                {/* Posts Container End */}
                {/* Sidebar Start */}
                <div className="mxd-sidebar mxd-grid-item">
                  {/* search widget */}
                  <div className="mxd-sidebar__widget widget-search">
                    <div className="widget-search__form">
                      <form
                        className="form search-form"
                        action="#"
                        method="get"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <input
                          id="search"
                          type="search"
                          name="search"
                          placeholder="Search"
                        />
                        <button
                          className="btn btn-form no-scale btn-absolute-right btn-line-medium"
                          type="submit"
                          aria-label="Search"
                        >
                          <i className="ph ph-magnifying-glass" />
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* categories widget */}
                  <div className="mxd-sidebar__widget">
                    <div className="widget__title">
                      <p>/ Discover</p>
                    </div>
                    <ul className="widget__categories">
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Design
                          <span>07</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Development
                          <span>10</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Digital Marketing
                          <span>05</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Technology
                          <span>12</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Case Studies
                          <span>05</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Trends
                          <span>03</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* recent posts */}
                  <div className="mxd-sidebar__widget">
                    <div className="widget__title">
                      <p>/ Latest posts</p>
                    </div>
                    <ul className="widget__recent-posts">
                      {recentPosts3.map((post, i) => (
                        <li key={post._id} className="recent-post__item">
                          <div className="recent-post__thumb">
                            <Link href={post.href}>
                              <Image
                                alt="Recent Post Preview"
                                src={SIDEBAR_THUMBS[i] ?? "/img/blog/300x300_rp-01.webp"}
                                width={300}
                                height={300}
                              />
                            </Link>
                          </div>
                          <div className="recent-post__content">
                            <div className="recent-post__meta">
                              {post.categories.slice(0, 2).map((cat) => (
                                <a key={cat} href="#0">
                                  <TextScramble className="meta-tag tag-s comma-tag mxd-scramble">
                                    {cat}
                                  </TextScramble>
                                </a>
                              ))}
                            </div>
                            <div className="recent-post__title">
                              <Link href={post.href}>{post.title}</Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* ad */}
                  <div className="mxd-sidebar__widget widget-ad">
                    <a className="widget__image" href="#0" target="_blank">
                      <Image
                        alt="Ad Image"
                        src="/img/blog/1200x1320_ad-01.webp"
                        width={1200}
                        height={1320}
                      />
                    </a>
                    <div className="widget__tags">
                      <span className="tag tag-m tag-bg permanent">
                        Sponsored
                      </span>
                    </div>
                  </div>
                  {/* about widget */}
                  <div className="mxd-sidebar__widget bg-base-tint radius-m widget-about">
                    <div className="widget__title">
                      <p>/ About</p>
                    </div>
                    <div className="widget__descr">
                      <p className="t-small">
                        Dive into the latest trends,{" "}
                        <span>
                          uncover valuable industry insights, and explore
                          practical advice.
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* socials */}
                  <div className="mxd-sidebar__widget bg-base-tint radius-m widget-socials">
                    <div className="widget__title">
                      <p>/ Ecosystem</p>
                    </div>
                    <div className="widget__social-links-small">
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://dribbble.com/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Dribbble</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://www.behance.net/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Behance</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://www.instagram.com/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Instagram</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://github.com/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Github</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://codepen.io/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Codepen</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://www.figma.com/community"
                          target="_blank"
                        >
                          <p className="social-links-small__title">
                            Figma Community
                          </p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar End */}
              </div>
            </CommonLoadFade>
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
