import { Metadata } from "next";
import InnerHeadline from "@/components/projects/works-grid-sticky/InnerHeadline";
import ProjectsGridStickyShowcase from "@/components/projects/works-grid-sticky/ProjectsGridStickyShowcase";
import ParallaxDividerVideo from "@/components/projects/works-grid-sticky/ParallaxDividerVideo";
import ProjectsList from "@/components/projects/works-grid-sticky/ProjectsList";
import CTAWithMarquee from "@/components/projects/works-grid-sticky/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectsGridQuery, projectsListQuery } from "@/sanity/lib/queries";
import type { ProjectGridItem, ProjectListItem } from "@/types/project";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const trUrl = `${SITE_URL}/calismalar`;
  const enUrl = `${SITE_URL}/en/works`;
  const canonical = locale === "en" ? enUrl : trUrl;
  return {
    title: t("works.title"),
    description: t("works.description"),
    openGraph: {
      title: `${t("works.title")} — Niodome`,
      description: t("works.description"),
      url: canonical,
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical,
      languages: { "x-default": trUrl, tr: trUrl, en: enUrl },
    },
  };
}

export default async function WorksGridStickyPage() {
  const locale = await getLocale();
  // --- Sticky showcase projeleri (metin+link, görseller bileşende yerel) ---
  let sanityGridProjects: ProjectGridItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        title: string | null;
        href: string | null;
        slug: string | null;
        cursorText: string | null;
        tags: string[] | null;
      }[]
    >(projectsGridQuery, { locale });

    sanityGridProjects = raw.map((p) => ({
      _id: p._id,
      title: p.title ?? "",
      href: p.slug ? `/works/${p.slug}` : (p.href ?? "/project-details"),
      cursorText: p.cursorText ?? "View Work",
      tags: p.tags ?? [],
    }));
  } catch {
    // Sanity erişilemez → ProjectsGridStickyShowcase local data'ya döner
  }

  // --- ProjectsList veri ---
  let sanityListProjects: ProjectListItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        titleLines: string[] | null;
        cardImageSrc: Parameters<typeof urlFor>[0] | null;
        href: string | null;
        slug: string | null;
        tags: string[] | null;
      }[]
    >(projectsListQuery, { locale });

    sanityListProjects = raw.map((p) => ({
      _id: p._id,
      titleLines: [
        p.titleLines?.[0] ?? "",
        p.titleLines?.[1] ?? "",
      ] as [string, string],
      cardImageSrc: p.cardImageSrc
        ? urlFor(p.cardImageSrc).width(500).height(500).auto("format").url()
        : undefined,
      href: p.slug ? `/works/${p.slug}` : (p.href ?? "/project-details"),
      tags: p.tags ?? [],
    }));
  } catch {
    // Sanity erişilemez → ProjectsList local data'ya döner
  }

  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <ProjectsGridStickyShowcase projects={sanityGridProjects} />
        <ParallaxDividerVideo />
        <ProjectsList projects={sanityListProjects} />
        <CTAWithMarquee />
      </div>
    </>
  );
}
