"use client";

import { useRef } from "react";
import ThemeSwitcher from "@/components/headers/ThemeSwitcher";
import TextScramble from "@/components/animations/TextScramble";
import { useLenis } from "@/components/common/LenisContext";
import { useHeaderScrollHidden } from "@/hooks/useHeaderScrollHidden";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Header1Props = {
  initialTheme: "light" | "dark";
};

export default function Header1({ initialTheme }: Header1Props) {
  const t = useTranslations("header");
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  useHeaderScrollHidden(headerRef, lenis);
  const pathname = usePathname();
  // "/" preview sayfası Niodome'da kullanılmıyor; "Purchase" butonu kaldırıldı.
  const onPurchaseHome = false;
  // Sabit (transparent olmayan) header gerektiren sayfalar
  const p = pathname as string;
  const isPermanent = p === "/services" || p === "/works" || p === "/blog";
  return (
    <CommonLoadAnimation>
      <header
        id="header"
        ref={headerRef}
        className={`mxd-header ${isPermanent ? "mxd-header-permanent" : ""}`}
      >
        <CommonLoadFade index={0}>
          <div className="mxd-header__logo loading-fade">
            <Link className="mxd-logo" href={`/`}>
              <svg
                className="mxd-logo__image"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 42.4 36"
              >
                <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
              </svg>
              <div className="mxd-logo__text">
                <TextScramble className="mxd-scramble">Azurio</TextScramble>
                <TextScramble className="mxd-scramble">Template</TextScramble>
              </div>
            </Link>
          </div>
        </CommonLoadFade>
        <CommonLoadFade index={1}>
          <div className="mxd-header__controls loading-fade">
            {onPurchaseHome ? (
              <a
                className="btn mxd-header__link slide-right"
                href="https://themeforest.net/item/azurio-digital-agency-personal-portfolio-nextjs-template/63087539?s_rank=1"
                aria-label="Purchase Azurio on ThemeForest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-caption">
                  <TextScramble className="mxd-scramble">Purchase</TextScramble>
                </span>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 18 18"
                  >
                    <path d="M3.1,15.6h2.4v2.4h-2.4v-2.4ZM10.2,18h2.4v-2.4h-2.4v2.4ZM14.9,4.7H5.5V0H.8v2.4h2.4v11.8h9.4v-2.4h-7.1v-4.7h9.4v2.4h2.4v-4.7h-2.4ZM12.5,11.8h2.4v-2.4h-2.4v2.4Z" />
                  </svg>
                </i>
              </a>
            ) : (
              <Link
                className="btn mxd-header__link slide-right"
                href="/contact"
                aria-label="Say Hello"
              >
                <span className="btn-caption">
                  <TextScramble className="mxd-scramble">
                    {t("cta")}
                  </TextScramble>
                </span>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 18 18"
                  >
                    <path d="M3.1,15.6h2.4v2.4h-2.4v-2.4ZM10.2,18h2.4v-2.4h-2.4v2.4ZM14.9,4.7H5.5V0H.8v2.4h2.4v11.8h9.4v-2.4h-7.1v-4.7h9.4v2.4h2.4v-4.7h-2.4ZM12.5,11.8h2.4v-2.4h-2.4v2.4Z" />
                  </svg>
                </i>
              </Link>
            )}
            <ThemeSwitcher
              isPermanent={isPermanent}
              initialTheme={initialTheme}
            />
          </div>
        </CommonLoadFade>
      </header>
    </CommonLoadAnimation>
  );
}
