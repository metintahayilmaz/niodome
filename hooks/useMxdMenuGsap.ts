"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type React from "react";

import { useLenis } from "@/components/common/LenisContext";
import {
  bindMxdMenuGsap,
  type MxdMenuGsapElements,
  type MxdMenuGsapMenuRow,
} from "@/lib/template/mxdMenuGsap";

const N_HEADER = 3;
const N_CONTACT = 6;
const N_FOOTER = 3;

function compact<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((x): x is T => x != null);
}

function buildMenuRows(
  lis: (HTMLLIElement | null)[],
  toggles: (HTMLDivElement | null)[],
  subs: (HTMLUListElement | null)[],
  rowCount: number,
): MxdMenuGsapMenuRow[] | null {
  if (
    lis.length !== rowCount ||
    toggles.length !== rowCount ||
    subs.length !== rowCount
  ) {
    return null;
  }
  const rows: MxdMenuGsapMenuRow[] = [];
  for (let i = 0; i < rowCount; i++) {
    const item = lis[i];
    const toggle = toggles[i];
    if (!item || !toggle) return null;
    rows.push({ item, toggle, submenu: subs[i] });
  }
  return rows;
}

function collectElements(
  nav: HTMLElement,
  toggle: HTMLElement,
  hamburger: HTMLElement | null,
  refs: UseMxdMenuGsapRefs,
): MxdMenuGsapElements | null {
  const {
    backdrop,
    overlay,
    content,
    mediaWrapper,
    headerSplitTargets,
    mainMenuLinkSpans,
    contactAnchors,
    contactRevealTargets,
    footerSplitTargets,
    dividers,
    arrows,
    menuItemLis,
    menuToggles,
    menuSubmenus,
  } = refs;

  if (
    !backdrop.current ||
    !overlay.current ||
    !content.current ||
    !mediaWrapper.current
  ) {
    return null;
  }

  const headerEls = compact(headerSplitTargets.current);
  const mainSpans = compact(mainMenuLinkSpans.current);
  const contacts = compact(contactAnchors.current);
  const contactRevealEls = compact(contactRevealTargets.current);
  const footers = compact(footerSplitTargets.current);
  const divs = compact(dividers.current);
  const ars = compact(arrows.current);

  // Contact, social and footer entries are optional content. Their count must
  // never prevent binding the menu trigger when those entries change.
  if (
    headerEls.length !== N_HEADER ||
    mainSpans.length !== refs.rowCount * 2 ||
    divs.length !== refs.rowCount + 1 ||
    ars.length !== refs.rowCount
  ) {
    return null;
  }

  const rows = buildMenuRows(
    menuItemLis.current,
    menuToggles.current,
    menuSubmenus.current,
    refs.rowCount,
  );
  if (!rows) return null;

  return {
    nav,
    toggle,
    backdrop: backdrop.current,
    overlay: overlay.current,
    content: content.current,
    mediaWrapper: mediaWrapper.current,
    hamburger,
    headerSplitElements: headerEls,
    mainMenuLinkSpans: mainSpans,
    contactAnchors: contacts,
    contactRevealTargets: contactRevealEls,
    footerSplitElements: footers,
    dividers: divs,
    arrows: ars,
    menuRows: rows,
  };
}

export type UseMxdMenuGsapRefs = {
  rowCount: number;
  backdrop: React.RefObject<HTMLDivElement | null>;
  overlay: React.RefObject<HTMLDivElement | null>;
  content: React.RefObject<HTMLDivElement | null>;
  mediaWrapper: React.RefObject<HTMLDivElement | null>;
  headerSplitTargets: React.MutableRefObject<(HTMLElement | null)[]>;
  mainMenuLinkSpans: React.MutableRefObject<(HTMLElement | null)[]>;
  contactAnchors: React.MutableRefObject<(HTMLElement | null)[]>;
  contactRevealTargets: React.MutableRefObject<(HTMLElement | null)[]>;
  footerSplitTargets: React.MutableRefObject<(HTMLElement | null)[]>;
  dividers: React.MutableRefObject<(HTMLElement | null)[]>;
  arrows: React.MutableRefObject<(HTMLElement | null)[]>;
  menuItemLis: React.MutableRefObject<(HTMLLIElement | null)[]>;
  menuToggles: React.MutableRefObject<(HTMLDivElement | null)[]>;
  menuSubmenus: React.MutableRefObject<(HTMLUListElement | null)[]>;
};

export function useMxdMenuGsapRefs(rowCount: number): UseMxdMenuGsapRefs {
  const backdrop = useRef<HTMLDivElement | null>(null);
  const overlay = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const mediaWrapper = useRef<HTMLDivElement | null>(null);
  const headerSplitTargets = useRef<(HTMLElement | null)[]>(
    Array.from({ length: N_HEADER }, () => null),
  );
  const mainMenuLinkSpans = useRef<(HTMLElement | null)[]>(
    Array.from({ length: rowCount * 2 }, () => null),
  );
  const contactAnchors = useRef<(HTMLElement | null)[]>(
    Array.from({ length: N_CONTACT }, () => null),
  );
  const contactRevealTargets = useRef<(HTMLElement | null)[]>(
    Array.from({ length: N_CONTACT }, () => null),
  );
  const footerSplitTargets = useRef<(HTMLElement | null)[]>(
    Array.from({ length: N_FOOTER }, () => null),
  );
  const dividers = useRef<(HTMLElement | null)[]>(
    Array.from({ length: rowCount + 1 }, () => null),
  );
  const arrows = useRef<(HTMLElement | null)[]>(
    Array.from({ length: rowCount }, () => null),
  );
  const menuItemLis = useRef<(HTMLLIElement | null)[]>(
    Array.from({ length: rowCount }, () => null),
  );
  const menuToggles = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: rowCount }, () => null),
  );
  const menuSubmenus = useRef<(HTMLUListElement | null)[]>(
    Array.from({ length: rowCount }, () => null),
  );

  return useMemo(
    () => ({
      rowCount,
      backdrop,
      overlay,
      content,
      mediaWrapper,
      headerSplitTargets,
      mainMenuLinkSpans,
      contactAnchors,
      contactRevealTargets,
      footerSplitTargets,
      dividers,
      arrows,
      menuItemLis,
      menuToggles,
      menuSubmenus,
    }),
    [
      rowCount,
      backdrop,
      overlay,
      content,
      mediaWrapper,
      headerSplitTargets,
      mainMenuLinkSpans,
      contactAnchors,
      contactRevealTargets,
      footerSplitTargets,
      dividers,
      arrows,
      menuItemLis,
      menuToggles,
      menuSubmenus,
    ],
  );
}

/**
 * Binds GSAP menu using explicit refs from `Nav` plus `navNode` / `toggleNode` /
 * `hamburgerNode`. Closes the menu when the route changes.
 */
export function useMxdMenuGsap(
  navNode: HTMLElement | null,
  toggleNode: HTMLElement | null,
  hamburgerNode: HTMLElement | null,
  registerMenuReset: (fn: (() => void) | null) => void,
  refs: UseMxdMenuGsapRefs,
): void {
  const lenis = useLenis();
  const pathname = usePathname();
  const resetMenuRef = useRef<(() => void) | null>(null);
  const closeMenuAnimatedRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    registerMenuReset(null);
    if (!navNode || !toggleNode) return;

    const collected = collectElements(navNode, toggleNode, hamburgerNode, refs);
    if (!collected) return;
    let disposed = false;
    let disposeFn: (() => void) | null = null;

    const bindWhenFontsReady = async () => {
      try {
        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready;
        }
      } catch {
        // If the browser does not support the Font Loading API, continue safely.
      }
      if (disposed) return;

      const { dispose, resetMenu, closeMenuAnimated } = bindMxdMenuGsap(
        collected,
        lenis,
      );
      disposeFn = dispose;
      resetMenuRef.current = resetMenu;
      closeMenuAnimatedRef.current = closeMenuAnimated;
      registerMenuReset(resetMenu);
    };
    void bindWhenFontsReady();

    return () => {
      disposed = true;
      disposeFn?.();
      resetMenuRef.current = null;
      closeMenuAnimatedRef.current = null;
      registerMenuReset(null);
      lenis?.start();
    };
  }, [navNode, toggleNode, hamburgerNode, lenis, registerMenuReset, refs]);

  const isFirstPathRef = useRef(true);
  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }
    closeMenuAnimatedRef.current?.();
  }, [pathname]);
}
