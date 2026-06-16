/**
 * Azurio Sanity Seed Script
 * ─────────────────────────
 * data/ klasöründeki içeriği Sanity'ye toplu aktarır.
 *
 * Çalıştır:   npm run seed
 * Gereksinim: .env.local'de SANITY_API_WRITE_TOKEN tanımlı olmalı.
 *
 * Özellikler:
 *  - siteSettings ve heroSettings → createIfNotExists (Studio'da girilmiş
 *    değerler KORUNUR; sadece doküman yoksa oluşturulur)
 *  - Diğer koleksiyonlar → createOrReplace (idempotent seed)
 *  - Testimonial sıralaması → order alanıyla garanti edilir (_createdAt'e güvenilmez)
 *  - Görsel bulunamazsa script ÇÖKMEZ — atlar, devam eder, sonunda raporlar
 *  - Upload cache: aynı dosya aynı çalışmada bir kez yüklenir
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// ── .env.local dosyasını yükle ─────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    const val = match[2].trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

// ── Sanity write client ─────────────────────────────────────────────────────
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET;
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error(
    "❌  Eksik ortam değişkeni.\n" +
    "   Gerekli: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN"
  );
  process.exit(1);
}

const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: "2025-01-01",
  token:      TOKEN,
  useCdn:     false,
});

// ── Görsel upload yardımcısı ────────────────────────────────────────────────
const uploadCache = new Map<string, string>(); // localPath → Sanity asset _id

// Upload istatistikleri
let uploadedCount  = 0;
let skippedCount   = 0;

async function uploadImage(
  localPath: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  if (!localPath) return null;

  // /img/... veya video/... → public/img/... veya public/video/...
  const stripped     = localPath.startsWith("/") ? localPath.slice(1) : localPath;
  const absolutePath = path.join(process.cwd(), "public", stripped);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`   ⚠️  Dosya bulunamadı, atlanıyor: ${stripped}`);
    skippedCount++;
    return null;   // ← çökmez, null döner
  }

  if (uploadCache.has(localPath)) {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: uploadCache.get(localPath)! },
    };
  }

  try {
    const stream   = fs.createReadStream(absolutePath);
    const filename = path.basename(absolutePath);
    const asset    = await client.assets.upload("image", stream, { filename });

    uploadCache.set(localPath, asset._id);
    uploadedCount++;
    console.log(`   📤 Yüklendi: ${filename} → ${asset._id}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.warn(`   ⚠️  Upload başarısız, atlanıyor: ${stripped}`, err);
    skippedCount++;
    return null;   // ← çökmez, null döner
  }
}

// ── Data importları ──────────────────────────────────────────────────────────
import { servicesListDigitalAgencyData }  from "../data/servicesListDigitalAgency";
import { digitalDesignerProjectsShowcase } from "../data/projects";
import { digitalAgencyStickyTestimonials } from "../data/testimonials";
import { aboutProcessDigitalAgencyData }   from "../data/aboutProcessDigitalAgency";
import { blogPreviewDigitalAgencyData }    from "../data/blogPreviewDigitalAgency";
import { siteSettings }                    from "../data/siteSettings";
import { heroDigitalAgencyData }           from "../data/heroDigitalAgency";
import { teamMembersData }                 from "../data/teamMembers";
import { serviceDetailsData }             from "../data/serviceDetails";
import { projectDetailsData }             from "../data/projectDetails";

// ── Seed fonksiyonları ──────────────────────────────────────────────────────

// ① siteSettings — createIfNotExists: Studio'da zaten varsa DOKUNMA
async function seedSiteSettings() {
  console.log("\n── siteSettings (singleton — createIfNotExists) ──");

  const existing = await client.getDocument("siteSettings");
  if (existing) {
    console.log("   ⏭  Doküman zaten var, atlanıyor (Studio değerleri korunuyor).");
    return;
  }

  const doc = {
    _id:   "siteSettings",
    _type: "siteSettings",
    logotype:      siteSettings.logotype,
    email:         siteSettings.email,
    emailHref:     siteSettings.emailHref,
    phone:         siteSettings.phone,
    phoneHref:     siteSettings.phoneHref,
    address:       siteSettings.address,
    copyrightText: siteSettings.copyrightText,
    navLinks: siteSettings.navLinks.map((l, i) => ({
      _key:  `nav-${i}`,
      label: l.label,
      href:  l.href,
    })),
    socials: siteSettings.socials.map((s, i) => ({
      _key:  `soc-${i}`,
      label: s.label,
      href:  s.href,
    })),
  };
  await client.createIfNotExists(doc);
  console.log(`   ✓ Oluşturuldu — logotype: "${siteSettings.logotype}"`);
}

async function seedServices() {
  console.log("\n── Services ──");
  for (const item of servicesListDigitalAgencyData.items) {
    const cursorImage = await uploadImage(item.cursorImageSrc);
    const doc = {
      _id:   `seed-service-${item.number.replace(/[\[\]\s]/g, "")}`,
      _type: "service",
      number:      item.number,
      title:       item.title,
      description: item.description,
      href:        item.href,
      ...(cursorImage && { cursorImageSrc: cursorImage }),
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ ${item.number} ${item.title}`);
  }
}

async function seedProjects() {
  console.log("\n── Projects (Showcase + Case Study) ──");
  for (const item of projectDetailsData) {
    const bgImage   = await uploadImage(item.bgImageSrc);
    const cardImage = await uploadImage(item.cardImageSrc);
    const feedbackPhoto = await uploadImage(item.feedbackAuthorPhoto);

    // Gallery images — upload each slot
    const galleryImages = [];
    for (let gi = 0; gi < item.galleryImages.length; gi++) {
      const uploaded = await uploadImage(item.galleryImages[gi]);
      if (uploaded) galleryImages.push({ _key: `gal-${gi}`, ...uploaded });
    }

    const doc = {
      _id:   `seed-project-${item.id}`,
      _type: "project",

      // Showcase / list alanları
      title:        item.titleLines.join(" "),
      titleLines:   item.titleLines,
      cardImageAlt: item.cardImageAlt,
      cursorText:   item.cursorText,
      href:         item.href,
      tags:         item.tags,
      ...(bgImage   && { bgImageSrc:   bgImage }),
      ...(cardImage && { cardImageSrc: cardImage }),

      // Case study alanları
      slug:         { _type: "slug", current: item.slug },
      order:        item.order,
      subtitle:     item.subtitle,
      tagsColA:     item.tagsColA,
      tagsColB:     item.tagsColB,

      overviewLead: item.overviewLead,
      overviewSpan: item.overviewSpan,
      liveUrl:      item.liveUrl,
      clientName:   item.clientName,
      industries:   item.industries,
      projectDate:  item.projectDate,

      challengeLead: item.challengeLead,
      challengeSpan: item.challengeSpan,
      services: item.services.map((s, si) => ({ _key: `svc-${si}`, ...s })),

      solutionLead: item.solutionLead,
      solutionSpan: item.solutionSpan,
      techStack: item.techStack.map((t, ti) => ({ _key: `tch-${ti}`, ...t })),

      ...(galleryImages.length > 0 && { galleryImages }),

      feedbackQuoteLead:       item.feedbackQuoteLead,
      feedbackQuoteSpan:       item.feedbackQuoteSpan,
      feedbackAuthorName:      item.feedbackAuthorName,
      feedbackAuthorRole:      item.feedbackAuthorRole,
      feedbackAuthorCompany:   item.feedbackAuthorCompany,
      feedbackAuthorCompanyUrl: item.feedbackAuthorCompanyUrl,
      ...(feedbackPhoto && { feedbackAuthorPhoto: feedbackPhoto }),
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ [${item.order}] ${item.titleLines.join(" / ")} — slug: ${item.slug}`);
  }
}

// ② Testimonials — sıralama garantisi için "order" alanı eklendi
//    Query: order(order asc) ile çekilecek (queries.ts güncellendi)
async function seedTestimonials() {
  console.log("\n── Testimonials (Sticky) ──");
  for (let i = 0; i < digitalAgencyStickyTestimonials.length; i++) {
    const item  = digitalAgencyStickyTestimonials[i];
    const photo = await uploadImage(item.photoSrc);
    const large = item.largeSrc ? await uploadImage(item.largeSrc) : null;
    const doc = {
      _id:   `seed-testimonial-${item.id}`,
      _type: "testimonial",
      order:           i + 1,          // ← sıralama garantisi (1-5)
      name:            item.name,
      rolePrefix:      item.rolePrefix,
      companyName:     item.companyName,
      descriptionLead: item.descriptionLead,
      descriptionSpan: item.descriptionSpan,
      photoAlt:        item.photoAlt,
      ...(photo && { photoSrc: photo }),
      ...(large && { largeSrc: large, largeAlt: item.largeAlt ?? "" }),
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ [${i + 1}] ${item.name}`);
  }
}

async function seedProcessSteps() {
  console.log("\n── Process Steps ──");
  for (const step of aboutProcessDigitalAgencyData.steps) {
    const doc = {
      _id:   `seed-processstep-${step.stepNumber}`,
      _type: "processStep",
      stepNumber:    step.stepNumber,
      title:         step.title,
      description:   step.description,
      durationLabel: step.durationLabel,
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ ${step.stepNumber} ${step.title}`);
  }
}

/**
 * "02 February, 2026" veya "28 January, 2026" gibi string tarihleri
 * Sanity "date" tipi için gereken "YYYY-MM-DD" formatına çevirir.
 * Zaten ISO formatındaysa (YYYY-MM-DD) olduğu gibi döndürür.
 */
function toIsoDate(raw: string): string {
  // Zaten ISO formatındaysa değiştirme
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // new Date() → UTC'ye çevirince off-by-1 gün oluşur.
  // Çözüm: tarihi UTC midnight olarak ayrıştır.
  const parsed = new Date(raw + " UTC");
  if (isNaN(parsed.getTime())) {
    console.warn(`   ⚠️  Tarih ayrıştırılamadı, olduğu gibi bırakıldı: "${raw}"`);
    return raw;
  }
  return parsed.toISOString().slice(0, 10);
}

async function seedPosts() {
  console.log("\n── Posts ──");
  for (const item of blogPreviewDigitalAgencyData.items) {
    const cover  = item.coverImage     ? await uploadImage(item.coverImage)     : null;
    const cursor = item.cursorImageSrc ? await uploadImage(item.cursorImageSrc) : null;
    const isoDate = toIsoDate(item.date);
    const doc = {
      _id:   `seed-post-${item.slug}`,
      _type: "post",
      title:      item.title,
      slug:       { _type: "slug", current: item.slug },
      categories: item.categories,
      readTime:   item.readTime,
      author:     item.author,
      date:       isoDate,          // ← "YYYY-MM-DD" — Sanity date tipiyle uyumlu
      excerpt:    item.excerpt,
      href:       item.href,
      ...(cover  && { coverImage:     cover }),
      ...(cursor && { cursorImageSrc: cursor }),
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ ${item.title}`);
  }
}

async function seedTeamMembers() {
  console.log("\n── Team Members ──");
  for (const member of teamMembersData) {
    const photo = await uploadImage(member.photo);
    const doc = {
      _id:   `seed-teammember-${member.id}`,
      _type: "teamMember",
      name:    member.name,
      role:    member.role,
      order:   member.order,
      socials: member.socials.map((s, i) => ({
        _key:     `soc-${i}`,
        platform: s.platform,
        href:     s.href,
      })),
      ...(photo && { photo }),
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ [${member.order}] ${member.name}`);
  }
}

async function seedServiceDetails() {
  console.log("\n── Service Details ──");
  for (const item of serviceDetailsData) {
    const img = await uploadImage(item.image);
    const doc = {
      _id:   `seed-servicedetail-${item.id}`,
      _type: "serviceDetail",
      title:            item.title,
      slug:             { _type: "slug", current: item.slug },
      shortDescription: item.shortDescription,
      body:             item.body,
      tagsColA:         item.tagsColA,
      tagsColB:         item.tagsColB,
      order:            item.order,
      ...(img && { image: img }),
    };
    await client.createOrReplace(doc);
    console.log(`   ✓ [${item.order}] ${item.title}`);
  }
}

// ③ heroSettings — createIfNotExists: Studio'da zaten varsa DOKUNMA
async function seedHeroSettings() {
  console.log("\n── heroSettings (singleton — createIfNotExists) ──");

  const existing = await client.getDocument("heroSettings");
  if (existing) {
    console.log("   ⏭  Doküman zaten var, atlanıyor (Studio değerleri korunuyor).");
    return;
  }

  const d = heroDigitalAgencyData;

  const coverImg  = await uploadImage(d.coverImage.src);
  const posterImg = await uploadImage(d.backgroundVideo.poster);

  // NOT: Video source dosyaları (mp4/webm) bu script'e dahil edilmedi.
  // Büyük dosyalar olduğundan Studio üzerinden manuel eklenebilir.

  const allGalleryImgs = d.galleryImages;
  console.log(`   Galeri: ${allGalleryImgs.length} görsel yüklenecek…`);

  const galleryImages = [];
  for (let i = 0; i < allGalleryImgs.length; i++) {
    const img      = allGalleryImgs[i];
    const uploaded = await uploadImage(img.src);
    galleryImages.push({
      _key:   `gal-${i}`,
      alt:    img.alt,
      width:  img.width,
      height: img.height,
      ...(img.href && { href: img.href }),
      ...(uploaded && { src: uploaded }),
    });
  }

  const doc = {
    _id:   "heroSettings",
    _type: "heroSettings",
    headline:    d.headline,
    subline:     d.subline,
    scrollLabel: d.scrollLabel,
    ...(coverImg && {
      coverImage: {
        src:    coverImg,
        alt:    d.coverImage.alt,
        width:  d.coverImage.width,
        height: d.coverImage.height,
      },
    }),
    backgroundVideo: {
      ...(posterImg && { poster: posterImg }),
      // sources: video dosyaları bu seed'e dahil değil
    },
    galleryImages,
  };
  await client.createIfNotExists(doc);
  console.log(`   ✓ headline: "${d.headline}"`);
  console.log(`   ✓ ${galleryImages.length} galeri görseli eklendi`);
}

// ── Ana yürütücü ────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🌱  Azurio Sanity Seed`);
  console.log(`   Project: ${PROJECT_ID}  Dataset: ${DATASET}\n`);

  try {
    await seedSiteSettings();
    await seedServices();
    await seedProjects();
    await seedTestimonials();
    await seedProcessSteps();
    await seedPosts();
    await seedTeamMembers();
    await seedServiceDetails();
    await seedHeroSettings();

    console.log("\n─────────────────────────────────────────");
    console.log(`📊  Görsel özeti:`);
    console.log(`    Yüklenen : ${uploadedCount}`);
    console.log(`    Atlanan  : ${skippedCount}`);
    console.log("✅  Seed tamamlandı!\n");
  } catch (err) {
    console.error("\n❌  Seed başarısız:", err);
    process.exit(1);
  }
}

main();
