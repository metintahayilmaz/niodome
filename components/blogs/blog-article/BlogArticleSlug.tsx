"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import BlogArticleBody from "@/components/blogs/blog-article/BlogArticleBody";

// Tarih formatı: "YYYY-MM-DD" → "06 January, 2026"
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

type Props = {
  title: string;
  slug: string;
  categories: string[];
  readTime: string;
  author: string;
  date: string;
  excerpt: string;
  coverImageUrl: string | null;
  /** Portable text blokları — 5B'de PortableText ile render edilecek */
  body: unknown[] | null;
};

export default function BlogArticleSlug({
  title,
  categories,
  readTime,
  author,
  date,
  excerpt,
  coverImageUrl,
  body,
}: Props) {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline Breadcrumbs Start */}
            <div className="mxd-block">
              <div className="inner-headline">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/`}>
                                <TextScramble className="mxd-scramble">
                                  Home
                                </TextScramble>
                              </Link>
                            </span>
                            <span>
                              <Link href={`/blog-standard`}>
                                <TextScramble className="mxd-scramble">
                                  Insights
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">{title}</span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline Breadcrumbs End */}
            <div className="mxd-article-area">
              {/* Article Container Start */}
              <div className="mxd-article-container mxd-grid-item">
                {/* Article Start */}
                <div className="mxd-article loading-wrap">
                  {/* Article Headline Start */}
                  <div className="mxd-article__headline">
                    <CommonLoadItem index={0}>
                      <div className="mxd-article__tags loading-item">
                        {categories.map((cat) => (
                          <a key={cat} href="#0">
                            <TextScramble className="tag tag-m meta-tag comma-tag mxd-scramble">
                              {cat}
                            </TextScramble>
                          </a>
                        ))}
                      </div>
                    </CommonLoadItem>
                    <div className="mxd-article__title">
                      <CommonAnimatedText
                        as="h2"
                        className="small loading-split"
                        animation="splitLinesLoad"
                      >
                        {title}
                      </CommonAnimatedText>
                    </div>
                    <CommonLoadItem index={1}>
                      <div className="mxd-article__meta loading-item">
                        <div className="mxd-article__data">
                          <span className="tag tag-m meta-tag slash-tag">
                            {formatPostDate(date)}
                          </span>
                          <span className="tag tag-m meta-tag">{readTime}</span>
                        </div>
                      </div>
                    </CommonLoadItem>
                  </div>
                  {/* Article Headline End */}
                  {/* Article Thumb Start */}
                  <CommonLoadItem index={2}>
                    <div className="mxd-article__thumb loading-item">
                      <Image
                        alt={title}
                        src={coverImageUrl ?? "/img/blog/article/1920x1200_ar-01.webp"}
                        width={1920}
                        height={1200}
                        priority
                      />
                    </div>
                  </CommonLoadItem>
                  {/* Article Thumb End */}
                  {/* Article Content Start */}
                  <div className="mxd-article__content">
                    {/* Excerpt — her zaman görünür özet */}
                    {excerpt && (
                      <div className="mxd-article__block">
                        <p className="mxd-article__excerpt">{excerpt}</p>
                      </div>
                    )}
                    {/* Body — Portable Text render */}
                    <BlogArticleBody body={body} />
                  </div>
                  {/* Article Content End */}
                </div>
                {/* Article End */}
                {/* Article Author Start */}
                <div className="mxd-article-author">
                  <div className="mxd-article-author__data">
                    <a className="mxd-article-author__avatar" href="#0">
                      <Image
                        alt={author}
                        src="/img/avatars/300x300_ava-06.webp"
                        width={300}
                        height={300}
                      />
                    </a>
                    <div className="mxd-article-author__info">
                      <h4 className="mxd-article-author__name">
                        <a href="#0">{author}</a>
                        <small className="mxd-article-author__position">
                          Author
                        </small>
                      </h4>
                      <div className="mxd-article-author__socials">
                        <a
                          href="https://www.linkedin.com/"
                          className="tag tag-m tag-bg default"
                        >
                          <TextScramble className="mxd-scramble">
                            LinkedIn
                          </TextScramble>
                        </a>
                        <a
                          href="https://www.behance.net/"
                          className="tag tag-m tag-bg default"
                        >
                          <TextScramble className="mxd-scramble">
                            Behance
                          </TextScramble>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Article Author End */}
                {/* Article Navigation Start */}
                <div className="mxd-article-navigation">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-6 mxd-article-navigation__navitem left">
                        <a
                          className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
                          href="#0"
                          aria-label="Previous Article"
                        >
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                              <path d="M7.2,18v-3.6h3.6v3.6h-3.6ZM3.6,7.2H0v3.6h3.6v3.6h3.6v-3.6h10.8v-3.6H7.2v-3.6h-3.6s0,3.6,0,3.6ZM7.2,3.6h3.6V0h-3.6v3.6Z" />
                            </svg>
                          </i>
                          <TextScramble className="btn-caption mxd-scramble">Prev</TextScramble>
                        </a>
                      </div>
                      <div className="col-6 mxd-article-navigation__navitem right">
                        <a
                          className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-right"
                          href="#0"
                          aria-label="Next Article"
                        >
                          <TextScramble className="btn-caption mxd-scramble">Next</TextScramble>
                          <i>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Article Navigation End */}
                {/* Article Comments Start */}
                <div className="mxd-article-comments">
                  <div className="mxd-article-comments__respond">
                    <h3>What do you think?</h3>
                    <p className="mxd-article__normal">
                      Please leave a reply. Your email address will not be
                      published. Required fields are marked *
                    </p>
                    <div className="comments-respond__form">
                      <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <div className="container-fluid p-0">
                          <div className="row gx-5 comments-respond__row">
                            <div className="col-12 col-md-6 mxd-grid-item no-margin">
                              <input type="text" name="Name" placeholder="Your name*" required />
                            </div>
                            <div className="col-12 col-md-6 mxd-grid-item no-margin">
                              <input type="text" name="Email" placeholder="Your Email*" />
                            </div>
                            <div className="col-12 mxd-grid-item">
                              <textarea name="Message" placeholder="Message*" required defaultValue={""} />
                            </div>
                            <div className="col-12 mxd-grid-item">
                              <button className="btn btn-default-icon btn-default-accent slide-right" type="submit">
                                <TextScramble className="btn-caption mxd-scramble">Post Comment</TextScramble>
                                <i className="btn-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                                    <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                                  </svg>
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Article Comments End */}
              </div>
              {/* Article Container End */}
            </div>
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
