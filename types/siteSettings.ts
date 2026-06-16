export type NavLinkItem = {
  href: string;
  label: string;
};

export type SocialLinkItem = {
  href: string;
  label: string;
};

export type SiteSettingsData = {
  logotype: string;
  /** urlFor() ile dönüştürülmüş logo görseli URL'i. Sanity'den prop olarak gelir. */
  logoImage?: string;
  /** logoImage için erişilebilirlik metni */
  logoImageAlt?: string;
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
  address: string;
  copyrightText: string;
  navLinks: NavLinkItem[];
  socials: SocialLinkItem[];
};
