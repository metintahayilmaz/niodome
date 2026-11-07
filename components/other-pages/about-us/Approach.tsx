import { client } from "@/sanity/lib/client";
import { verifiedStatsQuery } from "@/sanity/lib/queries";
import MxdStatsLineItem from "@/components/animations/MxdStatsLineItem";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";

export default async function Approach() {
  const t = await getTranslations("aboutContent");
  const locale = await getLocale();
  let stats: { _key: string; value: string; label: string }[] = [];
  try {
    const rows = await client.fetch<typeof stats | null>(verifiedStatsQuery, { locale });
    stats = (rows ?? []).filter(row => row.value && row.label);
  } catch { /* Keep the approach readable when content is unavailable. */ }
  return (
    <BlurSection className="mxd-section padding-top-subtitle padding-bottom-tag-m-subtitle">
      <div className="mxd-container grid-s-container">
        <div className="mxd-block mxd-grid-item-s">
          <p>/ {t("approach")}</p>
          <CommonAnimatedText as="p" className="manifest manifest-s mxd-split-lines" animation="splitLines">
            {t("approachLead")} <span>{t("approachSpan")}</span>
          </CommonAnimatedText>
          {stats.length > 0 && <div className="mxd-stats-lines">
            {stats.map(stat => <MxdStatsLineItem key={stat._key}>
              <div className="mxd-stats-lines__number"><p>{stat.value}</p></div>
              <div className="mxd-stats-lines__caption"><p>{stat.label}</p></div>
            </MxdStatsLineItem>)}
          </div>}
        </div>
      </div>
    </BlurSection>
  );
}
