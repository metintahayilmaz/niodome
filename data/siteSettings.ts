import type { SiteSettingsData } from "@/types/siteSettings";

export const siteSettings: SiteSettingsData = {
  logotype: "Niodome",

  email: "hello@niodome.com",
  emailHref: "mailto:hello@niodome.com?subject=Web%20Sitesinden%20Mesaj",

  phone: "+90 530 000 00 00",
  phoneHref: "tel:+905300000000",

  address: "İstanbul, Türkiye",

  copyrightText: "© Niodome. Tüm hakları saklıdır.",

  navLinks: [
    { href: "/", label: "Anasayfa" },
    { href: "/works-default", label: "Projeler" },
    { href: "/about-us", label: "Hakkımızda" },
    { href: "/services", label: "Hizmetler" },
    { href: "/contact", label: "İletişim" },
  ],

  socials: [
    { href: "https://instagram.com/niodome", label: "Instagram" },
    { href: "https://linkedin.com/company/niodome", label: "LinkedIn" },
    { href: "https://behance.net/niodome", label: "Behance" },
  ],
};
