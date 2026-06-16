export type ServiceListItem = {
  /** Sanity doküman ID'si — React key için. Local fallback'te undefined. */
  _id?: string;
  number: string;
  title: string;
  description: string;
  cursorImageSrc: string;
  href: string;
};

export type ServicesListData = {
  sectionTitle: string;
  allServicesLabel: string;
  allServicesHref: string;
  items: ServiceListItem[];
};
