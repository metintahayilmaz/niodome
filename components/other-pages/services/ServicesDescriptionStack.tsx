"use client";

import { useLocale, useTranslations } from "next-intl";
import approvedServices from "@/data/approvedServices.json";
import Image from "next/image";
import Link from "@/components/common/LocalizedLink";
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
  "/img/works/project-details/details03.webp",
  "/img/services/services-stack/s04.webp",
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
          <span key={block._key ?? i}>{text} </span>
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
  item: ServiceDetailItem & { href?: string };
  index: number;
  imgSrc: string;
}) {
  const t = useTranslations("innerContent");
  const en = useLocale() === "en";
  const orderLabel = String(item.order).padStart(2, "0");
  const subtitle = `${orderLabel} / ${t("services")}`;

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
                      {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
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
                  {item.href && <Link href={item.href} className="service-detail-link">{en ? "Explore the service" : "Hizmeti inceleyin"} ↗</Link>}
                </div>
              </ServicesStackSlot>
            </div>
            <ServicesStackSlot part="image" index={index}>
              <div className="services-card__image" data-preserve-frame={imgSrc.includes("/originals-v2/") ? "true" : undefined}>
                {
                  <Image
                    src={
                      imgSrc.includes(
                        "22ff4baf74499bb61f70ac2a535d3458cb4a5cda",
                      )
                        ? LOCAL_IMAGES[index % LOCAL_IMAGES.length]
                        : imgSrc
                    }
                    width={IMG_W}
                    height={IMG_H}
                    alt={item.title}
                  />
                }
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
  services?: (ServiceDetailItem & { href?: string })[];
};

export default function ServicesDescriptionStack({ services }: Props) {
  const locale = useLocale();
  const resolvedServices: (ServiceDetailItem & { href?: string })[] =
    services && services.length > 0
      ? services
      : approvedServices[locale === "en" ? "en" : "tr"].items;

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
