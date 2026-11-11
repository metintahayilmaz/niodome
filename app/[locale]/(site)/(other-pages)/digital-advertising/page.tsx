import { getLocale } from "next-intl/server";
import DigitalAdvertising, { advertisingMetadata } from "@/components/marketing/DigitalAdvertising";
export async function generateMetadata({params}: {params:Promise<{locale:string}>}) {
  return advertisingMetadata((await params).locale);
}
export default async function DigitalAdvertisingPage() {
  return <DigitalAdvertising locale={await getLocale()} />;
}
