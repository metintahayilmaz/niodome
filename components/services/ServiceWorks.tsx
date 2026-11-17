import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import { getServiceWorks } from "@/lib/serviceWorks";
import styles from "./ServiceWorks.module.css";

/** Real project cards for a service page, between the scope and the packages. */
export default async function ServiceWorks({ id, locale }: { id: string; locale: string }) {
  const { works, related } = await getServiceWorks(id, locale);
  if (!works.length) return null;
  const en = locale === "en";
  const eyebrow = related ? (en ? "SELECTED WORK" : "SEÇİLİ İŞLER") : en ? "FROM THE STUDIO" : "NIODOME İŞLERİNDEN";
  const title = related
    ? en ? "Work from this practice." : "Bu alanda yaptığımız işler."
    : en ? "How we think shows in the work." : "Nasıl düşündüğümüz, işlerde görünür.";
  const lead = works.length % 2 === 1;
  return (
    <section className={styles.section} aria-labelledby="service-works-title">
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <CommonScrollAnimated as="h2" id="service-works-title" animation="inUp">{title}</CommonScrollAnimated>
        </div>
        <Link className={styles.all} href="/works">{en ? "All projects" : "Tüm projeler"} ↗</Link>
      </div>
      <div className={styles.grid}>
        {works.map((work, index) => (
          <CommonScrollAnimated
            as="article"
            animation="inUp"
            className={`${styles.card} ${lead && index === 0 ? styles.lead : ""}`}
            key={work.slug}
          >
            <Link href={work.href} className={styles.media} aria-label={work.title}>
              <Image src={work.src} alt={work.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 900px" />
            </Link>
            <div className={styles.meta}>
              <h3><Link href={work.href}>{work.title}</Link></h3>
              <ul>{work.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </CommonScrollAnimated>
        ))}
      </div>
    </section>
  );
}
