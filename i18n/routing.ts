import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // Explicit URLs and saved language choices take priority over browser detection.
  localeDetection: true,
  localePrefix: "as-needed",

  pathnames: {
    "/": "/",

    "/geo": "/geo",
    "/social-media": { tr: "/sosyal-medya", en: "/social-media" },
    "/google-ads": "/google-ads",
    "/digital-advertising": { tr: "/dijital-reklam-yonetimi", en: "/digital-advertising" },

    "/services": {
      tr: "/hizmetler",
      en: "/services",
    },

    "/about-us": {
      tr: "/hakkimizda",
      en: "/about-us",
    },

    "/contact": {
      tr: "/iletisim",
      en: "/contact",
    },

    "/blog": {
      tr: "/blog",
      en: "/blog",
    },

    "/blog/[slug]": {
      tr: "/blog/[slug]",
      en: "/blog/[slug]",
    },

    "/works": {
      tr: "/calismalar",
      en: "/works",
    },

    "/works/[slug]": {
      tr: "/calismalar/[slug]",
      en: "/works/[slug]",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
