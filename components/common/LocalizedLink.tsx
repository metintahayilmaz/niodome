"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "next-intl";
import { localizeHref } from "@/i18n/localizeHref";
import type { Locale } from "@/i18n/routing";

/** Keep CMS and template destinations in the current site language. */
export default function LocalizedLink({
  href,
  ...props
}: ComponentProps<typeof NextLink>) {
  const locale = useLocale() as Locale;
  return (
    <NextLink
      href={typeof href === "string" ? localizeHref(href, locale) : href}
      {...props}
    />
  );
}
