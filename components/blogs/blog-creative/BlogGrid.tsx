import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
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

// Her slot için yerel görsel (boyutlar farklı olduğu için ayrı ayrı)
const LOCAL_GRID_IMAGES = [
  { src: "/img/blog/pr-01.webp", width: 1170, height: 800 },
  { src: "/img/blog/pr-02.webp", width: 1200, height: 1200 },
  { src: "/img/blog/pr-03.webp", width: 1423, height: 800 },
  { src: "/img/blog/pr-04.webp", width: 896, height: 1152 },
  { src: "/img/blog/pr-05.webp", width: 1280, height: 853 },
  { src: "/img/blog/pr-06.webp", width: 853, height: 1280 },
];

// Yerel fallback — Sanity boşsa kullanılır
const LOCAL_GRID_POSTS: PostListItem[] = [
  {
    _id: "local-bg01",
    title: "Frontend innovations and user journeys",
    slug: "frontend-innovations-and-user-journeys",
    categories: ["UI/UX", "Development", "Insights"],
    readTime: "5 mins",
    author: "John Lemon",
    date: "02 February, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-bg02",
    title: "Branding in creating digital experiences",
    slug: "branding-in-creating-digital-experiences",
    categories: ["Concept", "Editorial", "Event"],
    readTime: "3 mins",
    author: "Jenny Pineapple",
    date: "28 January, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-bg03",
    title: "Designing for the future of interactive digital spaces",
    slug: "designing-for-the-future-of-interactive-digital-spaces",
    categories: ["Midjourney", "News", "Editorial"],
    readTime: "5 mins",
    author: "John Lemon",
    date: "15 January, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-bg04",
    title: "Frontend innovations and user journeys",
    slug: "frontend-innovations-and-user-journeys-2",
    categories: ["UI/UX", "Development", "Insights"],
    readTime: "5 mins",
    author: "John Lemon",
    date: "03 January, 2026",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-bg05",
    title: "Branding in creating digital experiences",
    slug: "branding-in-creating-digital-experiences-2",
    categories: ["Concept", "Editorial", "Event"],
    readTime: "3 mins",
    author: "Jenny Pineapple",
    date: "21 December, 2025",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
  {
    _id: "local-bg06",
    title: "Designing for the future of interactive digital spaces",
    slug: "designing-for-the-future-2",
    categories: ["Midjourney", "News", "Editorial"],
    readTime: "5 mins",
    author: "John Lemon",
    date: "15 December, 2025",
    excerpt: "",
    cursorImageSrc: "",
    href: "/blog-article",
  },
];

type Props = {
  /** Sanity'den gelen post listesi. Verilmezse LOCAL_GRID_POSTS kullanılır. */
  posts?: PostListItem[];
};

export default function BlogGrid({ posts }: Props) {
  const resolvedPosts = posts && posts.length > 0 ? posts : LOCAL_GRID_POSTS;

  return (
    <>
      <BlurSection id="posts" className="mxd-section bg-color-base padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          <div className="mxd-posts-area">
            <div className="mxd-posts-container fullwidth-posts-container">
              {/* Regular Posts Alt Grid Start */}
              <div className="mxd-posts-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-posts-grid__row">
                    {resolvedPosts.map((post, i) => {
                      const img = LOCAL_GRID_IMAGES[i % LOCAL_GRID_IMAGES.length];
                      const imgSrc = post.coverImage ?? img.src;
                      const imgWidth = post.coverImage ? 1170 : img.width;
                      const imgHeight = post.coverImage ? 800 : img.height;
                      return (
                        <CommonCardBatchAnimated
                          key={post._id}
                          className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                          as="div"
                          columns={3}
                        >
                          <article className="mxd-post post-simple-alt">
                            <div className="post-simple-alt__date">
                              <span className="meta-date">
                                {formatPostDate(post.date)}
                              </span>
                            </div>
                            <Link
                              className="post-simple-alt__media active-cursor-permanent"
                              data-cursor-text="Read Post"
                              href={post.href}
                            >
                              <Image
                                className=""
                                alt="Blog Preview Image"
                                src={imgSrc}
                                width={imgWidth}
                                height={imgHeight}
                              />
                            </Link>
                            <div className="post-simple-alt__caption">
                              <div className="post-simple-alt__title">
                                <h3>
                                  <Link href={post.href}>{post.title}</Link>
                                </h3>
                              </div>
                              <div className="post-simple-alt__tags">
                                {post.categories.slice(0, 3).map((cat) => (
                                  <a key={cat} href="#0" className="tag tag-s tag-medium">
                                    <TextScramble className="mxd-scramble">
                                      {cat}
                                    </TextScramble>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </article>
                        </CommonCardBatchAnimated>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Regular Posts Alt Grid End */}
              {/* Blog Pagination Start */}
              <div className="mxd-blog-pagination pagination-fullwidth mxd-grid-item">
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
          </div>
        </div>
      </BlurSection>
    </>
  );
}
