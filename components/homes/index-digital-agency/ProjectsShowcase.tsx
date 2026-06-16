"use client";
import Link from "next/link";
import Image from "next/image";
import TextScramble from "@/components/animations/TextScramble";
import { digitalDesignerProjectsShowcase } from "@/data/projects";
import type { ProjectShowcaseItem } from "@/types/project";
import CommonProjectsClip, {
  CommonProjectsClipBackground,
  CommonProjectsClipItem,
  CommonProjectsClipTrigger,
} from "@/components/animations/CommonProjectsClip";

type Props = {
  /** Sanity'den gelen projeler. Verilmezse veya boşsa local data kullanılır. */
  projects?: ProjectShowcaseItem[];
};

export default function ProjectsShowcase({ projects }: Props) {
  // Fallback: Sanity boş / erişilemezse local data'ya dön
  const resolvedProjects = projects && projects.length > 0 ? projects : digitalDesignerProjectsShowcase;
  return (
    <>
      <div className="mxd-section">
        {/* Block - Projects ClipPath Showcase Start */}
        <CommonProjectsClip className="mxd-showcase-clip">
          {/* backgrounds */}
          <div>
            {resolvedProjects.map((project, index) => (
              <CommonProjectsClipTrigger
                key={project._id ?? `bg-${index}`}
                index={index}
                className="mxd-showcase-clip__trigger"
              >
                <CommonProjectsClipBackground
                  as={Image}
                  index={index}
                  className="mxd-showcase-clip__bg"
                  alt={project.cardImageAlt}
                  src={project.bgImageSrc}
                  width={1920}
                  height={1280}
                />
                <div className="mxd-showcase-clip__cover" />
              </CommonProjectsClipTrigger>
            ))}
          </div>
          {/* items */}
          <div className="mxd-showcase-clip__track">
            <div className="mxd-showcase-clip__sticky">
              {resolvedProjects.map((project, index) => (
                <CommonProjectsClipItem
                  key={project._id ? `item-${project._id}` : `item-${index}`}
                  as={Link}
                  index={index}
                  className="mxd-showcase-clip__item active-cursor-permanent"
                  href={project.href}
                  data-cursor-text={project.cursorText}
                >
                  <p className="mxd-showcase-clip__title permanent">
                    {project.titleLines[0]}
                    <br />
                    {project.titleLines[1]}
                  </p>
                  <Image
                    className="mxd-showcase-clip__image image-auto"
                    alt={project.cardImageAlt}
                    src={project.cardImageSrc}
                    width={700}
                    height={700}
                  />
                  <div className="mxd-showcase-clip__tags">
                    {project.tags.map((tag) => (
                      <TextScramble
                        key={`${project._id ?? index}-${tag}`}
                        className="tag tag-m tag-permanent mxd-scramble"
                      >
                        {tag}
                      </TextScramble>
                    ))}
                  </div>
                </CommonProjectsClipItem>
              ))}
            </div>
          </div>
        </CommonProjectsClip>
        {/* Block - Projects ClipPath Showcase End */}
      </div>
    </>
  );
}
