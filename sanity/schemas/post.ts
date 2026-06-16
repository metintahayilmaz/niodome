import { defineField, defineType } from "sanity";
import { localeString, localeText, localeStringArray } from "../lib/localeHelpers";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    localeString("title", "Title"),
    defineField({
      name: "slug",
      title: "Slug (TR)",
      type: "slug",
      options: { source: "title.tr", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug_en",
      title: "Slug (EN)",
      description: "İngilizce URL için — boş bırakılırsa TR slug kullanılır",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
    }),
    localeStringArray("categories", "Categories"),
    localeString("readTime", "Read Time"),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Yayın tarihi — takvimden seçilir, sıralama bu alana göre yapılır.",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
    localeText("excerpt", "Excerpt"),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cursorImageSrc",
      title: "Cursor Hover Image",
      description: "Üzerine gelinince gösterilen görsel (önerilen: 500×500)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "href",
      title: "Link (href)",
      description: "Yazı detay sayfası yolu",
      type: "string",
    }),
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
      description: "Tam yazı içeriği (Türkçe)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bodyEn",
      title: "Body — English",
      description: "Full post content (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.tr", subtitle: "author", media: "coverImage" },
  },
});
