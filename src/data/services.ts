const image = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;

export interface ServicePricingOption {
  id: string;
  label: string;
  durationMinutes: number;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  category: "massage" | "spa" | "wellness";
  description: string;
  pricingOptions: ServicePricingOption[];
  image: string;
  imageAlt: string;
}

const durationTiers = [
  { id: "30min", label: "30 min", durationMinutes: 30 },
  { id: "1hr", label: "1 hr", durationMinutes: 60 },
  { id: "2hr", label: "2 hr", durationMinutes: 120 },
  { id: "3hr", label: "3 hr", durationMinutes: 180 },
] as const;

function pricingTiers(
  prices: [number, number, number, number]
): ServicePricingOption[] {
  return durationTiers.map((tier, index) => ({
    ...tier,
    price: prices[index],
  }));
}

export const services: Service[] = [
  {
    id: "full-body-massage",
    name: "Full body massage",
    category: "massage",
    description:
      "A complete full-body massage experience tailored for total relaxation and rejuvenation.",
    pricingOptions: pricingTiers([120, 210, 285, 365]),
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Full body massage treatment in a private spa suite",
  },
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    category: "massage",
    description:
      "A classic full-body massage using long, flowing strokes to ease tension and promote deep relaxation.",
    pricingOptions: pricingTiers([85, 150, 220, 295]),
    image: image("1544161515-4ab6ce6db874"),
    imageAlt: "Swedish massage therapy session in a calm spa setting",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "massage",
    description:
      "Targeted pressure to release chronic muscle tension and knots in deeper layers of muscle tissue.",
    pricingOptions: pricingTiers([95, 175, 245, 320]),
    image: image("1571019613454-1cb2f99b2d8b"),
    imageAlt: "Deep tissue back massage with focused therapeutic pressure",
  },
  {
    id: "therapeutic-massage",
    name: "Therapeutic Massage",
    category: "massage",
    description:
      "A customized massage focused on relieving pain, improving mobility, and restoring muscular balance.",
    pricingOptions: pricingTiers([90, 165, 235, 305]),
    image: image("1544161515-4ab6ce6db874"),
    imageAlt: "Therapeutic massage treatment for pain relief and recovery",
  },
  {
    id: "tmj-massage",
    name: "TMJ Massage",
    category: "massage",
    description:
      "Specialized jaw, neck, and facial massage to ease TMJ tension, headaches, and jaw discomfort.",
    pricingOptions: pricingTiers([80, 145, 210, 275]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "TMJ and facial massage therapy session",
  },
  {
    id: "cupping-therapy",
    name: "Cupping Therapy",
    category: "massage",
    description:
      "Ancient suction technique to increase circulation, release fascia, and reduce muscle stiffness.",
    pricingOptions: pricingTiers([85, 155, 225, 290]),
    image: image("1552693673-1bf958298935"),
    imageAlt: "Cupping therapy massage treatment",
  },
  {
    id: "holistic-massage",
    name: "Holistic Massage",
    category: "massage",
    description:
      "A whole-body approach blending massage techniques to harmonize body, mind, and spirit.",
    pricingOptions: pricingTiers([95, 170, 240, 310]),
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Holistic full body massage in a serene spa room",
  },
  {
    id: "hot-stone",
    name: "Hot Stone Therapy",
    category: "massage",
    description:
      "Smooth heated stones placed on key points to melt away stress and improve circulation.",
    pricingOptions: pricingTiers([110, 195, 265, 340]),
    image: image("1552693673-1bf958298935"),
    imageAlt: "Hot stone massage with heated stones on the back",
  },
  {
    id: "bamboo-massage",
    name: "Bamboo Massage",
    category: "massage",
    description:
      "Warm bamboo sticks glide over muscles to deliver deep, rolling pressure and profound relaxation.",
    pricingOptions: pricingTiers([105, 185, 255, 325]),
    image: image("1544161515-4ab6ce6db874"),
    imageAlt: "Bamboo massage therapy with warm bamboo tools",
  },
  {
    id: "couples-massage",
    name: "Couples Massage",
    category: "massage",
    description:
      "Share a relaxing side-by-side massage experience in our private couples suite.",
    pricingOptions: pricingTiers([170, 300, 420, 550]),
    image: image("1518611012118-696072aa579a"),
    imageAlt: "Couples massage in a private spa suite",
  },
  {
    id: "lymphatic-drainage",
    name: "Lymphatic Drainage",
    category: "massage",
    description:
      "Gentle rhythmic strokes to stimulate lymph flow, reduce swelling, and support detoxification.",
    pricingOptions: pricingTiers([100, 180, 250, 320]),
    image: image("1571019613454-1cb2f99b2d8b"),
    imageAlt: "Lymphatic drainage massage treatment",
  },
  {
    id: "stomach-massage",
    name: "Stomach Massage",
    category: "massage",
    description:
      "Abdominal massage to ease digestive discomfort, reduce bloating, and promote gut wellness.",
    pricingOptions: pricingTiers([75, 135, 195, 260]),
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Therapeutic stomach and abdominal massage",
  },
  {
    id: "reflexology",
    name: "Reflexology",
    category: "massage",
    description:
      "Pressure-point therapy on the feet and hands to stimulate healing throughout the body.",
    pricingOptions: pricingTiers([70, 125, 180, 240]),
    image: image("1596755389378-c31d21fd1273"),
    imageAlt: "Reflexology foot massage therapy",
  },
  {
    id: "prenatal-massage",
    name: "Prenatal Body Massage",
    category: "massage",
    description:
      "Safe, nurturing massage designed for expectant mothers to ease tension and support comfort.",
    pricingOptions: pricingTiers([90, 160, 230, 300]),
    image: image("1545389336-cf090694435e"),
    imageAlt: "Prenatal body massage for expectant mothers",
  },
  {
    id: "harmony-retreat",
    name: "Harmony Retreat",
    category: "massage",
    description:
      "Our signature blended massage experience combining multiple techniques for total harmony.",
    pricingOptions: pricingTiers([130, 230, 310, 395]),
    image: image("1540555700478-4be289fbecef"),
    imageAlt: "Harmony retreat luxury massage experience",
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy Massage",
    category: "massage",
    description:
      "Essential oil-infused massage tailored to your mood — calm, energize, or restore balance.",
    pricingOptions: pricingTiers([100, 180, 250, 315]),
    image: image("1608571423902-eed4a5ad8108"),
    imageAlt: "Aromatherapy essential oils and herbs for massage",
  },
  {
    id: "k-beauty-glow-facial",
    name: "K-Beauty Glow Facial",
    category: "spa",
    description:
      "Korean-inspired facial layering hydration, gentle exfoliation, and a luminous glass-skin finish.",
    pricingOptions: pricingTiers([95, 175, 245, 315]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "K-Beauty glow facial treatment with radiant skin results",
  },
  {
    id: "total-glow-renewal",
    name: "Total Glow Renewal",
    category: "spa",
    description:
      "A comprehensive facial renewal to brighten dull skin, even tone, and restore a healthy glow.",
    pricingOptions: pricingTiers([100, 185, 255, 325]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Total glow renewal facial spa treatment",
  },
  {
    id: "empress-ritual",
    name: "The Empress Ritual",
    category: "spa",
    description:
      "Our signature luxury facial ritual with premium serums, massage, and a bespoke finishing mask.",
    pricingOptions: pricingTiers([130, 230, 310, 395]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "The Empress Ritual luxury facial experience",
  },
  {
    id: "korean-facial",
    name: "Korean Facial",
    category: "spa",
    description:
      "Authentic Korean skincare techniques for deep hydration, pore refinement, and lasting radiance.",
    pricingOptions: pricingTiers([90, 165, 235, 300]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Korean facial skincare treatment session",
  },
  {
    id: "acne-treatment",
    name: "Acne Treatment",
    category: "spa",
    description:
      "Targeted facial therapy to calm breakouts, reduce inflammation, and balance oily skin.",
    pricingOptions: pricingTiers([85, 155, 220, 285]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Acne treatment facial for clearer skin",
  },
  {
    id: "gyeongrak-deep-tissue-facial",
    name: "Gyeongrak Deep Tissue Facial",
    category: "spa",
    description:
      "Deep facial massage along meridian lines to release tension and improve circulation and tone.",
    pricingOptions: pricingTiers([105, 190, 260, 330]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Gyeongrak deep tissue facial massage treatment",
  },
  {
    id: "gua-sha-facial",
    name: "Gua Sha Facial",
    category: "spa",
    description:
      "Sculpting gua sha strokes to depuff, lift, and enhance natural facial contours.",
    pricingOptions: pricingTiers([90, 165, 235, 300]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Gua sha facial sculpting treatment",
  },
  {
    id: "blackhead-extraction",
    name: "Blackhead Extraction",
    category: "spa",
    description:
      "Professional pore cleansing and gentle extraction for a smoother, clearer complexion.",
    pricingOptions: pricingTiers([75, 140, 200, 265]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Blackhead extraction facial cleansing treatment",
  },
  {
    id: "nano-microneedling-exosome",
    name: "Nano Microneedling + Exosome Therapy",
    category: "spa",
    description:
      "Advanced microneedling with exosome infusion to boost collagen and accelerate skin renewal.",
    pricingOptions: pricingTiers([150, 275, 375, 480]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Nano microneedling with exosome therapy facial",
  },
  {
    id: "decollete-led-rejuvenation",
    name: "Décolleté LED Rejuvenation",
    category: "spa",
    description:
      "LED light therapy for the neck and décolleté to firm skin and reduce fine lines.",
    pricingOptions: pricingTiers([95, 175, 245, 315]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Décolleté LED rejuvenation treatment",
  },
  {
    id: "bridal-neckline-glow",
    name: "Bridal Neckline Glow",
    category: "spa",
    description:
      "Pre-wedding facial focused on the face and neckline for a flawless, photo-ready glow.",
    pricingOptions: pricingTiers([120, 215, 295, 375]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Bridal neckline glow facial for wedding preparation",
  },
  {
    id: "prenatal-postnatal-facial-calm",
    name: "Prenatal & Postnatal Facial Calm",
    category: "spa",
    description:
      "Gentle, pregnancy-safe facial care to soothe sensitive skin and restore balance.",
    pricingOptions: pricingTiers([85, 155, 220, 285]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Prenatal and postnatal calming facial treatment",
  },
  {
    id: "postnatal-recovery-body-massage",
    name: "Postnatal Recovery Body Massage",
    category: "massage",
    description:
      "Nurturing body massage designed for new mothers to ease tension and support recovery.",
    pricingOptions: pricingTiers([95, 175, 245, 320]),
    image: image("1545389336-cf090694435e"),
    imageAlt: "Postnatal recovery body massage for new mothers",
  },
  {
    id: "led-light-therapy",
    name: "LED Light Therapy",
    category: "spa",
    description:
      "HydraFacial add-on using LED wavelengths to calm skin, reduce redness, and support renewal.",
    pricingOptions: pricingTiers([75, 135, 195, 255]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "LED light therapy HydraFacial treatment",
  },
  {
    id: "lymphatic-drainage-face",
    name: "Lymphatic Drainage (Face)",
    category: "spa",
    description:
      "Gentle facial lymphatic drainage to depuff, detoxify, and enhance your HydraFacial results.",
    pricingOptions: pricingTiers([85, 155, 220, 285]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Facial lymphatic drainage HydraFacial add-on",
  },
  {
    id: "wet-diamond-microdermabrasion",
    name: "Wet Diamond Microdermabrasion",
    category: "spa",
    description:
      "Advanced wet diamond tip exfoliation for deeper resurfacing and a smoother complexion.",
    pricingOptions: pricingTiers([95, 175, 245, 315]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Wet diamond microdermabrasion facial treatment",
  },
  {
    id: "glysal-peel",
    name: "Glysal™ Peel 7.5%",
    category: "spa",
    description:
      "A gentle glycolic and salicylic acid peel to refine pores and brighten dull skin.",
    pricingOptions: pricingTiers([90, 165, 235, 300]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Glysal peel HydraFacial treatment",
  },
  {
    id: "regen-gf-booster",
    name: "Regen GF+ Booster",
    category: "spa",
    description:
      "Growth factor booster infusion to support collagen production and skin regeneration.",
    pricingOptions: pricingTiers([85, 155, 220, 285]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Regen GF+ HydraFacial booster serum",
  },
  {
    id: "hydrafillic-pep9",
    name: "Hydrafillic with Pep9™",
    category: "spa",
    description:
      "Peptide-powered booster for firmer, more elastic skin with lasting hydration.",
    pricingOptions: pricingTiers([90, 165, 235, 300]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Hydrafillic with Pep9 HydraFacial booster",
  },
  {
    id: "hydralock-ha-booster",
    name: "Hydralock HA Booster",
    category: "spa",
    description:
      "Hyaluronic acid booster to lock in moisture and plump fine lines for a dewy finish.",
    pricingOptions: pricingTiers([85, 155, 220, 285]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Hydralock HA HydraFacial booster treatment",
  },
  {
    id: "britenol",
    name: "Britenol",
    category: "spa",
    description:
      "Premium brightening booster with vitamin C and bearberry extract to even skin tone.",
    pricingOptions: pricingTiers([95, 175, 245, 315]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Britenol premium HydraFacial booster",
  },
  {
    id: "murad-clarifying-booster",
    name: "Murad Clarifying Booster",
    category: "spa",
    description:
      "Murad-formulated booster to clarify congested skin and minimize breakouts.",
    pricingOptions: pricingTiers([95, 175, 245, 315]),
    image: image("1616394584738-fc6e612e71b9"),
    imageAlt: "Murad clarifying HydraFacial booster",
  },
  {
    id: "omorovicza-advanced-skin-renewal",
    name: "Omorovicza Advanced Skin Renewal",
    category: "spa",
    description:
      "Luxury Omorovicza booster for advanced renewal, radiance, and age-defying results.",
    pricingOptions: pricingTiers([110, 195, 270, 345]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Omorovicza advanced skin renewal HydraFacial booster",
  },
  {
    id: "luxury-facial",
    name: "Luxury Hydrating Facial",
    category: "spa",
    description:
      "A rejuvenating facial with deep cleansing, exfoliation, and a nourishing mask for radiant skin.",
    pricingOptions: pricingTiers([90, 165, 235, 300]),
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Luxury hydrating facial treatment at a spa",
  },
  {
    id: "body-scrub",
    name: "Signature Body Scrub",
    category: "spa",
    description:
      "Full-body exfoliation with natural botanicals, leaving your skin silky smooth and renewed.",
    pricingOptions: pricingTiers([75, 140, 200, 275]),
    image: image("1596755389378-c31d21fd1273"),
    imageAlt: "Body scrub treatment with natural botanical ingredients",
  },
  {
    id: "couples-retreat",
    name: "Couples Spa Retreat",
    category: "spa",
    description:
      "Side-by-side massage and spa experience in our private couples suite with champagne.",
    pricingOptions: pricingTiers([180, 320, 450, 580]),
    image: image("1518611012118-696072aa579a"),
    imageAlt: "Couples spa retreat with side-by-side massage tables",
  },
  {
    id: "yoga-session",
    name: "Private Yoga Session",
    category: "wellness",
    description:
      "One-on-one guided yoga tailored to your level, focusing on flexibility, breath, and mindfulness.",
    pricingOptions: pricingTiers([60, 110, 160, 210]),
    image: image("1544367567-0f2fcb009e0b"),
    imageAlt: "Private yoga session in a peaceful wellness studio",
  },
  {
    id: "meditation",
    name: "Guided Meditation",
    category: "wellness",
    description:
      "A calming guided session to reduce stress, improve focus, and restore inner peace.",
    pricingOptions: pricingTiers([50, 95, 140, 185]),
    image: image("1506126613408-eca07ce68773"),
    imageAlt: "Guided meditation in a tranquil wellness space",
  },
  {
    id: "wellness-package",
    name: "Complete Wellness Package",
    category: "wellness",
    description:
      "Our signature full-day experience: massage, facial, yoga, and a healthy spa lunch.",
    pricingOptions: pricingTiers([150, 280, 390, 520]),
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Complete wellness spa experience with massage and relaxation",
  },
];

export const DEFAULT_PRICING_OPTION_ID = durationTiers[0].id;

export const FULL_BODY_MASSAGE_ID = "full-body-massage";
export const HAPPY_ENDING_ADDON_PRICE = 85;

const LEGACY_SERVICE_IDS: Record<string, string> = {
  "full-body-happy-ending": FULL_BODY_MASSAGE_ID,
};

export function normalizeServiceId(serviceId: string): string {
  return LEGACY_SERVICE_IDS[serviceId] ?? serviceId;
}

export function supportsHappyEndingAddon(serviceId: string): boolean {
  return normalizeServiceId(serviceId) === FULL_BODY_MASSAGE_ID;
}

export function getServiceById(serviceId: string): Service | undefined {
  return services.find((s) => s.id === normalizeServiceId(serviceId));
}

export function getPricingOption(
  service: Service,
  pricingOptionId: string
): ServicePricingOption | undefined {
  return service.pricingOptions.find((o) => o.id === pricingOptionId);
}

export function getStartingPrice(service: Service): number {
  return service.pricingOptions[0]?.price ?? 0;
}

export const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

export const categoryLabels: Record<Service["category"], string> = {
  massage: "Massage Therapy",
  spa: "Spa Treatments",
  wellness: "Wellness & Holistic",
};
