import { getLocale } from "next-intl/server";
import ServiceDetail, { serviceMetadata } from "@/components/services/ServiceDetail";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}) {
  return serviceMetadata("identity", (await params).locale);
}
export default async function Page() {
  return <ServiceDetail id="identity" locale={await getLocale()} />;
}
