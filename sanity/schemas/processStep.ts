import { defineField, defineType } from "sanity";
import { localeString, localeText } from "../lib/localeHelpers";

export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Step Number",
      description: 'Adım numarası, örn. "01"',
      type: "string",
      validation: (r) => r.required(),
    }),
    localeString("title", "Title"),
    localeText("description", "Description"),
    localeString("durationLabel", "Duration Label"),
  ],
  orderings: [
    {
      title: "Step Number",
      name: "stepNumberAsc",
      by: [{ field: "stepNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.tr", subtitle: "stepNumber" },
    prepare({ title, subtitle }) {
      return { title: `${subtitle}. ${title}` };
    },
  },
});
