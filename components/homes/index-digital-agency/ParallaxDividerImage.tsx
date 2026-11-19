import StableParallax from "@/components/animations/StableParallax";
import BlurSection from "@/components/animations/BlurSection";
export default function ParallaxDividerImage({ src, alt = "" }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            <StableParallax
              className="mxd-divider__image parallax-img"
              role="img" aria-label={alt}
              style={{ backgroundImage: `url("${src}")` }}
              scale={1.4}
              speed={1.5}
            />
          </div>
        </div>
      </BlurSection>
    </>
  );
}
