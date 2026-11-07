import { getTranslations } from "next-intl/server";

export default async function InnerHeadline({ count = 0 }: { count?: number }) {
  const t = await getTranslations("content");
  return (
    <section className="mxd-section">
      <div className="mxd-container grid-l-container">
        <div className="inner-headline margin-bottom-subtitle mxd-grid-item">
          <h1>
            {t("blogTitle")}
            {count > 0 && <sup>({count})</sup>}
          </h1>
          <p>{t("blogDescription")}</p>
        </div>
      </div>
    </section>
  );
}
