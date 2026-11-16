"use client";

import { useRef } from "react";
import LanguageSwitcher from "@/components/headers/LanguageSwitcher";
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
        className={`mxd-header ${isPermanent ? "mxd-header-permanent" : ""} ${["/", "/works", "/services"].includes(p) ? "mxd-header-on-dark" : ""}`}
      >
        <CommonLoadFade index={0}>
          <div className="mxd-header__logo loading-fade">
            <Link className="mxd-logo" href={`/`}>
              <svg
                className="mxd-logo__image"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="-98 -112 196 224"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M-49 -105h14v14h-14z M35 -105h14v14h-14z M-35 -91h14v14h-14z M21 -91h14v14h-14z M-21 -77h14v14h-14z M-7 -77h14v14h-14z M7 -77h14v14h-14z M-35 -63h14v14h-14z M-21 -63h14v14h-14z M-7 -63h14v14h-14z M7 -63h14v14h-14z M21 -63h14v14h-14z M-21 -49h14v14h-14z M-7 -49h14v14h-14z M7 -49h14v14h-14z M-77 -35h14v14h-14z M-7 -35h14v14h-14z M63 -35h14v14h-14z M-63 -21h14v14h-14z M-21 -21h14v14h-14z M-7 -21h14v14h-14z M7 -21h14v14h-14z M49 -21h14v14h-14z M-49 -7h14v14h-14z M-35 -7h14v14h-14z M-21 -7h14v14h-14z M-7 -7h14v14h-14z M7 -7h14v14h-14z M21 -7h14v14h-14z M35 -7h14v14h-14z M-63 7h14v14h-14z M-21 7h14v14h-14z M-7 7h14v14h-14z M7 7h14v14h-14z M49 7h14v14h-14z M-77 21h14v14h-14z M-7 21h14v14h-14z M63 21h14v14h-14z M-35 35h14v14h-14z M-21 35h14v14h-14z M-7 35h14v14h-14z M7 35h14v14h-14z M21 35h14v14h-14z M-63 49h14v14h-14z M-49 49h14v14h-14z M-35 49h14v14h-14z M-21 49h14v14h-14z M-7 49h14v14h-14z M7 49h14v14h-14z M21 49h14v14h-14z M35 49h14v14h-14z M49 49h14v14h-14z M-77 63h14v14h-14z M-49 63h14v14h-14z M-35 63h14v14h-14z M-21 63h14v14h-14z M-7 63h14v14h-14z M7 63h14v14h-14z M21 63h14v14h-14z M35 63h14v14h-14z M63 63h14v14h-14z M-91 77h14v14h-14z M-35 77h14v14h-14z M-21 77h14v14h-14z M-7 77h14v14h-14z M7 77h14v14h-14z M21 77h14v14h-14z M77 77h14v14h-14z M-21 91h14v14h-14z M-7 91h14v14h-14z M7 91h14v14h-14z" />
              </svg>
              <div className="mxd-logo__text">
                <TextScramble className="mxd-scramble">NIO</TextScramble>
                <TextScramble className="mxd-scramble">DOME</TextScramble>
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
                aria-label={t("cta")}
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
            <LanguageSwitcher />
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
