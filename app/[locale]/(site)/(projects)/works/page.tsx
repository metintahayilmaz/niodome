import { Metadata } from "next";
import InnerHeadline from "@/components/projects/works-default/InnerHeadline";
import ProjectsStack from "@/components/projects/works-default/ProjectsStack";
import ProjectsList from "@/components/projects/works-default/ProjectsList";
import ParallaxDividerVideo from "@/components/projects/works-default/ParallaxDividerVideo";
import TestimonialsSticky from "@/components/projects/works-default/TestimonialsSticky";
import CTAWithMarquee from "@/components/projects/works-default/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  projectsStackQuery,
  projectsListQuery,
  stickyTestimonialsQuery,
} from "@/sanity/lib/queries";
import type { ProjectStackItem, ProjectListItem } from "@/types/project";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { TestimonialStickyCard } from "@/types/testimonials";

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

export default async function WorksDefaultPage() {
  const locale = await getLocale();
  // --- ProjectsStack veri ---
  let sanityStackProjects: ProjectStackItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        title: string | null;
        imageSrc: Parameters<typeof urlFor>[0] | null;
        imageAlt: string | null;
        coverClassName: string | null;
        tags: string[] | null;
        href: string | null;
        slug: string | null;
      }[]
    >(projectsStackQuery, { locale });

    sanityStackProjects = raw
      .filter((p) => p.imageSrc)
      .map((p) => ({
        _id: p._id,
        title: p.title ?? "",
        imageSrc: urlFor(p.imageSrc!).width(1920).height(1280).quality(80).auto("format").url(),
        imageAlt: p.imageAlt ?? p.title ?? "",
        imageWidth: 1920,
        imageHeight: 1280,
        coverClassName: p.coverClassName ?? undefined,
        tags: p.tags ?? [],
        href: p.slug ? `/works/${p.slug}` : (p.href ?? "/project-details"),
      }));
  } catch {
    // Sanity erişilemez → ProjectsStack local data'ya döner
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
      // slug varsa /works/[slug], yoksa href alanını kullan, son çare /project-details
      href: p.slug
        ? `/works/${p.slug}`
        : (p.href ?? "/project-details"),
      tags: p.tags ?? [],
    }));
  } catch {
    // Sanity erişilemez → ProjectsList local data'ya döner
  }

  // --- Testimonials veri ---
  let sanityTestimonials: TestimonialStickyCard[] = [];
  try {
    const raw = await client.fetch<
      {
        name: string | null;
        rolePrefix: string | null;
        companyName: string | null;
        descriptionLead: string | null;
        descriptionSpan: string | null;
        photoSrc: Parameters<typeof urlFor>[0] | null;
        photoAlt: string | null;
        largeSrc: Parameters<typeof urlFor>[0] | null;
        largeAlt: string | null;
      }[]
    >(stickyTestimonialsQuery, { locale });

    sanityTestimonials = raw.map((r, i) => ({
      id: String(i),
      name: r.name ?? "",
      rolePrefix: r.rolePrefix ?? "",
      companyName: r.companyName ?? "",
      descriptionLead: r.descriptionLead ?? "",
      descriptionSpan: r.descriptionSpan ?? "",
      photoSrc: r.photoSrc
        ? urlFor(r.photoSrc).width(300).height(300).auto("format").url()
        : "",
      photoAlt: r.photoAlt ?? "",
      ...(r.largeSrc && {
        largeSrc: urlFor(r.largeSrc).width(800).height(800).auto("format").url(),
        largeAlt: r.largeAlt ?? "",
      }),
    }));
  } catch {
    // Sanity erişilemez → TestimonialsSticky local data'ya döner
  }

  return (
    <>
      <InnerHeadline />
      <ProjectsStack projects={sanityStackProjects} />
      <ProjectsList projects={sanityListProjects} />
      <ParallaxDividerVideo />
      <TestimonialsSticky testimonials={sanityTestimonials} />
      <CTAWithMarquee />
    </>
  );
}
