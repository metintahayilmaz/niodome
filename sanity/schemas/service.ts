import { defineField, defineType } from "sanity";
import { localeString, localeText } from "../lib/localeHelpers";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number",
      description: 'Sıra etiketi, örn. "[01]"',
      type: "string",
      validation: (r) => r.required(),
    }),
    localeString("title", "Title"),
    localeText("description", "Description"),
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
      description: "Tıklanınca gidilecek yol, örn. /services",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Number",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.tr", subtitle: "number" },
  },
});
