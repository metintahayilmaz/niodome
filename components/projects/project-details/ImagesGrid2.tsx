import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import Image from "next/image";

// Fallback görseller — slot [3] sol 1280×1280, [4] sağ 985×1280, [5] geniş 1920×1440
const LOCAL_IMAGES = [
  { src: "/img/works/project-details/details04.webp", w: 1280, h: 1280 },
  { src: "/img/works/project-details/details05.webp", w: 985,  h: 1280 },
  { src: "/img/works/project-details/details06.webp", w: 1920, h: 1440 },
];

type Props = {
  images?: string[]; // [3] sol yarı, [4] sağ yarı, [5] geniş — ImagesGrid'den sonraki slotlar
};

export default function ImagesGrid2({ images }: Props) {
  // Bileşene galleryImages[3..5] gelmeli; yoksa local fallback
  const img = (localSlot: number) =>
    images?.[localSlot] ?? LOCAL_IMAGES[localSlot].src;

  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-images-grid">
              <div className="container-fluid p-0">
                {/* Row 1 — two halves */}
                <div className="row g-0 mxd-images-grid__gallery">
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div className="mxd-images-grid__inner">
                      <UkiyoParallax className="parallax-img-small" scale={1.2} speed={1.5} externalRAF={false}>
                        <Image
                          alt="Project image"
                          src={img(0)}
                          width={LOCAL_IMAGES[0].w}
                          height={LOCAL_IMAGES[0].h}
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div className="mxd-images-grid__inner">
                      <Image
                        alt="Project image"
                        src={img(1)}
                        width={LOCAL_IMAGES[1].w}
                        height={LOCAL_IMAGES[1].h}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2 — full-width parallax */}
                <div className="row g-0 mxd-images-grid__gallery">
                  <div className="col-12 mxd-grid-item mxd-images-grid__item wide">
                    <div className="mxd-images-grid__inner">
                      <UkiyoParallax className="parallax-img-small" scale={1.2} speed={1.5} externalRAF={false}>
                        <Image
                          alt="Project image"
                          src={img(2)}
                          width={LOCAL_IMAGES[2].w}
                          height={LOCAL_IMAGES[2].h}
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
