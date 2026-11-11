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
          onClick={(event) => {
            event.currentTarget.href = localizeHref(pathname, language) + window.location.search + window.location.hash;
            // Save the explicit choice before opening an unprefixed Turkish URL.
            document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; samesite=lax`;
          }}
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
