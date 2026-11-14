import catalog from "@/data/serviceCatalog.json";
import { servicePresentation } from "@/lib/servicePresentation";
import ServicesDescriptionStack from "@/components/other-pages/services/ServicesDescriptionStack";
export default function ServiceDirectory({ locale }: { locale: string }) {
  return (
    <ServicesDescriptionStack
      services={catalog.map((s) => ({
        ...servicePresentation(s.id, locale),
        order: servicePresentation(s.id, locale).order + 4,
      }))}
    />
  );
}
