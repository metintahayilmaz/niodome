import type { SiteSettingsData } from "@/types/siteSettings";

export const siteSettings: SiteSettingsData = {
  logotype: "Niodome",

  email: "hello@niodome.com",
  emailHref: "mailto:hello@niodome.com?subject=Web%20Sitesinden%20Mesaj",

  // Geçici mobil numara; sabit hat geldiğinde site ayarlarıyla birlikte güncelleyin.
  phone: "+90 533 253 25 38",
  phoneHref: "tel:+905332532538",

  address: "İstanbul, Türkiye",

  copyrightText: "© Niodome. Tüm hakları saklıdır.",

  navLinks: [
    { href: "/", label: "Anasayfa" },
    { href: "/works", label: "Projeler" },
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
