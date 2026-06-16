"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import { servicesListDigitalAgencyData } from "@/data/servicesListDigitalAgency";
import type { ServiceListItem } from "@/types/servicesList";

// Bölüm-seviyesi sabitler data dosyasından gelmeye devam eder
const { sectionTitle, allServicesLabel, allServicesHref, items: localItems } =
  servicesListDigitalAgencyData;

type Props = {
  /** Sanity'den gelen items. Verilmezse veya boşsa local data kullanılır. */
  items?: ServiceListItem[];
};

export default function ServicesList({ items }: Props) {
  // Fallback: Sanity boş / erişilemezse local data'ya dön
  const resolvedItems = items && items.length > 0 ? items : localItems;
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v01 Start */}
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
                          {sectionTitle}
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
                            href={allServicesHref}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              {allServicesLabel}
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v01 End */}
            {/* Block - Services List Start */}
            <div className="mxd-block">
              <div className="mxd-services-list no-marquee">
                {resolvedItems.map((item, index) => (
                  <Link
                    key={item._id ?? item.number ?? `service-${index}`}
                    className="mxd-services-list__item active-cursor-image-tr"
                    data-cursor-image={item.cursorImageSrc}
                    href={item.href}
                  >
                    <div className="mxd-services-list__divider top" />
                    <div className="container-fluid px-0 mxd-services-list__inner">
                      <div className="row gx-0">
                        <div className="col-12 col-xl-1 mxd-grid-padding">
                          <div className="mxd-services-list__number">
                            <span className="meta-tag">{item.number}</span>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6 mxd-grid-padding">
                          <div className="mxd-services-list__title">
                            <h3>{item.title}</h3>
                          </div>
                        </div>
                        <div className="col-12 col-xl-5 mxd-grid-padding">
                          <div className="mxd-services-list__descr">
                            <p className="t-medium">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mxd-services-list__divider bottom" />
                  </Link>
                ))}
              </div>
            </div>
            {/* Block - Services List End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
