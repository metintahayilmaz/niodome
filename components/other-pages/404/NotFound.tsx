"use client";

import { initVelocityMarqueeRows } from "@/lib/template/stackCardsEffects";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";

export default function NotFound() {
  const t = useTranslations("notFound");
  const topRefs = useRef<HTMLDivElement[]>([]);
  const bottomRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    return initVelocityMarqueeRows(topRefs.current, bottomRefs.current);
  }, []);

  return (
    <CommonLoadAnimation>
      <>
        <div className="mxd-section mxd-section-fullscreen loading-wrap">
          <div className="mxd-error">
            {/* Block - 404 Background Start */}
            <div className="mxd-error__background">
              <div className="card__marquees">
                {/* Marquee Divider Start */}
                <div className="marquee marquee-stack marquee--gsap muted-extra">
                  <div
                    className="marquee__top"
                    ref={(el) => {
                      if (el) topRefs.current[0] = el;
                    }}
                  >
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="marquee__bottom"
                    ref={(el) => {
                      if (el) bottomRefs.current[0] = el;
                    }}
                  >
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="marquee__top"
                    ref={(el) => {
                      if (el) topRefs.current[1] = el;
                    }}
                  >
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="marquee__bottom"
                    ref={(el) => {
                      if (el) bottomRefs.current[1] = el;
                    }}
                  >
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        {t("marquee")}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Marquee Divider End */}
              </div>
            </div>
            {/* Block - 404 Background End */}
            <div className="mxd-container fullscreen-container">
              <div className="mxd-block mxd-block-fullscreen centered-content">
                {/* Block - 404 Content Start */}
                <div className="mxd-error__content">
                  <div className="mxd-error__number">
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                    <CommonLoadFade index={0}>
                      <div className="mxd-error__image image-1 mxd-move-slow loading-fade">
                        <Image
                          alt="Azurio Template Sample Image"
                          src="/img/illustrations/404_03.webp"
                          width={600}
                          height={251}
                        />
                      </div>
                    </CommonLoadFade>
                    <div className="mxd-error__image image-2">
                      <Image
                        alt="Azurio Template Sample Image"
                        src="/img/illustrations/404_01.webp"
                        width={400}
                        height={480}
                      />
                    </div>
                    <div className="mxd-error__image image-3">
                      <Image
                        alt="Azurio Template Sample Image"
                        src="/img/illustrations/404_02.webp"
                        width={485}
                        height={400}
                      />
                    </div>
                    <CommonLoadFade index={1}>
                      <div className="mxd-error__image image-4 mxd-move-slow loading-fade">
                        <Image
                          alt="Azurio Template Sample Image"
                          src="/img/illustrations/404_04.webp"
                          width={485}
                          height={203}
                        />
                      </div>
                    </CommonLoadFade>
                  </div>
                  <div className="mxd-error__caption">
                    <CommonAnimatedText
                      as="p"
                      className="loading-split"
                      animation="splitLinesLoad"
                    >
                      {t("caption")} <span>{t("sorry")}</span>
                    </CommonAnimatedText>
                    <CommonLoadFade index={2}>
                      <Link
                        className="btn btn-default-icon btn-default-icon-left btn-default-outline slide-left loading-fade"
                        href={`/`}
                      >
                        <i className="btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 18 18"
                          >
                            <path d="M7.2,18v-3.6h3.6v3.6h-3.6ZM3.6,7.2H0v3.6h3.6v3.6h3.6v-3.6h10.8v-3.6H7.2v-3.6h-3.6s0,3.6,0,3.6ZM7.2,3.6h3.6V0h-3.6v3.6Z" />
                          </svg>
                        </i>
                        <TextScramble className="btn-caption mxd-scramble">
                          {t("goHome")}
                        </TextScramble>
                      </Link>
                    </CommonLoadFade>
                  </div>
                </div>
                {/* Block - 404 Content End */}
                {/* Block - 404 Data Line Start */}
                <CommonLoadFade index={3}>
                  <div className="mxd-error__dataline loading-fade">
                    <div className="mxd-error__dataitem">
                      <span className="tag tag-m">
                        Copyright
                        <a href="#0" target="_blank">
                          <TextScramble className="mxd-scramble">
                            Azurio
                          </TextScramble>
                        </a>
                        . All rights reserved
                      </span>
                    </div>
                    <div className="mxd-error__dataitem">
                      <span className="tag tag-m">
                        React Nextjs Template crafted with
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            version="1.1"
                            viewBox="0 0 18 18"
                          >
                            <path d="M2.6,6.4v2.6H0V3.9h2.6v2.6ZM15.4,3.9v5.1h2.6V3.9h-2.6ZM12.9,11.6h2.6v-2.6h-2.6v2.6ZM2.6,9v2.6h2.6v-2.6h-2.6ZM10.3,14.1h2.6v-2.6h-2.6v2.6ZM5.1,11.6v2.6h2.6v-2.6h-2.6ZM7.7,3.9V1.3H2.6v2.6h5.1ZM15.4,3.9V1.3h-5.1v2.6h5.1ZM10.3,6.4v-2.6h-2.6v2.6h2.6ZM7.7,16.7h2.6v-2.6h-2.6v2.6Z" />
                          </svg>
                        </i>
                        by
                        <a
                          href="https://themeforest.net/user/ib-themes"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            IB Themes
                          </TextScramble>
                        </a>
                      </span>
                    </div>
                    <div className="mxd-error__dataitem">
                      <span className="tag tag-m">©{new Date().getFullYear()}</span>
                    </div>
                  </div>
                </CommonLoadFade>
                {/* Block - 404 Data Line End */}
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLoadAnimation>
  );
}
