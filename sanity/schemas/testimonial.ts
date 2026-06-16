import { defineField, defineType } from "sanity";
import { localeString, localeText } from "../lib/localeHelpers";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Display Order",
      description: "Sticky testimonials layout sırası (1 = en üst).",
      type: "number",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: "name",
      title: "Name",
      description: "Müşterinin tam adı",
      type: "string",
      validation: (r) => r.required(),
    }),
    localeString("rolePrefix", "Role / Title"),
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),
    localeText("descriptionLead", "Quote — Lead"),
    localeText("descriptionSpan", "Quote — Rest"),
    defineField({
      name: "photoSrc",
      title: "Avatar Photo",
      description: "Küçük profil fotoğrafı",
      type: "image",
      options: { hotspot: true },
    }),
    localeString("photoAlt", "Avatar Photo Alt Text"),
    defineField({
      name: "largeSrc",
      title: "Large Photo (Sticky only)",
      description: "Sticky testimonials bölümünde satır aralarında gösterilen büyük görsel",
      type: "image",
      options: { hotspot: true },
    }),
    localeString("largeAlt", "Large Photo Alt Text"),
  ],
  preview: {
    select: { title: "name", subtitle: "companyName", media: "photoSrc" },
  },
});
