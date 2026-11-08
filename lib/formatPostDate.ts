/** Format CMS calendar dates consistently during server rendering and hydration. */
export function formatPostDate(raw: string, locale: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const date = new Date(`${raw}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(date);
}
