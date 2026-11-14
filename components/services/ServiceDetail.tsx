import ServiceIntro from "./ServiceIntro";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/common/LocalizedLink";
import details from "@/data/serviceDetails.json";
import catalog from "@/data/serviceCatalog.json";
import { SITE_URL } from "@/lib/site";
import styles from "./Services.module.css";

export function serviceMetadata(id:string,locale:string): Metadata {
  const s = details.find(s=>s.id===id);
  if (!s) return {};
  const lang = locale === "en" ? "en" : "tr";
  const tr = `${SITE_URL}${s.trPath}`;
  const en = `${SITE_URL}/en${s.enPath}`;
  return {title:s.label[lang],description:s.description[lang],alternates:{canonical:lang === "en" ? en : tr,languages:{tr,en,"x-default":tr}},openGraph:{title:s.label[lang],description:s.description[lang],url:lang === "en" ? en : tr,type:"website"},twitter:{card:"summary_large_image"}};
}

export default function ServiceDetail({id,locale}:{id:string;locale:string}) {
  const s = details.find(s=>s.id===id);
  if (!s) notFound();
  const lang = locale === "en" ? "en" : "tr";
  const en = lang === "en";
  const webPlans = id === "web";
  const enquiry = `/contact?service=agency-${s.id}`;
  const related = catalog.filter(c=>c.id!==id && c.category===s.category).slice(0,3);
  const steps = en ? [["Understand","We agree the goal, audience, available material and approval roles."],["Define","We write the deliverables, exclusions, schedule and review rounds into the proposal."],["Make","We develop the agreed work and review it with your team at clear milestones."],["Hand over","We check the outputs, deliver the files and agree any next phase separately."]] : [["Anlayalım","Hedefi, kitleyi, mevcut malzemeyi ve onay verecek kişileri birlikte belirleriz."],["Netleştirelim","Teslimleri, kapsam dışı işleri, takvimi ve revizyon turlarını teklife yazarız."],["Üretelim","Kararlaştırılan işi geliştirir, belirli aşamalarda ekibinizle birlikte değerlendiririz."],["Aktaralım","Çıktıları kontrol eder, dosyaları teslim eder ve sonraki aşamayı ayrıca planlarız."]];
  const schema = {"@context":"https://schema.org","@type":"Service",name:s.label[lang],description:s.description[lang],url:`${SITE_URL}${en ? "/en"+s.enPath : s.trPath}`,provider:{"@type":"Organization",name:"Niodome",url:SITE_URL}};
  return <main className={styles.detail}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
    <ServiceIntro id={id} locale={locale} />
    <section className={styles.section} id="scope"><p className={styles.eyebrow}>{en ? "WHAT WE DO" : "NELER YAPIYORUZ"}</p><h2>{en ? "A clear scope. A connected way of working." : "Net kapsam. Birlikte çalışan uzmanlıklar."}</h2><ol className={styles.deliverables}>{s.deliverables.map((d,i)=><li key={d[lang]}><span>0{i+1}</span><h3>{d[lang]}</h3></li>)}</ol></section>
    {s.plans.length>0 ? <section className={`${styles.section} ${styles.shaded}`} id="packages" aria-labelledby="package-title"><p className={styles.eyebrow}>{en ? "SCOPE OPTIONS" : "PAKET SEÇENEKLERİ"}</p><h2 id="package-title">{en ? "Start with the scope you need." : "İhtiyacınız kadar kapsamla başlayın."}</h2><p className={styles.intro}>{webPlans ? (en ? "Clear scope, one-off project fees. Choose a package and tell us about your business." : "Net kapsam, tek seferlik proje bedeli. Paketinizi seçin, işinizi konuşalım.") : en ? "These are starting scopes, not unlimited service promises. We confirm deliverables, timing and the project or monthly fee before starting." : "Bunlar başlangıç kapsamlarıdır. İşe başlamadan teslimleri, takvimi ve proje veya aylık hizmet bedelini birlikte netleştiririz."}</p><div className={styles.plans}>{s.plans.map(p=><article className={`${styles.plan} ${"featured" in p && p.featured ? styles.featured : ""}`} key={p.id}>{"featured" in p && p.featured ? <p className={styles.eyebrow}>{en ? "RECOMMENDED" : "ÖNERİLEN PAKET"}</p> : null}<h3>{p.name[lang]}</h3><p>{p.audience[lang]}</p><ul>{p.items.map(x=><li key={x[lang]}>{x[lang]}</li>)}</ul><p className={styles.fee}>{"priceTry" in p && typeof p.priceTry === "number" ? `${p.priceTry.toLocaleString("tr-TR")} TL + ${en ? "VAT" : "KDV"}` : en ? "Quote for your scope" : "Kapsama göre teklif"}</p><Link className={styles.button} href={`${enquiry}&plan=${p.id}`}>{en ? "Discuss this package" : "Bu paketi konuşalım"} ↗</Link></article>)}</div><p className={styles.scopeNote}>{s.limits[lang]}</p></section> : <section className={`${styles.section} ${styles.shaded}`}><h2>{en ? "A brief first. A project-specific scope next." : "Önce brief. Ardından projeye özel kapsam."}</h2><p className={styles.intro}>{s.limits[lang]}</p><Link className={styles.button} href={enquiry}>{en ? "Let’s define the scope" : "Kapsamı birlikte belirleyelim"} ↗</Link></section>}
    <section className={styles.section}><h2>{en ? "How we work" : "Nasıl ilerliyoruz?"}</h2><div className={styles.steps}>{steps.map(([title,text],i)=><article key={title}><p className={styles.eyebrow}>0{i+1}</p><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>{en ? "Before we begin" : "Başlamadan önce"}</h2><div className={styles.faq}>{s.faq.map(f=><details key={f.question[lang]}><summary>{f.question[lang]}</summary><p>{f.answer[lang]}</p></details>)}<details><summary>{en ? "How are pricing and revisions agreed?" : "Ücret ve revizyonlar nasıl belirleniyor?"}</summary><p>{en ? "The proposal states deliverables, review rounds, inputs, timing and payment milestones. VAT and external costs are shown separately. A scope change is agreed before additional work starts." : "Teklifte teslimler, revizyon turları, sizden beklenen girdiler, takvim ve ödeme aşamaları yazılır. KDV ve dış giderler ayrı gösterilir. Kapsam değişikliği, ek işe başlamadan birlikte onaylanır."}</p></details></div></section>
    {related.length>0 && <section className={styles.section}><p className={styles.eyebrow}>{en ? "CONNECTED EXPERTISE" : "BİRLİKTE ÇALIŞAN HİZMETLER"}</p><div className={styles.caseLinks}>{related.map(r=><Link href={r.href} key={r.id}>{r.label[lang]} ↗</Link>)}</div></section>}
    <section className={`${styles.section} ${styles.closing}`}><h2>{en ? "Let’s shape the next move." : "Bir sonraki hamleyi birlikte şekillendirelim."}</h2><p className={styles.intro}>{en ? "Tell us your goal, available material and timing. We’ll define the right starting scope together." : "Hedefinizi, elinizdeki malzemeyi ve takviminizi paylaşın. Doğru başlangıç kapsamını birlikte belirleyelim."}</p><Link className={styles.primary} href={enquiry}>{en ? "Start a conversation" : "Bize yazın"} ↗</Link></section>
  </main>;
}
