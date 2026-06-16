import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Aşağıdakiler HARİÇ tüm yollarla eşleş:
     *
     * - /studio  ve alt yolları  → Sanity Studio locale'siz kalmalı
     * - /api     ve alt yolları  → API route'ları proxy'den geçmemeli
     * - /_next                   → Next.js dahili dosyaları (JS chunk, CSS)
     * - /favicon.ico, /manifest.webmanifest, vb. statik dosyalar
     *
     * Regex açıklaması:
     *   ^/studio(/.*)?$   → /studio ve /studio/... hariç
     *   ^/api(/.*)?$      → /api ve /api/... hariç
     *   /_next            → Next.js dahili bundle'lar hariç
     *   [^?]*\.[^?]+      → uzantılı statik dosyalar hariç (örn. .ico, .png, .svg)
     */
    "/((?!studio|api|_next|[^?]*\\.[^?]+).*)",
  ],
};
