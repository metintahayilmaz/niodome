"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import type { ProjectListItem } from "@/types/project";

// Yerel fallback veri — Sanity boşken kullanılır
const LOCAL_PROJECTS: ProjectListItem[] = [
  {
    _id: "local-pr01",
    titleLines: ["Creative", "studio template"],
    tags: ["Tech", "Brand", "Marketing", "Website"],
    cardImageSrc: "/img/works/showcase-archive/500x500_pr01.webp",
    href: "/works/creative-studio-template",
  },
  {
    _id: "local-pr02",
    titleLines: ["Editorial", "illustrations set"],
    tags: ["Fashion", "Midjourney", "Illustrations", "Design"],
    cardImageSrc: "/img/works/showcase-archive/500x500_pr02.webp",
    href: "/works/editorial-illustrations-set",
  },
  {
    _id: "local-pr03",
    titleLines: ["Interactive", "concept"],
    tags: ["Pets", "Brand", "Social Media", "Packaging"],
    cardImageSrc: "/img/works/showcase-archive/500x500_pr03.webp",
    href: "/works/interactive-concept",
  },
  {
    _id: "local-pr04",
    titleLines: ["Mobile", "app design"],
    tags: ["Mobile", "UI/UX", "Design", "Android"],
    cardImageSrc: "/img/works/showcase-archive/500x500_pr04.webp",
    href: "/project-details",
  },
  {
    _id: "local-pr05",
    titleLines: ["Illustrations", "set for print"],
    tags: ["Pets", "Illustration", "Design", "Packaging"],
    cardImageSrc: "/img/works/showcase-archive/500x500_pr05.webp",
    href: "/project-details",
  },
];

type Props = {
  /** Sanity'den gelen proje listesi. Verilmezse yerel LOCAL_PROJECTS kullanılır. */
  projects?: ProjectListItem[];
};

export default function ProjectsList({ projects }: Props) {
  const resolvedProjects = projects && projects.length > 0 ? projects : LOCAL_PROJECTS;

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
                          Projects archive
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
                          <SmoothAnchorLink
                            className="btn btn-line btn-line-default"
                            targetId="testimonials"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              Clients Approve
                            </TextScramble>
                          </SmoothAnchorLink>
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
                      data-cursor-text="View Work"
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
