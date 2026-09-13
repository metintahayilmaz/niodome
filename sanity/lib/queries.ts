import { groq } from "next-sanity";

/**
 * Tüm service dokümanlarını "number" alanına göre artan sırada çeker.
 * $locale: "tr" | "en" — coalesce ile fallback.
 */
export const servicesQuery = groq`
  *[_type == "service"] | order(number asc) {
    _id,
    number,
    "title": coalesce(title[$locale], title.tr),
    "description": coalesce(description[$locale], description.tr),
    cursorImageSrc,
    href
  }
`;

/**
 * AboutProcess adımlarını stepNumber'a göre artan sırada çeker.
 */
export const processStepsQuery = groq`
  *[_type == "processStep"] | order(stepNumber asc) {
    stepNumber,
    "title": coalesce(title[$locale], title.tr),
    "description": coalesce(description[$locale], description.tr),
    "durationLabel": coalesce(durationLabel[$locale], durationLabel.tr)
  }
`;

/**
 * Sticky testimonials için 5 kart çeker.
 */
export const stickyTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) [0..4] {
    name,
    "rolePrefix": coalesce(rolePrefix[$locale], rolePrefix.tr),
    companyName,
    "descriptionLead": coalesce(descriptionLead[$locale], descriptionLead.tr),
    "descriptionSpan": coalesce(descriptionSpan[$locale], descriptionSpan.tr),
    photoSrc,
    "photoAlt": coalesce(photoAlt[$locale], photoAlt.tr),
    largeSrc,
    "largeAlt": coalesce(largeAlt[$locale], largeAlt.tr)
  }
`;

/**
 * ProjectShowcase için proje dokümanlarını çeker.
 */
export const projectsShowcaseQuery = groq`
  *[_type == "project" && defined(bgImageSrc) && defined(cardImageSrc)] | order(order asc, _createdAt asc) {
    _id,
    "titleLines": coalesce(titleLines[$locale], titleLines.tr),
    bgImageSrc,
    cardImageSrc,
    "cardImageAlt": coalesce(cardImageAlt[$locale], cardImageAlt.tr),
    "cursorText": coalesce(cursorText[$locale], cursorText.tr),
    href,
    "slug": coalesce(slug_en.current, slug.current),
    "tags": coalesce(tags[$locale], tags.tr)
  }
`;

/**
 * ProjectsStack bileşeni için imageSrc dolu projeleri çeker (stack view).
 */
export const projectsStackQuery = groq`
  *[_type == "project" && defined(imageSrc)] | order(_createdAt asc) {
    _id,
    "title": coalesce(title[$locale], title.tr),
    imageSrc,
    "imageAlt": coalesce(imageAlt[$locale], imageAlt.tr),
    coverClassName,
    "tags": coalesce(tags[$locale], tags.tr),
    href,
    "slug": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * ProjectsList bileşeni için tüm projeleri çeker (archive/list view).
 */
export const projectsListQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt asc) {
    _id,
    "titleLines": coalesce(titleLines[$locale], titleLines.tr),
    cardImageSrc,
    href,
    "slug": coalesce(slug_en.current, slug.current),
    "tags": coalesce(tags[$locale], tags.tr)
  }
`;

/**
 * Grid showcase bileşenleri için tüm projeleri çeker.
 */
export const projectsGridQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt asc) {
    _id,
    "title": coalesce(title[$locale], title.tr),
    href,
    "slug": coalesce(slug_en.current, slug.current),
    "cursorText": coalesce(cursorText[$locale], cursorText.tr),
    "tags": coalesce(tags[$locale], tags.tr)
  }
`;

/**
 * BlogPreview için en yeni 2 yazıyı çeker (date desc).
 */
export const postsPreviewQuery = groq`
  *[_type == "post"] | order(date desc) [0..1] {
    _id,
    "title": coalesce(title[$locale], title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "categories": coalesce(categories[$locale], categories.tr),
    "readTime": coalesce(readTime[$locale], readTime.tr),
    author,
    date,
    "excerpt": coalesce(excerpt[$locale], excerpt.tr),
    coverImage,
    cursorImageSrc,
    href
  }
`;

/**
 * generateStaticParams için tüm post slug'larını çeker.
 * Locale gerekmez — slug_en boşsa TR slug döner.
 */
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Sitemap için post slug'larını çeker — TR ve EN ayrı ayrı.
 * EN boşsa TR slug kullanılır (aynı path, farklı locale prefix).
 */
export const postSlugsSitemapQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "tr": slug.current,
    "en": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Tek bir post'u slug'a göre çeker (dinamik detay sayfası).
 * body: locale'e göre bodyTr veya bodyEn; bodyEn boşsa bodyTr fallback.
 */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "categories": coalesce(categories[$locale], categories.tr),
    "readTime": coalesce(readTime[$locale], readTime.tr),
    author,
    date,
    "excerpt": coalesce(excerpt[$locale], excerpt.tr),
    coverImage,
    cursorImageSrc,
    "body": coalesce(select($locale == "en" && count(bodyEn) > 0 => bodyEn), bodyTr)
  }
`;

/**
 * Blog liste sayfaları için tüm yazıları çeker (date desc, limit yok).
 */
export const postsListQuery = groq`
  *[_type == "post"] | order(date desc) {
    _id,
    "title": coalesce(title[$locale], title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "categories": coalesce(categories[$locale], categories.tr),
    "readTime": coalesce(readTime[$locale], readTime.tr),
    author,
    date,
    "excerpt": coalesce(excerpt[$locale], excerpt.tr),
    coverImage,
    cursorImageSrc,
    href
  }
`;

/**
 * heroSettings singleton dokümanını çeker.
 */
export const heroSettingsQuery = groq`
  *[_type == "heroSettings"][0] {
    "headline": coalesce(headline[$locale], headline.tr),
    "subline": coalesce(subline[$locale], subline.tr),
    "scrollLabel": coalesce(scrollLabel[$locale], scrollLabel.tr),
    coverImage {
      src,
      "alt": coalesce(alt[$locale], alt.tr),
      "assetWidth": src.asset->metadata.dimensions.width,
      "assetHeight": src.asset->metadata.dimensions.height,
      width,
      height
    },
    backgroundVideo {
      poster,
      sources[] { src, type }
    },
    galleryImages[] {
      _key,
      src,
      "alt": coalesce(alt[$locale], alt.tr),
      "assetWidth": src.asset->metadata.dimensions.width,
      "assetHeight": src.asset->metadata.dimensions.height,
      width,
      height,
      href
    }
  }
`;

/**
 * siteSettings singleton dokümanını çeker.
 */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    logotype,
    logoImage,
    email,
    emailHref,
    phone,
    phoneHref,
    address,
    "copyrightText": coalesce(copyrightText[$locale], copyrightText.tr),
    navLinks[] { "label": coalesce(label[$locale], label.tr), href },
    socials[]  { label, href }
  }
`;

/**
 * teamMember dokümanlarını "order" alanına göre artan sırada çeker.
 */
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    "role": coalesce(role[$locale], role.tr),
    photo,
    "socials": socials[] {
      platform,
      href
    }
  }
`;

/**
 * serviceDetail dokümanlarını "order" alanına göre artan sırada çeker.
 * body: locale'e göre bodyTr veya bodyEn; bodyEn boşsa bodyTr fallback.
 */
export const serviceDetailsQuery = groq`
  *[_type == "serviceDetail"] | order(order asc) {
    _id,
    "title": coalesce(title[$locale], title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.tr),
    "body": coalesce(select($locale == "en" && count(bodyEn) > 0 => bodyEn), bodyTr),
    "tagsColA": coalesce(tagsColA[$locale], tagsColA.tr),
    "tagsColB": coalesce(tagsColB[$locale], tagsColB.tr),
    image,
    order
  }
`;

/**
 * generateStaticParams için slug tanımlı tüm project dokümanlarını çeker.
 */
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Sitemap için project slug'larını çeker — TR ve EN ayrı ayrı.
 */
export const projectSlugsSitemapQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "tr": slug.current,
    "en": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Tam vaka çalışması — /works/[slug] dinamik rotası için tek proje çeker.
 */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    bgImageSrc,
    "subtitle": coalesce(subtitle[$locale], subtitle.tr),
    "tagsColA": coalesce(tagsColA[$locale], tagsColA.tr),
    "tagsColB": coalesce(tagsColB[$locale], tagsColB.tr),
    "overviewLead": coalesce(overviewLead[$locale], overviewLead.tr),
    "overviewSpan": coalesce(overviewSpan[$locale], overviewSpan.tr),
    liveUrl,
    clientName,
    "industries": coalesce(industries[$locale], industries.tr),
    projectDate,
    "challengeLead": coalesce(challengeLead[$locale], challengeLead.tr),
    "challengeSpan": coalesce(challengeSpan[$locale], challengeSpan.tr),
    "services": services[] {
      "name": coalesce(name[$locale], name.tr),
      "description": coalesce(description[$locale], description.tr)
    },
    "solutionLead": coalesce(solutionLead[$locale], solutionLead.tr),
    "solutionSpan": coalesce(solutionSpan[$locale], solutionSpan.tr),
    "techStack": techStack[] {
      name,
      "description": coalesce(description[$locale], description.tr)
    },
    "galleryImages": galleryImages[],
    "feedbackQuoteLead": coalesce(feedbackQuoteLead[$locale], feedbackQuoteLead.tr),
    "feedbackQuoteSpan": coalesce(feedbackQuoteSpan[$locale], feedbackQuoteSpan.tr),
    feedbackAuthorName,
    "feedbackAuthorRole": coalesce(feedbackAuthorRole[$locale], feedbackAuthorRole.tr),
    feedbackAuthorCompany,
    feedbackAuthorCompanyUrl,
    feedbackAuthorPhoto,
    order,
    "nextProject": *[_type == "project" && order == ^.order + 1 && defined(slug.current)][0] {
      "slug": coalesce(slug_en.current, slug.current),
      "title": coalesce(title[$locale], title.tr),
      "imageSrc": bgImageSrc,
      "cursorText": coalesce(cursorText[$locale], cursorText.tr)
    }
  }
`;
