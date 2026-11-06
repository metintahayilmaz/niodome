import { getPathname } from "./navigation";
import { routing, type Locale, type Pathnames } from "./routing";

const legacyRoutes: Record<string, string> = {
  "/works-default": "/works",
  "/blog-standard": "/blog",
};

/** Resolve CMS and template links without changing external or hash links. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const suffixIndex = href.search(/[?#]/);
  const suffix = suffixIndex < 0 ? "" : href.slice(suffixIndex);
  let path = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
  path = path.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";
  path = path.replace(/\/$/, "") || "/";
  path = legacyRoutes[path] ?? path;

  for (const [internal, localized] of Object.entries(routing.pathnames)) {
    if (internal.includes("[")) continue;
    const variants =
      typeof localized === "string"
        ? [internal, localized]
        : [internal, ...Object.values(localized)];
    if (variants.includes(path)) {
      return (
        getPathname({
          locale,
          href: internal as Exclude<Pathnames, `${string}[${string}`>,
        }) + suffix
      );
    }
  }

  const detail = path.match(/^\/(works|calismalar|blog)\/([^/]+)$/);
  if (detail) {
    const route = detail[1] === "blog" ? "/blog/[slug]" : "/works/[slug]";
    return (
      getPathname({
        locale,
        href: { pathname: route, params: { slug: detail[2] } },
      }) + suffix
    );
  }

  // Unrecognized paths may be assets or demo routes; leave them untouched.
  return href;
}
