import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import type { NamedItem } from "@/types/project";

type Props = {
  challengeLead?: string;
  challengeSpan?: string;
  services?: NamedItem[];
};

const LOCAL_SERVICES: NamedItem[] = [
  {
    name: "Art direction",
    description:
      "Visual decisions were guided by a strong creative framework built around clarity and balance. Layout, typography, and motion work together to create a consistent and engaging experience.",
  },
  {
    name: "Branding",
    description:
      "The project relies on a minimal yet expressive identity that highlights Azurio's character. Carefully selected colors, type, and graphic accents reinforce recognition and visual cohesion.",
  },
  {
    name: "Web development",
    description:
      "Implementation focused on modern front-end standards and performance. Clear structure, smooth interactions and clean code provide flexibility and long-term maintainability.",
  },
];

export default function SplitList2({
  challengeLead = "The challenge was to create a template that feels bold and contemporary without overwhelming content or performance.",
  challengeSpan = "It needed to serve a wide range of creatives while remaining flexible and easy to customize for different project types and personal styles.",
  services,
}: Props) {
  const resolvedServices =
    services && services.length > 0 ? services : LOCAL_SERVICES;

  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-block-split">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* Left — Challenge manifest */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-manifest">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ Challenge</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          {challengeLead}
                          {challengeSpan && <span>{challengeSpan}</span>}
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>

                  {/* Right — Provided Services list */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ Provided Services</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__data">
                        {resolvedServices.map((item) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
