import BlurSection from "@/components/animations/BlurSection";
import Link from "@/components/common/LocalizedLink";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import CommonCursorTrailTransparent, {
  CommonCursorTrailContent,
  CommonCursorTrailImage,
  CommonCursorTrailWrapper,
} from "@/components/animations/CommonCursorTrailTransparent";
export default async function Divider() {
  const t = await getTranslations("homeContent");
  const narrative = await getTranslations("narrative");
  return (
    <>
      <BlurSection className="mxd-section bg-color-opposite">
        <CommonCursorTrailTransparent
          as="div"
          className="cursor-trail-transparent"
        >
          {/* Effect - Cursor Trail Transparent Start */}
          <CommonCursorTrailWrapper className="mxd-trail-transparent-wrapper">
            <CommonCursorTrailContent className="mxd-trail-transparent-content">
              {[
                {
                  src: "/img/niodome/turkish-tea.webp",
                  width: 768,
                  height: 768,
                },
                { src: "/img/niodome/zenit.webp", width: 768, height: 768 },
                {
                  src: "/img/niodome/vintage-megaphone.webp",
                  width: 768,
                  height: 768,
                },
                { src: "/img/niodome/dome-lamp.webp", width: 768, height: 768 },
                {
                  src: "/img/niodome/cassette.webp",
                  width: 637,
                  height: 400,
                },
                {
                  src: "/img/niodome/cat.webp",
                  width: 400,
                  height: 480,
                },
                {
                  src: "/img/niodome/fish.webp",
                  width: 485,
                  height: 400,
                },
                {
                  src: "/img/niodome/spinning-top.webp",
                  width: 768,
                  height: 768,
                },
                {
                  src: "/img/niodome/paper-plane.webp",
                  width: 768,
                  height: 768,
                },
              ].map((image, index) => (
                <CommonCursorTrailImage
                  key={image.src}
                  index={index}
                  className="mxd-trail-transparent-image"
                  alt=""
                  sizes="240px"
                  loading="eager"
                  {...image}
                />
              ))}
            </CommonCursorTrailContent>
          </CommonCursorTrailWrapper>
          {/* Effect - Cursor Trail Transparent End */}
          {/* Divider - Divider XL Start */}
          <div className="mxd-container">
            <div className="mxd-divider-xl padding-top-subtitle padding-bottom-default">
              <div className="mxd-divider-xl__content">
                <CommonScrollAnimated
                  className="mxd-divider-xl__btngroup difference anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <Link
                    className="btn btn-line btn-line-permanent"
                    href={`/contact`}
                  >
                    <TextScramble className="btn-caption mxd-scramble">
                      {t("contact")}
                    </TextScramble>
                  </Link>
                </CommonScrollAnimated>
                <div className="mxd-divider-xl__caption difference">
                  <Link
                    className="active-cursor-accent"
                    data-cursor-text={t("letsTalk")}
                    href={`/contact`}
                  >
                    <CommonAnimatedText
                      as="h2"
                      className="permanent reveal-type"
                      animation="revealType"
                    >
                      {narrative("contactTitle")}
                    </CommonAnimatedText>
                  </Link>
                </div>
                <div className="mxd-divider-gif">
                  <div className="mxd-divider-gif__back left accent">
                    <Image
                      alt=""
                      src="/img/gifs/nice-thumbs-up.gif"
                      width={640}
                      height={440}
                    />
                  </div>
                  <div className="mxd-divider-gif__front">
                    <Image
                      alt=""
                      src="/img/gifs/nice-thumbs-up.gif"
                      width={640}
                      height={440}
                    />
                  </div>
                  <div className="mxd-divider-gif__back right accent">
                    <Image
                      alt=""
                      src="/img/gifs/nice-thumbs-up.gif"
                      width={640}
                      height={440}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Divider - Divider XL End */}
        </CommonCursorTrailTransparent>
      </BlurSection>
    </>
  );
}
