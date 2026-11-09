import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
export default function ParallaxDividerImage2({ src, alt = "" }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            <UkiyoParallax
              className="mxd-divider__image parallax-img"
              role="img"
              aria-label={alt}
              style={{ backgroundImage: `url("${src}")` }}
              scale={1.4}
              speed={1.5}
              externalRAF={false}
            />
          </div>
        </div>
      </BlurSection>
    </>
  );
}
