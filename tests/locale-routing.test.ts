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
