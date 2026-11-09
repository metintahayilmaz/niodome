import { getLocale } from "next-intl/server";
import Link from "@/components/common/LocalizedLink";
import copy from "@/data/approvedServices.json";
import styles from "@/components/common/ApprovedNarrative.module.css";

export default async function ServicesNarrative({ closing = false }: { closing?: boolean }) {
  const locale = await getLocale();
  const content = copy[locale === "en" ? "en" : "tr"];
  return (
    <section className={`mxd-section ${styles.section}`} aria-label={closing ? content.closingTitle : content.headline}>
      <div className="mxd-container grid-l-container">
        <div className={`mxd-grid-item ${styles.copy}`}>
          {closing ? <>
            <h2>{content.closingTitle}</h2>
            <p>{content.closingBody}</p>
            <Link href="/contact" className="btn btn-line btn-line-default">{content.closingButton}</Link>
          </> : <p>{content.intro}</p>}
        </div>
      </div>
    </section>
  );
}
