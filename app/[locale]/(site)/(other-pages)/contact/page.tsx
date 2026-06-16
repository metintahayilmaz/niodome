import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import InnerHeadline from "@/components/other-pages/contact/InnerHeadline";
import Socials from "@/components/other-pages/contact/Socials";
import ParallaxDividerImage from "@/components/other-pages/contact/ParallaxDividerImage";
import SectionTitle from "@/components/other-pages/contact/SectionTitle";
import CTAWithMarquee from "@/components/other-pages/contact/CTAWithMarquee";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettingsData } from "@/types/siteSettings";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const trUrl = `${SITE_URL}/iletisim`;
  const enUrl = `${SITE_URL}/en/contact`;
  const canonical = locale === "en" ? enUrl : trUrl;
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    openGraph: {
      title: `${t("contact.title")} — Niodome`,
      description: t("contact.description"),
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

export default async function ContactPage() {
  // siteSettings → Sanity'den çek; hata olursa undefined → bileşenler local data'ya döner
  let sanitySettings: SiteSettingsData | undefined;
  try {
    const raw = await client.fetch<{
      email: string | null;
      emailHref: string | null;
      phone: string | null;
      phoneHref: string | null;
      address: string | null;
      socials: { label: string; href: string }[] | null;
    } | null>(siteSettingsQuery);

    if (raw) {
      sanitySettings = {
        logotype: "",
        email: raw.email ?? "",
        emailHref: raw.emailHref ?? "",
        phone: raw.phone ?? "",
        phoneHref: raw.phoneHref ?? "",
        address: raw.address ?? "",
        copyrightText: "",
        navLinks: [],
        socials: raw.socials ?? [],
      };
    }
  } catch {
    // Sanity erişilemez → bileşenler local data'ya döner
  }

  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline
          email={sanitySettings?.email}
          emailHref={sanitySettings?.emailHref}
        />
        <Socials socials={sanitySettings?.socials} />
        <ParallaxDividerImage />
        <SectionTitle
          email={sanitySettings?.email}
          emailHref={sanitySettings?.emailHref}
          phone={sanitySettings?.phone}
          phoneHref={sanitySettings?.phoneHref}
          address={sanitySettings?.address}
        />
        <CTAWithMarquee />
      </div>
    </>
  );
}
