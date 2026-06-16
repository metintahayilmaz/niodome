import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";
import type { NextProjectRef } from "@/types/project";

type Props = {
  nextProject?: NextProjectRef;
};

const LOCAL_NEXT: NextProjectRef = {
  slug: "",
  title: "Solei - interactive concept",
  imageSrc: "/img/works/project-details/next01.webp",
  cursorText: "Solei",
};

export default function NextProjectLink({ nextProject }: Props) {
  const next = nextProject ?? LOCAL_NEXT;
  const href = next.slug ? `/works/${next.slug}` : "#";
  const cursorText = next.cursorText ?? next.title;
  const imageSrc = next.imageSrc ?? LOCAL_NEXT.imageSrc!;

  // Başlığın son kelimesini <span> yapmak için başlığı böl
  const parts = next.title.trim().split(" ");
  const lastWord = parts.pop() ?? "";
  const mainTitle = parts.join(" ");

  return (
    <>
      <BlurSection className="mxd-section padding-top-title">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-block">
            <div className="mxd-next-prj">
              <a
                className="mxd-next-prj__data active-cursor-accent"
                data-cursor-text={cursorText}
                href={href}
              >
                <div className="mxd-next-prj__info">
                  <div className="mxd-next-prj__caption">
                    <CommonAnimatedText as="p" className="mxd-split-lines" animation="splitLines">
                      Next project
                    </CommonAnimatedText>
                  </div>
                  <div className="mxd-next-prj__name">
                    <CommonAnimatedText as="p" className="mxd-split-lines" animation="splitLines">
                      {mainTitle} <span>{lastWord}</span>
                    </CommonAnimatedText>
                  </div>
                </div>
                <div className="mxd-next-prj__arrow mxd-flip-arrow">
                  <div className="arrow-container-1">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 259 260" enableBackground="new 0 0 259 260" xmlSpace="preserve">
                      <path d="M143.9,0v28.8h-28.8V0H143.9z M143.9,28.8v28.8h28.8V28.8H143.9z M172.7,57.6v28.8h28.8V57.6H172.7z M230.2,115.2V86.4h-28.8v28.8H0V144h201.4v28.8h28.8V144H259v-28.8H230.2z M172.7,201.6h28.8v-28.8h-28.8V201.6z M143.9,230.4h28.8v-28.8h-28.8V230.4z M114.3,260h28.8v-28.8h-28.8V260z" />
                    </svg>
                  </div>
                  <div className="arrow-container-2" />
                </div>
              </a>
              <a
                className="mxd-next-prj__media active-cursor-permanent"
                data-cursor-text={cursorText}
                href={href}
              >
                <div className="mxd-next-prj__image">
                  <UkiyoParallax className="parallax-img-small" scale={1.2} speed={1.5} externalRAF={false}>
                    <Image
                      alt={`Next project: ${next.title}`}
                      src={imageSrc}
                      width={1920}
                      height={1200}
                    />
                  </UkiyoParallax>
                </div>
              </a>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
