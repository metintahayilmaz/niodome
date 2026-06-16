import type { BlogPreviewData } from "@/types/blogPreview";

export const blogPreviewDigitalAgencyData: BlogPreviewData = {
  sectionTitle: "Featured\nnews",
  overviewLabel: "News Overview",
  overviewHref: "/blog-standard",

  items: [
    {
      title: "Frontend innovations and user journeys",
      slug: "frontend-innovations-and-user-journeys",
      categories: ["Press", "Insights"],
      readTime: "5 mins",
      author: "John Lemon",
      date: "02 February, 2026",
      excerpt:
        "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
      coverImage: "/img/blog/preview/500x500_pr01.webp",
      cursorImageSrc: "/img/blog/preview/500x500_pr01.webp",
      href: "/blog-article",
    },
    {
      title: "Elevating digital workshops with engaging design",
      slug: "elevating-digital-workshops-with-engaging-design",
      categories: ["News", "Insights"],
      readTime: "3 mins",
      author: "Jenny Pineapple",
      date: "28 January, 2026",
      excerpt:
        "Discover how artificial intelligence is transforming artistic processes, pushing boundaries, and inspiring new possibilities in digital design.",
      coverImage: "/img/blog/preview/500x500_pr02.webp",
      cursorImageSrc: "/img/blog/preview/500x500_pr02.webp",
      href: "/blog-article",
    },
  ],
};
