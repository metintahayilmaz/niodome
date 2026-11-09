import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";

type Props = {
  overviewLead?: string;
  overviewSpan?: string;
  liveUrl?: string;
  projectName?: string;
  clientName?: string;
  industries?: string;
  projectDate?: string;
};

export default async function SplitList({
  overviewLead,
  overviewSpan,
  liveUrl,
  projectName,
  clientName,
  industries,
  projectDate,
}: Props) {
  const t = await getTranslations("projectContent");
  const validLiveUrl = liveUrl && /^https?:\/\//i.test(liveUrl) ? liveUrl : undefined;
  const liveLabel = validLiveUrl?.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  return (
    <>
      <BlurSection id="overview" className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-block-split">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* Left — Overview manifest */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-manifest">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ {t("overview")}</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          {overviewLead}
                          {overviewSpan && <span>{overviewSpan}</span>}
                        </CommonAnimatedText>
                        {validLiveUrl && <CommonScrollAnimated
                          className="btn btn-default-icon btn-default-accent slide-right anim-uni-in-up"
                          href={validLiveUrl}
                          as="a"
                          animation="inUp"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            {t("seeLive")}
                          </TextScramble>
                          <i className="btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </CommonScrollAnimated>}
                      </div>
                    </div>
                  </div>

                  {/* Right — Project Details info list */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ {t("details")}</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__info">
                        {[
                          { label: t("name"), value: projectName },
                          { label: t("client"), value: clientName },
                          { label: t("industries"), value: industries },
                          { label: t("date"), value: projectDate },
                        ].filter(({ value }) => value?.trim()).map(({ label, value }) => (
                          <div key={label} className="split-info__item">
                            <div className="split-info__divider divider-top" />
                            <div className="split-info__details">
                              <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                                {label}
                                <span>{value}</span>
                              </CommonScrollAnimated>
                            </div>
                            <div className="split-info__divider divider-bottom" />
                          </div>
                        ))}
                        {validLiveUrl && <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                              {t("projectPage")}
                              <span>
                                <a href={validLiveUrl}>{liveLabel}</a>
                              </span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>}
                      </div>
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
