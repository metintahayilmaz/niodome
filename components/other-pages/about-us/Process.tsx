import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "@/components/common/LocalizedLink";
import { getTranslations } from "next-intl/server";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import type { ProcessStep } from "@/types/aboutProcess";

// İkon sınıfları — processStep schema'sında iconClass yok, slot'a göre sabit
const SLOT_ICONS = [
  "ph ph-crosshair",
  "ph ph-bezier-curve",
  "ph ph-codesandbox-logo",
];

// Fallback: Sanity boşsa local data
type Props = {
  steps?: ProcessStep[];
};

export default async function Process({ steps }: Props) {
  const t = await getTranslations("aboutContent");
  const home = await getTranslations("homeAbout");
  const resolvedSteps =
    steps && steps.length > 0 ? steps : home.raw("steps") as ProcessStep[];

  return (
    <>
      <BlurSection id="process" className="mxd-section padding-top-manifest-m padding-bottom-tag-m-desktop">
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link
                          data-cursor-text={t("viewWorks")}
                          href="/works"
                        >
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m mxd-split-lines active-cursor-accent"
                            animation="splitLines"
                          >
                            {home("manifestLead")} <span>{home("manifestSpan")}</span>
                          </CommonAnimatedText>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Manifest Large End */}
          {/* Block - Process Points Start */}
          <div className="mxd-block">
            <div className="mxd-process-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {resolvedSteps.map((step, i) => {
                    const iconClass =
                      SLOT_ICONS[i % SLOT_ICONS.length];
                    const isLast = i === resolvedSteps.length - 1;
                    return (
                      <div
                        key={step.stepNumber}
                        className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item"
                      >
                        <CommonScrollAnimated
                          className="mxd-process-points__divider top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-process-points__title anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <div className="mxd-process-points__icon">
                            <i className={iconClass} />
                          </div>
                          <p>{step.title}</p>
                        </CommonScrollAnimated>
                        <div className="mxd-process-points__descr">
                          <CommonAnimatedText
                            as="p"
                            className="t-medium mxd-split-lines"
                            animation="splitLines"
                          >
                            {step.description}
                          </CommonAnimatedText>
                        </div>
                        <CommonScrollAnimated
                          className="mxd-process-points__time anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <span className="tag tag-m meta-time">
                            {step.durationLabel}
                          </span>
                        </CommonScrollAnimated>
                        {isLast && (
                          <CommonScrollAnimated
                            className="mxd-process-points__divider bottom anim-uni-clip-in"
                            as="div"
                            animation="clipIn"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Block - Process Points End */}
        </div>
      </BlurSection>
    </>
  );
}
