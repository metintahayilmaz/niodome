import assert from "node:assert/strict";
import test from "node:test";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "../i18n/routing";
import { localizeHref } from "../i18n/localizeHref";
import { formatPostDate } from "../lib/formatPostDate";

const middleware = createMiddleware(routing);

test("the bare address stays Turkish despite English browser and saved preferences", () => {
  const response = middleware(new NextRequest("https://niodome.com/", {
    headers: { "accept-language": "en-US,en;q=0.9", cookie: "NEXT_LOCALE=en" },
  }));
  assert.equal(response.headers.get("location"), null);
  assert.equal(new URL(response.headers.get("x-middleware-rewrite")!).pathname, "/tr");
});

test("explicit language URLs keep the requested page and language", () => {
  for (const [path, rewrite] of [["/en", "/en"], ["/hakkimizda", "/tr/about-us"], ["/en/about-us", "/en/about-us"]]) {
    const response = middleware(new NextRequest(`https://niodome.com${path}`, {
      headers: { "accept-language": "en", cookie: "NEXT_LOCALE=en" },
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
