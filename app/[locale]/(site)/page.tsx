import { homeCover } from "@/data/homeCover";
import AboutProcess from "@/components/homes/index-digital-agency/AboutProcess";
import ServicesList from "@/components/homes/index-digital-agency/ServicesList";
import approvedServices from "@/data/approvedServices.json";
import Divider from "@/components/homes/index-digital-agency/Divider";
import Footer3 from "@/components/footers/Footer3";
import type { Metadata } from "next";
import { organizationSchema, websiteSchema } from "@/lib/jsonLd";
import Hero from "@/components/homes/index-digital-agency/Hero";
import ProjectsShowcase from "@/components/homes/index-digital-agency/ProjectsShowcase";
import ParallaxDividerVideo from "@/components/homes/index-digital-agency/ParallaxDividerVideo";
import TestimonialsSticky from "@/components/homes/index-digital-agency/TestimonialsSticky";
import ParallaxDividerImage from "@/components/homes/index-digital-agency/ParallaxDividerImage";
import BlogPreview from "@/components/homes/index-digital-agency/BlogPreview";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  siteSettingsQuery,
  projectsShowcaseQuery,
  stickyTestimonialsQuery,
  postsPreviewQuery,
  heroSettingsQuery,
} from "@/sanity/lib/queries";
import type { SiteSettingsData } from "@/types/siteSettings";
import type { ProjectShowcaseItem } from "@/types/project";
import type { TestimonialStickyCard } from "@/types/testimonials";
import type { BlogPreviewItem } from "@/types/blogPreview";
import type { HeroGalleryImage } from "@/types/heroDigitalAgency";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const trUrl = `${SITE_URL}`;
  const enUrl = `${SITE_URL}/en`;
  const canonical = locale === "en" ? enUrl : trUrl;
  return {
    title: { absolute: t("home.title") },
    description: t("home.description"),
    openGraph: {
      title: { absolute: t("home.title") },
      description: t("home.description"),
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

export default async function HomePage() {
  const locale = await getLocale();
  const narrative = await getTranslations("narrative");
  const aboutLabels = await getTranslations("homeAbout");
  const processLabels = aboutLabels.raw("steps") as { title: string }[];
  const processDescriptions = [
    ...(narrative.raw("homeParagraphs") as string[]),
    narrative("aboutEndParagraph"),
  ];
  const serviceItems = approvedServices[
    locale === "en" ? "en" : "tr"
  ].items.map((item, index) => ({
    _id: item._id,
    number: `[0${index + 1}]`,
    title: item.title,
    description: item.shortDescription,
    cursorImageSrc: `/img/services/500x500_s0${index + 1}.webp`,
    href: "/services",
  }));

  // --- siteSettings ---
  let sanitySettings: SiteSettingsData | undefined;
  try {
    const raw = await client.fetch<{
      logotype: string | null;
      logoImage: Parameters<typeof urlFor>[0] | null;
      email: string | null;
      emailHref: string | null;
      phone: string | null;
      phoneHref: string | null;
      address: string | null;
      copyrightText: string | null;
      navLinks: { label: string; href: string }[] | null;
      socials: { label: string; href: string }[] | null;
    } | null>(siteSettingsQuery, { locale });

    if (raw) {
      sanitySettings = {
        logotype: raw.logotype ?? "",
        ...(raw.logoImage && {
          logoImage: urlFor(raw.logoImage).height(120).auto("format").url(),
          logoImageAlt: raw.logotype ?? "Logo",
        }),
        email: raw.email ?? "",
        emailHref: raw.emailHref ?? "",
        phone: raw.phone ?? "",
        phoneHref: raw.phoneHref ?? "",
        address: raw.address ?? "",
        copyrightText: raw.copyrightText ?? "",
        navLinks: raw.navLinks ?? [],
        socials: raw.socials ?? [],
      };
    }
  } catch {
    // Sanity erişilemez → Footer3 ve Hero local data'sını kullanır
  }

  // --- heroSettings ---
  type SanityHeroSettings =
    | {
        headline: string;
        subline: string;
        scrollLabel: string;
        coverImage: { src: string; alt: string; width: number; height: number };
        galleryImages: HeroGalleryImage[];
      }
    | undefined;

  let sanityHero: SanityHeroSettings;
  try {
    const raw = await client.fetch<{
      headline: string | null;
      subline: string | null;
      scrollLabel: string | null;
      coverImage: {
        src: Parameters<typeof urlFor>[0] | null;
        alt: string | null;
        assetWidth: number | null;
        assetHeight: number | null;
        width: number | null;
        height: number | null;
      } | null;
      backgroundVideo: {
        poster: Parameters<typeof urlFor>[0] | null;
        sources: { src: string; type: string }[] | null;
      } | null;
      galleryImages:
        | {
            _key: string;
            src: Parameters<typeof urlFor>[0] | null;
            alt: string | null;
            assetWidth: number | null;
            assetHeight: number | null;
            width: number | null;
            height: number | null;
            href?: string | null;
          }[]
        | null;
    } | null>(heroSettingsQuery, { locale });

    if (raw) {
      const galleryImages: HeroGalleryImage[] = (raw.galleryImages ?? []).map(
        (img) => ({
          _key: img._key,
          src: img.src
            ? urlFor(img.src).width(1280).quality(85).auto("format").url()
            : "",
          alt: img.alt ?? "",
          width: img.width ?? img.assetWidth ?? 1280,
          height: img.height ?? img.assetHeight ?? 800,
          ...(img.href ? { href: img.href } : {}),
        }),
      );

      sanityHero = {
        headline: raw.headline ?? "",
        subline: raw.subline ?? "",
        scrollLabel: raw.scrollLabel ?? "",
        coverImage: raw.coverImage?.src
          ? {
              src: urlFor(raw.coverImage.src).width(1920).auto("format").url(),
              alt: raw.coverImage.alt ?? "",
              width: raw.coverImage.width ?? raw.coverImage.assetWidth ?? 1920,
              height:
                raw.coverImage.height ?? raw.coverImage.assetHeight ?? 1200,
            }
          : { src: "", alt: "", width: 1920, height: 1200 },
        galleryImages,
      };
    }
  } catch {
    // Sanity erişilemez → Hero local data'ya döner
  }

  // --- testimonials ---
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
        largeSrc: urlFor(r.largeSrc)
          .width(800)
          .height(800)
          .auto("format")
          .url(),
        largeAlt: r.largeAlt ?? "",
      }),
    }));
  } catch {
    // Sanity erişilemez → TestimonialsSticky local data'yı kullanır
  }

  // --- projects ---
  let sanityProjects: ProjectShowcaseItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        titleLines: string[] | null;
        bgImageSrc: Parameters<typeof urlFor>[0] | null;
        cardImageSrc: Parameters<typeof urlFor>[0] | null;
        cardImageAlt: string | null;
        cursorText: string | null;
        href: string | null;
        slug: string | null;
        tags: string[] | null;
      }[]
    >(projectsShowcaseQuery, { locale });

    sanityProjects = raw
      .filter((p) => p.bgImageSrc && p.cardImageSrc)
      .map((p) => ({
        _id: p._id,
        titleLines: [p.titleLines?.[0] ?? "", p.titleLines?.[1] ?? ""] as [
          string,
          string,
        ],
        bgImageSrc: urlFor(p.bgImageSrc!)
          .width(1920)
          .height(1280)
          .auto("format")
          .url(),
        cardImageSrc: urlFor(p.cardImageSrc!)
          .width(700)
          .height(700)
          .auto("format")
          .url(),
        cardImageAlt: p.cardImageAlt ?? "",
        cursorText: p.cursorText ?? "View Work",
        href: p.slug ? `/works/${p.slug}` : (p.href ?? "/project-details"),
        tags: p.tags ?? [],
      }));
  } catch {
    // Sanity erişilemez → ProjectsShowcase local data'yı kullanır
  }

  // --- posts (BlogPreview) ---
  let sanityPosts: BlogPreviewItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        title: string | null;
        slug: string | null;
        categories: string[] | null;
        readTime: string | null;
        author: string | null;
        date: string | null;
        excerpt: string | null;
        coverImage: Parameters<typeof urlFor>[0] | null;
        cursorImageSrc: Parameters<typeof urlFor>[0] | null;
        href: string | null;
      }[]
    >(postsPreviewQuery, { locale });

    sanityPosts = raw.map((p) => ({
      _id: p._id,
      title: p.title ?? "",
      slug: p.slug ?? "",
      categories: p.categories ?? [],
      readTime: p.readTime ?? "",
      author: p.author ?? "",
      date: p.date ?? "",
      excerpt: p.excerpt ?? "",
      href: p.slug ? `/blog/${p.slug}` : (p.href ?? "/blog-article"),
      cursorImageSrc: p.cursorImageSrc
        ? urlFor(p.cursorImageSrc).width(500).height(500).auto("format").url()
        : "",
      ...(p.coverImage && {
        coverImage: urlFor(p.coverImage)
          .width(500)
          .height(500)
          .auto("format")
          .url(),
      }),
    }));
  } catch {
    // Sanity erişilemez → BlogPreview local data'ya döner
  }

  const orgSchema = organizationSchema(sanitySettings);
  const siteSchema = websiteSchema(sanitySettings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <>
        <Hero
          coverVideo={homeCover.video}
          scrollTargetId="selected-work"
          socials={sanitySettings?.socials}
          heroSettings={{
            ...sanityHero,
            coverImage: {
              src: homeCover.poster,
              alt: homeCover.alt[locale === "en" ? "en" : "tr"],
              width: homeCover.width,
              height: homeCover.height,
            },
            galleryImages: sanityHero?.galleryImages ?? [],
            headline: narrative("heroTitle"),
            subline: narrative("heroSubline"),
            scrollLabel: narrative("explore"),
          }}
        />
        <AboutProcess
          manifestLead={narrative("homeIntro")}
          manifestSpan={narrative("homeTitle")}
          steps={processLabels.map((step, index) => ({
            stepNumber: `0${index + 1}`,
            title: step.title,
            description: processDescriptions[index],
            durationLabel: "",
          }))}
        />
        <div id="selected-work">
          <ProjectsShowcase projects={sanityProjects} />
        </div>
        <ServicesList title={narrative("servicesTitle")} items={serviceItems} />
        <ParallaxDividerVideo />
        <TestimonialsSticky testimonials={sanityTestimonials} />
        <ParallaxDividerImage
          src={sanityProjects.at(-1)?.bgImageSrc}
          alt={sanityProjects.at(-1)?.titleLines.join(" ")}
        />
        <BlogPreview posts={sanityPosts} />
        <Divider />
      </>
      <Footer3 settings={sanitySettings} />
    </>
  );
}
