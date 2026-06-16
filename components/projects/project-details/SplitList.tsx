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

export default function SplitList({
  overviewLead = "Stand out and express your uniqueness with Azurio — a vibrant and minimal React Nextjs Template for creatives, studios and freelancers.",
  overviewSpan = "Impress your website visitors with a clean, stylish layout and stunning visuals.",
  liveUrl = "#",
  projectName = "Azurio - digital agency & personal portfolio React Nextjs Template",
  clientName = "IB Themes",
  industries = "React Nextjs Template",
  projectDate = "October 2025 - January 2026",
}: Props) {
  const liveLabel = liveUrl && liveUrl !== "#"
    ? liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "ibthemes.dev";

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
                          <span>/ Overview</span>
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
                        <CommonScrollAnimated
                          className="btn btn-default-icon btn-default-accent slide-right anim-uni-in-up"
                          href={liveUrl}
                          as="a"
                          animation="inUp"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            See it live
                          </TextScramble>
                          <i className="btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>

                  {/* Right — Project Details info list */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ Project Details</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__info">
                        {[
                          { label: "Name:", value: projectName },
                          { label: "Client:", value: clientName },
                          { label: "Industries:", value: industries },
                          { label: "Date:", value: projectDate },
                        ].map(({ label, value }) => (
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
                        <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                              Project page:
                              <span>
                                <a href={liveUrl}>{liveLabel}</a>
                              </span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>
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
