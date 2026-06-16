import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import InnerHeadline from "@/components/other-pages/about-me/InnerHeadline";
import DoubleMarqueeDivider from "@/components/other-pages/about-me/DoubleMarqueeDivider";
import StatisticsLines from "@/components/other-pages/about-me/StatisticsLines";
import ParallaxDividerImage from "@/components/other-pages/about-me/ParallaxDividerImage";
import Resume from "@/components/other-pages/about-me/Resume";
import ParallaxDividerImage2 from "@/components/other-pages/about-me/ParallaxDividerImage2";
import TestimonialsSlider from "@/components/other-pages/about-me/TestimonialsSlider";
import CTAWithMarquee from "@/components/other-pages/about-me/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Tasarım ve teknoloji kesişiminde çalışan Niodome kurucusunun hikâyesi, süreçleri ve felsefesi.",
  openGraph: {
    title: "Hakkımda — Niodome",
    description:
      "Tasarım ve teknoloji kesişiminde çalışan Niodome kurucusunun hikâyesi, süreçleri ve felsefesi.",
    url: "${SITE_URL}/about-me",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "${SITE_URL}/about-me" },
};
export default function AboutMePage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <DoubleMarqueeDivider />
        <StatisticsLines />
        <ParallaxDividerImage />
        <Resume />
        <ParallaxDividerImage2 />
        <TestimonialsSlider />
        <CTAWithMarquee />
      </div>
    </>
  );
}
