import { Metadata } from "next";
import InnerHeadline from "@/components/projects/works-grid/InnerHeadline";
import ProjectsGridX3Showcase from "@/components/projects/works-grid/ProjectsGridX3Showcase";
import ParallaxDividerVideo from "@/components/projects/works-grid/ParallaxDividerVideo";
import TestimonialsSticky from "@/components/projects/works-grid/TestimonialsSticky";
import CTAWithMarquee from "@/components/projects/works-grid/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectsGridQuery, stickyTestimonialsQuery } from "@/sanity/lib/queries";
import type { ProjectGridItem } from "@/types/project";
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

export default async function WorksGridPage() {
  const locale = await getLocale();
  // --- Grid projeleri (metin+link, görseller bileşende yerel) ---
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
    // Sanity erişilemez → ProjectsGridX3Showcase local data'ya döner
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
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <ProjectsGridX3Showcase projects={sanityGridProjects} />
        <ParallaxDividerVideo />
        <TestimonialsSticky testimonials={sanityTestimonials} />
        <CTAWithMarquee />
      </div>
    </>
  );
}
