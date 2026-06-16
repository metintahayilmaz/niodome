import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",

  pathnames: {
    "/": "/",

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
