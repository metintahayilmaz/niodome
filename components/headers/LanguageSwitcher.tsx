"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { localizeHref } from "@/i18n/localizeHref";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <nav className="niodome-language-switcher" aria-label={t("languageSelection")}>
      {routing.locales.map(language => (
        <a
          key={language}
          href={localizeHref(pathname, language)}
          hrefLang={language}
          lang={language}
          aria-label={language === "tr" ? "Türkçe" : "English"}
          aria-current={locale === language ? "true" : undefined}
        >
          {language.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
