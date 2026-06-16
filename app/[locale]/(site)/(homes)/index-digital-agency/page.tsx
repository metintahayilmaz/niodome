import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-digital-agency/Hero";
import AboutProcess from "@/components/homes/index-digital-agency/AboutProcess";
import ProjectsShowcase from "@/components/homes/index-digital-agency/ProjectsShowcase";
import ServicesList from "@/components/homes/index-digital-agency/ServicesList";
import ParallaxDividerVideo from "@/components/homes/index-digital-agency/ParallaxDividerVideo";
import TestimonialsSticky from "@/components/homes/index-digital-agency/TestimonialsSticky";
import ParallaxDividerImage from "@/components/homes/index-digital-agency/ParallaxDividerImage";
import BlogPreview from "@/components/homes/index-digital-agency/BlogPreview";
import Divider from "@/components/homes/index-digital-agency/Divider";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { servicesQuery, siteSettingsQuery, projectsShowcaseQuery, stickyTestimonialsQuery, processStepsQuery, postsPreviewQuery, heroSettingsQuery } from "@/sanity/lib/queries";
import type { ServiceListItem } from "@/types/servicesList";
import type { SiteSettingsData } from "@/types/siteSettings";
import type { ProjectShowcaseItem } from "@/types/project";
import type { TestimonialStickyCard } from "@/types/testimonials";
import type { ProcessStep } from "@/types/aboutProcess";
import type { BlogPreviewItem } from "@/types/blogPreview";
import type { HeroGalleryImage } from "@/types/heroDigitalAgency";
import { getLocale } from "next-intl/server";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Index Digital Agency | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};

export default async function IndexDigitalAgencyPage() {
  const locale = await getLocale();
  // --- siteSettings ---
  // Sanity'den çek; hata olursa undefined kalır → Footer3 ve Hero local data'ya döner
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
        // logoImage → urlFor ile optimize URL'e dönüştür; yoksa undefined kalır
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
  // headline, subline, scrollLabel, coverImage, galleryImages → Sanity
  // backgroundVideo → video seed'de atlandı; null gelirse local video kullanılır
  // Fallback eşiği: galeri tam 20 görsel gelmezse tüm hero local'e döner
  type SanityHeroSettings = {
    headline: string;
    subline: string;
    scrollLabel: string;
    coverImage: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    galleryImages: HeroGalleryImage[];
  } | undefined;

  let sanityHero: SanityHeroSettings;
  try {
    const raw = await client.fetch<{
      headline: string | null;
      subline: string | null;
      scrollLabel: string | null;
      coverImage: {
        src: Parameters<typeof urlFor>[0] | null;
        alt: string | null;
        width: number | null;
        height: number | null;
      } | null;
      backgroundVideo: {
        poster: Parameters<typeof urlFor>[0] | null;
        sources: { src: string; type: string }[] | null;
      } | null;
      galleryImages: {
        _key: string;
        src: Parameters<typeof urlFor>[0] | null;
        alt: string | null;
        width: number | null;
        height: number | null;
        href?: string | null;
      }[] | null;
    } | null>(heroSettingsQuery, { locale });

    if (raw && raw.galleryImages && raw.galleryImages.length >= 20) {
      const galleryImages: HeroGalleryImage[] = raw.galleryImages.map((img) => ({
        _key: img._key,
        src: img.src
          ? urlFor(img.src).width(1280).height(800).auto("format").url()
          : "",
        alt: img.alt ?? "",
        width: img.width ?? 1280,
        height: img.height ?? 800,
        ...(img.href ? { href: img.href } : {}),
      }));

      sanityHero = {
        headline: raw.headline ?? "",
        subline: raw.subline ?? "",
        scrollLabel: raw.scrollLabel ?? "",
        coverImage: raw.coverImage?.src
          ? {
              src: urlFor(raw.coverImage.src).width(1920).height(1200).auto("format").url(),
              alt: raw.coverImage.alt ?? "",
              width: raw.coverImage.width ?? 1920,
              height: raw.coverImage.height ?? 1200,
            }
          : { src: "", alt: "", width: 1920, height: 1200 },
        galleryImages,
      };
    }
  } catch {
    // Sanity erişilemez → Hero tamamen local data'ya döner
  }

  // --- process steps ---
  let sanitySteps: ProcessStep[] = [];
  try {
    const raw = await client.fetch<
      {
        stepNumber: string | null;
        title: string | null;
        description: string | null;
        durationLabel: string | null;
      }[]
    >(processStepsQuery, { locale });

    sanitySteps = raw.map((r) => ({
      stepNumber: r.stepNumber ?? "",
      title: r.title ?? "",
      description: r.description ?? "",
      durationLabel: r.durationLabel ?? "",
    }));
  } catch {
    // Sanity erişilemez → AboutProcess local data'yı kullanır
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
      // largeSrc opsiyonel — null ise undefined bırak, bileşen koşullu render yapar
      ...(r.largeSrc && {
        largeSrc: urlFor(r.largeSrc).width(800).height(800).auto("format").url(),
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
        // titleLines tuple garantisi: eksik ya da tek elemanlıysa boş string doldur
        titleLines: [
          p.titleLines?.[0] ?? "",
          p.titleLines?.[1] ?? "",
        ] as [string, string],
        bgImageSrc: urlFor(p.bgImageSrc!).width(1920).height(1280).auto("format").url(),
        cardImageSrc: urlFor(p.cardImageSrc!).width(700).height(700).auto("format").url(),
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
        slug: { current: string } | null;
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
      slug: p.slug?.current ?? "",
      categories: p.categories ?? [],
      readTime: p.readTime ?? "",
      author: p.author ?? "",
      date: p.date ?? "",
      excerpt: p.excerpt ?? "",
      href: p.slug?.current ? `/blog/${p.slug.current}` : (p.href ?? "/blog-article"),
      cursorImageSrc: p.cursorImageSrc
        ? urlFor(p.cursorImageSrc).width(500).height(500).auto("format").url()
        : "",
      ...(p.coverImage && {
        coverImage: urlFor(p.coverImage).width(500).height(500).auto("format").url(),
      }),
    }));
  } catch {
    // Sanity erişilemez → BlogPreview local data'ya döner
  }

  // --- services ---
  let sanityItems: ServiceListItem[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        number: string;
        title: string;
        description: string;
        cursorImageSrc: Parameters<typeof urlFor>[0] | null;
        href: string;
      }[]
    >(servicesQuery, { locale });

    sanityItems = raw.map((s) => ({
      _id: s._id,
      number: s.number,
      title: s.title,
      description: s.description,
      cursorImageSrc: s.cursorImageSrc
        ? urlFor(s.cursorImageSrc).width(500).height(500).auto("format").url()
        : "",
      href: s.href,
    }));
  } catch {
    // Sanity erişilemez → ServicesList kendi local data'sını kullanır
  }

  return (
    <>
      <>
        {/* socials → Sanity'den gelir; boşsa Hero local data'ya döner */}
        <Hero socials={sanitySettings?.socials} heroSettings={sanityHero} />
        <AboutProcess steps={sanitySteps} />
        <ProjectsShowcase projects={sanityProjects} />
        <ServicesList items={sanityItems} />
        <ParallaxDividerVideo />
        <TestimonialsSticky testimonials={sanityTestimonials} />
        <ParallaxDividerImage />
        <BlogPreview posts={sanityPosts} />
        <Divider />
      </>
      {/* settings → Sanity'den gelir; boşsa Footer3 local data'ya döner */}
      <Footer3 settings={sanitySettings} />
    </>
  );
}
