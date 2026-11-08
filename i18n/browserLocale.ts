import type { Locale } from "./routing";

/** Follow the browser's primary language; other languages use the English site. */
export function browserLocale(acceptLanguage: string | null): Locale {
  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map(value => {
      const [language, ...parameters] = value.trim().split(";");
      const quality = parameters.find(parameter => parameter.trim().startsWith("q="));
      return { language: language.toLowerCase(), quality: quality ? Number(quality.trim().slice(2)) : 1 };
    })
    .filter(value => value.language && value.language !== "*" && value.quality > 0 && value.quality <= 1)
    .sort((a, b) => b.quality - a.quality)[0]?.language;
  return preferred === "tr" || preferred?.startsWith("tr-") ? "tr" : "en";
}
