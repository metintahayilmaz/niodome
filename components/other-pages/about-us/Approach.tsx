import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";

export default async function Approach() {
  const t = await getTranslations("aboutContent");
  return (
    <BlurSection className="mxd-section padding-top-subtitle padding-bottom-tag-m-subtitle">
      <div className="mxd-container grid-s-container">
        <div className="mxd-block mxd-grid-item-s">
          <p>/ {t("approach")}</p>
          <CommonAnimatedText as="p" className="manifest manifest-s mxd-split-lines" animation="splitLines">
            {t("approachLead")} <span>{t("approachSpan")}</span>
          </CommonAnimatedText>
        </div>
      </div>
    </BlurSection>
  );
}
