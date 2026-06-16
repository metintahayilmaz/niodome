import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import { siteSettings as localSettings } from "@/data/siteSettings";

type Props = {
  email?: string;
  emailHref?: string;
  phone?: string;
  phoneHref?: string;
  address?: string;
};

export default async function SectionTitle({
  email,
  emailHref,
  phone,
  phoneHref,
  address,
}: Props) {
  const t = await getTranslations("contact");
  // Sanity değeri geldiyse kullan; yoksa local siteSettings'e dön
  const resolvedEmail    = email    || localSettings.email;
  const resolvedEmailHref = emailHref || localSettings.emailHref;
  const resolvedPhone    = phone    || localSettings.phone;
  const resolvedPhoneHref = phoneHref || localSettings.phoneHref;
  const resolvedAddress  = address  || localSettings.address;

  return (
    <>
      <BlurSection className="mxd-section bg-color-base padding-top-title padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title & Text Block Start */}
          <div className="mxd-block">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* section title */}
                  <div className="mxd-section-title">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="mxd-split-lines"
                        animation="splitLines"
                      >
                        {t("sectionTitle")}
                      </CommonAnimatedText>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* paragraph */}
                  <div className="mxd-section-title__paragraph">
                    <CommonAnimatedText
                      as="p"
                      className="t-bold t-large mxd-split-lines"
                      animation="splitLines"
                    >
                      {t("sectionBodyPart1")}
                      <span>{t("sectionBodyPart2")}</span>
                    </CommonAnimatedText>
                  </div>
                  {/* contact data — tek ofis bloğu */}
                  <div className="mxd-section-title__datalist">
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        <div className="col-12 col-md-6 col-xl-5 datalist__item">
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <span className="tag tag-s-mobile">
                                {resolvedAddress}
                              </span>
                            </CommonScrollAnimated>
                          </ul>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href={resolvedPhoneHref}
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  {resolvedPhone}
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href={resolvedEmailHref}
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  {resolvedEmail}
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title & Text Block End */}
        </div>
      </BlurSection>
    </>
  );
}
