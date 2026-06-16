import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import type { TeamMember } from "@/types/teamMember";

// Slot başına yerel avatar görseli (Sanity photo yoksa fallback)
const LOCAL_AVATARS = [
  "/img/avatars/800x800_ava-05.webp",
  "/img/avatars/800x800_ava-06.webp",
  "/img/avatars/800x800_ava-07.webp",
];

// Fallback: Sanity boşsa local data
const LOCAL_MEMBERS: TeamMember[] = [
  {
    _id: "local-tm-1",
    name: "Helen Pineapple",
    role: "Co-founder & head of design",
    socials: [
      { platform: "Linkedin", href: "https://www.linkedin.com/" },
      { platform: "Behance",  href: "https://www.behance.net/" },
    ],
  },
  {
    _id: "local-tm-2",
    name: "Alex Tomato",
    role: "SEO, Brand manager",
    socials: [
      { platform: "Linkedin", href: "https://www.linkedin.com/" },
      { platform: "Behance",  href: "https://www.behance.net/" },
    ],
  },
  {
    _id: "local-tm-3",
    name: "Jenny Berry",
    role: "Frontend Developer",
    socials: [
      { platform: "Linkedin", href: "https://www.linkedin.com/" },
      { platform: "Behance",  href: "https://www.behance.net/" },
    ],
  },
];

type Props = {
  members?: TeamMember[];
};

export default function TeamGrid({ members }: Props) {
  const resolvedMembers =
    members && members.length > 0 ? members : LOCAL_MEMBERS;

  return (
    <>
      <BlurSection className="mxd-section padding-top-title padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title v02 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title pre-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-8 mxd-grid-item">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="reveal-type"
                        animation="revealType"
                      >
                        Creative
                        <br />
                        leaders
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 mxd-grid-item">
                    <div className="mxd-section-title__data top-controls">
                      <CommonScrollAnimated
                        className="mxd-section-title__controls anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <Link
                          className="btn btn-line btn-line-default"
                          href={`/team`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Our Team
                          </TextScramble>
                        </Link>
                      </CommonScrollAnimated>
                      <div className="mxd-section-title__caption no-max-width pre-controls">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large mxd-split-lines"
                          animation="splitLines"
                        >
                          Technical experts dedicated to delivering{" "}
                          <span>
                            flawless, high-performing digital experiences.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v02 End */}
          {/* Block - Team Grid x3 Start */}
          <div className="mxd-block">
            <div className="mxd-team-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {resolvedMembers.map((member, i) => {
                    const avatarSrc = member.photo ?? LOCAL_AVATARS[i % LOCAL_AVATARS.length];
                    return (
                      <CommonCardBatchAnimated
                        key={member._id}
                        className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-team-grid__item animate-card-3"
                        as="div"
                        columns={3}
                      >
                        <div className="mxd-team-grid__inner">
                          <div className="mxd-team-grid__media">
                            <div className="mxd-team-grid__photo">
                              <Image
                                alt={member.name}
                                src={avatarSrc}
                                width={800}
                                height={800}
                              />
                            </div>
                            <div className="mxd-team-grid__socials">
                              {member.socials.map((s) => (
                                <a
                                  key={s.platform}
                                  href={s.href}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="tag tag-m tag-bg permanent"
                                >
                                  <TextScramble className="mxd-scramble">
                                    {s.platform}
                                  </TextScramble>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className="mxd-team-grid__caption">
                            <div className="mxd-team-grid__name">
                              <p className="project-name-m">{member.name}</p>
                            </div>
                            <div className="mxd-team-grid__position">
                              <span className="tag tag-m tag-medium">
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Block - Team Grid x3 End */}
        </div>
      </BlurSection>
    </>
  );
}
