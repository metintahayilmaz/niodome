import Image from "next/image";
import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import FooterBackToTop from "@/components/footers/FooterBackToTop";
import {
  CommonScrollAnimated,
  CommonScrollAnimatedLink,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import { siteSettings as localSettings } from "@/data/siteSettings";
import type { SiteSettingsData } from "@/types/siteSettings";

// Socials için paylaşılan SVG ok ikonu
function ArrowIcon() {
  return (
    <i>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 18 18"
        enableBackground="new 0 0 18 18"
        xmlSpace="preserve"
      >
        <path
          d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
        M0,18h3.6v-3.6H0V18z"
        />
      </svg>
    </i>
  );
}

type Props = {
  /**
   * Büyük footer metnini (logotype) geçersiz kılar.
   * index-personal-portfolio ve index-digital-designer "Walker" geçer.
   * Verilmezse settings.logotype kullanılır.
   */
  name?: string;
  /**
   * Sanity'den çekilen site ayarları.
   * Verilmezse local data/siteSettings.ts'e fallback yapılır.
   */
  settings?: SiteSettingsData;
};

export default async function Footer2({ name, settings }: Props) {
  const t = await getTranslations("footer");
  // Sanity verisi gelmezse local data'ya dön
  const s = settings ?? localSettings;

  // Büyük footer metni: açık name prop varsa o, yoksa logotype
  const displayName = name ?? s.logotype;

  // navLinks: Sanity'den geldiyse kullan; boşsa hardcoded template linkleri göster
  const resolvedNavLinks =
    s.navLinks && s.navLinks.length > 0 ? s.navLinks : null;

  return (
    <BlurSection as="footer" className="mxd-footer">
      <div className="mxd-container grid-l-container">
        {/* Footer Block - Navigation v2 Start */}
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12 col-xl-6 mxd-footer__item">
                <nav className="mxd-footer__nav02">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      {/* Discover / Nav Links */}
                      <div className="col-12 col-md-6 mxd-footer-nav02__item mxd-grid-item">
                        <div className="mxd-footer-nav02__block">
                          <div className="mxd-footer-nav02__title">
                            <CommonScrollAnimated
                              className="footer-data anim-uni-slide-down"
                              as="p"
                              animation="slideDownLine"
                            >
                              <span>{t("discover")}</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="mxd-footer-nav02__list">
                            <ul>
                              {resolvedNavLinks ? (
                                // Sanity navLinks
                                resolvedNavLinks.map((link) => (
                                  <li key={link.href}>
                                    <CommonScrollAnimatedLink
                                      className="anim-uni-slide-down"
                                      href={link.href}
                                      animation="slideDownLine"
                                    >
                                      <span>{link.label}</span>
                                    </CommonScrollAnimatedLink>
                                  </li>
                                ))
                              ) : (
                                // Hardcoded fallback
                                <>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/index-creative-agency" animation="slideDownLine"><span>{t("linkHome")}</span></CommonScrollAnimatedLink>
                                  </li>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/about-us" animation="slideDownLine"><span>{t("linkAboutUs")}</span></CommonScrollAnimatedLink>
                                  </li>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/works-default" animation="slideDownLine"><span>{t("linkCaseStudies")}</span></CommonScrollAnimatedLink>
                                  </li>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/services" animation="slideDownLine"><span>{t("linkServices")}</span></CommonScrollAnimatedLink>
                                  </li>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/team" animation="slideDownLine"><span>{t("linkOurTeam")}</span></CommonScrollAnimatedLink>
                                  </li>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/blog-standard" animation="slideDownLine"><span>{t("linkInsights")}</span></CommonScrollAnimatedLink>
                                  </li>
                                  <li>
                                    <CommonScrollAnimatedLink className="anim-uni-slide-down" href="/contact" animation="slideDownLine"><span>{t("linkContact")}</span></CommonScrollAnimatedLink>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Contact + Info */}
                      <div className="col-12 col-md-6 mxd-footer-nav02__item mxd-grid-item">
                        <div className="mxd-footer-nav02__block">
                          <div className="mxd-footer-nav02__title">
                            <CommonScrollAnimated
                              className="footer-data anim-uni-slide-down"
                              as="p"
                              animation="slideDownLine"
                            >
                              <span>{t("contactSection")}</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="mxd-footer-nav02__list">
                            <ul>
                              <li>
                                <CommonScrollAnimated
                                  className="anim-uni-slide-down"
                                  href={s.emailHref}
                                  as="a"
                                  animation="slideDownLine"
                                >
                                  <span>{s.email}</span>
                                </CommonScrollAnimated>
                              </li>
                              <li>
                                <CommonScrollAnimated
                                  className="anim-uni-slide-down"
                                  href={s.phoneHref}
                                  as="a"
                                  animation="slideDownLine"
                                >
                                  <span>{s.phone}</span>
                                </CommonScrollAnimated>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* Info — sabit sayfa linkleri, marka verisi değil */}
                        <div className="mxd-footer-nav02__block">
                          <div className="mxd-footer-nav02__title">
                            <CommonScrollAnimated
                              className="footer-data anim-uni-slide-down"
                              as="p"
                              animation="slideDownLine"
                            >
                              <span>{t("info")}</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="mxd-footer-nav02__list">
                            <ul>
                              <li>
                                <CommonScrollAnimatedLink
                                  className="anim-uni-slide-down"
                                  href="/pricing"
                                  animation="slideDownLine"
                                >
                                  <span>{t("linkPricing")}</span>
                                </CommonScrollAnimatedLink>
                              </li>
                              <li>
                                <CommonScrollAnimatedLink
                                  className="anim-uni-slide-down"
                                  href="/faq"
                                  animation="slideDownLine"
                                >
                                  <span>{t("linkFaq")}</span>
                                </CommonScrollAnimatedLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              {/* Ecosystem / Socials */}
              <div className="col-12 col-xl-6 mxd-footer__item mxd-grid-item">
                <div className="mxd-footer__socials-list">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12 mxd-footer-nav02__item">
                        <div className="mxd-footer-nav02__block">
                          <div className="mxd-footer-nav02__title">
                            <CommonScrollAnimated
                              className="footer-data anim-uni-slide-down"
                              as="p"
                              animation="slideDownLine"
                            >
                              <span>{t("ecosystem")}</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="mxd-footer-nav02__list">
                            {(s.socials ?? []).map((social, index) => (
                              <a
                                key={social.href}
                                className="socials-list__item slide-right-up"
                                href={social.href}
                                target="_blank"
                              >
                                <CommonScrollAnimated
                                  className="socials-list__divider divider-top anim-uni-clip-in"
                                  as="div"
                                  animation="clipIn"
                                />
                                <div className="socials-list__info">
                                  <CommonScrollAnimated
                                    className="socials-list__number anim-uni-slide-down"
                                    as="div"
                                    animation="slideDownLine"
                                  >
                                    <span>[{String(index + 1).padStart(2, "0")}]</span>
                                  </CommonScrollAnimated>
                                  <CommonScrollAnimated
                                    className="socials-list__name anim-uni-slide-down"
                                    as="div"
                                    animation="slideDownLine"
                                  >
                                    <span>{social.label}</span>
                                  </CommonScrollAnimated>
                                </div>
                                <CommonScrollAnimated
                                  className="socials-list__arrow anim-uni-slide-down"
                                  as="div"
                                  animation="slideDownLine"
                                >
                                  <ArrowIcon />
                                </CommonScrollAnimated>
                                <CommonScrollAnimated
                                  className="socials-list__divider divider-bottom anim-uni-clip-in"
                                  as="div"
                                  animation="clipIn"
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Navigation v2 End */}
        {/* Footer Block - Controls Start */}
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12 col-xl-6 mxd-footer__item" />
              <div className="col-12 col-xl-6 mxd-footer__item mxd-grid-item">
                <div className="mxd-footer__controls-middle">
                  <CommonScrollAnimated
                    className="anim-uni-slide-down"
                    as="div"
                    animation="slideDownLine"
                  >
                    <FooterBackToTop />
                  </CommonScrollAnimated>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Controls End */}
        {/* Footer Block - Fullwidth Text / Logo Start */}
        <div className="mxd-block">
          <div className="mxd-footer__fw-mark mxd-grid-item">
            <div className="fw-mark__wrap">
              <div
                className="fw-mark__content"
                style={{
                  fontSize: `${Math.round(Math.min(28, 165 / Math.max(displayName.length, 1)))}cqw`,
                }}
              >
                {s.logoImage ? (
                  /* Logo görseli yüklendiyse metin yerine görsel göster */
                  <Image
                    src={s.logoImage}
                    alt={s.logoImageAlt ?? displayName}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 60vw, 40vw"
                    style={{ width: "auto", height: "clamp(60px, 10vw, 140px)" }}
                    priority={false}
                  />
                ) : (
                  /* Logo görseli yoksa logotype metnine düş */
                  <CommonAnimatedText
                    as="span"
                    className="anim-uni-chars"
                    animation="animChars"
                  >
                    {displayName}
                  </CommonAnimatedText>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Fullwidth Text / Logo End */}
        {/* Footer Block - Data Start */}
        <div className="mxd-block">
          <div className="mxd-footer__data">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-footer__item mxd-grid-item">
                  <CommonScrollAnimated
                    className="mxd-footer__data-item anim-uni-fade-in"
                    as="div"
                    animation="fadeIn"
                  >
                    <p className="footer-data">
                      <span>{s.copyrightText}</span>
                    </p>
                  </CommonScrollAnimated>
                </div>
                <div className="col-12 col-xl-6 mxd-footer__item">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12 col-xl-6 mxd-grid-item">
                        <CommonScrollAnimated
                          className="mxd-footer__data-item anim-uni-fade-in"
                          as="div"
                          animation="fadeIn"
                        >
                          <p className="footer-data">
                            <span>
                              React Nextjs Template by&nbsp;
                              <a
                                href="https://themeforest.net/user/ib-themes"
                                target="_blank"
                              >
                                <TextScramble className="mxd-scramble">
                                  IB Themes
                                </TextScramble>
                              </a>
                            </span>
                          </p>
                        </CommonScrollAnimated>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-item">
                        <CommonScrollAnimated
                          className="mxd-footer__data-item anim-uni-fade-in justify-end"
                          as="div"
                          animation="fadeIn"
                        >
                          <p className="footer-data">
                            <span>©{new Date().getFullYear()}</span>
                          </p>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Data End */}
      </div>
    </BlurSection>
  );
}
