import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import { servicePresentation } from "@/lib/servicePresentation";
import styles from "./ServiceIntro.module.css";
export default function ServiceIntro({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) {
  const service = servicePresentation(id, locale);
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <Link className={styles.eyebrow} href="/services">
          {String(service.order).padStart(2, "0")} /{" "}
          {locale === "en" ? "SERVICES" : "HİZMETLER"}
        </Link>
        <h1>{service.title}</h1>
        <div className={styles.tags}>
          {[service.tagsColA, service.tagsColB].map((tags, i) => (
            <ul key={i}>
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ))}
        </div>
        <p className={styles.description}>{service.shortDescription}</p>
      </div>
      <div className={styles.media}>
        <Image
          src={service.image!}
          alt=""
          fill
          sizes="(max-width:767px) 100vw, 50vw"
          priority
        />
      </div>
    </section>
  );
}
