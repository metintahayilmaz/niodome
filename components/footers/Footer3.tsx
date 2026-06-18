import Image from "next/image";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "../animations/CommonAnimatedText";
import {
  CommonScrollAnimated,
  CommonScrollAnimatedLink,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import FooterBackToTop from "@/components/footers/FooterBackToTop";
import { siteSettings as localSettings } from "@/data/siteSettings";
import type { SiteSettingsData } from "@/types/siteSettings";

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

export default function Footer3({ name, settings }: Props) {
  // Sanity verisi gelmezse local data'ya dön
  const s = settings ?? localSettings;

  // Büyük footer metni: açık name prop varsa o, yoksa logotype
  const displayName = name ?? s.logotype;

  return (
    <BlurSection as="footer" className="mxd-footer">
      <div className="mxd-container grid-l-container">
        {/* Footer Block - Navigation v1 Start */}
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks mxd-grid-item">
            <div className="footer-blocks__nav-v01">
              <ul className="footer-nav-v01">
                {(s.navLinks ?? []).map((link) => (
                  <li key={link.href} className="footer-nav-v01__item">
                    <CommonScrollAnimatedLink
                      className="anim-uni-slide-down"
                      href={link.href}
                      animation="slideDownLine"
                    >
                      <TextScramble className="mxd-scramble mxd-slide-down">
                        {link.label}
                      </TextScramble>
                    </CommonScrollAnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Footer Block - Navigation v1 End */}
        {/* Footer Block - Info Columns Start */}
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <div className="footer-blocks__data justify-start">
                <p className="footer-data">
                  <CommonScrollAnimated
                    className="anim-uni-slide-down"
                    href={s.emailHref}
                    as="a"
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble">
                      {s.email}
                    </TextScramble>
                  </CommonScrollAnimated>
                </p>
                <p className="footer-data">
                  <CommonScrollAnimated
                    className="anim-uni-slide-down"
                    href={s.phoneHref}
                    as="a"
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble">
                      {s.phone}
                    </TextScramble>
                  </CommonScrollAnimated>
                </p>
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                >
                  <span>{s.address}</span>
                </CommonScrollAnimated>
              </div>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <div className="footer-blocks__data justify-end">
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                >
                  <span className="mxd-slide-down">
                    ©{new Date().getFullYear()}
                  </span>
                </CommonScrollAnimated>
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                >
                  <span className="mxd-slide-down">
                    {s.copyrightText}
                  </span>
                </CommonScrollAnimated>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Info Columns End */}
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
        {/* Footer Block - Links Start */}
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks bottom-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <div className="footer-blocks__socials">
                <CommonScrollAnimated
                  className="mxd-socials-line anim-uni-fade-in"
                  as="ul"
                  animation="fadeIn"
                >
                  {(s.socials ?? []).map((social) => (
                    <li key={social.href}>
                      <a
                        className="mxd-socials-line__link"
                        href={social.href}
                        target="_blank"
                      >
                        <TextScramble className="mxd-scramble">
                          {social.label}
                        </TextScramble>
                      </a>
                    </li>
                  ))}
                </CommonScrollAnimated>
              </div>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <CommonScrollAnimated
                className="footer-blocks__controls anim-uni-fade-in"
                as="div"
                animation="fadeIn"
              >
                <FooterBackToTop />
              </CommonScrollAnimated>
            </div>
          </div>
        </div>
        {/* Footer Block - Links End */}
      </div>
    </BlurSection>
  );
}
