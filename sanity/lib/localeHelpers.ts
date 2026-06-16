import { defineField } from "sanity";

/** { tr: string, en: string } */
export function localeString(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "tr", title: "Türkçe", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
  });
}

/** { tr: text, en: text } */
export function localeText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "tr", title: "Türkçe", type: "text" }),
      defineField({ name: "en", title: "English", type: "text" }),
    ],
  });
}

/** { tr: string[], en: string[] } — tags, categories, titleLines */
export function localeStringArray(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "tr", title: "Türkçe", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
    ],
  });
}
