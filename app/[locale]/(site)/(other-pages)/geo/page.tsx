import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Link from "@/components/common/LocalizedLink";
import { GeoFaq, GeoLead, GeoPlans } from "@/components/geo/GeoSections";
import data from "@/data/geo.json";
import styles from "@/components/geo/Geo.module.css";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const en = locale === "en";
  const t = data[en ? "en" : "tr"];
  const canonical = `${SITE_URL}${en ? "/en" : ""}/geo`;
  return {title: en ? "GEO — AI Search Visibility & Plans" : "GEO — Yapay Zekâ Görünürlüğü ve Paketler", description:t.description, alternates:{canonical,languages:{tr:`${SITE_URL}/geo`,en:`${SITE_URL}/en/geo`,"x-default":`${SITE_URL}/geo`}},openGraph:{title:t.title,description:t.description,url:canonical,type:"website"}};
}
export default async function GeoPage() {
  const locale = await getLocale();
  const t = data[locale === "en" ? "en" : "tr"];
  return <main>
    <section className={`${styles.section} ${styles.page}`}><p className={styles.eyebrow}>{t.eyebrow}</p><h1>{t.title}</h1><p className={styles.text}>{t.description}</p><div className={styles.actions}><a className={`${styles.button} ${styles.primary}`} href="#geo-review">{t.primary} ↗</a><a className={styles.button} href="#smb">{t.secondary}</a></div></section>
    <section className={`${styles.section} ${styles.dark}`}><h2>{t.processTitle}</h2><p className={styles.text}>{t.processText}</p></section>
    <GeoPlans locale={locale}/><GeoLead locale={locale}/><GeoFaq locale={locale}/>
    <section className={styles.section}><h2>{t.bridge}</h2><p className={styles.text}>{t.bridgeText}</p><Link className={styles.button} href="/works">{t.works} ↗</Link></section>
  </main>;
}
