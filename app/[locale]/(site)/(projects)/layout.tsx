import Footer2 from "@/components/footers/Footer2";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettingsData } from "@/types/siteSettings";
import { getLocale } from "next-intl/server";

// ISR: 60 saniyede bir arka planda yeniden üretilir
export const revalidate = 60;

export default async function layout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  // siteSettings → Sanity'den çek; hata olursa Footer2 local data'ya döner
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
    // Sanity erişilemez → Footer2 local data'sını kullanır
  }

  return (
    <>
      {children}
      <Footer2 settings={sanitySettings} />
    </>
  );
}
