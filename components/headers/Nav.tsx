"use client";

/* eslint-disable react-hooks/refs -- RefObjects passed to `ref={}`; slotters only touch refs in callbacks */
import type { MutableRefObject } from "react";
import { useMemo } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import { useMxdMenuGsap, useMxdMenuGsapRefs } from "@/hooks/useMxdMenuGsap";
import { siteSettings } from "@/data/siteSettings";
import TextScramble from "@/components/animations/TextScramble";

function isActiveRoute(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function makeSlotters<T>(
  arr: MutableRefObject<(T | null)[]>,
  len: number,
): ((el: T | null) => void)[] {
  return Array.from({ length: len }, (_, i) => (el: T | null) => {
    arr.current[i] = el;
  });
}

type NavProps = {
  navNode: HTMLElement | null;
  toggleNode: HTMLElement | null;
  hamburgerNode: HTMLElement | null;
  setNavNode: (el: HTMLElement | null) => void;
  registerMenuReset: (fn: (() => void) | null) => void;
};

export default function Nav({
  navNode,
  toggleNode,
  hamburgerNode,
  setNavNode,
  registerMenuReset,
}: NavProps) {
  const t = useTranslations("nav");
  const tMenu = useTranslations("menu");
  const pathname = usePathname();
  const g = useMxdMenuGsapRefs();

  const links = [
    { href: "/", label: t("home") },
    { href: "/works", label: t("works") },
    { href: "/about-us", label: tMenu("aboutUs") },
    { href: "/services", label: tMenu("services") },
    { href: "/blog", label: tMenu("blog") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const headerSlots = useMemo(() => makeSlotters(g.headerSplitTargets, 3), [g]);
  const mainSlots = useMemo(() => makeSlotters(g.mainMenuLinkSpans, 12), [g]);
  const contactSlots = useMemo(() => makeSlotters(g.contactAnchors, 8), [g]);
  const contactRevealSlots = useMemo(
    () => makeSlotters(g.contactRevealTargets, 8),
    [g],
  );
  const footerSlots = useMemo(() => makeSlotters(g.footerSplitTargets, 4), [g]);
  const dividerSlots = useMemo(() => makeSlotters(g.dividers, 7), [g]);
  const arrowSlots = useMemo(() => makeSlotters(g.arrows, 6), [g]);
  const liSlots = useMemo(() => makeSlotters(g.menuItemLis, 6), [g]);
  const toggleSlots = useMemo(() => makeSlotters(g.menuToggles, 6), [g]);

  useMxdMenuGsap(navNode, toggleNode, hamburgerNode, registerMenuReset, g);

  return (
    <nav className="mxd-menu mxd-menu--gsap" ref={setNavNode}>
      <div ref={g.backdrop} className="mxd-menu__backdrop" />
      {/* Menu Overlay Start */}
      <div ref={g.overlay} className="mxd-menu__overlay">
        <div
          ref={g.content}
          className="mxd-menu__content"
          data-lenis-prevent=""
        >
          {/* Menu Logo Start */}
          <div className="mxd-menu__logo">
            <Link href={`/`} className="menu-logo">
              {/* logo icon */}
              <svg
                className="menu-logo__image"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 42.4 36"
              >
                <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
              </svg>
              {/* logo text */}
              <div className="menu-logo__text">
                <span ref={headerSlots[0]}>NIO</span>
                <span ref={headerSlots[1]}>DOME</span>
              </div>
            </Link>
          </div>
          {/* Menu Logo End */}
          {/* Menu Media Start */}
          <div className="mxd-menu__media">
            <div ref={g.mediaWrapper} className="menu-media__wrapper">
              {/* <Image   alt="Image"    src="/img/gifs/dolores.gif" width="322" height="374" /> */}
              <AutoplayLoopVideo
                poster="video/900x1280_menu.webp"
                sources={[
                  { type: "video/mp4", src: "video/900x1280_menu.mp4" },
                  { type: "video/webm", src: "video/900x1280_menu.webm" },
                ]}
              />
            </div>
          </div>
          {/* Menu Media End */}
          {/* Main Navigation Start */}
          <div className="mxd-menu__navigation">
            <div className="mxd-menu__inner">
              <div className="mxd-menu__shadow shadow-top" />
              <div className="mxd-menu__caption">
                <p ref={headerSlots[2]}>
                  {t("captionLine1")}
                  <br />
                  {t("captionLine2")}
                </p>
              </div>
              {/* left side */}
              <div className="mxd-menu__left">
                <div className="main-menu">
                  <div className="main-menu__content">
                    <ul id="main-menu" className="main-menu__accordion">
                      {links.map((link, index) => {
                        const active = isActiveRoute(pathname, link.href);
                        return (
                          <li key={link.href} ref={liSlots[index]}
                            className={`main-menu__item${active ? " main-menu__item--current" : ""}`}>
                            {index === 0 && <div ref={dividerSlots[0]} className="main-menu__divider divider-top" />}
                            <div ref={toggleSlots[index]} className="main-menu__toggle">
                              <Link href={link.href} className="main-menu__link main-menu__link--direct" aria-current={active ? "page" : undefined}>
                                <span ref={mainSlots[index * 2]} className="main-menu__number">/ {String(index + 1).padStart(2, "0")}</span>
                                <span ref={mainSlots[index * 2 + 1]} className="main-menu__caption">{link.label}</span>
                                <span ref={arrowSlots[index]} className="main-menu__arrow" aria-hidden="true">
                                  <svg viewBox="0 0 18 18" fill="none"><path d="M3 9h11M9 3l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                                </span>
                              </Link>
                            </div>
                            <div ref={dividerSlots[index + 1]} className="main-menu__divider divider-bottom" />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="mxd-menu__right">
                <div className="menu-contact">
                  <div className="menu-contact__item">
                    <ul className="menu-contact__list">
                      <li>
                        <a
                          ref={contactSlots[0]}
                          className="tag tag-m"
                          href="mailto:hello@niodome.com?subject=Web%20Sitesinden%20Mesaj"
                        >
                          <TextScramble
                            ref={contactRevealSlots[0]}
                            className="mxd-scramble"
                          >
                            hello@niodome.com
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[1]}
                          className="tag tag-m"
                          href={siteSettings.phoneHref}
                        >
                          <TextScramble
                            ref={contactRevealSlots[1]}
                            className="mxd-scramble"
                          >
                            {siteSettings.phone}
                          </TextScramble>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-contact__item">
                    <ul className="menu-contact__list">
                      <li>
                        <a
                          ref={contactSlots[2]}
                          className="tag tag-m"
                          href="https://maps.google.com/?q=Istanbul,Turkey"
                          target="_blank"
                        >
                          <span ref={contactRevealSlots[2]}>
                            İstanbul,
                            <br />
                            Türkiye
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-contact__item">
                    <ul className="menu-contact__list">
                      <li>
                        <a
                          ref={contactSlots[3]}
                          className="tag tag-m"
                          href="https://instagram.com/niodome"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[3]}
                            className="mxd-scramble"
                          >
                            Instagram
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[4]}
                          className="tag tag-m"
                          href="https://linkedin.com/company/niodome"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[4]}
                            className="mxd-scramble"
                          >
                            LinkedIn
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[5]}
                          className="tag tag-m"
                          href="https://behance.net/niodome"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[5]}
                            className="mxd-scramble"
                          >
                            Behance
                          </TextScramble>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* data bottom line */}
              <div className="mxd-menu__shadow" />
              <div className="mxd-menu__data">
                <div className="menu-data__left">
                  <p ref={footerSlots[0]} className="menu-data__text">
                    hello@niodome.com
                  </p>
                </div>
                <div className="menu-data__right">
                  <p ref={footerSlots[2]} className="menu-data__text">
                    © Niodome
                  </p>
                  <p ref={footerSlots[3]} className="menu-data__text">
                    ©{new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Main Navigation End */}
        </div>
      </div>
      {/* Menu Overlay End */}
    </nav>
  );
}
