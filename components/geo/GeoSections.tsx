import Link from "@/components/common/LocalizedLink";
import data from "@/data/geo.json";
import GeoLeadForm from "./GeoLeadForm";
import styles from "./Geo.module.css";

type Props = { locale: string };
export function GeoOverview({ locale }: Props) {
  const t = data[locale === "en" ? "en" : "tr"];
  return <section className={styles.section} id="geo-overview" aria-labelledby="geo-overview-title">
    <p className={styles.eyebrow}>{t.eyebrow}</p>
    <h2 id="geo-overview-title">{t.segmentTitle}</h2>
    <div className={styles.grid}>{([false, true] as const).map(enterprise => <article className={styles.card} key={String(enterprise)}>
      <p className={styles.eyebrow}>{enterprise ? t.enterprise : t.smb}</p>
      <h3>{enterprise ? t.enterpriseTitle : t.smbTitle}</h3>
      <p>{enterprise ? t.enterpriseText : t.smbText}</p>
      <Link className={styles.button} href={`/geo#${enterprise ? "enterprise" : "smb"}`}>{enterprise ? t.enterpriseCta : t.smbCta} ↗</Link>
    </article>)}</div>
  </section>;
}
export function GeoLead({ locale }: Props) {
  const t = data[locale === "en" ? "en" : "tr"];
  return <section className={`${styles.section} ${styles.dark}`} id="geo-review" aria-labelledby="geo-review-title">
    <div className={styles.hooks}>{t.hooks.map(hook => <p key={hook}>{hook}</p>)}</div>
    <p className={styles.eyebrow}>{t.eyebrow}</p><h2 id="geo-review-title">{t.leadTitle}</h2>
    <p className={styles.text}>{t.leadText}</p><p className={styles.note}>{t.leadNote}</p><GeoLeadForm />
  </section>;
}
export function GeoPlans({ locale }: Props) {
  const language = locale === "en" ? "en" : "tr";
  const t = data[language];
  const format = (n: number) => new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-GB").format(n);
  return <section className={styles.section} aria-labelledby="geo-plans-title">
    <p className={styles.eyebrow}>{t.pricing}</p><h2 id="geo-plans-title">{t.segmentTitle}</h2>
    {([false, true] as const).map(enterprise => <div key={String(enterprise)} id={enterprise ? "enterprise" : "smb"} style={{scrollMarginTop:"12rem",marginBottom:"5rem"}}>
      <h3>{enterprise ? t.enterprise : t.smb}</h3>
      <div className={styles.grid}>{data.plans.filter(plan => plan.enterprise === enterprise).map(plan => <article className={styles.card} key={plan.id}>
        <h3>{plan.name[language]}</h3><p className={styles.price}>{enterprise && language === "en" ? "from " : ""}{format(plan.price)} <span>{t.monthly}{enterprise && language === "tr" ? " · başlangıç fiyatı" : ""}</span></p>
        <p>{t.setup}: {enterprise && language === "en" ? "from " : ""}{format(plan.setup)} {language === "tr" ? "TL" : "TRY"}{enterprise && language === "tr" ? " · başlangıç fiyatı" : ""}</p>
        <ul>{plan.features[language].map(feature => <li key={feature}>{feature}</li>)}</ul>
        <Link className={styles.button} href={`/contact?service=geo&plan=${plan.id}`}>{t.cta} ↗</Link>
      </article>)}</div>
    </div>)}
    <p className={styles.note}>{t.vat}</p><p className={styles.note}>{t.scope}</p><p className={styles.note}>{t.exclusions}</p><p className={styles.note}>{t.guarantee}</p>
    <h3>{t.auditTitle}</h3><p className={styles.text}>{t.auditText}</p>
  </section>;
}
export function GeoFaq({ locale }: Props) {
  const t = data[locale === "en" ? "en" : "tr"];
  return <section className={styles.section}><h2>{t.faqTitle}</h2><div className={styles.faq}>{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>;
}
