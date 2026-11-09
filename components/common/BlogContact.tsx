import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "./BlogContact.module.css";

export default async function BlogContact() {
  const locale = await getLocale();
  const t = await getTranslations("innerContent");
  let items: { title: string; src: string; href: string }[] = [];
  try {
    const posts = await client.fetch<{ title: string; slug: string; image: Parameters<typeof urlFor>[0] }[]>(
      `*[_type == "post" && coalesce(isDemo, false) == false && defined(coverImage) && defined(slug.current)] | order(date desc)[0..2] {
        "title": coalesce(title[$locale], title.tr), "slug": slug.current, "image": coverImage
      }`, { locale });
    items = posts.map(post => ({ title: post.title, href: `/blog/${post.slug}`,
      src: urlFor(post.image).width(900).height(675).quality(85).auto("format").url() }));
  } catch {
    // The contact link remains usable if archive images cannot be read.
  }
  const row = [...items, ...items];
  return (
    <section className={styles.section} aria-label={t("projectCta")}>
      <div className={styles.copy}>
        <Link href="/contact" className={styles.eyebrow}>[ {t("write")} ]</Link>
        <h2><Link href="/contact">{t("projectCta")}</Link></h2>
      </div>
      {items.length > 0 && <div className={styles.window}>
        <div className={styles.track}>
          {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {row.map((item, index) => <Link key={`${item.href}-${index}`} href={item.href} className={styles.card}
              aria-hidden={index >= items.length ? true : undefined} tabIndex={copy === 1 || index >= items.length ? -1 : undefined}>
              <Image src={item.src} alt={item.title} fill sizes="(max-width: 767px) 220px, 360px" />
            </Link>)}
          </div>)}
        </div>
      </div>}
    </section>
  );
}
