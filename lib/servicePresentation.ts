import conceptVisuals from "@/data/conceptVisuals.json";
import catalog from "@/data/serviceCatalog.json";
import details from "@/data/serviceDetails.json";
import type { ServiceDetailItem } from "@/types/serviceDetail";

const images: Record<string, string> = {
  brand: "/img/services/services-stack/s01.webp",
  communication: conceptVisuals.visuals["bir-araya-campaign"].url,
  digital: conceptVisuals.visuals["kiyi-website"].url,
  growth: "/img/services/services-stack/s03.webp",
  experience: "/img/works/project-details/details03.webp",
};
const extraTags: Record<string, { tr: string[]; en: string[] }> = {
  geo: {
    tr: [
      "Görünürlük analizi",
      "Rakip takibi",
      "İçerik ve kaynaklar",
      "Teknik iyileştirme",
      "Ölçüm ve raporlama",
    ],
    en: [
      "Visibility analysis",
      "Competitor tracking",
      "Content and sources",
      "Technical improvements",
      "Measurement and reporting",
    ],
  },
  social: {
    tr: [
      "İçerik stratejisi",
      "Yayın planı",
      "Görsel tasarım",
      "Metin ve yayın",
      "Performans takibi",
    ],
    en: [
      "Content strategy",
      "Editorial planning",
      "Visual design",
      "Copy and publishing",
      "Performance tracking",
    ],
  },
  google: {
    tr: [
      "Arama reklamları",
      "Anahtar kelimeler",
      "Kampanya yönetimi",
      "Dönüşüm ölçümü",
      "Optimizasyon",
    ],
    en: [
      "Search ads",
      "Keywords",
      "Campaign management",
      "Conversion measurement",
      "Optimisation",
    ],
  },
  advertising: {
    tr: [
      "Meta reklamları",
      "Google Ads",
      "Hedef kitle",
      "Medya bütçesi",
      "Dönüşüm ve raporlama",
    ],
    en: [
      "Meta advertising",
      "Google Ads",
      "Audience planning",
      "Media budget",
      "Conversions and reporting",
    ],
  },
};
export function servicePresentation(
  id: string,
  locale: string,
): ServiceDetailItem & { href: string } {
  const lang = locale === "en" ? "en" : "tr";
  const item = catalog.find((s) => s.id === id);
  if (!item) throw new Error(`Unknown service: ${id}`);
  const detail = details.find((s) => s.id === id);
  const tags =
    detail?.deliverables.map((d) => d[lang]) ?? extraTags[id]?.[lang] ?? [];
  const split = Math.ceil(tags.length / 2);
  const description = detail?.description[lang] ?? item.description[lang];
  return {
    _id: `service-${id}`,
    href: item.href,
    title: item.label[lang],
    slug: id,
    shortDescription: description,
    order: catalog.indexOf(item) + 1,
    tagsColA: tags.slice(0, split),
    tagsColB: tags.slice(split),
    image:
      id === "packaging"
        ? conceptVisuals.visuals["mola-packaging"].url
        : id === "ux" || id === "app"
          ? conceptVisuals.visuals["kiyi-detail"].url
          : images[item.category],
    body: [
      {
        _type: "block",
        _key: id,
        children: [{ _type: "span", text: description }],
      },
    ],
  };
}
