import { defineField, defineType } from "sanity";
import { localeString, localeText } from "../lib/localeHelpers";

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero Settings",
  type: "document",
  fields: [
    localeString("headline", "Headline"),
    localeText("subline", "Subline"),
    localeString("scrollLabel", "Scroll Label"),

    // Cover image
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        defineField({
          name: "src",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        localeString("alt", "Alt Text"),
        defineField({ name: "width", title: "Width (px)", type: "number" }),
        defineField({ name: "height", title: "Height (px)", type: "number" }),
      ],
    }),

    // Background video
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "object",
      fields: [
        defineField({
          name: "poster",
          title: "Poster Image",
          description: "Video yüklenirken gösterilen önizleme görseli",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "sources",
          title: "Video Sources",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "src",
                  title: "Video File",
                  type: "file",
                  options: { accept: "video/*" },
                }),
                defineField({
                  name: "type",
                  title: "MIME Type",
                  description: 'Örn. "video/mp4" veya "video/webm"',
                  type: "string",
                }),
              ],
              preview: {
                select: { title: "type" },
              },
            },
          ],
        }),
      ],
    }),

    // Gallery images (20 adet)
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      description: "Hero arka plan galerisindeki görseller (önerilen: 20 adet)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "src",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            localeString("alt", "Alt Text"),
            defineField({ name: "width", title: "Width (px)", type: "number" }),
            defineField({ name: "height", title: "Height (px)", type: "number" }),
            defineField({
              name: "href",
              title: "Link (href)",
              description: "Opsiyonel — yalnızca ilk görsel proje sayfasına bağlanır",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "alt.tr", media: "src" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "headline.tr" },
    prepare({ title }) {
      return { title: title ?? "Hero Settings" };
    },
  },
});
