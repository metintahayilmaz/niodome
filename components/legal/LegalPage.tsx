import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import legal from "@/data/legal.json";
import { SITE_URL } from "@/lib/site";
import styles from "./Legal.module.css";

type Kind = "privacy" | "kvkk";
export function legalMetadata(kind: Kind, locale: string): Metadata {
  const en = locale === "en";
  const t = legal[kind][en ? "en" : "tr"];
  const tr = `${SITE_URL}/${kind === "privacy" ? "gizlilik-politikasi" : "kvkk"}`;
  const english = `${SITE_URL}/en/${kind === "privacy" ? "privacy-policy" : "kvkk"}`;
  return {
    title: t.title,
    description: t.intro,
    alternates: {
      canonical: en ? english : tr,
      languages: { tr, en: english, "x-default": tr },
    },
  };
}
export default async function LegalPage({ kind }: { kind: Kind }) {
  const locale = (await getLocale()) === "en" ? "en" : "tr";
  const t = legal[kind][locale];
  return (
    <main className={`mxd-page-content inner-page-content ${styles.page}`}>
      <article className={styles.article}>
        <p className={styles.eyebrow}>
          NIODOME ·{" "}
          {locale === "tr"
            ? "GİZLİLİK VE KİŞİSEL VERİLER"
            : "PRIVACY AND PERSONAL DATA"}
        </p>
        <h1>{t.title}</h1>
        <p className={styles.intro}>{t.intro}</p>
        <p className={styles.date}>
          {locale === "tr"
            ? "Son güncelleme: 14 Kasım 2026"
            : "Last updated: 14 November 2026"}
        </p>
        <nav
          className={styles.links}
          aria-label={locale === "tr" ? "Yasal metinler" : "Legal documents"}
        >
          <Link
            href="/privacy-policy"
            aria-current={kind === "privacy" ? "page" : undefined}
          >
            {legal.privacy[locale].title}
          </Link>
          <Link
            href="/kvkk"
            aria-current={kind === "kvkk" ? "page" : undefined}
          >
            {legal.kvkk[locale].title}
          </Link>
        </nav>
        <aside className={styles.contact}>
          <strong>{legal.controller}</strong>
          <p>{legal.address}</p>
          <a href="mailto:hello@niodome.com">hello@niodome.com</a>
        </aside>
        {t.sections.map(([heading, paragraphs]) => (
          <section key={heading as string}>
            <h2>{heading}</h2>
            {(paragraphs as string[]).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <p className={styles.date}>
          {locale === "tr" ? "İlgili kaynaklar: " : "Related sources: "}
          <a href="https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-">
            KVKK
          </a>
          {" · "}
          <a href="https://www.facebook.com/privacy/policy/">Meta</a>
          {" · "}
          <a href="https://web3forms.com/privacy">Web3Forms</a>
        </p>
      </article>
    </main>
  );
}
