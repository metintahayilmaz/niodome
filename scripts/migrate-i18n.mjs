/**
 * i18n Migration — GERÇEK ÇALIŞTIRMA
 * Her çevrilecek alanı { tr: mevcutDeğer, en: "" } yapar.
 * string[] → { tr: [], en: [] }
 * body (PT) → bodyTr'ye taşır, bodyEn: [], eski body KALIR
 * slug / çevrilmeyecek alanlar → dokunulmaz
 * İdempotent: zaten { tr, en } yapısındaysa atlar.
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cwm62f5w",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: "skJLZE92DC98BVK2Otl0gm79WQ80YUEUEJUeqhclUa5DRygwHkkfuBTmLfzVD23McdOh59j43x9uzZ9w0RkMkq8fYrAgXjU1N1eklbHwPBMONN5hbPl9oHB7peP15Wh1J1TQTEyRkNRF5IDwBKmYHZGy0c2z8y2B1TqmPEje7tqtSHRHJDUf",
});

// ─── Yardımcı ────────────────────────────────────────────────────────────────

function isLocaleObj(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val) &&
    ("tr" in val || "en" in val);
}

function wrapString(val) {
  if (val === undefined || val === null) return null;
  if (isLocaleObj(val)) return null; // zaten locale, atla
  return { tr: String(val), en: "" };
}

function wrapStringArray(val) {
  if (val === undefined || val === null) return null;
  if (isLocaleObj(val)) return null; // zaten locale, atla
  if (!Array.isArray(val)) return null;
  return { tr: val, en: [] };
}

function wrapBody(val) {
  if (val === undefined || val === null || (Array.isArray(val) && val.length === 0)) return null;
  return { bodyTr: val, bodyEn: [] };
}

// ─── Patch nesnesi oluşturucu ─────────────────────────────────────────────────
// Sanity patch().set() için düz obje döner.
// Nested array item'lar için unset+set yerine tam array replace kullanılır.

function buildPatch(doc) {
  const set = {};
  const type = doc._type;

  const s = (k) => { const r = wrapString(doc[k]); if (r) set[k] = r; };
  const a = (k) => { const r = wrapStringArray(doc[k]); if (r) set[k] = r; };

  if (type === "service") {
    s("title"); s("description");
  }

  else if (type === "processStep") {
    s("title"); s("description"); s("durationLabel");
  }

  else if (type === "testimonial") {
    s("rolePrefix"); s("descriptionLead"); s("descriptionSpan");
    s("photoAlt"); s("largeAlt");
  }

  else if (type === "teamMember") {
    s("role");
  }

  else if (type === "post") {
    s("title"); s("readTime"); s("excerpt");
    a("categories");
    const b = wrapBody(doc.body);
    if (b) { set.bodyTr = b.bodyTr; set.bodyEn = b.bodyEn; }
  }

  else if (type === "serviceDetail") {
    s("title"); s("shortDescription");
    a("tagsColA"); a("tagsColB");
    const b = wrapBody(doc.body);
    if (b) { set.bodyTr = b.bodyTr; set.bodyEn = b.bodyEn; }
  }

  else if (type === "heroSettings") {
    s("headline"); s("subline"); s("scrollLabel");

    // coverImage.alt — nested obje, path ile set
    if (doc.coverImage?.alt !== undefined && doc.coverImage?.alt !== null) {
      const r = wrapString(doc.coverImage.alt);
      if (r) set["coverImage.alt"] = r;
    }

    // galleryImages[].alt — tam diziyi yeniden yaz
    if (Array.isArray(doc.galleryImages) && doc.galleryImages.length > 0) {
      const newGallery = doc.galleryImages.map((img) => {
        if (img?.alt === undefined || img?.alt === null) return img;
        const r = wrapString(img.alt);
        if (!r) return img; // zaten locale veya null
        return { ...img, alt: r };
      });
      set.galleryImages = newGallery;
    }
  }

  else if (type === "siteSettings") {
    s("copyrightText");
    // navLinks[].label — tam diziyi yeniden yaz
    if (Array.isArray(doc.navLinks) && doc.navLinks.length > 0) {
      const newLinks = doc.navLinks.map((link) => {
        if (link?.label === undefined) return link;
        const r = wrapString(link.label);
        if (!r) return link;
        return { ...link, label: r };
      });
      set.navLinks = newLinks;
    }
  }

  else if (type === "project") {
    ["title","imageAlt","cardImageAlt","cursorText","subtitle",
      "overviewLead","overviewSpan","industries",
      "challengeLead","challengeSpan",
      "solutionLead","solutionSpan",
      "feedbackQuoteLead","feedbackQuoteSpan",
      "feedbackAuthorRole"].forEach(s);
    ["titleLines","tags","tagsColA","tagsColB"].forEach(a);

    // services[] — tam diziyi yeniden yaz
    if (Array.isArray(doc.services) && doc.services.length > 0) {
      const newServices = doc.services.map((svc) => {
        const out = { ...svc };
        const nr = wrapString(svc?.name);
        if (nr) out.name = nr;
        const dr = wrapString(svc?.description);
        if (dr) out.description = dr;
        return out;
      });
      set.services = newServices;
    }

    // techStack[] — sadece description çevriliyor
    if (Array.isArray(doc.techStack) && doc.techStack.length > 0) {
      const newStack = doc.techStack.map((ts) => {
        const out = { ...ts };
        const dr = wrapString(ts?.description);
        if (dr) out.description = dr;
        return out;
      });
      set.techStack = newStack;
    }
  }

  return set;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  i18n GERÇEK MİGRATION — Sanity'ye yazılıyor");
  console.log("═══════════════════════════════════════════════════\n");

  const docs = await client.fetch(
    `*[_type in ["service","processStep","testimonial","teamMember","post","serviceDetail","heroSettings","siteSettings","project"]] | order(_type asc)`
  );

  console.log(`Toplam doküman: ${docs.length}\n`);

  let patchedDocs = 0;
  let totalFields = 0;
  let skippedDocs = 0;

  for (const doc of docs) {
    const patch = buildPatch(doc);
    const fieldCount = Object.keys(patch).length;

    if (fieldCount === 0) {
      console.log(`[${doc._type}] ${doc._id} → ATLA (dönüştürülecek alan yok)`);
      skippedDocs++;
      continue;
    }

    try {
      await client.patch(doc._id).set(patch).commit();
      console.log(`[${doc._type}] ${doc._id} → BAŞARILI (${fieldCount} alan)`);
      patchedDocs++;
      totalFields += fieldCount;
    } catch (err) {
      console.error(`[${doc._type}] ${doc._id} → HATA: ${err.message}`);
      console.error("Patch içeriği:", JSON.stringify(patch, null, 2).substring(0, 500));
      process.exit(1); // Hata varsa dur
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  SONUÇ");
  console.log("═══════════════════════════════════════════════════");
  console.log(`Patch'lenen doküman : ${patchedDocs} (dry-run beklenti: 29)`);
  console.log(`Toplam alan         : ${totalFields} (dry-run beklenti: 186)`);
  console.log(`Atlanan doküman     : ${skippedDocs}`);
}

main().catch((err) => { console.error("FATAL:", err); process.exit(1); });
