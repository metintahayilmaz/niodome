"use client";
import Link from "next/link";
import Image from "next/image";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import CommonHero3DImages, {
  CommonHero3DCover,
  CommonHero3DImage,
  CommonHero3DImagesTrack,
  CommonHero3DIntroText,
  CommonHero3DOutroText,
} from "@/components/animations/CommonHero3DImages";
import { heroDigitalAgencyData } from "@/data/heroDigitalAgency";
import { siteSettings } from "@/data/siteSettings";
import type { SocialLinkItem } from "@/types/siteSettings";
import type { HeroGalleryImage } from "@/types/heroDigitalAgency";

// Yerel video her zaman local'dan gelir (seed'de video atlandı)
const { backgroundVideo } = heroDigitalAgencyData;

type HeroSettings = {
  headline: string;
  subline: string;
  scrollLabel: string;
  coverImage: { src: string; alt: string; width: number; height: number };
  galleryImages: HeroGalleryImage[];
};

type Props = {
  /**
   * Sanity'den çekilen sosyal linkler.
   * Verilmezse local data/siteSettings.ts'e fallback yapılır.
   */
  socials?: SocialLinkItem[];
  /**
   * Sanity heroSettings. Eksik alanlar ve eksik galeri slotları local veriden tamamlanır.
   * Video her zaman local'dan gelir.
   */
  heroSettings?: HeroSettings;
};

function getIntrinsicDimensionsFromSrc(src: string) {
  const match = src.match(/-(\d+)x(\d+)\.(?:png|jpe?g|webp)(?:\?|$)/i);
  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return null;

  return { width, height };
}

function getGalleryItemStyle(img: HeroGalleryImage) {
  const width = Math.max(1, img.width || 1);
  const height = Math.max(1, img.height || 1);
  const isPortrait = height > width;

  return {
    width: isPortrait ? "min(62vw, 312px)" : "min(78vw, 500px)",
    height: "auto",
    aspectRatio: `${width} / ${height}`,
  };
}

const galleryImageStyle = {
  display: "block",
  width: "100%",
  height: "auto",
  objectFit: "contain" as const,
};

export default function Hero({ socials, heroSettings }: Props) {
  const resolvedSocials = socials && socials.length > 0 ? socials : siteSettings.socials;
  const local = heroDigitalAgencyData;
  const sanityGallery = heroSettings?.galleryImages ?? [];

  // Sanity dizisi eksik bir öğe içerdiğinde sonraki tüm görsellerin sola kaymasını
  // önlemek için gal-N anahtarını gerçek slot numarası olarak kullan.
  const sanityGalleryBySlot = new Map<number, HeroGalleryImage>();
  sanityGallery.forEach((img, arrayIndex) => {
    const keyMatch = img._key?.match(/^gal-(\d+)$/);
    const slotIndex = keyMatch ? Number(keyMatch[1]) : arrayIndex;

    if (
      Number.isInteger(slotIndex) &&
      slotIndex >= 0 &&
      slotIndex < local.galleryImages.length &&
      !sanityGalleryBySlot.has(slotIndex)
    ) {
      sanityGalleryBySlot.set(slotIndex, img);
    }
  });

  // İlk 20 slot sabit: ilgili gal-N varsa Sanity'den, yoksa yalnızca o slot local fallback'ten gelir.
  // Sanity'deki elle girilmiş width/height yanlışsa CDN dosya adındaki gerçek asset ölçüsünü kullan.
  const galleryImages = local.galleryImages.map((fallback, index) => {
    const sanityImage = sanityGalleryBySlot.get(index);
    if (!sanityImage?.src) return fallback;

    const intrinsic = getIntrinsicDimensionsFromSrc(sanityImage.src);

    return {
      ...fallback,
      ...sanityImage,
      alt: sanityImage.alt || fallback.alt,
      width: intrinsic?.width || sanityImage.width || fallback.width,
      height: intrinsic?.height || sanityImage.height || fallback.height,
    };
  });

  const headline = heroSettings?.headline || local.headline;
  const subline = heroSettings?.subline || local.subline;
  const scrollLabel = heroSettings?.scrollLabel || local.scrollLabel;
  const coverImage = heroSettings?.coverImage?.src
    ? heroSettings.coverImage
    : local.coverImage;

  return (
    <CommonLoadAnimation>
      <>
        <div className="mxd-section mxd-hero-section no-padding loading-wrap">
          <CommonHero3DImages className="mxd-hero-02">
            {/* background group */}
            <div className="mxd-hero-02__background">
              <AutoplayLoopVideo
                poster={backgroundVideo.poster}
                sources={backgroundVideo.sources}
              />
              <div className="mxd-hero-02__cover" />
            </div>
            {/* scroll images */}
            <CommonHero3DImagesTrack className="mxd-hero-02__images">
              {galleryImages.map((img, index) =>
                img.href ? (
                  <CommonHero3DImage
                    as={Link}
                    key={img._key ?? `gallery-${index}`}
                    index={index}
                    className="hero-02__img"
                    href={img.href}
                    style={getGalleryItemStyle(img)}
                  >
                    <Image
                      alt={img.alt}
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      style={galleryImageStyle}
                    />
                  </CommonHero3DImage>
                ) : (
                  <CommonHero3DImage
                    key={img._key ?? `gallery-${index}`}
                    index={index}
                    className="hero-02__img"
                    style={getGalleryItemStyle(img)}
                  >
                    <Image
                      alt={img.alt}
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      style={galleryImageStyle}
                    />
                  </CommonHero3DImage>
                )
              )}
            </CommonHero3DImagesTrack>
            {/* bottom group */}
            <div className="mxd-hero-02__bottom">
              <div className="mxd-hero-02__dataline">
                <div className="mxd-hero-02__socials mxd-grid-item">
                  <ul className="mxd-socials-line">
                    {resolvedSocials.map((link, index) => (
                      <li key={link.href}>
                        <CommonLoadItem index={index}>
                          <a
                            className="mxd-socials-line__link permanent loading-item"
                            href={link.href}
                            target="_blank"
                          >
                            <TextScramble className="mxd-scramble">
                              {link.label}
                            </TextScramble>
                          </a>
                        </CommonLoadItem>
                      </li>
                    ))}
                  </ul>
                </div>
                <CommonLoadFade index={0}>
                  <div className="mxd-hero-02__controls mxd-grid-item loading-fade">
                    <SmoothAnchorLink
                      className="btn btn-line-icon btn-line-permanent slide-down"
                      targetId="about"
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        {scrollLabel}
                      </TextScramble>
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                        </svg>
                      </i>
                    </SmoothAnchorLink>
                  </div>
                </CommonLoadFade>
              </div>
            </div>
            {/* cover image */}
            <CommonHero3DCover className="mxd-hero-02__cover-img">
              <Image
                alt={coverImage.alt}
                src={coverImage.src}
                width={coverImage.width}
                height={coverImage.height}
                priority
              />
            </CommonHero3DCover>
            {/* headlines */}
            <div className="mxd-hero-02__intro">
              <CommonHero3DIntroText>
                <h1 className="medium permanent">{headline}</h1>
              </CommonHero3DIntroText>
            </div>
            <div className="mxd-hero-02__outro">
              <CommonHero3DOutroText>
                <p>{subline}</p>
              </CommonHero3DOutroText>
            </div>
          </CommonHero3DImages>
        </div>
      </>
    </CommonLoadAnimation>
  );
}
