import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import { aboutProcessDigitalAgencyData } from "@/data/aboutProcessDigitalAgency";
import type { ProcessStep } from "@/types/aboutProcess";

// Bölüm-seviyesi sabitler (manifesto) data dosyasından gelmeye devam eder
const { manifestLead, manifestSpan, manifestHref, steps: localSteps } =
  aboutProcessDigitalAgencyData;

type Props = {
  /** Sanity'den gelen süreç adımları.
   *  Layout 3 sabit slot beklediğinden, tam 3 adım gelmezse local data kullanılır. */
  steps?: ProcessStep[];
};

export default function AboutProcess({ steps }: Props) {
  const resolvedSteps =
    steps && steps.length >= 3 ? steps : localSteps;
  return (
    <>
      <BlurSection
        id="about"
        className="mxd-section bg-color-accent padding-top-manifest-m padding-bottom-default padding-bottom-tag-m-desktop"
      >
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link data-cursor-text="About us" href={manifestHref}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m manifest-accent mxd-split-lines active-cursor-permanent"
                            animation="splitLines"
                          >
                            {manifestLead}
                            <span>{manifestSpan}</span>
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
                  {/* process item 1 — no top divider animation */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <div className="mxd-process-points__divider top accent" />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-crosshair" />
                      </div>
                      <p className="accent">{resolvedSteps[0].title}</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">{resolvedSteps[0].description}</p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        {resolvedSteps[0].durationLabel}
                      </span>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* process item 2 */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-bezier-curve" />
                      </div>
                      <p className="accent">{resolvedSteps[1].title}</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">{resolvedSteps[1].description}</p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        {resolvedSteps[1].durationLabel}
                      </span>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* process item 3 */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-codesandbox-logo" />
                      </div>
                      <p className="accent">{resolvedSteps[2].title}</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">{resolvedSteps[2].description}</p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        {resolvedSteps[2].durationLabel}
                      </span>
                    </div>
                    <CommonScrollAnimated
                      className="mxd-process-points__divider bottom accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                  </CommonCardBatchAnimated>
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
