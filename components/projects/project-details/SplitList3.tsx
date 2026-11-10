import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import type { NamedItem } from "@/types/project";

type Props = {
  solutionLead?: string;
  solutionSpan?: string;
  techStack?: NamedItem[];
};

export default async function SplitList3({
  solutionLead,
  solutionSpan,
  techStack,
}: Props) {
  const t = await getTranslations("projectContent");
  const resolvedStack =
    techStack ?? [];

  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-block-split">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* Left — Solution manifest */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-manifest">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ {t("solution")}</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          {solutionLead}
                          {solutionSpan && <> <span>{solutionSpan}</span></>}
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>

                  {/* Right — Tech Stack list */}
                  {resolvedStack.length > 0 && <>
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ {t("techStack")}</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__data">
                        {resolvedStack.map((item) => (
                          <div key={item.name} className="split-data__item">
                            <div className="split-data__divider divider-top" />
                            <div className="split-data__name">
                              <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                                {item.name}
                              </CommonScrollAnimated>
                            </div>
                            <div className="split-data__descr">
                              <CommonScrollAnimated className="t-medium anim-uni-in-up" as="p" animation="inUp">
                                {item.description}
                              </CommonScrollAnimated>
                            </div>
                            <div className="split-data__divider divider-bottom" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
