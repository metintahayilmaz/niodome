import { groq } from "next-sanity";

/**
 * Tüm service dokümanlarını "number" alanına göre artan sırada çeker.
 * $locale: "tr" | "en" — boş metin/dizilerde Türkçe alana fallback.
 */
export const servicesQuery = groq`
  *[_type == "service"] | order(number asc) {
    _id,
    number,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "description": coalesce(select(length(description[$locale]) > 0 => description[$locale]), description.tr),
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
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "description": coalesce(select(length(description[$locale]) > 0 => description[$locale]), description.tr),
    "durationLabel": coalesce(select(length(durationLabel[$locale]) > 0 => durationLabel[$locale]), durationLabel.tr)
  }
`;

/**
 * Sticky testimonials için 5 kart çeker.
 */
export const stickyTestimonialsQuery = groq`
  *[_type == "testimonial" && coalesce(isDemo, false) == false] | order(order asc) [0..4] {
    name,
    "rolePrefix": coalesce(select(length(rolePrefix[$locale]) > 0 => rolePrefix[$locale]), rolePrefix.tr),
    companyName,
    "descriptionLead": coalesce(select(length(descriptionLead[$locale]) > 0 => descriptionLead[$locale]), descriptionLead.tr),
    "descriptionSpan": coalesce(select(length(descriptionSpan[$locale]) > 0 => descriptionSpan[$locale]), descriptionSpan.tr),
    photoSrc,
    "photoAlt": coalesce(select(length(photoAlt[$locale]) > 0 => photoAlt[$locale]), photoAlt.tr),
    largeSrc,
    "largeAlt": coalesce(select(length(largeAlt[$locale]) > 0 => largeAlt[$locale]), largeAlt.tr)
  }
`;

/**
 * ProjectShowcase için proje dokümanlarını çeker.
 */
export const projectsShowcaseQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false && defined(bgImageSrc) && defined(cardImageSrc)] | order(order asc, _createdAt asc) {
    _id,
    "titleLines": coalesce(select(count(titleLines[$locale][defined(@) && @ != ""]) > 0 => titleLines[$locale]), titleLines.tr),
    bgImageSrc,
    cardImageSrc,
    "cardImageAlt": coalesce(select(length(cardImageAlt[$locale]) > 0 => cardImageAlt[$locale]), cardImageAlt.tr),
    "cursorText": coalesce(select(length(cursorText[$locale]) > 0 => cursorText[$locale]), cursorText.tr),
    href,
    "slug": coalesce(slug_en.current, slug.current),
    "tags": coalesce(select(count(tags[$locale][defined(@) && @ != ""]) > 0 => tags[$locale]), tags.tr)
  }
`;

/**
 * ProjectsStack bileşeni için imageSrc dolu projeleri çeker (stack view).
 */
export const projectsStackQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false && defined(imageSrc)] | order(order asc, _createdAt asc) {
    _id,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    imageSrc,
    "imageAlt": coalesce(select(length(imageAlt[$locale]) > 0 => imageAlt[$locale]), imageAlt.tr),
    coverClassName,
    "tags": coalesce(select(count(tags[$locale][defined(@) && @ != ""]) > 0 => tags[$locale]), tags.tr),
    href,
    "slug": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * ProjectsList bileşeni için tüm projeleri çeker (archive/list view).
 */
export const projectsListQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false] | order(order asc, _createdAt asc) {
    _id,
    "titleLines": coalesce(select(count(titleLines[$locale][defined(@) && @ != ""]) > 0 => titleLines[$locale]), titleLines.tr),
    cardImageSrc,
    href,
    "slug": coalesce(slug_en.current, slug.current),
    "tags": coalesce(select(count(tags[$locale][defined(@) && @ != ""]) > 0 => tags[$locale]), tags.tr)
  }
`;

/**
 * Grid showcase bileşenleri için tüm projeleri çeker.
 */
export const projectsGridQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false] | order(order asc, _createdAt asc) {
    _id,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    href,
    "slug": coalesce(slug_en.current, slug.current),
    "cursorText": coalesce(select(length(cursorText[$locale]) > 0 => cursorText[$locale]), cursorText.tr),
    "tags": coalesce(select(count(tags[$locale][defined(@) && @ != ""]) > 0 => tags[$locale]), tags.tr)
  }
`;

/**
 * BlogPreview için en yeni 2 yazıyı çeker (date desc).
 */
export const postsPreviewQuery = groq`
  *[_type == "post" && coalesce(isDemo, false) == false] | order(date desc) [0..1] {
    _id,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "categories": coalesce(select(count(categories[$locale][defined(@) && @ != ""]) > 0 => categories[$locale]), categories.tr),
    "readTime": coalesce(select(length(readTime[$locale]) > 0 => readTime[$locale]), readTime.tr),
    author,
    date,
    "excerpt": coalesce(select(length(excerpt[$locale]) > 0 => excerpt[$locale]), excerpt.tr),
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
  *[_type == "post" && coalesce(isDemo, false) == false && defined(slug.current)] {
    "slug": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Sitemap için post slug'larını çeker — TR ve EN ayrı ayrı.
 * EN boşsa TR slug kullanılır (aynı path, farklı locale prefix).
 */
export const postSlugsSitemapQuery = groq`
  *[_type == "post" && coalesce(isDemo, false) == false && defined(slug.current)] {
    "tr": slug.current,
    "en": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Tek bir post'u slug'a göre çeker (dinamik detay sayfası).
 * body: locale'e göre bodyTr veya bodyEn; bodyEn boşsa bodyTr fallback.
 */
export const postBySlugQuery = groq`
  *[_type == "post" && coalesce(isDemo, false) == false && slug.current == $slug][0] {
    _id,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "categories": coalesce(select(count(categories[$locale][defined(@) && @ != ""]) > 0 => categories[$locale]), categories.tr),
    "readTime": coalesce(select(length(readTime[$locale]) > 0 => readTime[$locale]), readTime.tr),
    "seoTitle": coalesce(select(length(seoTitle[$locale]) > 0 => seoTitle[$locale]), seoTitle.tr),
    "seoDescription": coalesce(select(length(seoDescription[$locale]) > 0 => seoDescription[$locale]), seoDescription.tr),
    author,
    date,
    "excerpt": coalesce(select(length(excerpt[$locale]) > 0 => excerpt[$locale]), excerpt.tr),
    coverImage,
    cursorImageSrc,
    "body": coalesce(select($locale == "en" && count(bodyEn) > 0 => bodyEn), bodyTr)
  }
`;

/**
 * Blog liste sayfaları için tüm yazıları çeker (date desc, limit yok).
 */
export const postsListQuery = groq`
  *[_type == "post" && coalesce(isDemo, false) == false] | order(date desc) {
    _id,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "categories": coalesce(select(count(categories[$locale][defined(@) && @ != ""]) > 0 => categories[$locale]), categories.tr),
    "readTime": coalesce(select(length(readTime[$locale]) > 0 => readTime[$locale]), readTime.tr),
    author,
    date,
    "excerpt": coalesce(select(length(excerpt[$locale]) > 0 => excerpt[$locale]), excerpt.tr),
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
    "headline": coalesce(select(length(headline[$locale]) > 0 => headline[$locale]), headline.tr),
    "subline": coalesce(select(length(subline[$locale]) > 0 => subline[$locale]), subline.tr),
    "scrollLabel": coalesce(select(length(scrollLabel[$locale]) > 0 => scrollLabel[$locale]), scrollLabel.tr),
    coverImage {
      src,
      "alt": coalesce(select(length(alt[$locale]) > 0 => alt[$locale]), alt.tr),
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
      "alt": coalesce(select(length(alt[$locale]) > 0 => alt[$locale]), alt.tr),
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
    "copyrightText": coalesce(select(length(copyrightText[$locale]) > 0 => copyrightText[$locale]), copyrightText.tr),
    navLinks[] { "label": coalesce(select(length(label[$locale]) > 0 => label[$locale]), label.tr), href },
    socials[]  { label, href }
  }
`;

/**
 * teamMember dokümanlarını "order" alanına göre artan sırada çeker.
 */
export const teamMembersQuery = groq`
  *[_type == "teamMember" && coalesce(isDemo, false) == false] | order(order asc) {
    _id,
    name,
    "role": coalesce(select(length(role[$locale]) > 0 => role[$locale]), role.tr),
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
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    "shortDescription": coalesce(select(length(shortDescription[$locale]) > 0 => shortDescription[$locale]), shortDescription.tr),
    "body": coalesce(select($locale == "en" && count(bodyEn) > 0 => bodyEn), bodyTr),
    "tagsColA": coalesce(select(count(tagsColA[$locale][defined(@) && @ != ""]) > 0 => tagsColA[$locale]), tagsColA.tr),
    "tagsColB": coalesce(select(count(tagsColB[$locale][defined(@) && @ != ""]) > 0 => tagsColB[$locale]), tagsColB.tr),
    image,
    order
  }
`;

/**
 * generateStaticParams için slug tanımlı tüm project dokümanlarını çeker.
 */
export const projectSlugsQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false && defined(slug.current)] {
    "slug": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Sitemap için project slug'larını çeker — TR ve EN ayrı ayrı.
 */
export const projectSlugsSitemapQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false && defined(slug.current)] {
    "tr": slug.current,
    "en": coalesce(slug_en.current, slug.current)
  }
`;

/**
 * Tam vaka çalışması — /works/[slug] dinamik rotası için tek proje çeker.
 */
export const projectBySlugQuery = groq`
  *[_type == "project" && coalesce(isDemo, false) == false && slug.current == $slug][0] {
    _id,
    "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
    "slug": coalesce(slug_en.current, slug.current),
    bgImageSrc,
    "subtitle": coalesce(select(length(subtitle[$locale]) > 0 => subtitle[$locale]), subtitle.tr),
    "tagsColA": coalesce(select(count(tagsColA[$locale][defined(@) && @ != ""]) > 0 => tagsColA[$locale]), tagsColA.tr),
    "tagsColB": coalesce(select(count(tagsColB[$locale][defined(@) && @ != ""]) > 0 => tagsColB[$locale]), tagsColB.tr),
    "overviewLead": coalesce(select(length(overviewLead[$locale]) > 0 => overviewLead[$locale]), overviewLead.tr),
    "overviewSpan": coalesce(select(length(overviewSpan[$locale]) > 0 => overviewSpan[$locale]), overviewSpan.tr),
    liveUrl,
    clientName,
    "industries": coalesce(select(length(industries[$locale]) > 0 => industries[$locale]), industries.tr),
    projectDate,
    "challengeLead": coalesce(select(length(challengeLead[$locale]) > 0 => challengeLead[$locale]), challengeLead.tr),
    "challengeSpan": coalesce(select(length(challengeSpan[$locale]) > 0 => challengeSpan[$locale]), challengeSpan.tr),
    "services": services[] {
      "name": coalesce(select(length(name[$locale]) > 0 => name[$locale]), name.tr),
      "description": coalesce(select(length(description[$locale]) > 0 => description[$locale]), description.tr)
    },
    "solutionLead": coalesce(select(length(solutionLead[$locale]) > 0 => solutionLead[$locale]), solutionLead.tr),
    "solutionSpan": coalesce(select(length(solutionSpan[$locale]) > 0 => solutionSpan[$locale]), solutionSpan.tr),
    "techStack": techStack[] {
      name,
      "description": coalesce(select(length(description[$locale]) > 0 => description[$locale]), description.tr)
    },
    "galleryImages": galleryImages[],
    "feedbackQuoteLead": coalesce(select(length(feedbackQuoteLead[$locale]) > 0 => feedbackQuoteLead[$locale]), feedbackQuoteLead.tr),
    "feedbackQuoteSpan": coalesce(select(length(feedbackQuoteSpan[$locale]) > 0 => feedbackQuoteSpan[$locale]), feedbackQuoteSpan.tr),
    feedbackApproved,
    feedbackAuthorName,
    "feedbackAuthorRole": coalesce(select(length(feedbackAuthorRole[$locale]) > 0 => feedbackAuthorRole[$locale]), feedbackAuthorRole.tr),
    feedbackAuthorCompany,
    feedbackAuthorCompanyUrl,
    feedbackAuthorPhoto,
    order,
    "nextProject": *[_type == "project" && coalesce(isDemo, false) == false && order == ^.order + 1 && defined(slug.current)][0] {
      "slug": coalesce(slug_en.current, slug.current),
      "title": coalesce(select(length(title[$locale]) > 0 => title[$locale]), title.tr),
      "imageSrc": bgImageSrc,
      "cursorText": coalesce(select(length(cursorText[$locale]) > 0 => cursorText[$locale]), cursorText.tr)
    }
  }
`;

export const verifiedStatsQuery = groq`
  *[_type == "siteSettings"][0].verifiedStats[approved == true && defined(value) && length(value) > 0] {
    _key, value,
    "label": coalesce(select(length(label[$locale]) > 0 => label[$locale]), label.tr)
  }
`;
