import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";

type Props = {
  quoteLead?: string;
  quoteSpan?: string;
  authorName?: string;
  authorRole?: string;
  authorCompany?: string;
  authorCompanyUrl?: string;
  authorPhoto?: string;
};

export default function ClientSFeedback({
  quoteLead = "Working with Rayo team was an absolute pleasure! They took the time to understand our business needs and translated them into a beautifully designed, user-friendly website.",
  quoteSpan = "The team's attention to detail, creativity, and technical expertise exceeded our expectations. We've received so much positive feedback from our customers already.",
  authorName = "John Lemon",
  authorRole = "SEO in",
  authorCompany = "IB Themes",
  authorCompanyUrl = "#",
  authorPhoto = "/img/avatars/300x300_ava-01.webp",
}: Props) {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-testimonials-project">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-11 mxd-grid-item mxd-testimonials-project__item">
                    <div className="mxd-testimonials-project__inner">
                      <div className="mxd-testimonials-project__subtitle pre-manifest">
                        <CommonScrollAnimated className="anim-uni-in-up" as="p" animation="inUp">
                          <span>/ Client&apos;s Feedback</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-testimonials-project__manifest fullwidth">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          {quoteLead}
                          {quoteSpan && <span>{quoteSpan}</span>}
                        </CommonAnimatedText>
                        <CommonScrollAnimated
                          className="mxd-testimonials-project__author anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <div className="mxd-testimonials-project__photo round">
                            <Image
                              alt={authorName}
                              src={authorPhoto}
                              width={300}
                              height={300}
                            />
                          </div>
                          <div className="mxd-testimonials-project__data">
                            <p className="mxd-testimonials-project__name">{authorName}</p>
                            <p className="mxd-testimonials-project__position">
                              {authorRole}{" "}
                              <a href={authorCompanyUrl}>
                                <TextScramble className="mxd-scramble">
                                  {authorCompany}
                                </TextScramble>
                              </a>
                            </p>
                          </div>
                        </CommonScrollAnimated>
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
