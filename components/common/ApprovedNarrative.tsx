import Link from "@/components/common/LocalizedLink";
import { getTranslations } from "next-intl/server";
import styles from "./ApprovedNarrative.module.css";

type Part = "home" | "services" | "aboutStart" | "aboutEnd" | "contact";

export default async function ApprovedNarrative({ part }: { part: Part }) {
  const t = await getTranslations("narrative");
  return (
    <section id={part === "home" ? "about" : part === "aboutStart" ? "process" : undefined} className={`mxd-section ${styles.section}`} aria-labelledby={`narrative-${part}`}>
      <div className="mxd-container grid-l-container">
        <div className={`mxd-grid-item ${styles.copy}`}>
          {part === "home" && <>
            <p>{t("homeIntro")}</p>
            <h2 id={`narrative-${part}`}>{t("homeTitle")}</h2>
            {(t.raw("homeParagraphs") as string[]).map(text => <p key={text}>{text}</p>)}
          </>}
          {part === "services" && <>
            <h2 id={`narrative-${part}`}>{t("servicesTitle")}</h2>
            <ul className={styles.areas}>
              {(t.raw("areas") as string[]).map(title => (
                <li key={title}><Link href="/services">{title}</Link></li>
              ))}
            </ul>
          </>}
          {part === "aboutStart" && <>
            {(t.raw("aboutIntro") as string[]).map(text => <p key={text}>{text}</p>)}
            <h2 id={`narrative-${part}`}>{t("aboutStartTitle")}</h2>
            {(t.raw("aboutStartParagraphs") as string[]).map(text => <p key={text}>{text}</p>)}
          </>}
          {part === "aboutEnd" && <>
            <h2 id={`narrative-${part}`}>{t("aboutEndTitle")}</h2>
            <p>{t("aboutEndParagraph")}</p>
            <h3>{t("measureTitle")}</h3>
            <p>{t("measureParagraph")}</p>
          </>}
          {part === "contact" && <>
            <h2 id={`narrative-${part}`}>{t("contactTitle")}</h2>
            <p>{t("contactParagraph")}</p>
            <Link className="btn btn-line btn-line-default" href="/contact">{t("contactButton")}</Link>
          </>}
        </div>
      </div>
    </section>
  );
}
