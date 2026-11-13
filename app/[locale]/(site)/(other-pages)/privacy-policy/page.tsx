import LegalPage, { legalMetadata } from "@/components/legal/LegalPage";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return legalMetadata("privacy", (await params).locale);
}
export default function Page() {
  return <LegalPage kind="privacy" />;
}
