/**
 * Root layout — yalnızca global metadata taşır.
 * <html> ve <body> her rota grubunun kendi layout'unda render edilir:
 *   - site sayfaları → app/[locale]/layout.tsx (<html lang={locale}>)
 *   - studio         → app/studio/layout.tsx   (<html lang="en">)
 */
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Niodome",
    default: "Niodome — Strateji, tasarım ve teknoloji tek çatı altında",
  },
  description: "Markanızı büyütecek dijital deneyimler tasarlıyoruz. Grafik tasarım, web geliştirme ve marka kimliği.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
