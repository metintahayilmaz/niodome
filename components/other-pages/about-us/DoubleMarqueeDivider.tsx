"use client";

import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import { useTranslations } from "next-intl";
import styles from "./DoubleMarqueeDivider.module.css";

export type WorkStripImage = { src: string; alt: string; href: string };

export default function DoubleMarqueeDivider({
  images,
  rows = 2,
}: {
  images: WorkStripImage[];
  rows?: 1 | 2;
}) {
  const t = useTranslations("nav");
  if (!images.length) return null;
  const tracks = rows === 1 ? [images] : [images, [...images].reverse()];
  return (
    <section className={styles.section} aria-label={t("works")}>
      {tracks.map((row, index) => (
        <div className={styles.window} key={index}>
          <div
            className={`${styles.track} ${index === 1 ? styles.reverse : ""}`}
          >
            {[0, 1].map((copy) => (
              <div
                className={styles.group}
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {row.map((image) => (
                  <Link
                    href={image.href}
                    key={image.src}
                    className={styles.card}
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    <Image
                      src={image.src}
                      alt={copy === 1 ? "" : image.alt}
                      fill
                      sizes="(max-width: 767px) 220px, 360px"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
