"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We provide a comprehensive range of digital solutions, including website design and development, branding, digital marketing, e-commerce solutions, SEO, content creation, and ongoing support. Whether you need a new website, a brand refresh, or a digital marketing strategy, our team is equipped to help your business grow online.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines vary based on project complexity. A simple website may take a few weeks, while a full-scale brand identity or custom development project could take a few months. We provide clear deadlines and keep you updated at every stage.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "Yes! We collaborate with startups, small businesses, and large enterprises across various industries. No matter your company's size or stage, we tailor our services to meet your specific needs and goals.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We specialize in website redesigns to improve user experience, modernize your brand, and optimize performance. We'll work with you to understand your vision and business objectives, then transform your current site into a powerful digital asset.",
  },
  {
    question: "Can you help improve my website's search engine ranking?",
    answer:
      "Our SEO experts use proven strategies including keyword research, on-page optimization, link building, and content creation to boost your website's visibility and ranking on search engines like Google.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes! We offer ongoing website maintenance, performance monitoring, and digital marketing support to ensure your online presence remains effective and up-to-date. Our support packages can be tailored to your needs.",
  },
  {
    question: "How do we get started?",
    answer:
      "Getting started is easy! Simply contact us through our website or give us a call. We'll schedule a discovery call to discuss your goals, challenges, and project requirements. From there, we'll provide a proposal outlining our recommended approach, timeline, and next steps.",
  },
];

export default function InnerHeadline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const targets = contentRefs.current;

    targets.forEach((content, idx) => {
      if (!content) return;
      gsap.killTweensOf(content);

      const isOpen = idx === openIndex;
      const targetPaddingBottom = window.matchMedia("(min-width: 768px)")
        .matches
        ? "5.4rem"
        : "3rem";

      if (isOpen) {
        gsap.set(content, {
          display: "flex",
          height: "auto",
          paddingTop: 0,
          paddingBottom: targetPaddingBottom,
        });
        const height = content.scrollHeight;
        gsap.fromTo(
          content,
          { height: 0, paddingTop: 0, paddingBottom: 0 },
          {
            height,
            paddingTop: 0,
            paddingBottom: targetPaddingBottom,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(content, { height: "auto" });
            },
          },
        );
      } else {
        if (getComputedStyle(content).display === "none") return;
        gsap.set(content, {
          height: content.scrollHeight,
          paddingTop: 0,
          paddingBottom: targetPaddingBottom,
        });
        gsap.to(content, {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(content, { display: "none", height: "auto" });
          },
        });
      }
    });

    return () => {
      targets.forEach((content) => {
        if (!content) return;
        gsap.killTweensOf(content);
      });
    };
  }, [openIndex]);

  const onToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section padding-bottom-default">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v04 Start */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline">
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
                                  Home
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">FAQ </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-medium-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-6 mxd-grid-item">
                              <div className="inner-headline__title pre-subtitle-medium">
                                <CommonAnimatedText
                                  as="h1"
                                  className="medium loading-split"
                                  animation="splitLinesLoad"
                                >
                                  FAQ
                                </CommonAnimatedText>
                              </div>
                              <div className="inner-headline__subtitle">
                                <CommonAnimatedText
                                  as="p"
                                  className="loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Everything <span>you need to know</span>
                                </CommonAnimatedText>
                              </div>
                            </div>
                            <div className="col-12 col-xl-6 mxd-grid-item">
                              {/* split header caption */}
                              <div className="inner-headline__caption split-caption pre-grid">
                                <CommonAnimatedText
                                  as="p"
                                  className="t-bold t-large loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Have questions? We&apos;ve got the answers!
                                  Here, you&apos;ll find clear and concise
                                  information{" "}
                                  <span>
                                    about our services, process, and what to
                                    expect when working with us. If you need
                                    more details, feel free to reach out!
                                  </span>
                                </CommonAnimatedText>
                              </div>
                              {/* split header grid block */}
                              {/* Block - Accordion Start */}
                              <CommonLoadFade index={1}>
                                <div className="mxd-accordion loading-fade">
                                  {FAQ_ITEMS.map((item, idx) => {
                                    const isOpen = openIndex === idx;
                                    return (
                                      <div
                                        key={item.question}
                                        className="mxd-accordion__item"
                                      >
                                        <CommonScrollAnimated
                                          className="mxd-accordion__divider anim-uni-in-up"
                                          as="div"
                                          animation="inUp"
                                        />
                                        <CommonScrollAnimated
                                          className={`mxd-accordion__title anim-uni-in-up ${isOpen ? "accordion-active accordion-opened" : ""}`}
                                          as="div"
                                          animation="inUp"
                                          role="button"
                                          tabIndex={0}
                                          aria-expanded={isOpen}
                                          onClick={() => onToggle(idx)}
                                          onKeyDown={(e) => {
                                            if (
                                              e.key === "Enter" ||
                                              e.key === " "
                                            ) {
                                              e.preventDefault();
                                              onToggle(idx);
                                            }
                                          }}
                                        >
                                          <p>{item.question}</p>
                                          <div
                                            className={`mxd-accordion__arrow ${isOpen ? "accordion-rotate" : ""}`}
                                          >
                                            <i className="mxd-accordion__close">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={18}
                                                height={18}
                                                version="1.1"
                                                viewBox="0 0 18 18"
                                              >
                                                <path d="M3.6,0v3.6H0V0h3.6ZM18,18v-3.6h-3.6v3.6h3.6ZM14.4,7.2v-3.6h-3.6v3.6h-3.6v-3.6h-3.6v3.6h3.6v3.6h3.6v3.6h3.6v-3.6h-3.6v-3.6h3.6ZM18,0h-3.6v3.6h3.6V0ZM0,18h3.6v-3.6H0v3.6ZM3.6,14.4h3.6v-3.6h-3.6v3.6Z" />
                                              </svg>
                                            </i>
                                            <i className="mxd-accordion__plus">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={18}
                                                height={18}
                                                version="1.1"
                                                viewBox="0 0 18 18"
                                              >
                                                <path d="M18,7.2v3.6h-7.2v7.2h-3.6v-7.2H0v-3.6h7.2V0h3.6v7.2h7.2Z" />
                                              </svg>
                                            </i>
                                          </div>
                                        </CommonScrollAnimated>
                                        <div
                                          ref={(el) => {
                                            contentRefs.current[idx] = el;
                                          }}
                                          className="mxd-accordion__content"
                                        >
                                          <p className="t-medium mxd-accordion__text">
                                            {item.answer}
                                          </p>
                                        </div>
                                        <CommonScrollAnimated
                                          className="mxd-accordion__divider anim-uni-in-up"
                                          as="div"
                                          animation="inUp"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </CommonLoadFade>
                              {/* Block - Accordion End */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v04 End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
