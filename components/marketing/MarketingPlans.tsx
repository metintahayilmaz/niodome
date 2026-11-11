import type { Metadata } from "next";
import Link from "@/components/common/LocalizedLink";
import data from "@/data/marketingPlans.json";
import styles from "@/components/geo/Geo.module.css";
import local from "./MarketingPlans.module.css";
import { SITE_URL } from "@/lib/site";

export type MarketingService = keyof typeof data;
export function marketingMetadata(service: MarketingService, locale: string): Metadata {
  const item = data[service];
  const lang = locale === "en" ? "en" : "tr";
  const t = item[lang];
  const tr = `${SITE_URL}${item.trPath}`;
  const en = `${SITE_URL}${item.enPath}`;
  const canonical = lang === "en" ? en : tr;
  return { title: `${t.label} — ${lang === "tr" ? "Paketler ve Fiyatlar" : "Plans & Pricing"}`, description: t.description,
    alternates: { canonical, languages: { tr, en, "x-default": tr } },
    openGraph: { title: t.title, description: t.description, url: canonical, type: "website" } };
}

export function MarketingOverview({ locale }: { locale: string }) {
  const lang = locale === "en" ? "en" : "tr";
  return <section className={styles.section} aria-labelledby="marketing-plans-title">
    <p className={styles.eyebrow}>{lang === "tr" ? "Sosyal medya ve reklam" : "Social media & advertising"}</p>
    <h2 id="marketing-plans-title">{lang === "tr" ? "Görünürlükten ilişkiye. İlgiden talebe." : "From visibility to connection. From interest to demand."}</h2>
    <div className={styles.grid}>{(Object.keys(data) as MarketingService[]).map(key => {
      const item = data[key]; const t = item[lang];
      return <article className={styles.card} key={key}><p className={styles.eyebrow}>{t.label}</p><h3>{t.title}</h3><p>{t.description}</p><Link className={styles.button} href={item.route}>{lang === "tr" ? "Paketleri inceleyin" : "Explore plans"} ↗</Link></article>;
    })}</div>
  </section>;
}

export default function MarketingPlans({ service, locale }: { service: MarketingService; locale: string }) {
  const lang = locale === "en" ? "en" : "tr";
  const t = data[service][lang];
  const en = lang === "en";
  const money = (amount: number) => new Intl.NumberFormat(en ? "en-GB" : "tr-TR").format(amount);
  return <main>
    <section className={`${styles.section} ${styles.page}`}><p className={styles.eyebrow}>{t.label}</p><h1>{t.title}</h1><p className={styles.text}>{t.description}</p><div className={styles.actions}><a className={`${styles.button} ${styles.primary}`} href="#plans">{en ? "Explore plans" : "Paketleri inceleyin"}</a><Link className={styles.button} href={`/contact?service=${service}`}>{t.cta} ↗</Link></div></section>
    <section className={`${styles.section} ${styles.dark}`} aria-label={en ? "Our approach" : "Yaklaşımımız"}><div className={styles.hooks}>{t.process.map((text, i) => <div key={text}><span className={styles.eyebrow}>0{i+1}</span><p>{text}</p></div>)}</div></section>
    <section className={styles.section} id="plans" aria-labelledby="plans-title"><h2 id="plans-title">{t.plansTitle}</h2><p className={styles.text}>{t.included}</p>
      <div className={local.grid}>{t.plans.map((plan, index) => <article className={`${styles.card} ${local.card}`} key={plan.id}>
        <h3>{plan.name}</h3><p className={local.who}>{plan.who}</p><p>{plan.summary}</p>
        <p className={`${styles.price} ${local.price}`}>{index === 2 && en ? "from " : ""}{money(plan.price)} <span>{en ? "TRY / month" : "TL / ay"}{index === 2 && !en ? " · başlangıç fiyatı" : ""}</span></p>
        <p className={local.cost}>{en ? "First month, standard scope: " : "İlk ay, standart kapsam: "}<strong>{index === 2 && en ? "from " : ""}{money(plan.price)} {en ? "TRY" : "TL"}{index === 2 && !en ? "’den" : ""}</strong></p>
        <p className={styles.note}>{en ? "Excludes VAT, media spend and separately approved additional work." : "KDV, reklam bütçesi ve ayrıca onaylanan ek çalışmalar hariç."}</p>
        <ul>{plan.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
        <details className={local.details}><summary>{en ? "Scope details" : "Kapsam detayları"}</summary><ul>{plan.details.map(item => <li key={item}>{item}</li>)}</ul></details>
        <Link className={`${styles.button} ${local.cta}`} href={`/contact?service=${service}&plan=${plan.id}`}>{en ? "Discuss this plan" : "Bu paketi konuşalım"} ↗</Link>
      </article>)}</div>
      <p className={styles.note}>{t.exclusions}</p><p className={styles.note}>{en ? "Scope changes are agreed before work starts. No sales, follower or ROAS guarantees. The first review period is 90 days; renewal and exit terms are agreed in the contract." : "Kapsam değişikliği işe başlamadan birlikte kararlaştırılır. Satış, takipçi veya ROAS garantisi verilmez. İlk değerlendirme dönemi 90 gündür; yenileme ve ayrılma koşulları sözleşmede belirlenir."}</p>
    </section>
    <section className={styles.section}><h2>{en ? "Before we start" : "Başlamadan önce"}</h2><div className={styles.faq}>{t.faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className={`${styles.section} ${styles.dark}`}><h2>{en ? "Let’s find the right starting point." : "İşinize uygun başlangıcı birlikte belirleyelim."}</h2><p className={styles.text}>{en ? "Start with a 20-minute needs conversation. We’ll review your goals, existing materials and budget before agreeing the scope." : "20 dakikalık ihtiyaç görüşmesiyle başlayalım. Hedefinizi, mevcut malzemelerinizi ve bütçenizi konuşup kapsamı netleştirelim."}</p><Link className={`${styles.button} ${styles.primary}`} href={`/contact?service=${service}`}>{t.cta} ↗</Link></section>
    <section className={styles.section}><p className={styles.eyebrow}>{en ? "Explore more" : "Diğer hizmetler"}</p><div className={styles.actions}><Link className={styles.button} href={service === "social" ? "/google-ads" : "/social-media"}>{service === "social" ? data.google[lang].label : data.social[lang].label} ↗</Link><Link className={styles.button} href="/geo">GEO ↗</Link></div></section>
  </main>;
}
