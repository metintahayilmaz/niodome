import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import type { ProjectDetail } from "@/types/project";

import InnerHeadline from "@/components/projects/project-details/InnerHeadline";
import SplitList from "@/components/projects/project-details/SplitList";
import ProjectGallery, { type ProjectGalleryItem } from "@/components/projects/project-details/ProjectGallery";
import SplitList2 from "@/components/projects/project-details/SplitList2";
import SplitList3 from "@/components/projects/project-details/SplitList3";
import ClientSFeedback from "@/components/projects/project-details/ClientSFeedback";
import NextProjectLink from "@/components/projects/project-details/NextProjectLink";
import CTAWithMarquee from "@/components/projects/project-details/CTAWithMarquee";
import { creativeWorkSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { getLocale } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

// ── generateStaticParams ────────────────────────────────────────────────────
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const rows = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
    const sanity = rows.filter((r) => Boolean(r.slug));
    if (sanity.length > 0) return sanity;
  } catch {
    // Sanity erişilemez → local fallback
  }
  return [];
}

// ── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  try {
    const raw = await client.fetch<{
      title: string;
      overviewLead: string | null;
      bgImageSrc: Parameters<typeof urlFor>[0] | null;
    } | null>(projectBySlugQuery, { slug, locale });
    if (raw?.title) {
      const ogImage = raw.bgImageSrc
        ? urlFor(raw.bgImageSrc).width(1200).height(630).auto("format").url()
        : undefined;
      const description =
        raw.overviewLead ?? `${raw.title} — Niodome case study`;
      return {
        title: raw.title,
        description,
        openGraph: {
          title: `${raw.title} — Niodome`,
          description,
          url: locale === "en" ? `${SITE_URL}/en/works/${slug}` : `${SITE_URL}/calismalar/${slug}`,
          type: "article",
          ...(ogImage && {
            images: [
              { url: ogImage, width: 1200, height: 630, alt: raw.title },
            ],
          }),
        },
        twitter: { card: "summary_large_image" },
        alternates: {
          canonical:
            locale === "en"
              ? `${SITE_URL}/en/works/${slug}`
              : `${SITE_URL}/calismalar/${slug}`,
          languages: {
            "x-default": `${SITE_URL}/calismalar/${slug}`,
            tr: `${SITE_URL}/calismalar/${slug}`,
            en: `${SITE_URL}/en/works/${slug}`,
          },
        },
      };
    }
  } catch {
    // fallback below
  }
  return {
    title: "Proje",
    description: "Niodome proje detayları.",
    alternates: {
      canonical: `${SITE_URL}/calismalar/${slug}`,
      languages: {
        "x-default": `${SITE_URL}/calismalar/${slug}`,
        tr: `${SITE_URL}/calismalar/${slug}`,
        en: `${SITE_URL}/en/works/${slug}`,
      },
    },
  };
}

// ── Raw types returned by Sanity (before urlFor) ────────────────────────────
type RawGalleryImage = Parameters<typeof urlFor>[0] & { alt?: { tr?: string; en?: string }; caption?: { tr?: string; en?: string }; fit?: "cover" | "contain" };
type RawProject = {
  _id: string;
  title: string | null;
  slug: string | null;
  subtitle: string | null;
  bgImageSrc: RawGalleryImage | null;
  tagsColA: string[] | null;
  tagsColB: string[] | null;
  overviewLead: string | null;
  overviewSpan: string | null;
  liveUrl: string | null;
  clientName: string | null;
  industries: string | null;
  projectDate: string | null;
  challengeLead: string | null;
  challengeSpan: string | null;
  services: { name: string; description: string }[] | null;
  solutionLead: string | null;
  solutionSpan: string | null;
  techStack: { name: string; description: string }[] | null;
  galleryImages: RawGalleryImage[] | null;
  feedbackApproved: boolean | null;
  feedbackQuoteLead: string | null;
  feedbackQuoteSpan: string | null;
  feedbackAuthorName: string | null;
  feedbackAuthorRole: string | null;
  feedbackAuthorCompany: string | null;
  feedbackAuthorCompanyUrl: string | null;
  feedbackAuthorPhoto: RawGalleryImage | null;
  order: number | null;
  nextProject: {
    slug: string;
    title: string;
    imageSrc: RawGalleryImage | null;
    cursorText: string | null;
  } | null;
};

// ── Page ────────────────────────────────────────────────────────────────────
export default async function WorksSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();

  let project: ProjectDetail | null = null;
  let gallery: ProjectGalleryItem[] = [];

  try {
    const raw = await client.fetch<RawProject | null>(projectBySlugQuery, {
      slug,
      locale,
    });

    if (raw && raw._id) {
      // Gallery images — slot 0 & 5 tam genişlik (1920px), 1-4 yarı genişlik (960px)
      const galleryImages: string[] = (raw.galleryImages ?? []).map(
        (img, i) => {
          return urlFor(img).width(i === 0 || i === 5 ? 1920 : 960)
            .quality(80).auto("format").url();
        },
      );

      gallery = galleryImages.map((src, index) => {
        const image = raw.galleryImages?.[index];
        const language = locale === "en" ? "en" : "tr";
        return { src, alt: image?.alt?.[language] || raw.title || "", caption: image?.caption?.[language], fit: image?.fit === "contain" ? "contain" : "cover" };
      });

      // Feedback author photo
      const feedbackAuthorPhoto = raw.feedbackAuthorPhoto
        ? urlFor(raw.feedbackAuthorPhoto)
            .width(300)
            .height(300)
            .auto("format")
            .url()
        : undefined;

      // Next project banner image
      const nextProjectImageSrc = raw.nextProject?.imageSrc
        ? urlFor(raw.nextProject.imageSrc)
            .width(1920)
            .height(1200)
            .quality(80)
            .auto("format")
            .url()
        : undefined;

      project = {
        _id: raw._id,
        title: raw.title ?? "",
        slug: raw.slug ?? slug,
        subtitle: raw.subtitle ?? undefined,
        tagsColA: raw.tagsColA ?? [],
        tagsColB: raw.tagsColB ?? [],
        overviewLead: raw.overviewLead ?? undefined,
        overviewSpan: raw.overviewSpan ?? undefined,
        liveUrl: raw.liveUrl ?? undefined,
        clientName: raw.clientName ?? undefined,
        industries: raw.industries ?? undefined,
        projectDate: raw.projectDate ?? undefined,
        challengeLead: raw.challengeLead ?? undefined,
        challengeSpan: raw.challengeSpan ?? undefined,
        services: raw.services ?? [],
        solutionLead: raw.solutionLead ?? undefined,
        solutionSpan: raw.solutionSpan ?? undefined,
        techStack: raw.techStack ?? [],
        galleryImages,
        feedbackApproved: raw.feedbackApproved === true,
        feedbackQuoteLead: raw.feedbackQuoteLead ?? undefined,
        feedbackQuoteSpan: raw.feedbackQuoteSpan ?? undefined,
        feedbackAuthorName: raw.feedbackAuthorName ?? undefined,
        feedbackAuthorRole: raw.feedbackAuthorRole ?? undefined,
        feedbackAuthorCompany: raw.feedbackAuthorCompany ?? undefined,
        feedbackAuthorCompanyUrl: raw.feedbackAuthorCompanyUrl ?? undefined,
        feedbackAuthorPhoto,
        order: raw.order ?? 0,
        nextProject: raw.nextProject
          ? {
              slug: raw.nextProject.slug,
              title: raw.nextProject.title,
              imageSrc: nextProjectImageSrc,
              cursorText: raw.nextProject.cursorText ?? undefined,
            }
          : undefined,
      };
    }
  } catch {
    // Sanity erişilemez → project null kalır
  }

  // Local'de de yoksa → 404
  if (!project) {
    notFound();
  }

  const ldCreativeWork = creativeWorkSchema(project, locale);
  const ldBreadcrumb = breadcrumbSchema([
    { name: locale === "en" ? "Home" : "Ana Sayfa", url: locale === "en" ? `${SITE_URL}/en` : SITE_URL },
    { name: locale === "en" ? "Works" : "Çalışmalar", url: locale === "en" ? `${SITE_URL}/en/works` : `${SITE_URL}/calismalar` },
    { name: project.title, url: locale === "en" ? `${SITE_URL}/en/works/${project.slug}` : `${SITE_URL}/calismalar/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldCreativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <InnerHeadline
        title={project.title}
        subtitle={project.subtitle}
        tagsColA={project.tagsColA}
        tagsColB={project.tagsColB}
      />
      <SplitList
        overviewLead={project.overviewLead}
        overviewSpan={project.overviewSpan}
        liveUrl={project.liveUrl}
        projectName={project.title}
        clientName={project.clientName}
        industries={project.industries}
        projectDate={project.projectDate}
      />
      <ProjectGallery images={gallery} />
      {project.challengeLead && <SplitList2
        challengeLead={project.challengeLead}
        challengeSpan={project.challengeSpan}
        services={project.services}
      />}
      {project.solutionLead && <SplitList3
        solutionLead={project.solutionLead}
        solutionSpan={project.solutionSpan}
        techStack={project.techStack}
      />}
      {project.feedbackApproved && (
        <ClientSFeedback
          quoteLead={project.feedbackQuoteLead}
          quoteSpan={project.feedbackQuoteSpan}
          authorName={project.feedbackAuthorName}
          authorRole={project.feedbackAuthorRole}
          authorCompany={project.feedbackAuthorCompany}
          authorCompanyUrl={project.feedbackAuthorCompanyUrl}
          authorPhoto={project.feedbackAuthorPhoto}
        />
      )}
      {project.nextProject && (
        <NextProjectLink nextProject={project.nextProject} />
      )}
      <CTAWithMarquee image={gallery[0]?.src} imageAlt={gallery[0]?.alt} />
    </>
  );
}
