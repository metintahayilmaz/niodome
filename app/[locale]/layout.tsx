/**
 * [locale] layout iskeleti — Adım 3'te (site) sayfaları buraya taşınacak.
 *
 * Şu an tek görevi:
 *  - setRequestLocale ile RSC bağlamını kurmak
 *  - NextIntlClientProvider ile client bileşenlere mesajları iletmek
 *  - <html lang> dinamikleştirmek
 *
 * app/(site)/layout.tsx içindeki CSS, fontlar, Header, TemplateRuntimeProvider
 * Adım 3'te bu layout'un altına taşınacak. Şimdi dokunulmadı.
 */
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // RSC'lerde useTranslations / getTranslations çalışması için zorunlu
  setRequestLocale(locale as Locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
