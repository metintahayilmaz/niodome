import { getLocale } from "next-intl/server";
import MarketingPlans, { marketingMetadata } from "@/components/marketing/MarketingPlans";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) {
  return marketingMetadata("google", (await params).locale);
}
export default async function GoogleAdsPage() {
  return <MarketingPlans service="google" locale={await getLocale()} />;
}
