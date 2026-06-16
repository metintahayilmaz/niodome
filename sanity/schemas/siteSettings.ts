import { defineField, defineType } from "sanity";
import { localeString } from "../lib/localeHelpers";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logotype",
      title: "Logotype / Brand Name",
      description: "Logo görseli yüklenmediyse footer'da bu metin görünür",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      description: "Yüklenirse footer'da metin yerine bu görsel gösterilir.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Erişilebilirlik için açıklama metni",
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email (display)",
      type: "string",
    }),
    defineField({
      name: "emailHref",
      title: "Email href",
      description: "mailto:... formatında tam link",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone (display)",
      type: "string",
    }),
    defineField({
      name: "phoneHref",
      title: "Phone href",
      description: "tel:... formatında tam link",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    localeString("copyrightText", "Copyright Text"),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            localeString("label", "Label"),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
          preview: {
            select: { title: "label.tr", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href (URL)", type: "url" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "logotype" },
    prepare({ title }) {
      return { title: title ?? "Site Settings" };
    },
  },
});
