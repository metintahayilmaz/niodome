export type ProcessStep = {
  stepNumber: string;
  title: string;
  description: string;
  durationLabel: string;
};

export type AboutProcessData = {
  manifestLead: string;
  manifestSpan: string;
  manifestHref: string;
  steps: ProcessStep[];
};
