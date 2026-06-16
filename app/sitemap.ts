import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { postSlugsSitemapQuery, projectSlugsSitemapQuery } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

// routing.ts pathnames: her iç key için TR (no prefix) ve EN (/en prefix) canonical URL'leri.
// Localeprefix "as-needed" → TR'de prefix yok, EN'de /en var.
// Sitemap URL'leri redirect vermemeli — son canonical URL kullanılmalı.
const PATHNAMES: { tr: string; en: string; freq: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { tr: "/",          en: "/en",          freq: "weekly",  priority: 1.0 },
  { tr: "/hakkimizda", en: "/en/about-us", freq: "monthly", priority: 0.8 },
  { tr: "/hizmetler", en: "/en/services",  freq: "monthly", priority: 0.8 },
  { tr: "/iletisim",  en: "/en/contact",  freq: "yearly",  priority: 0.6 },
  { tr: "/calismalar", en: "/en/works",   freq: "weekly",  priority: 0.9 },
  { tr: "/blog",      en: "/en/blog",     freq: "weekly",  priority: 0.7 },
];

function makeEntry(
  trPath: string,
  enPath: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap[number] {
  const trUrl = `${BASE}${trPath}`;
  const enUrl = `${BASE}${enPath}`;
  return {
    url: trUrl,
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages: {
        "x-default": trUrl,
        tr: trUrl,
        en: enUrl,
      },
    },
  };
}

const STATIC_ROUTES: MetadataRoute.Sitemap = PATHNAMES.map((p) =>
  makeEntry(p.tr, p.en, { changeFrequency: p.freq, priority: p.priority })
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog post slug'ları
  // routing.ts: /blog/[slug] → TR: /blog/[slug], EN: /en/blog/[slug]
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<{ tr: string; en: string }[]>(postSlugsSitemapQuery);
    blogEntries = posts
      .filter((p) => p.tr)
      .map((p) =>
        makeEntry(`/blog/${p.tr}`, `/en/blog/${p.en}`, {
          changeFrequency: "monthly",
          priority: 0.7,
        })
      );
  } catch {
    // Sanity erişilemezse blog girdileri atlanır
  }

  // Works/project slug'ları
  // routing.ts: /works/[slug] → TR: /calismalar/[slug], EN: /en/works/[slug]
  let worksEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await client.fetch<{ tr: string; en: string }[]>(projectSlugsSitemapQuery);
    worksEntries = projects
      .filter((p) => p.tr)
      .map((p) =>
        makeEntry(`/calismalar/${p.tr}`, `/en/works/${p.en}`, {
          changeFrequency: "monthly",
          priority: 0.8,
        })
      );
  } catch {
    // Sanity erişilemezse works girdileri atlanır
  }

  return [...STATIC_ROUTES, ...blogEntries, ...worksEntries];
}
