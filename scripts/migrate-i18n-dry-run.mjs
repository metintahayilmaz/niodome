/**
 * i18n Migration — DRY-RUN (hiçbir şey yazmaz)
 * Her çevrilecek alanı { tr: mevcutDeğer, en: "" } yapar.
 * string[] → { tr: [], en: [] }
 * body (PT) → bodyTr'ye taşır, bodyEn: []
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

/** Değer zaten { tr, en } objesiyse true (idempotent kontrol) */
function isLocaleObj(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val) &&
    ("tr" in val || "en" in val);
}

/** string alanı locale objesine dönüştür */
function wrapString(val) {
  if (val === undefined || val === null) return null;         // boş → atla
  if (isLocaleObj(val)) return { SKIP: "zaten locale obje", val };
  return { tr: String(val), en: "" };
}

/** string[] alanı locale array objesine dönüştür */
function wrapStringArray(val) {
  if (val === undefined || val === null) return null;
  if (isLocaleObj(val)) return { SKIP: "zaten locale obje", val };
  if (!Array.isArray(val)) return null;
  return { tr: val, en: [] };
}

/** Portable Text array'i bodyTr'ye taşı */
function wrapBody(val) {
  if (val === undefined || val === null || (Array.isArray(val) && val.length === 0)) return null;
  return { bodyTr: val, bodyEn: [] };
}

// ─── Schema'ya göre dönüşüm planları ─────────────────────────────────────────

function planService(doc) {
  const ops = {};
  const wrap = (k) => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  };
  wrap("title");
  wrap("description");
  return ops;
}

function planProcessStep(doc) {
  const ops = {};
  ["title", "description", "durationLabel"].forEach(k => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  });
  return ops;
}

function planTestimonial(doc) {
  const ops = {};
  ["rolePrefix", "descriptionLead", "descriptionSpan", "photoAlt", "largeAlt"].forEach(k => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  });
  return ops;
}

function planTeamMember(doc) {
  const ops = {};
  const r = wrapString(doc.role);
  if (r) ops.role = r;
  return ops;
}

function planPost(doc) {
  const ops = {};
  ["title", "readTime", "excerpt"].forEach(k => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  });
  const cats = wrapStringArray(doc.categories);
  if (cats) ops.categories = cats;

  // body → bodyTr
  const bodyOp = wrapBody(doc.body);
  if (bodyOp) ops._body = bodyOp; // özel prefix: body işlemi
  return ops;
}

function planServiceDetail(doc) {
  const ops = {};
  ["title", "shortDescription"].forEach(k => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  });
  ["tagsColA", "tagsColB"].forEach(k => {
    const r = wrapStringArray(doc[k]);
    if (r) ops[k] = r;
  });

  // body → bodyTr
  const bodyOp = wrapBody(doc.body);
  if (bodyOp) ops._body = bodyOp;
  return ops;
}

function planHeroSettings(doc) {
  const ops = {};
  ["headline", "subline", "scrollLabel"].forEach(k => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  });
  // coverImage.alt
  if (doc.coverImage?.alt !== undefined && doc.coverImage?.alt !== null) {
    const r = wrapString(doc.coverImage.alt);
    if (r) ops["coverImage.alt"] = r;
  }
  // galleryImages[].alt — nested array
  if (Array.isArray(doc.galleryImages)) {
    doc.galleryImages.forEach((img, i) => {
      if (img?.alt !== undefined && img?.alt !== null) {
        const r = wrapString(img.alt);
        if (r) ops[`galleryImages[${i}].alt`] = { original: img.alt, wrapped: r };
      }
    });
  }
  return ops;
}

function planSiteSettings(doc) {
  const ops = {};
  const cr = wrapString(doc.copyrightText);
  if (cr) ops.copyrightText = cr;
  // navLinks[].label
  if (Array.isArray(doc.navLinks)) {
    doc.navLinks.forEach((link, i) => {
      if (link?.label !== undefined) {
        const r = wrapString(link.label);
        if (r) ops[`navLinks[${i}].label`] = { original: link.label, wrapped: r };
      }
    });
  }
  return ops;
}

function planProject(doc) {
  const ops = {};
  // Basit string alanlar
  ["title", "imageAlt", "cardImageAlt", "cursorText", "subtitle",
    "overviewLead", "overviewSpan", "industries",
    "challengeLead", "challengeSpan",
    "solutionLead", "solutionSpan",
    "feedbackQuoteLead", "feedbackQuoteSpan",
    "feedbackAuthorRole"].forEach(k => {
    const r = wrapString(doc[k]);
    if (r) ops[k] = r;
  });
  // Array alanlar
  ["titleLines", "tags", "tagsColA", "tagsColB"].forEach(k => {
    const r = wrapStringArray(doc[k]);
    if (r) ops[k] = r;
  });
  // services[] — nested
  if (Array.isArray(doc.services)) {
    doc.services.forEach((svc, i) => {
      const nr = wrapString(svc?.name);
      const dr = wrapString(svc?.description);
      if (nr) ops[`services[${i}].name`] = { original: svc.name, wrapped: nr };
      if (dr) ops[`services[${i}].description`] = { original: svc.description, wrapped: dr };
    });
  }
  // techStack[] — sadece description çevriliyor (name = teknoloji adı, dokunulmaz)
  if (Array.isArray(doc.techStack)) {
    doc.techStack.forEach((ts, i) => {
      const dr = wrapString(ts?.description);
      if (dr) ops[`techStack[${i}].description`] = { original: ts.description, wrapped: dr };
    });
  }
  return ops;
}

// ─── Tip → plan fonksiyonu mapping ───────────────────────────────────────────

const PLANNERS = {
  service: planService,
  processStep: planProcessStep,
  testimonial: planTestimonial,
  teamMember: planTeamMember,
  post: planPost,
  serviceDetail: planServiceDetail,
  heroSettings: planHeroSettings,
  siteSettings: planSiteSettings,
  project: planProject,
};

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  i18n DRY-RUN — YAZMA YOK, SADECE PLAN");
  console.log("═══════════════════════════════════════════════════\n");

  const docs = await client.fetch(
    `*[_type in ["service","processStep","testimonial","teamMember","post","serviceDetail","heroSettings","siteSettings","project"]] | order(_type asc)`
  );

  const stats = {
    byType: {},
    totalDocs: 0,
    totalFieldOps: 0,
    skipped: 0,
    bodyMigrations: 0,
  };

  for (const doc of docs) {
    const planner = PLANNERS[doc._type];
    if (!planner) continue;

    const plan = planner(doc);
    const keys = Object.keys(plan);
    if (keys.length === 0) {
      console.log(`[${doc._type}] ${doc._id} → dönüştürülecek alan yok (zaten boş veya migrate edilmiş)`);
      continue;
    }

    stats.totalDocs++;
    if (!stats.byType[doc._type]) stats.byType[doc._type] = { docs: 0, fields: 0 };
    stats.byType[doc._type].docs++;

    console.log(`\n[${doc._type}] ${doc._id}`);

    for (const [k, v] of Object.entries(plan)) {
      if (v && v.SKIP) {
        console.log(`  ⏭  ${k}: ${JSON.stringify(v.val)} → ATLA (zaten locale obje)`);
        stats.skipped++;
        continue;
      }

      if (k === "_body") {
        // Portable Text taşıma
        const blockCount = v.bodyTr?.length ?? 0;
        console.log(`  📄 body → bodyTr: ${blockCount} blok taşınıyor, bodyEn: []`);
        stats.bodyMigrations++;
        stats.byType[doc._type].fields++;
        stats.totalFieldOps++;
      } else if (k.includes("[") && typeof v === "object" && v.wrapped) {
        // Nested array item
        const orig = JSON.stringify(v.original).substring(0, 60);
        const wrap = JSON.stringify(v.wrapped).substring(0, 80);
        console.log(`  ↳  ${k}: ${orig} → ${wrap}`);
        stats.byType[doc._type].fields++;
        stats.totalFieldOps++;
      } else {
        // Normal alan
        const orig = typeof v.tr === "string"
          ? `"${v.tr.substring(0, 50)}${v.tr.length > 50 ? "…" : ""}"`
          : JSON.stringify(v.tr)?.substring(0, 60);
        console.log(`  ✏️  ${k}: ${orig} → { tr: ${orig}, en: "" }`);
        if (v && !v.SKIP && !Array.isArray(v.tr)) {
          // string[] wrap için farklı mesaj
        }
        if (v.tr !== undefined && Array.isArray(v.tr)) {
          const trPreview = JSON.stringify(v.tr).substring(0, 60);
          console.log(`      (string[] wrap) tr: ${trPreview}, en: []`);
        }
        stats.byType[doc._type].fields++;
        stats.totalFieldOps++;
      }
    }
  }

  // ─── ÖZET ───────────────────────────────────────────────────────────────
  console.log("\n\n═══════════════════════════════════════════════════");
  console.log("  ÖZET");
  console.log("═══════════════════════════════════════════════════");
  console.log(`Toplam işlenecek doküman : ${stats.totalDocs}`);
  console.log(`Toplam alan operasyonu   : ${stats.totalFieldOps}`);
  console.log(`body → bodyTr taşıma     : ${stats.bodyMigrations} doküman`);
  console.log(`Atlanan (zaten locale)   : ${stats.skipped}`);
  console.log("\nTip bazında:");
  for (const [type, s] of Object.entries(stats.byType)) {
    console.log(`  ${type.padEnd(14)}: ${s.docs} doküman, ${s.fields} alan operasyonu`);
  }

  console.log("\n─── DOKUNULMAYAN ALANLAR (örnekler) ───────────────");
  // Birkaç dokümanı örnek olarak logla
  const examples = await client.fetch(`*[_type == "service"][0]{number, href, cursorImageSrc}`);
  console.log("service.number:", examples?.number, "→ DOKUNULMADI (sıra kodu)");
  console.log("service.href:", examples?.href, "→ DOKUNULMADI (route path)");

  const proj = await client.fetch(`*[_type == "project"][0]{clientName, feedbackAuthorName, feedbackAuthorCompany, projectDate, slug, order, liveUrl}`);
  if (proj) {
    console.log("project.clientName:", proj.clientName, "→ DOKUNULMADI (özel isim)");
    console.log("project.feedbackAuthorName:", proj.feedbackAuthorName, "→ DOKUNULMADI (özel isim)");
    console.log("project.feedbackAuthorCompany:", proj.feedbackAuthorCompany, "→ DOKUNULMADI");
    console.log("project.projectDate:", proj.projectDate, "→ DOKUNULMADI (tarih etiketi)");
    console.log("project.slug:", JSON.stringify(proj.slug), "→ DOKUNULMADI");
    console.log("project.order:", proj.order, "→ DOKUNULMADI (sayı)");
  }

  const step = await client.fetch(`*[_type == "processStep"][0]{stepNumber}`);
  console.log("processStep.stepNumber:", step?.stepNumber, "→ DOKUNULMADI (sıra kodu)");

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  DRY-RUN TAMAMLANDI — HİÇBİR ŞEY YAZILMADI");
  console.log("═══════════════════════════════════════════════════");
}

main().catch(console.error);
