export interface HydrafacialMenuItem {
  label: string;
  serviceId: string;
}

export interface HydrafacialMenuCategory {
  title: string;
  preTitle?: string;
  items: HydrafacialMenuItem[];
}

export const hydrafacialMenuCategories: HydrafacialMenuCategory[] = [
  {
    title: "Treatments",
    items: [
      { label: "LED Light Therapy", serviceId: "led-light-therapy" },
      { label: "Lymphatic Drainage (Face)", serviceId: "lymphatic-drainage-face" },
      { label: "Wet Diamond Microdermabrasion", serviceId: "wet-diamond-microdermabrasion" },
      { label: "Glysal™ Peel 7.5%", serviceId: "glysal-peel" },
    ],
  },
  {
    preTitle: "Welcoming Massage",
    title: "Boosters",
    items: [
      { label: "Regen GF+ Booster", serviceId: "regen-gf-booster" },
      { label: "Hydrafillic with Pep9™", serviceId: "hydrafillic-pep9" },
      { label: "Hydralock HA Booster", serviceId: "hydralock-ha-booster" },
    ],
  },
  {
    title: "Premium Boosters",
    items: [
      { label: "Britenol", serviceId: "britenol" },
      { label: "Murad Clarifying Booster", serviceId: "murad-clarifying-booster" },
      { label: "Omorovicza Advanced Skin Renewal", serviceId: "omorovicza-advanced-skin-renewal" },
    ],
  },
];
