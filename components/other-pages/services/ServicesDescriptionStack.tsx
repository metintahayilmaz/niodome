"use client";

import Image from "next/image";
import TextScramble from "@/components/animations/TextScramble";
import CommonServicesStack, {
  ServicesStackSlot,
} from "@/components/animations/CommonServicesStack";
import type { ServiceDetailItem } from "@/types/serviceDetail";

const IMG_W = 1200;
const IMG_H = 1300;

// Slot başına yerel görsel (Sanity image yoksa fallback)
const LOCAL_IMAGES = [
  "/img/services/services-stack/s01.webp",
  "/img/services/services-stack/s02.webp",
  "/img/services/services-stack/s03.webp",
  "/img/services/services-stack/s04.webp",
];

// Fallback: Sanity boşsa local data
const LOCAL_SERVICES: ServiceDetailItem[] = [
  {
    _id: "local-sd-1",
    title: "Innovative design",
    slug: "innovative-design",
    body: [
      { _type: "block", _key: "a", style: "normal", markDefs: [], children: [{ _type: "span", _key: "as", text: "We create visually compelling designs that enhance user experience.", marks: [] }] },
      { _type: "block", _key: "b", style: "normal", markDefs: [], children: [{ _type: "span", _key: "bs", text: "From UI/UX design to stunning websites, mobile apps, and print materials, we make sure your brand's visuals resonate with your audience.", marks: [] }] },
    ],
    tagsColA: ["UI/UX", "Web design", "Applications", "Print design"],
    tagsColB: ["Packaging", "Motion", "3D models"],
    order: 1,
  },
  {
    _id: "local-sd-2",
    title: "Creative development",
    slug: "creative-development",
    body: [
      { _type: "block", _key: "a", style: "normal", markDefs: [], children: [{ _type: "span", _key: "as", text: "We build high-performance websites and applications using modern technologies.", marks: [] }] },
      { _type: "block", _key: "b", style: "normal", markDefs: [], children: [{ _type: "span", _key: "bs", text: "Our solutions are designed to be scalable and functional for optimal performance.", marks: [] }] },
    ],
    tagsColA: ["Frontend", "Interactions", "Backend", "E-Commerce"],
    tagsColB: ["Mobile Apps", "Maintenance", "Support"],
    order: 2,
  },
  {
    _id: "local-sd-3",
    title: "Brand Identity",
    slug: "brand-identity",
    body: [
      { _type: "block", _key: "a", style: "normal", markDefs: [], children: [{ _type: "span", _key: "as", text: "From logo design to comprehensive brand strategies, we ensure your business stands out with a unique visual identity and consistent messaging across all touchpoints.", marks: [] }] },
    ],
    tagsColA: ["Brand strategy", "Logo design", "Guidelines"],
    tagsColB: ["Visual identity", "Rebranding"],
    order: 3,
  },
  {
    _id: "local-sd-4",
    title: "Marketing solutions",
    slug: "marketing-solutions",
    body: [
      { _type: "block", _key: "a", style: "normal", markDefs: [], children: [{ _type: "span", _key: "as", text: "We develop and execute tailored digital marketing strategies.", marks: [] }] },
      { _type: "block", _key: "b", style: "normal", markDefs: [], children: [{ _type: "span", _key: "bs", text: "SEO and content marketing, social media management and paid campaigns - we help you reach and engage your target audience effectively.", marks: [] }] },
    ],
    tagsColA: ["Strategy", "Social media", "SEO Optimization"],
    tagsColB: ["Email", "Campaigns"],
    order: 4,
  },
];

/**
 * ServicesBodyRenderer — Sanity PortableText body'yi services kartına özel render eder.
 * Blok 0: doğrudan metin (önceki JSX'teki ilk fragment)
 * Blok 1+: <span> içinde (önceki JSX'teki <span> sarması)
 */
function ServicesBodyRenderer({ body }: { body: unknown[] | null }) {
  if (!body || body.length === 0) return null;

  const blocks = body as Array<{
    _type: string;
    _key?: string;
    children?: Array<{ _type: string; text: string; marks?: string[] }>;
  }>;

  return (
    <>
      {blocks.map((block, i) => {
        if (block._type !== "block") return null;
        const text = (block.children ?? []).map((s) => s.text).join("");
        return i === 0 ? (
          <span key={block._key ?? i}>{text}</span>
        ) : (
          <span key={block._key ?? i} className="services-card__descr-span">
            {text}
          </span>
        );
      })}
    </>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <TextScramble className="tag tag-s-mobile mxd-scramble">
      {children}
    </TextScramble>
  );
}

function ServiceCard({
  item,
  index,
  imgSrc,
}: {
  item: ServiceDetailItem;
  index: number;
  imgSrc: string;
}) {
  const orderLabel = String(item.order).padStart(2, "0");
  const subtitle = `${orderLabel} / Services`;

  return (
    <ServicesStackSlot part="card" index={index}>
      <div className="mxd-stack-services__card">
        <ServicesStackSlot part="wrapper" index={index}>
          <div className="services-card__wrapper">
            <div className="services-card__content">
              <div className="services-card__info">
                <div className="services-card__subtitle">
                  <Tag>{subtitle}</Tag>
                </div>
                <div className="services-card__title">
                  <ServicesStackSlot part="title" index={index}>
                    <div className="services-card__title-text">
                      {item.title}
                    </div>
                  </ServicesStackSlot>
                </div>
                <ServicesStackSlot part="tags" index={index}>
                  <div className="services-card__tags">
                    <div className="tags-column">
                      {item.tagsColA.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <div className="tags-column">
                      {item.tagsColB.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </ServicesStackSlot>
              </div>
              <ServicesStackSlot part="descr" index={index}>
                <div className="t-large t-bold services-card__descr">
                  <ServicesBodyRenderer body={item.body} />
                </div>
              </ServicesStackSlot>
            </div>
            <ServicesStackSlot part="image" index={index}>
              <div className="services-card__image">
                <Image
                  src={imgSrc}
                  width={IMG_W}
                  height={IMG_H}
                  alt={item.title}
                />
                <div className="services-card__cover" />
              </div>
            </ServicesStackSlot>
          </div>
        </ServicesStackSlot>
      </div>
    </ServicesStackSlot>
  );
}

type Props = {
  services?: ServiceDetailItem[];
};

export default function ServicesDescriptionStack({ services }: Props) {
  const resolvedServices =
    services && services.length > 0 ? services : LOCAL_SERVICES;

  return (
    <div id="services" className="mxd-section">
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <CommonServicesStack className="mxd-stack-services">
            {resolvedServices.map((item, index) => {
              const imgSrc =
                item.image ?? LOCAL_IMAGES[index % LOCAL_IMAGES.length];
              return (
                <ServiceCard
                  key={item._id}
                  item={item}
                  index={index}
                  imgSrc={imgSrc}
                />
              );
            })}
          </CommonServicesStack>
        </div>
      </div>
    </div>
  );
}
