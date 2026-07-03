export interface FacialMenuItem {
  label: string;
  serviceId: string;
}

export interface FacialMenuCategory {
  title: string;
  items: FacialMenuItem[];
}

export const facialMenuCategories: FacialMenuCategory[] = [
  {
    title: "Glow & Renewal",
    items: [
      { label: "K-Beauty Glow Facial", serviceId: "k-beauty-glow-facial" },
      { label: "Total Glow Renewal", serviceId: "total-glow-renewal" },
      { label: "The Empress Ritual", serviceId: "empress-ritual" },
      { label: "Korean Facial", serviceId: "korean-facial" },
    ],
  },
  {
    title: "Targeted Treatments",
    items: [
      { label: "Acne Treatment", serviceId: "acne-treatment" },
      { label: "Gyeongrak Deep Tissue Facial", serviceId: "gyeongrak-deep-tissue-facial" },
      { label: "Gua Sha Facial", serviceId: "gua-sha-facial" },
      { label: "Blackhead Extraction", serviceId: "blackhead-extraction" },
    ],
  },
  {
    title: "Advanced & Specialty",
    items: [
      { label: "Nano Microneedling + Exosome Therapy", serviceId: "nano-microneedling-exosome" },
      { label: "Décolleté LED Rejuvenation", serviceId: "decollete-led-rejuvenation" },
      { label: "Bridal Neckline Glow", serviceId: "bridal-neckline-glow" },
      { label: "Prenatal & Postnatal Facial Calm", serviceId: "prenatal-postnatal-facial-calm" },
      { label: "Postnatal Recovery Body Massage", serviceId: "postnatal-recovery-body-massage" },
    ],
  },
];
