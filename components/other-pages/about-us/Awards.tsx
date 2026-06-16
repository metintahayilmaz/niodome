import Link from "next/link";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
export default function Awards() {
  return (
    <>
      <div className="mxd-section padding-top-subtitle-mobile">
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
                        Awards &amp;
                        <br />
                        publications
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
                          href={`/works-default`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Case Studies
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
          {/* Block - Awards List Start */}
          <div className="mxd-block">
            <div className="mxd-awards">
              {/* awards item */}
              <a
                className="mxd-awards__item active-cursor-accent"
                data-cursor-text="Read Post"
                href="https://medium.com/"
                target="_blank"
              >
                <div className="container-fluid px-0 mxd-awards__inner">
                  <div className="row g-0 d-flex">
                    <div className="col-12 col-xl-4 order-2 order-xl-1 mxd-grid-item">
                      <div className="mxd-awards__title">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          Some article on Medium
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2 mxd-grid-item">
                      <div className="mxd-awards__image">
                        <Image
                          alt="Azurio Image"
                          src="/img/illustrations/awards01.webp"
                          width={1000}
                          height={455}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-3 mxd-grid-item">
                      <div className="mxd-awards__tags">
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          UI/UX design
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Development
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-4 mxd-grid-item">
                      <div className="mxd-awards__date">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          2026
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* awards item */}
              <a
                className="mxd-awards__item active-cursor-accent"
                data-cursor-text="See Page"
                href="https://www.awwwards.com/"
                target="_blank"
              >
                <div className="container-fluid px-0 mxd-awards__inner">
                  <div className="row g-0 d-flex">
                    <div className="col-12 col-xl-4 order-2 order-xl-1 mxd-grid-item">
                      <div className="mxd-awards__title">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          Awwwards nomination
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2 mxd-grid-item">
                      <div className="mxd-awards__image">
                        <Image
                          alt="Azurio Image"
                          src="/img/illustrations/awards02.webp"
                          width={1000}
                          height={455}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-3 mxd-grid-item">
                      <div className="mxd-awards__tags">
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          UI/UX
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Frontend
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-4 mxd-grid-item">
                      <div className="mxd-awards__date">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          2026
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* awards item */}
              <a
                className="mxd-awards__item active-cursor-accent"
                data-cursor-text="Know More"
                href="https://www.behance.net/"
                target="_blank"
              >
                <div className="container-fluid px-0 mxd-awards__inner">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 order-2 order-xl-1 mxd-grid-item">
                      <div className="mxd-awards__title">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          Behance curated work
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2 mxd-grid-item">
                      <div className="mxd-awards__image">
                        <Image
                          alt="Azurio Image"
                          src="/img/illustrations/awards03.webp"
                          width={1000}
                          height={455}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-3 mxd-grid-item">
                      <div className="mxd-awards__tags">
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Illustrations
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Graphic design
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-4 mxd-grid-item">
                      <div className="mxd-awards__date">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          2025
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* awards item */}
              <a
                className="mxd-awards__item active-cursor-accent"
                data-cursor-text="Read Post"
                href="https://medium.com/"
                target="_blank"
              >
                <div className="container-fluid px-0 mxd-awards__inner">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 order-2 order-xl-1 mxd-grid-item">
                      <div className="mxd-awards__title">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          Article on Medium
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2 mxd-grid-item">
                      <div className="mxd-awards__image">
                        <Image
                          alt="Azurio Image"
                          src="/img/illustrations/awards04.webp"
                          width={1000}
                          height={455}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-3 mxd-grid-item">
                      <div className="mxd-awards__tags">
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          UI/UX
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Frontend
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-4 mxd-grid-item">
                      <div className="mxd-awards__date">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          2026
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* awards item */}
              <a
                className="mxd-awards__item active-cursor-accent"
                data-cursor-text="See Page"
                href="https://www.awwwards.com/"
                target="_blank"
              >
                <div className="container-fluid px-0 mxd-awards__inner">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 order-2 order-xl-1 mxd-grid-item">
                      <div className="mxd-awards__title">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          Awwwards nomination
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2 mxd-grid-item">
                      <div className="mxd-awards__image">
                        <Image
                          alt="Azurio Image"
                          src="/img/illustrations/awards05.webp"
                          width={1000}
                          height={455}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-3 mxd-grid-item">
                      <div className="mxd-awards__tags">
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          UI/UX design
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Development
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-4 mxd-grid-item">
                      <div className="mxd-awards__date">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          2025
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* awards item */}
              <a
                className="mxd-awards__item active-cursor-accent"
                data-cursor-text="Know More"
                href="https://www.cssdesignawards.com/"
                target="_blank"
              >
                <div className="container-fluid px-0 mxd-awards__inner">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 order-2 order-xl-1 mxd-grid-item">
                      <div className="mxd-awards__title">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          CSS Design Awards
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 order-1 order-xl-2 mxd-grid-item">
                      <div className="mxd-awards__image">
                        <Image
                          alt="Azurio Image"
                          src="/img/illustrations/awards06.webp"
                          width={1000}
                          height={455}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-3 mxd-grid-item">
                      <div className="mxd-awards__tags">
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Illustrations
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Web Design
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="tag tag-m mxd-scramble anim-uni-in-up"
                          as="span"
                          animation="inUp"
                        >
                          Development
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 order-4 mxd-grid-item">
                      <div className="mxd-awards__date">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          2025
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* Block - Awards List End */}
        </div>
      </div>
    </>
  );
}
