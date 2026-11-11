import { getLocale } from "next-intl/server";
import MarketingPlans, { marketingMetadata } from "@/components/marketing/MarketingPlans";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) {
  return marketingMetadata("social", (await params).locale);
}
export default async function SocialMediaPage() {
  return <MarketingPlans service="social" locale={await getLocale()} />;
}
