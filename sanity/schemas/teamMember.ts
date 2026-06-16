import { defineField, defineType } from "sanity";
import { localeString } from "../lib/localeHelpers";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    localeString("role", "Role / Position"),
    defineField({
      name: "photo",
      title: "Photo",
      description: "800×800 portrait — hotspot ile odak noktası seçilebilir",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Küçük sayı önce gösterilir (1, 2, 3…)",
      type: "number",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              description: 'Görünen etiket — örn. "LinkedIn", "Behance", "Twitter"',
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
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
    select: { title: "name", subtitle: "role.tr" },
  },
});
