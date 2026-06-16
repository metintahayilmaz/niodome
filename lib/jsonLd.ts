/**
 * JSON-LD schema helper'ları — her fonksiyon schema.org uyumlu nesne döner.
 * Boş/null alanlar yayılmaz; eksik veriyle geçersiz schema üretilmez.
 * Sayfalar: JSON.stringify(schema) → <script type="application/ld+json">
 */

import type { SiteSettingsData } from "@/types/siteSettings";
import type { ProjectDetail, NamedItem } from "@/types/project";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

// ── Yardımcı ────────────────────────────────────────────────────────────────

/** undefined / null / boş string alanları object'ten siler. */
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  ) as Partial<T>;
}

// ── Organization ────────────────────────────────────────────────────────────

export function organizationSchema(settings?: SiteSettingsData) {
  const sameAs = (settings?.socials ?? [])
    .map((s) => s.href)
    .filter(Boolean);

  return compact({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: settings?.logotype || "NIO",
    url: BASE,
    ...(settings?.logoImage
      ? {
          logo: {
            "@type": "ImageObject",
            url: settings.logoImage,
          },
        }
      : {}),
    ...(settings?.email || settings?.phone
      ? {
          contactPoint: compact({
            "@type": "ContactPoint",
            email: settings?.email || undefined,
            telephone: settings?.phone || undefined,
            contactType: "customer service",
          }),
        }
      : {}),
    ...(settings?.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  });
}

// ── WebSite ──────────────────────────────────────────────────────────────────

export function websiteSchema(settings?: SiteSettingsData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: settings?.logotype || "NIO",
    url: BASE,
    publisher: { "@id": `${BASE}/#organization` },
  };
}

// ── BreadcrumbList ───────────────────────────────────────────────────────────

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── Article (blog post) ──────────────────────────────────────────────────────

export type ArticleSchemaInput = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImageUrl?: string | null;
  date?: string;
  author?: string;
};

export function articleSchema(post: ArticleSchemaInput) {
  const url = `${BASE}/blog/${post.slug}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.coverImageUrl
      ? {
          image: {
            "@type": "ImageObject",
            url: post.coverImageUrl,
            width: 1920,
            height: 1200,
          },
        }
      : {}),
    ...(post.date ? { datePublished: post.date } : {}),
    ...(post.author
      ? { author: { "@type": "Person", name: post.author } }
      : {}),
    publisher: { "@id": `${BASE}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  });
}

// ── CreativeWork (works/[slug]) ──────────────────────────────────────────────

export function creativeWorkSchema(project: ProjectDetail) {
  const url = `${BASE}/works/${project.slug}`;

  const images = project.galleryImages.filter(Boolean);
  const about = [
    project.industries,
    ...(project.services ?? []).map((s: NamedItem) => s.name),
  ].filter(Boolean);

  return compact({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    name: project.title,
    url,
    ...(project.overviewLead ? { description: project.overviewLead } : {}),
    ...(images.length > 0
      ? {
          image: images.map((src) => ({
            "@type": "ImageObject",
            url: src,
          })),
        }
      : {}),
    creator: { "@id": `${BASE}/#organization` },
    ...(about.length > 0 ? { about: about.join(", ") } : {}),
    ...(project.clientName ? { contributor: project.clientName } : {}),
    ...(project.projectDate ? { dateCreated: project.projectDate } : {}),
  });
}

// ── Service ──────────────────────────────────────────────────────────────────

export type ServiceSchemaInput = {
  name: string;
  shortDescription?: string;
};

export function serviceSchema(service: ServiceSchemaInput) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    ...(service.shortDescription
      ? { description: service.shortDescription }
      : {}),
    provider: { "@id": `${BASE}/#organization` },
    serviceType: service.name,
    areaServed: "Worldwide",
  });
}

// ── ItemList (birden fazla service için) ─────────────────────────────────────

export function serviceListSchema(services: ServiceSchemaInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: compact({
        "@type": "Service",
        name: s.name,
        ...(s.shortDescription ? { description: s.shortDescription } : {}),
        provider: { "@id": `${BASE}/#organization` },
      }),
    })),
  };
}
