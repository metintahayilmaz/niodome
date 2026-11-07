import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import type { TestimonialStickyCard } from "@/types/testimonials";

/** Real testimonials can return immediately, without filling five template slots. */
export default async function TestimonialCards({ testimonials }: { testimonials: TestimonialStickyCard[] }) {
  const t = await getTranslations("restoredSections");
  return <BlurSection className="mxd-section padding-bottom-default">
    <div className="mxd-container grid-l-container">
      <h2 className="mxd-grid-item">{t("testimonials")}</h2>
      <div className="row g-4">{testimonials.map(item => <figure key={item.id} className="col-12 col-md-6 mxd-grid-item">
        <blockquote><p>{item.descriptionLead} {item.descriptionSpan}</p></blockquote>
        <figcaption>{item.name}{item.rolePrefix && ` — ${item.rolePrefix}`}{item.companyName && `, ${item.companyName}`}</figcaption>
      </figure>)}</div>
    </div>
  </BlurSection>;
}
