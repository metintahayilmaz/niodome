import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import type { NamedItem } from "@/types/project";

type Props = {
  solutionLead?: string;
  solutionSpan?: string;
  techStack?: NamedItem[];
};

const LOCAL_TECH_STACK: NamedItem[] = [
  {
    name: "HTML5 & CSS3",
    description:
      "At the core of the project lies a semantic html structure paired with modern css techniques. Flexible layouts, responsive behavior and clean styles ensure consistency across devices.",
  },
  {
    name: "Node.js & NPM",
    description:
      "A simple build environment was used to manage dependencies and streamline development. Npm packages support tooling, workflow automation and easier project maintenance.",
  },
  {
    name: "GSAP",
    description:
      "Animations are powered by gsap to create smooth, precise motion throughout the interface. Scroll-based effects and micro-interactions enhance usability.",
  },
];

export default function SplitList3({
  solutionLead = "Azurio was built using modern web technologies with a focus on flexibility.",
  solutionSpan = "Clean React Nextjs structure, scalable CSS architecture and GSAP-powered animations create smooth interactions without sacrificing speed.",
  techStack,
}: Props) {
  const resolvedStack =
    techStack && techStack.length > 0 ? techStack : LOCAL_TECH_STACK;

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
                          <span>/ Solution</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          {solutionLead}
                          {solutionSpan && <span>{solutionSpan}</span>}
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>

                  {/* Right — Tech Stack list */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ Tech stack</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
