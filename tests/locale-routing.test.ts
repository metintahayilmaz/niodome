import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import middleware from "../proxy";
import { browserLocale } from "../i18n/browserLocale";
import { localizeHref } from "../i18n/localizeHref";
import { formatPostDate } from "../lib/formatPostDate";



test("Turkish browsers open Turkish; all other primary languages open English", () => {
  for (const language of ["tr-TR,tr;q=0.9,en;q=0.8", "en-US,en;q=0.9", "de-DE,de;q=0.9", "fr-FR,tr;q=0.5"]) {
    const response = middleware(new NextRequest("https://niodome.com/", {
      headers: { "accept-language": language },
    }));
    if (language.startsWith("tr")) {
      assert.equal(response.headers.get("location"), null);
      assert.equal(new URL(response.headers.get("x-middleware-rewrite")!).pathname, "/tr");
    } else {
      assert.equal(new URL(response.headers.get("location")!).pathname, "/en");
    }
  }
});

test("manual language choices override browser preferences", () => {
  for (const [cookie, language, redirect] of [["tr", "en-US", null], ["en", "tr-TR", "/en"]]) {
    const response = middleware(new NextRequest("https://niodome.com/", {
      headers: { "accept-language": language!, cookie: `NEXT_LOCALE=${cookie}` },
    }));
    const actual = response.headers.get("location");
    assert.equal(actual ? new URL(actual).pathname : null, redirect);
  }
});

test("browser language detection respects priorities and Turkish regional variants", () => {
  assert.equal(browserLocale("en;q=0.5,tr-TR;q=0.9"), "tr");
  assert.equal(browserLocale("de-DE,tr;q=0.8"), "en");
  assert.equal(browserLocale("tr;q=0,en;q=0.8"), "en");
  assert.equal(browserLocale(null), "en");
});

test("explicit language URLs keep the requested page and language", () => {
  for (const [path, rewrite] of [["/en", "/en"], ["/hakkimizda", "/tr/about-us"], ["/en/about-us", "/en/about-us"]]) {
    const response = middleware(new NextRequest(`https://niodome.com${path}`, {
      headers: { "accept-language": "tr-TR" },
    }));
    assert.equal(response.headers.get("location"), null, path);
    const actual = response.headers.get("x-middleware-rewrite");
    assert.equal(actual ? new URL(actual).pathname : path, rewrite);
  }
});

test("language links preserve localized pages, article slugs and URL suffixes", () => {
  assert.equal(localizeHref("/hakkimizda", "en"), "/en/about-us");
  assert.equal(localizeHref("/en/about-us", "tr"), "/hakkimizda");
  assert.equal(localizeHref("/", "en"), "/en");
  assert.equal(localizeHref("/en", "tr"), "/");
  assert.equal(localizeHref("/en/works/example?from=menu#details", "tr"), "/calismalar/example?from=menu#details");
  assert.equal(localizeHref("/blog/example", "en"), "/en/blog/example");
});

test("Turkish and English article dates use the correct month names", () => {
  assert.equal(formatPostDate("2026-11-07", "tr"), "7 Kasım 2026");
  assert.equal(formatPostDate("2026-11-07", "en"), "7 November 2026");
  assert.equal(formatPostDate("", "tr"), "");
});


test("retained template pages are not indexed in either language", () => {
  for (const path of ["/pricing", "/en/pricing", "/tr/team/", "/en/index-digital-agency", "/blog-article", "/en/project-details", "/preview"]) {
    const response = middleware(new NextRequest(`https://niodome.com${path}`, {headers: {"accept-language": "tr"}}));
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex, follow", path);
  }
});

test("published pages and real case studies remain indexable", () => {
  for (const path of ["/", "/en", "/hakkimizda", "/en/about-us", "/hizmetler", "/iletisim", "/calismalar/just-waffle", "/en/works/noema", "/blog/pricing", "/en/blog/team"]) {
    const response = middleware(new NextRequest(`https://niodome.com${path}`, {headers: {"accept-language": "tr"}}));
    assert.equal(response.headers.get("X-Robots-Tag"), null, path);
  }
});

test("preview deployments retain the stronger indexing restriction", () => {
  for (const path of ["/", "/en/pricing", "/en/works/noema"]) {
    const response = middleware(new NextRequest(`https://preview.vercel.app${path}`));
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow", path);
  }
});

test("marketing pages keep their language and selected enquiry across localized links", () => {
  assert.equal(localizeHref("/social-media#plans", "tr"), "/sosyal-medya#plans");
  assert.equal(localizeHref("/sosyal-medya#plans", "en"), "/en/social-media#plans");
  assert.equal(localizeHref("/google-ads", "en"), "/en/google-ads");
  assert.equal(localizeHref("/contact?service=social&plan=social-start", "tr"), "/iletisim?service=social&plan=social-start");
  assert.equal(localizeHref("/iletisim?service=google&plan=google-growth", "en"), "/en/contact?service=google&plan=google-growth");
  for (const [path, expected] of [["/sosyal-medya", "/tr/social-media"], ["/google-ads", "/tr/google-ads"], ["/en/social-media", "/en/social-media"], ["/en/google-ads", "/en/google-ads"]]) {
    const response = middleware(new NextRequest(`https://niodome.com${path}`, { headers: { "accept-language": "tr" } }));
    assert.equal(response.headers.get("location"), null, path);
    const rewrite = response.headers.get("x-middleware-rewrite");
    assert.equal(rewrite ? new URL(rewrite).pathname : path, expected);
  }
});

test("digital advertising links preserve language and platform enquiry", () => {
  assert.equal(localizeHref("/digital-advertising#platforms", "tr"), "/dijital-reklam-yonetimi#platforms");
  assert.equal(localizeHref("/dijital-reklam-yonetimi", "en"), "/en/digital-advertising");
  assert.equal(localizeHref("/contact?service=advertising&platform=meta", "tr"), "/iletisim?service=advertising&platform=meta");
  assert.equal(localizeHref("/iletisim?service=advertising&platform=linkedin", "en"), "/en/contact?service=advertising&platform=linkedin");
  for (const [path, expected] of [["/dijital-reklam-yonetimi", "/tr/digital-advertising"], ["/en/digital-advertising", "/en/digital-advertising"]]) {
    const response = middleware(new NextRequest(`https://niodome.com${path}`, {headers:{"accept-language":"tr"}}));
    assert.equal(response.headers.get("location"), null);
    const rewrite = response.headers.get("x-middleware-rewrite");
    assert.equal(rewrite ? new URL(rewrite).pathname : path, expected);
  }
});
