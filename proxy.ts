import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { browserLocale } from "./i18n/browserLocale";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const PRODUCTION_HOST = "niodome.com";
const BYPASS_KEY = process.env.MAINTENANCE_BYPASS_KEY?.trim();
const BYPASS_COOKIE = "nio_preview";
const MAINTENANCE_ON = process.env.MAINTENANCE_MODE === "true";

// Bakım modunda bile geçmesine izin verilen path prefix'leri
const EXEMPT_PREFIXES = ["/maintenance", "/studio", "/_next", "/api"];

function isExempt(pathname: string): boolean {
  return EXEMPT_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProduction = req.nextUrl.hostname.toLowerCase() === PRODUCTION_HOST;

  // ── Bakım modu ──────────────────────────────────────────────────────────────
  if (MAINTENANCE_ON && !isExempt(pathname)) {
    // Bypass query: ?preview=ANAHTAR
    const queryKey = req.nextUrl.searchParams.get("preview");
    if (BYPASS_KEY && queryKey === BYPASS_KEY) {
      // Bypass cookie set et, sonra temiz URL'ye yönlendir (query'yi kaldır)
      const cleanUrl = new URL(req.url);
      cleanUrl.searchParams.delete("preview");
      const res = NextResponse.redirect(cleanUrl);
      res.cookies.set(BYPASS_COOKIE, BYPASS_KEY, {
        httpOnly: true,
        secure: req.nextUrl.protocol === "https:",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 saat
        path: "/",
      });
      return res;
    }

    // Bypass cookie kontrolü
    const cookie = req.cookies.get(BYPASS_COOKIE);
    if (BYPASS_KEY && cookie?.value === BYPASS_KEY) {
      // Bypass aktif — normal akışa devam et (aşağıda intlMiddleware çalışır)
    } else {
      // Bakım sayfasına rewrite (URL değişmez)
      const maintenanceUrl = req.nextUrl.clone();
      maintenanceUrl.pathname = "/maintenance";
      const res = NextResponse.rewrite(maintenanceUrl);
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      return res;
    }
  }

  // ── Normal intl middleware ───────────────────────────────────────────────────
  // Use English for every non-Turkish browser language, including languages
  // not offered by the site. next-intl still prioritizes URL and locale cookie.
  const headers = new Headers(req.headers);
  headers.set("accept-language", browserLocale(req.headers.get("accept-language")));
  const res = intlMiddleware(new NextRequest(req, { headers }));

  // noindex: bakım açıksa VEYA production host değilse
  if (MAINTENANCE_ON || !isProduction) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return res;
}

export const config = {
  matcher: ["/((?!studio|api|_next|[^?]*\\.[^?]+).*)"],
};
