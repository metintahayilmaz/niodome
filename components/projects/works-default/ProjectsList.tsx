"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "@/components/common/LocalizedLink";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import { useTranslations } from "next-intl";
import type { ProjectListItem } from "@/types/project";

// Yerel fallback veri — Sanity boşken kullanılır
type Props = {
  /** Sanity'den gelen proje listesi. Verilmezse yerel LOCAL_PROJECTS kullanılır. */
  projects?: ProjectListItem[];
};

export default function ProjectsList({ projects }: Props) {
  const t = useTranslations("projectContent");
  const resolvedProjects = projects ?? [];

  if (!resolvedProjects.length) return null;

  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v03 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          {t("projectArchive")}
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls pre-title justify-end anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href="/contact"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {t("discussProject")}
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v03 End */}
            {/* Block - Projects List Start */}
            <div className="mxd-block">
              <div className="mxd-projects-list no-margin-bottom">
                {resolvedProjects.map((project) => {
                  const niche = project.tags[0] ?? "";
                  const metaTags = project.tags.slice(1, 4);
                  const titleLine0 = project.titleLines[0] ?? "";
                  const titleLine1 = project.titleLines[1] ?? "";
                  return (
                    <Link
                      key={project._id}
                      className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                      data-cursor-image={project.cardImageSrc ?? ""}
                      data-cursor-text={t("viewProject")}
                      href={project.href ?? "/project-details"}
                    >
                      <div className="mxd-projects-list__divider top" />
                      <div className="container-fluid px-0 mxd-projects-list__inner">
                        <div className="row gx-0">
                          <div className="col-12 col-xl-2 mxd-grid-padding">
                            <div className="mxd-projects-list__niche">
                              <TextScramble className="meta-niche mxd-scramble">
                                {niche}
                              </TextScramble>
                            </div>
                          </div>
                          <div className="col-12 col-xl-6 mxd-grid-padding">
                            <div className="mxd-projects-list__title">
                              <h3>
                                {titleLine0}{" "}
                                <span>{titleLine1}</span>
                              </h3>
                            </div>
                          </div>
                          <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                            <div className="mxd-projects-list__meta">
                              {metaTags.map((tag) => (
                                <TextScramble key={tag} className="meta-tag mxd-scramble">
                                  {tag}
                                </TextScramble>
                              ))}
                            </div>
                          </div>
                          <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                            <div className="mxd-projects-list__date" />
                          </div>
                        </div>
                      </div>
                      <div className="mxd-projects-list__divider bottom" />
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Block - Projects List End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
