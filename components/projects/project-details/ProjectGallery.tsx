import Image from "next/image";
import styles from "./ProjectGallery.module.css";

export type ProjectGalleryItem = { src: string; alt: string; caption?: string };

export default function ProjectGallery({ images }: { images: ProjectGalleryItem[] }) {
  if (!images.length) return null;
  return (
    <section className={styles.gallery}>
      {images.map((image, index) => (
        <figure className={styles.figure} key={`${image.src}-${index}`}>
          <Image src={image.src} alt={image.alt} width={1920} height={1280}
            sizes="(max-width: 767px) 100vw, 90vw" className={styles.image} />
          {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
        </figure>
      ))}
    </section>
  );
}
