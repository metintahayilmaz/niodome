import { defineField, defineType } from "sanity";
import { localeString, localeText, localeStringArray } from "../lib/localeHelpers";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    // ── Ortak / ProjectStackItem ─────────────────────────────────────────────
    localeString("title", "Title"),
    defineField({
      name: "imageSrc",
      title: "Main Image (Stack view)",
      description: "ProjectStackItem için ana görsel",
      type: "image",
      options: { hotspot: true },
    }),
    localeString("imageAlt", "Main Image Alt Text"),
    defineField({
      name: "coverClassName",
      title: "Cover Class Name",
      description: 'Opsiyonel CSS sınıfı, örn. "cover-darken"',
      type: "string",
    }),

    // ── ProjectShowcaseItem ──────────────────────────────────────────────────
    localeStringArray("titleLines", "Title Lines (Showcase view)"),
    defineField({
      name: "bgImageSrc",
      title: "Background Image (Showcase)",
      description: "Showcase arka plan görseli (önerilen: 1920×1280)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cardImageSrc",
      title: "Card Image (Showcase)",
      description: "Showcase kart görseli (önerilen: 700×700)",
      type: "image",
      options: { hotspot: true },
    }),
    localeString("cardImageAlt", "Card Image Alt Text"),
    localeString("cursorText", "Cursor Hover Text"),
    defineField({
      name: "href",
      title: "Link (href)",
      description: "Proje detay sayfası yolu",
      type: "string",
    }),

    // ── Ortak ────────────────────────────────────────────────────────────────
    localeStringArray("tags", "Tags"),

    // ═══════════════════════════════════════════════════════════════════════
    // ── Vaka çalışması alanları ─────────────────────────────────────────────
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "slug",
      title: "Slug (TR)",
      description: "/works/[slug] URL'i için — title.tr'den otomatik üretilebilir",
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
    defineField({
      name: "order",
      title: "Order",
      description: "Sıralama ve NextProjectLink hesaplaması için (1, 2, 3…)",
      type: "number",
    }),

    // InnerHeadline
    localeString("subtitle", "Subtitle"),
    localeStringArray("tagsColA", "Tag Column A (left)"),
    localeStringArray("tagsColB", "Tag Column B (right)"),

    // SplitList — Overview (sol)
    localeText("overviewLead", "Overview — Lead Text"),
    localeText("overviewSpan", "Overview — Span Text"),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),

    // SplitList — Project Details (sağ)
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
    }),
    localeString("industries", "Industries / Type"),
    defineField({
      name: "projectDate",
      title: "Project Date",
      description: 'Örn. "October 2025 - January 2026"',
      type: "string",
    }),

    // SplitList2 — Challenge (sol)
    localeText("challengeLead", "Challenge — Lead Text"),
    localeText("challengeSpan", "Challenge — Span Text"),

    // SplitList2 — Provided Services (sağ)
    defineField({
      name: "services",
      title: "Provided Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            localeString("name", "Service Name"),
            localeText("description", "Description"),
          ],
          preview: { select: { title: "name.tr" } },
        },
      ],
    }),

    // SplitList3 — Solution (sol)
    localeText("solutionLead", "Solution — Lead Text"),
    localeText("solutionSpan", "Solution — Span Text"),

    // SplitList3 — Tech Stack (sağ)
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Technology Name", type: "string", validation: (r) => r.required() }),
            localeText("description", "Description"),
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),

    // Galeri görselleri — 6 adet, slot sırası önemli
    defineField({
      name: "galleryImages",
      title: "Gallery Images (6 slots)",
      description: "[0] ImagesGrid geniş · [1] sol yarı · [2] sağ yarı · [3] ImagesGrid2 sol · [4] sağ · [5] geniş",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.max(6),
    }),

    // ClientSFeedback — alıntı
    localeText("feedbackQuoteLead", "Client Feedback — Quote Lead"),
    localeText("feedbackQuoteSpan", "Client Feedback — Quote Span"),

    // ClientSFeedback — yazar
    defineField({
      name: "feedbackAuthorName",
      title: "Client Feedback — Author Name",
      type: "string",
    }),
    localeString("feedbackAuthorRole", "Client Feedback — Author Role"),
    defineField({
      name: "feedbackAuthorCompany",
      title: "Client Feedback — Company Name",
      type: "string",
    }),
    defineField({
      name: "feedbackAuthorCompanyUrl",
      title: "Client Feedback — Company URL",
      type: "url",
    }),
    defineField({
      name: "feedbackAuthorPhoto",
      title: "Client Feedback — Author Photo",
      description: "300×300 yuvarlak avatar",
      type: "image",
      options: { hotspot: true },
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
    select: { title: "title.tr", media: "cardImageSrc" },
  },
});
