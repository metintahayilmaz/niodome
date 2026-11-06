import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluate, parse } from "groq-js";

// Exercise the actual GROQ sent to Sanity, without credentials or content writes.
const source = readFileSync(
  new URL("../sanity/lib/queries.ts", import.meta.url),
  "utf8",
);
const queries = Object.fromEntries(
  [...source.matchAll(/export const (\w+) = groq`([\s\S]*?)`;/g)].map(
    ([, name, query]) => [name, query],
  ),
);

async function run(name, dataset, params = {}) {
  assert.ok(queries[name], `Missing query: ${name}`);
  const value = await evaluate(parse(queries[name], { params }), {
    dataset,
    params,
  });
  return value.get();
}

const post = {
  _id: "post-1",
  _type: "post",
  title: { tr: "Türkçe başlık", en: "" },
  excerpt: { tr: "Türkçe açıklama", en: "" },
  categories: { tr: ["Tasarım"], en: [] },
  slug: { current: "sample" },
  bodyTr: [{ _type: "block", children: [{ _type: "span", text: "Body" }] }],
  bodyEn: [],
};

test("every exported query parses", () => {
  assert.ok(Object.keys(queries).length >= 15);
  for (const [name, query] of Object.entries(queries)) {
    assert.doesNotThrow(() => parse(query), name);
  }
});

test("empty and missing English post fields use the populated Turkish fields", async () => {
  for (const en of ["", null, undefined]) {
    const row = { ...post, title: { tr: post.title.tr, en } };
    for (const name of ["postsListQuery", "postsPreviewQuery"]) {
      const [result] = await run(name, [row], { locale: "en" });
      assert.equal(result.title, post.title.tr);
      assert.equal(result.excerpt, post.excerpt.tr);
      assert.deepEqual(result.categories, post.categories.tr);
    }
    const result = await run("postBySlugQuery", [row], {
      locale: "en",
      slug: "sample",
    });
    assert.equal(result.title, post.title.tr);
    assert.deepEqual(result.body, post.bodyTr);
  }
});

test("populated English fields remain English and Turkish requests remain Turkish", async () => {
  const row = {
    ...post,
    title: { tr: post.title.tr, en: "English title" },
    excerpt: { tr: post.excerpt.tr, en: "English description" },
    categories: { tr: post.categories.tr, en: ["Design"] },
  };
  const [english] = await run("postsListQuery", [row], { locale: "en" });
  assert.equal(english.title, "English title");
  assert.equal(english.excerpt, "English description");
  assert.deepEqual(english.categories, ["Design"]);
  const [turkish] = await run("postsListQuery", [row], { locale: "tr" });
  assert.equal(turkish.title, post.title.tr);
});

test("empty project title/tag arrays fall back while meaningful multi-line titles are preserved", async () => {
  for (const en of [[], [""], null, undefined]) {
    const row = {
      _id: "project-1",
      _type: "project",
      bgImageSrc: { _type: "image" },
      cardImageSrc: { _type: "image" },
      titleLines: { tr: ["Noema", "Hotel"], en },
      tags: { tr: ["Marka"], en },
    };
    const [result] = await run("projectsShowcaseQuery", [row], {
      locale: "en",
    });
    assert.deepEqual(result.titleLines, row.titleLines.tr);
    assert.deepEqual(result.tags, row.tags.tr);
    row.titleLines.en = ["English title", ""];
    const [translated] = await run("projectsShowcaseQuery", [row], {
      locale: "en",
    });
    assert.deepEqual(translated.titleLines, ["English title", ""]);
  }
});

test("nested navigation labels use the same empty-value fallback", async () => {
  const result = await run(
    "siteSettingsQuery",
    [
      {
        _type: "siteSettings",
        navLinks: [{ label: { tr: "Hizmetler", en: "" }, href: "/services" }],
      },
    ],
    { locale: "en" },
  );
  assert.deepEqual(result.navLinks, [
    { label: "Hizmetler", href: "/services" },
  ]);
});

test("demo articles are absent from lists, slugs and detail routes", async () => {
  const demo = { ...post, isDemo: true };
  for (const name of [
    "postsListQuery",
    "postsPreviewQuery",
    "postSlugsQuery",
  ]) {
    if (queries[name])
      assert.deepEqual(await run(name, [demo], { locale: "en" }), []);
  }
  assert.equal(
    await run("postBySlugQuery", [demo], { locale: "en", slug: "sample" }),
    null,
  );
});
