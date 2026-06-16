import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Niodome — Strateji, Tasarım ve Teknoloji",
    short_name: "Niodome",
    description:
      "Markanızı büyütecek dijital deneyimler tasarlıyoruz.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
