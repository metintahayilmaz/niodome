/**
 * Site layout — yalnızca site rotaları bu layout'tan geçer.
 * Studio (/studio) bu layout'u KULLANMAZ, dolayısıyla:
 *   - template.css (Bootstrap, font-size resetleri) Studio'ya SIZMAz
 *   - Lenis / TemplateRuntimeProvider Studio'da ÇALIŞMAZ
 *   - Header1, MenuRuntimeShell Studio'da GÖRÜNMEZ
 */
import "@/styles/template.css";
import { JetBrains_Mono, Manrope } from "next/font/google";
import Header1 from "@/components/headers/Header1";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import MenuRuntimeShell from "@/components/headers/MenuRuntimeShell";
import { cookies } from "next/headers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("template.theme")?.value;
  const initialTheme = cookieTheme === "dark" ? "dark" : "light";

  return (
    /**
     * Fontu ve tema CSS değişkenlerini site içeriğine scope et.
     * Root <body> yerine div kullanıyoruz çünkü root layout <body>'yi zaten render ediyor.
     * CSS custom properties div'den alt elemanlara cascade olur — site görünümü etkilenmez.
     */
    <div
      id="site-root"
      className={`${manrope.variable} ${jetbrainsMono.variable}`}
      style={
        {
          "--_font-default": "var(--font-manrope)",
          "--_font-accent": "var(--font-jetbrains-mono)",
        } as React.CSSProperties
      }
    >
      <TemplateRuntimeProvider>
        <Header1 initialTheme={initialTheme} />
        <MenuRuntimeShell />
        {children}
      </TemplateRuntimeProvider>
    </div>
  );
}
