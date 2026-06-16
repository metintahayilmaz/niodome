/**
 * Sanity Studio için izole layout.
 * Root layout artık html/body render etmiyor — studio kendi sarmalar.
 * Site provider'ları (Lenis, GSAP, Header) buraya sızmaz.
 */
export const metadata = {
  title: "Niodome Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
