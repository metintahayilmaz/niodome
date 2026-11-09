import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import styles from "./ProjectContact.module.css";

export default async function ProjectContact({ image, imageAlt = "" }: { image?: string; imageAlt?: string }) {
  const t = await getTranslations("innerContent");
  return (
    <section className={styles.section} aria-label={t("projectCta")}>
      {image && <div className={styles.visual}><Image src={image} alt={imageAlt} fill sizes="(max-width: 767px) 90vw, 45vw" /></div>}
      <div className={styles.copy}>
        <Link className={styles.eyebrow} href="/contact">[ {t("write")} ]</Link>
        <h2><Link href="/contact">{t("projectCta")}</Link></h2>
      </div>
    </section>
  );
}
