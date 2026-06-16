import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/about-us/InnerHeadline";
import ParallaxDividerImage from "@/components/other-pages/about-us/ParallaxDividerImage";
import Process from "@/components/other-pages/about-us/Process";
import DoubleMarqueeDivider from "@/components/other-pages/about-us/DoubleMarqueeDivider";
import Awards from "@/components/other-pages/about-us/Awards";
import TeamGrid from "@/components/other-pages/about-us/TeamGrid";
import ParallaxDividerImage2 from "@/components/other-pages/about-us/ParallaxDividerImage2";
import Approach from "@/components/other-pages/about-us/Approach";
import BlogPreview from "@/components/other-pages/about-us/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/about-us/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { processStepsQuery, postsListQuery, teamMembersQuery } from "@/sanity/lib/queries";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { ProcessStep } from "@/types/aboutProcess";
import type { PostListItem } from "@/types/blogPreview";
import type { TeamMember } from "@/types/teamMember";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const trUrl = `${SITE_URL}/hakkimizda`;
  const enUrl = `${SITE_URL}/en/about-us`;
  const canonical = locale === "en" ? enUrl : trUrl;
  return {
    title: t("aboutUs.title"),
    description: t("aboutUs.description"),
    openGraph: {
      title: `${t("aboutUs.title")} — Niodome`,
      description: t("aboutUs.description"),
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

export default async function AboutUsPage() {
  const locale = await getLocale();
  // --- team members ---
  let sanityMembers: TeamMember[] = [];
  try {
    const raw = await client.fetch<
      {
        _id: string;
        name: string | null;
        role: string | null;
        photo: Parameters<typeof urlFor>[0] | null;
        socials: { platform: string | null; href: string | null }[] | null;
      }[]
    >(teamMembersQuery, { locale });

    sanityMembers = raw.map((m) => ({
      _id: m._id,
      name: m.name ?? "",
      role: m.role ?? "",
      ...(m.photo && {
        photo: urlFor(m.photo).width(800).height(800).auto("format").url(),
      }),
      socials: (m.socials ?? [])
        .filter((s) => s.platform && s.href)
        .map((s) => ({ platform: s.platform!, href: s.href! })),
    }));
  } catch {
    // Sanity erişilemez → TeamGrid local data'ya döner
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
    // Sanity erişilemez → Process local data'ya döner
  }

  // --- blog posts (ilk 4) ---
  let sanityPosts: PostListItem[] = [];
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
    >(postsListQuery, { locale });

    sanityPosts = raw.map((p) => ({
      _id: p._id,
      title: p.title ?? "",
      slug: p.slug ?? "",
      categories: p.categories ?? [],
      readTime: p.readTime ?? "",
      author: p.author ?? "",
      date: p.date ?? "",
      excerpt: p.excerpt ?? "",
      cursorImageSrc: p.cursorImageSrc
        ? urlFor(p.cursorImageSrc).width(500).height(500).auto("format").url()
        : "",
      ...(p.coverImage && {
        coverImage: urlFor(p.coverImage).width(1170).height(800).auto("format").url(),
      }),
      href: p.slug ? `/blog/${p.slug}` : "/blog-article",
    }));
  } catch {
    // Sanity erişilemez → BlogPreview local data'ya döner
  }

  return (
    <>
      <>
        <InnerHeadline />
        <ParallaxDividerImage />
        <Process steps={sanitySteps} />
        <DoubleMarqueeDivider />
        {/* <Awards /> — ileride award şeması eklenince açılacak */}
        <TeamGrid members={sanityMembers} />
        <ParallaxDividerImage2 />
        <Approach />
        <BlogPreview posts={sanityPosts} />
        <CTAWithMarquee />
      </>
    </>
  );
}
