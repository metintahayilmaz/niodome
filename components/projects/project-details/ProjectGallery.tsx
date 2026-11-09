import Image from "next/image";
import styles from "./ProjectGallery.module.css";

export type ProjectGalleryItem = { src: string; alt: string; caption?: string };

export default function ProjectGallery({ images }: { images: ProjectGalleryItem[] }) {
  if (!images.length) return null;
  const rows: ProjectGalleryItem[][] = [];
  const rhythm = [2, 3, 3, 2, 3];
  let offset = 0;
  while (offset < images.length) {
    let count = rhythm[rows.length % rhythm.length];
    if (images.length - offset === count + 1) count += 1;
    rows.push(images.slice(offset, offset + count));
    offset += count;
  }
  return (
    <section className={styles.gallery}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`${styles.row} ${row.length === 2 ? styles.pair : styles.trio}`}
          style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
          {row.map((image) => (
            <figure className={styles.figure} key={image.src}>
              <Image src={image.src} alt={image.alt} fill
                sizes={row.length === 2 ? "(max-width: 600px) 46vw, 44vw" : "(max-width: 600px) 30vw, 29vw"}
                className={styles.image} />
              {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ))}
    </section>
  );
}
