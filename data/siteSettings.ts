import type { SiteSettingsData } from "@/types/siteSettings";

export const siteSettings: SiteSettingsData = {
  logotype: "Azurio",

  email: "hello@azurio.com",
  emailHref: "mailto:hello@azurio.com?subject=Message%20from%20your%20site",

  phone: "+1 212-708-9400",
  phoneHref: "tel:+12127089400",

  address: "11 West 53 Street, New York, NY 10019",

  copyrightText: "Copyright Azurio. All rights reserved",

  navLinks: [
    { href: "/", label: "Home" },
    { href: "/works-default", label: "Works" },
    { href: "/about-us", label: "Studio" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],

  socials: [
    { href: "https://dribbble.com/", label: "Dribbble" },
    { href: "https://www.behance.net/", label: "Behance" },
    { href: "https://github.com/", label: "Github" },
    { href: "https://codepen.io/", label: "Codepen" },
    { href: "https://www.figma.com/community", label: "Figma Community" },
  ],
};
