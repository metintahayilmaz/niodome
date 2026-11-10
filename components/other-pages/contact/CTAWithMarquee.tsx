import { getTranslations } from "next-intl/server";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import DoubleMarqueeDivider, {
  type WorkStripImage,
} from "@/components/other-pages/about-us/DoubleMarqueeDivider";
import styles from "@/components/common/BlogContact.module.css";

export default async function ContactClosing({
  images,
}: {
  images: WorkStripImage[];
}) {
  const t = await getTranslations("contact");
  return (
    <section className={styles.section} aria-labelledby="contact-closing-title">
      <div className={styles.copy}>
        <SmoothAnchorLink targetId="contact-form" className={styles.eyebrow}>
          [ {t("ctaButton")} ]
        </SmoothAnchorLink>
        <h2 id="contact-closing-title">
          <SmoothAnchorLink targetId="contact-form">
            {t("ctaTitle")}
          </SmoothAnchorLink>
        </h2>
      </div>
      <DoubleMarqueeDivider images={images} rows={1} />
    </section>
  );
}
