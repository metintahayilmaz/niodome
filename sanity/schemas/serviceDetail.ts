import { defineField, defineType } from "sanity";
import { localeString, localeText, localeStringArray } from "../lib/localeHelpers";

export const serviceDetail = defineType({
  name: "serviceDetail",
  title: "Service Detail",
  type: "document",
  fields: [
    localeString("title", "Title"),
    defineField({
      name: "slug",
      title: "Slug (TR)",
      description: "URL için — ileride /services/[slug] detay sayfasında kullanılacak",
      type: "slug",
      options: { source: "title.tr", maxLength: 96 },
    }),
    defineField({
      name: "slug_en",
      title: "Slug (EN)",
      description: "İngilizce URL için — boş bırakılırsa TR slug kullanılır",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
    }),
    localeText("shortDescription", "Short Description"),
    // Eski body alanı — migration script bodyTr'ye taşıyacak, sonra kaldırılacak
    defineField({
      name: "body",
      title: "Body (deprecated — migrasyon sonrası kaldırılacak)",
      type: "array",
      of: [{ type: "block" }],
      hidden: true,
    }),
    defineField({
      name: "bodyTr",
      title: "Body — Türkçe",
      description: "ServicesDescriptionStack uzun açıklama (Türkçe)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bodyEn",
      title: "Body — English",
      description: "ServicesDescriptionStack long description (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    localeStringArray("tagsColA", "Tags — Column A (left)"),
    localeStringArray("tagsColB", "Tags — Column B (right)"),
    defineField({
      name: "image",
      title: "Image",
      description: "1200×1300 dikey görsel — hotspot ile odak noktası seçilebilir",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Sıralama — küçük sayı önce (1, 2, 3, 4)",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Order (ascending)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.tr", subtitle: "order" },
    prepare({ title, subtitle }) {
      return { title: `${String(subtitle).padStart(2, "0")}. ${title}` };
    },
  },
});
