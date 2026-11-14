import ServiceIntro from "@/components/services/ServiceIntro";
import type { Metadata } from "next";
import Link from "@/components/common/LocalizedLink";
import copy from "@/data/digitalAdvertising.json";
import styles from "@/components/geo/Geo.module.css";
import local from "./MarketingPlans.module.css";
import { SITE_URL } from "@/lib/site";

export function advertisingMetadata(locale: string): Metadata {
  const en = locale === "en";
  const t = copy[en ? "en" : "tr"];
  const trUrl = `${SITE_URL}/dijital-reklam-yonetimi`;
  const enUrl = `${SITE_URL}/en/digital-advertising`;
  return {title:t.label,description:t.description,alternates:{canonical:en ? enUrl : trUrl,languages:{tr:trUrl,en:enUrl,"x-default":trUrl}},openGraph:{title:t.label,description:t.description,url:en ? enUrl : trUrl,type:"website"}};
}

export default function DigitalAdvertising({locale}: {locale:string}) {
  const en = locale === "en";
  const t = copy[en ? "en" : "tr"];
  const enquiry = "/contact?service=advertising";
  return <main>
    <ServiceIntro id="advertising" locale={locale} />
    <section className={styles.section} id="platforms" aria-labelledby="advertising-platforms-title"><h2 id="advertising-platforms-title">{t.platformTitle}</h2><div className={local.grid}>
      <article className={`${styles.card} ${local.card}`}><h3>{t.googleTitle}</h3><p>{t.googleText}</p><p>{t.googlePrice}</p><p className={styles.note}>{en ? "Excludes VAT and media spend." : "KDV ve reklam bütçesi hariç."}</p><Link className={`${styles.button} ${local.cta}`} href="/google-ads">{t.googleCta} ↗</Link></article>
      <article className={`${styles.card} ${local.card}`}><h3>{t.metaTitle}</h3><p>{t.metaText}</p><p>{t.metaPrice}</p><Link className={`${styles.button} ${local.cta}`} href={`${enquiry}&platform=meta`}>{t.metaCta} ↗</Link></article>
      <article className={`${styles.card} ${local.card}`}><h3>{t.otherTitle}</h3><p>{t.otherText}</p><p>{t.otherPrice}</p><div className={styles.actions}><Link className={styles.button} href={`${enquiry}&platform=linkedin`}>LinkedIn ↗</Link><Link className={styles.button} href={`${enquiry}&platform=tiktok`}>TikTok ↗</Link></div></article>
    </div></section>
    <section className={`${styles.section} ${styles.dark}`}><h2>{t.scopeTitle}</h2><div className={styles.grid}>{t.scope.map(([title,text]) => <article key={title}><h3>{title}</h3><p className={styles.text}>{text}</p></article>)}</div></section>
    <section className={styles.section}><h2>{t.costTitle}</h2><p className={styles.text}>{t.costText}</p><p className={styles.note}>{t.costNote}</p><h3>{t.differenceTitle}</h3><p className={styles.text}>{t.differenceText}</p><Link className={styles.button} href="/social-media">{t.socialCta} ↗</Link></section>
    <section className={styles.section}><h2>{t.faqTitle}</h2><div className={styles.faq}>{t.faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className={`${styles.section} ${styles.dark}`}><h2>{t.closingTitle}</h2><p className={styles.text}>{t.closingText}</p><Link className={`${styles.button} ${styles.primary}`} href={`${enquiry}&platform=multi`}>{t.cta} ↗</Link></section>
  </main>;
}
