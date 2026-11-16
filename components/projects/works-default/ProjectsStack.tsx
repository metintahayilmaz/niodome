"use client";

import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import TextScramble from "@/components/animations/TextScramble";
import {
  initStackCardsEffects,
  initVelocityMarqueeRows,
  type StackCardMedia,
} from "@/lib/template/stackCardsEffects";
import type { ProjectStackItem } from "@/types/project";

type VideoSources = { type: string; src: string }[];

type Props = {
  /** Published project data only. */
  projects?: ProjectStackItem[];
};

export default function ProjectsStack({ projects }: Props) {
  const t = useTranslations("projectContent");
  const marqueeWords = t.raw("marqueeWords") as string[];
  const resolvedProjects: { key: string; title: string; media: "image" | "video"; imageSrc?: string; imageWidth?: number; imageHeight?: number; imageAlt?: string; coverClassName?: string; tags: string[]; poster?: string; sources?: VideoSources; href?: string; }[] =
    projects
      ? projects.map((p) => ({
          key: p._id ?? p.title,
          title: p.title,
          media: "image" as const,
          imageSrc: p.imageSrc,
          imageWidth: p.imageWidth || 1920,
          imageHeight: p.imageHeight || 1280,
          imageAlt: p.imageAlt || p.title,
          coverClassName: p.coverClassName,
          tags: p.tags ?? [],
          href: p.href,
        }))
      : [];
  const topRefs = useRef<HTMLDivElement[]>([]);
  const bottomRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const cardWrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardDescriptionRefs = useRef<HTMLDivElement[]>([]);
  const cardTitleRefs = useRef<HTMLParagraphElement[]>([]);
  const cardCoverRefs = useRef<HTMLDivElement[]>([]);
  const cardImageWrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardMediaRefs = useRef<StackCardMedia[]>([]);
  const introMarqueeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    return initVelocityMarqueeRows(topRefs.current, bottomRefs.current);
  }, []);

  useLayoutEffect(() => {
    return initStackCardsEffects({
      cards: cardRefs.current,
      cardWrappers: cardWrapperRefs.current,
      cardDescriptions: cardDescriptionRefs.current,
      cardTitleParagraphs: cardTitleRefs.current,
      cardCovers: cardCoverRefs.current,
      cardImageWrappers: cardImageWrapperRefs.current,
      cardMedias: cardMediaRefs.current,
      introMarquee: introMarqueeRef.current,
    });
  }, []);

  return (
    <>
      <div id="portfolio" className="mxd-section">
        <div className="mxd-container fullwidth-container">
          {/* Block - Progects Stack Start */}
          <div className="mxd-block">
            <div className="mxd-stack-cards">
              {resolvedProjects.map((card, index) => (
                <div
                  key={card.key}
                  className="mxd-stack-cards__card"
                  ref={(el) => {
                    if (!el) return;
                    cardRefs.current[index] = el;
                  }}
                >
                  {index === 0 ? (
                    <div
                      className="card__marquees"
                      ref={(el) => {
                        if (!el) return;
                        introMarqueeRef.current = el;
                      }}
                    >
                      <div className="marquee marquee-stack marquee--gsap muted-extra">
                        <div
                          className="marquee__top"
                          ref={(el) => {
                            if (!el) return;
                            topRefs.current[0] = el;
                          }}
                        >
                          {marqueeWords.map((word) => (
                            <div
                              key={`top-0-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="marquee__bottom"
                          ref={(el) => {
                            if (!el) return;
                            bottomRefs.current[0] = el;
                          }}
                        >
                          {marqueeWords.map((word) => (
                            <div
                              key={`bottom-0-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="marquee__top"
                          ref={(el) => {
                            if (!el) return;
                            topRefs.current[1] = el;
                          }}
                        >
                          {marqueeWords.map((word) => (
                            <div
                              key={`top-1-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="marquee__bottom"
                          ref={(el) => {
                            if (!el) return;
                            bottomRefs.current[1] = el;
                          }}
                        >
                          {marqueeWords.map((word) => (
                            <div
                              key={`bottom-1-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div
                    className="card__wrapper"
                    ref={(el) => {
                      if (!el) return;
                      cardWrapperRefs.current[index] = el;
                    }}
                  >
                    <div className="card__content">
                      <div
                        className="card__descr"
                        ref={(el) => {
                          if (!el) return;
                          cardDescriptionRefs.current[index] = el;
                        }}
                      >
                        <div className="card__tags">
                          {card.tags.map((tag) => (
                            <TextScramble
                              key={`${card.key}-${tag}`}
                              className="tag tag-m tag-permanent mxd-scramble"
                            >
                              {tag}
                            </TextScramble>
                          ))}
                        </div>
                        <div className="card__btngroup">
                          <Link
                            className="btn btn-line btn-line-permanent"
                            href={card.href ?? "/project-details"}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {t("viewProject")}
                            </TextScramble>
                          </Link>
                        </div>
                      </div>
                      <Link
                        className="card__title active-cursor-permanent"
                        data-cursor-text={t("viewProject")}
                        href={card.href ?? "/project-details"}
                      >
                        <p
                          className="permanent"
                          ref={(el) => {
                            if (!el) return;
                            cardTitleRefs.current[index] = el;
                          }}
                        >
                          {card.title}
                        </p>
                      </Link>
                    </div>
                    <div
                      className="card__image"
                      ref={(el) => {
                        if (!el) return;
                        cardImageWrapperRefs.current[index] = el;
                      }}
                    >
                      {card.media === "video" && card.poster && card.sources ? (
                        <AutoplayLoopVideo
                          className="video card__media"
                          poster={card.poster}
                          sources={card.sources}
                          ref={(el) => {
                            if (!el) return;
                            cardMediaRefs.current[index] = el;
                          }}
                        />
                      ) : card.imageSrc ? (
                        <Image
                          className="card__media"
                          alt={card.imageAlt ?? "Project Preview Image"}
                          src={card.imageSrc}
                          width={card.imageWidth ?? 1920}
                          height={card.imageHeight ?? 1280}
                          ref={(el) => {
                            if (!el) return;
                            cardMediaRefs.current[index] = el;
                          }}
                        />
                      ) : null}
                      <div
                        className={`card__cover${card.coverClassName ? ` ${card.coverClassName}` : ""}`}
                        ref={(el) => {
                          if (!el) return;
                          cardCoverRefs.current[index] = el;
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Block - Progects Stack End */}
        </div>
      </div>
    </>
  );
}
