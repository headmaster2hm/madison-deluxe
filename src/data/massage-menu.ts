export interface MassageMenuItem {
  label: string;
  serviceId: string;
}

export interface MassageMenuCategory {
  title: string;
  items: MassageMenuItem[];
}

export const massageMenuCategories: MassageMenuCategory[] = [
  {
    title: "Therapeutic",
    items: [
      { label: "Therapeutic Massage", serviceId: "therapeutic-massage" },
      { label: "Deep Tissue Massage", serviceId: "deep-tissue" },
      { label: "TMJ Massage", serviceId: "tmj-massage" },
      { label: "Cupping Therapy", serviceId: "cupping-therapy" },
    ],
  },
  {
    title: "Relaxation",
    items: [
      { label: "Holistic Massage", serviceId: "holistic-massage" },
      { label: "Hot Stone Therapy", serviceId: "hot-stone" },
      { label: "Bamboo Massage", serviceId: "bamboo-massage" },
      { label: "Couples Massage", serviceId: "couples-massage" },
    ],
  },
  {
    title: "Specialty",
    items: [
      { label: "Lymphatic Drainage", serviceId: "lymphatic-drainage" },
      { label: "Stomach Massage", serviceId: "stomach-massage" },
      { label: "Reflexology", serviceId: "reflexology" },
      { label: "Prenatal Body Massage", serviceId: "prenatal-massage" },
      { label: "Harmony Retreat", serviceId: "harmony-retreat" },
    ],
  },
];
