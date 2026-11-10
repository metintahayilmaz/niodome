"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "@/components/common/LocalizedLink";
import { useTranslations } from "next-intl";
import { siteSettings } from "@/data/siteSettings";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import {
  useHeroBannersHover,
  type HeroBannerGroupRefs,
} from "@/hooks/useHeroBannersHover";
import { useMemo, useRef } from "react";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";

export default function InnerHeadline({ images = [] }: { images?: { src: string; alt: string }[] }) {
  const t = useTranslations("aboutContent");
  const bannersHoverRef = useRef<HTMLDivElement>(null);
  const trigger1Ref = useRef<HTMLAnchorElement>(null);
  const trigger2Ref = useRef<HTMLAnchorElement>(null);

  const heroBanner1_0 = useRef<HTMLDivElement>(null);
  const heroBanner1_1 = useRef<HTMLDivElement>(null);
  const heroBanner1_2 = useRef<HTMLDivElement>(null);
  const heroBanner1_3 = useRef<HTMLDivElement>(null);
  const heroBanner2_0 = useRef<HTMLDivElement>(null);
  const heroBanner2_1 = useRef<HTMLDivElement>(null);
  const heroBanner2_2 = useRef<HTMLDivElement>(null);
  const heroBanner2_3 = useRef<HTMLDivElement>(null);

  const heroBannerGroups = useMemo((): readonly HeroBannerGroupRefs[] => {
    return [
      {
        triggerRef: trigger1Ref,
        bannerRefs: [
          heroBanner1_0,
          heroBanner1_1,
          heroBanner1_2,
          heroBanner1_3,
        ],
      },
      {
        triggerRef: trigger2Ref,
        bannerRefs: [
          heroBanner2_0,
          heroBanner2_1,
          heroBanner2_2,
          heroBanner2_3,
        ],
      },
    ];
  }, [
    trigger1Ref,
    trigger2Ref,
    heroBanner1_0,
    heroBanner1_1,
    heroBanner1_2,
    heroBanner1_3,
    heroBanner2_0,
    heroBanner2_1,
    heroBanner2_2,
    heroBanner2_3,
  ]);

  useHeroBannersHover(bannersHoverRef, heroBannerGroups);

  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section loading-wrap">
          <div className="mxd-container fullwidth-container">
            {/* Block - Inner Headline v06 Start */}
            <div className="mxd-block">
              <div className="inner-headline fullheight">
                {/* absolute centered headline */}
                <div className="inner-headline__absolute">
                  <div className="mxd-container">
                    <div className="inner-headline__centered">
                      <CommonLoadItem index={0}>
                        <div className="inner-headline__link loading-item">
                          <SmoothAnchorLink
                            className="btn btn-line btn-line-default"
                            targetId="process"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {t("studio")}
                            </TextScramble>
                          </SmoothAnchorLink>
                        </div>
                      </CommonLoadItem>
                      <CommonLoadItem index={1}>
                        <div
                          ref={bannersHoverRef}
                          className="inner-headline__title banners-hover centered loading-item"
                        >
                          <h1 className="small">
                            {t("lead")}{" "}
                            <Link
                              ref={trigger1Ref}
                              className="inner-headline__trigger banners-trigger-1"
                              href="/works"
                            >
                              {t("experiences")}
                            </Link>{" "}
                            {t("and")}{" "}
                            <Link
                              ref={trigger2Ref}
                              className="inner-headline__trigger banners-trigger-2"
                              href="/works"
                            >
                              {t("solutions")}
                            </Link>
                          </h1>
                        </div>
                      </CommonLoadItem>
                      {/* banners */}
                      <div
                        ref={heroBanner1_0}
                        className="headline-banner-01 landscape image-01"
                      >
                        {images[0] && <Image
                          alt=""
                          src={images[0].src}
                          width={640}
                          height={480}
                        />}
                      </div>
                      <div
                        ref={heroBanner1_1}
                        className="headline-banner-01 portrait image-02"
                      >
                        {images[1] && <Image
                          alt=""
                          src={images[1].src}
                          width={560}
                          height={700}
                        />}
                      </div>
                      <div
                        ref={heroBanner1_2}
                        className="headline-banner-01 landscape image-03"
                      >
                        {images[2] && <Image
                          alt=""
                          src={images[2].src}
                          width={640}
                          height={480}
                        />}
                      </div>
                      <div
                        ref={heroBanner1_3}
                        className="headline-banner-01 portrait image-04"
                      >
                        {images[3] && <Image
                          alt=""
                          src={images[3].src}
                          width={560}
                          height={700}
                        />}
                      </div>
                      <div
                        ref={heroBanner2_0}
                        className="headline-banner-02 portrait image-05"
                      >
                        {images[4] && <Image
                          alt=""
                          src={images[4].src}
                          width={560}
                          height={700}
                        />}
                      </div>
                      <div
                        ref={heroBanner2_1}
                        className="headline-banner-02 landscape image-06"
                      >
                        {images[5] && <Image
                          alt=""
                          src={images[5].src}
                          width={640}
                          height={480}
                        />}
                      </div>
                      <div
                        ref={heroBanner2_2}
                        className="headline-banner-02 portrait image-07"
                      >
                        {images[6] && <Image
                          alt=""
                          src={images[6].src}
                          width={560}
                          height={700}
                        />}
                      </div>
                      <div
                        ref={heroBanner2_3}
                        className="headline-banner-02 landscape image-08"
                      >
                        {images[7] && <Image
                          alt=""
                          src={images[7].src}
                          width={640}
                          height={480}
                        />}
                      </div>
                    </div>
                  </div>
                </div>
                {/* bottom data line */}
                <div className="inner-headline__dataline">
                  <div className="mxd-container">
                    <div className="headline-dataline">
                      <div className="headline-dataline__socials">
                        <ul className="mxd-socials-line centered-mobile">
                          {siteSettings.socials.map((social, index) => (
                            <CommonLoadItem index={index + 2} key={social.href}>
                              <li className="loading-item">
                                <a className="mxd-socials-line__link" href={social.href} target="_blank" rel="noopener noreferrer">
                                  <TextScramble className="mxd-scramble">{social.label}</TextScramble>
                                </a>
                              </li>
                            </CommonLoadItem>
                          ))}
                        </ul>
                      </div>
                      <CommonLoadItem index={7}>
                        <div className="headline-dataline__controls loading-item">
                          <SmoothAnchorLink
                            className="btn btn-line-icon btn-line-icon-small btn-line-default slide-down"
                            targetId="process"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {t("scroll")}
                            </TextScramble>
                            <i>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 18 18"
                              >
                                <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                              </svg>
                            </i>
                          </SmoothAnchorLink>
                        </div>
                      </CommonLoadItem>
                    </div>
                  </div>
                </div>
                <div className="mxd-container grid-l-container">
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
                                    {t("home")}
                                  </TextScramble>
                                </Link>
                              </span>
                              <span className="current-item">{t("about")} </span>
                            </div>
                          </div>
                        </CommonLoadFade>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v06 End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
