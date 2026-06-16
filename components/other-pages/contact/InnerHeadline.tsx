"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import CommonLoadAnimation, { CommonLoadFade } from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import { siteSettings as localSettings } from "@/data/siteSettings";

type Props = {
  email?: string;
  emailHref?: string;
};

export default function InnerHeadline({ email, emailHref }: Props) {
  const t = useTranslations("contact");
  const resolvedEmail = email || localSettings.email;
  const resolvedEmailHref = emailHref || localSettings.emailHref;
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v05 Start */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* breadcrumbs */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/`}>
                                <TextScramble className="mxd-scramble">
                                  {t("breadcrumbHome")}
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">{t("breadcrumbCurrent")} </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-medium-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-6 mxd-grid-item">
                              <div className="inner-headline__title">
                                <CommonAnimatedText
                                  as="h1"
                                  className="medium loading-split"
                                  animation="splitLinesLoad"
                                >
                                  {t("title")}
                                </CommonAnimatedText>
                              </div>
                              {/* <div class="inner-headline__subtitle">
                              <p>Everything <span>you need to know</span></p>
                            </div> */}
                            </div>
                            <div className="col-12 col-xl-6">
                              {/* split header caption */}
                              <div className="inner-headline__caption split-caption-title pre-form">
                                <div className="mxd-grid-item">
                                  <CommonAnimatedText
                                    as="p"
                                    className="t-bold t-large loading-split"
                                    animation="splitLinesLoad"
                                  >
                                    {t("captionPart1")}{" "}
                                    <span>
                                      {t("captionPart2")}
                                    </span>
                                  </CommonAnimatedText>
                                </div>
                              </div>
                              <ContactForm />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v05 End */}
            {/* Block - Fullwidth Text Start */}
            <div className="mxd-block">
              <div className="fullwidth-text headline-email-text bottom-text-small mxd-grid-item">
                <div className="fullwidth-text__wrap">
                  <a
                    className="fullwidth-text__content small accent active-cursor"
                    data-cursor-text="Let's chat"
                    href={resolvedEmailHref}
                    aria-label={`Send email to ${resolvedEmail}`}
                  >
                    <CommonAnimatedText
                      as="span"
                      className="anim-uni-chars"
                      animation="animChars"
                    >
                      {resolvedEmail}
                    </CommonAnimatedText>
                  </a>
                </div>
              </div>
            </div>
            {/* Block - Fullwidth Text End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
