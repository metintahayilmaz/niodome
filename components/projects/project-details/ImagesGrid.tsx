import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import Image from "next/image";

// Fallback görseller — slot [0] geniş 1920×1200, [1] sol 800×710, [2] sağ 1280×960
const LOCAL_IMAGES = [
  { src: "/img/works/project-details/details01.webp", w: 1920, h: 1200 },
  { src: "/img/works/project-details/details02.webp", w: 800,  h: 710  },
  { src: "/img/works/project-details/details03.webp", w: 1280, h: 960  },
];

type Props = {
  images?: string[]; // [0] geniş, [1] sol yarı, [2] sağ yarı
};

export default function ImagesGrid({ images }: Props) {
  const img = (slot: number) =>
    images?.[slot] ?? LOCAL_IMAGES[slot].src;

  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-images-grid">
              <div className="container-fluid p-0">
                {/* Row 1 — full-width parallax */}
                <div className="row g-0 mxd-images-grid__gallery">
                  <div className="col-12 mxd-grid-item mxd-images-grid__item wide">
                    <div className="mxd-images-grid__inner">
                      <UkiyoParallax className="parallax-img-small" scale={1.2} speed={1.5} externalRAF={false}>
                        <Image
                          alt="Project image"
                          src={img(0)}
                          width={LOCAL_IMAGES[0].w}
                          height={LOCAL_IMAGES[0].h}
                          priority
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                </div>

                {/* Row 2 — two halves */}
                <div className="row g-0 mxd-images-grid__gallery">
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div className="mxd-images-grid__inner">
                      <Image
                        className="transparent"
                        alt="Project image"
                        src={img(1)}
                        width={LOCAL_IMAGES[1].w}
                        height={LOCAL_IMAGES[1].h}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
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
