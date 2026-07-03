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

export const standardPricingOptions: ServicePricingOption[] = [
  { id: "30min", label: "30 min", durationMinutes: 30, price: 100 },
  { id: "1hr", label: "1 hr", durationMinutes: 60, price: 200 },
  { id: "2hr", label: "2 hr", durationMinutes: 120, price: 250 },
  { id: "3hr", label: "3 hr", durationMinutes: 180, price: 300 },
];

const pricing = standardPricingOptions;

export const services: Service[] = [
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    category: "massage",
    description:
      "A classic full-body massage using long, flowing strokes to ease tension and promote deep relaxation.",
    pricingOptions: pricing,
    image: image("1544161515-4ab6ce6db874"),
    imageAlt: "Swedish massage therapy session in a calm spa setting",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "massage",
    description:
      "Targeted pressure to release chronic muscle tension and knots in deeper layers of muscle tissue.",
    pricingOptions: pricing,
    image: image("1571019613454-1cb2f99b2d8b"),
    imageAlt: "Deep tissue back massage with focused therapeutic pressure",
  },
  {
    id: "hot-stone",
    name: "Hot Stone Therapy",
    category: "massage",
    description:
      "Smooth heated stones placed on key points to melt away stress and improve circulation.",
    pricingOptions: pricing,
    image: image("1552693673-1bf958298935"),
    imageAlt: "Hot stone massage with heated stones on the back",
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy Massage",
    category: "massage",
    description:
      "Essential oil-infused massage tailored to your mood — calm, energize, or restore balance.",
    pricingOptions: pricing,
    image: image("1608571423902-eed4a5ad8108"),
    imageAlt: "Aromatherapy essential oils and herbs for massage",
  },
  {
    id: "full-body-happy-ending",
    name: "Full body massage + happy ending",
    category: "massage",
    description:
      "A complete full-body massage experience tailored for total relaxation and rejuvenation.",
    pricingOptions: pricing,
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Full body massage treatment in a private spa suite",
  },
  {
    id: "luxury-facial",
    name: "Luxury Hydrating Facial",
    category: "spa",
    description:
      "A rejuvenating facial with deep cleansing, exfoliation, and a nourishing mask for radiant skin.",
    pricingOptions: pricing,
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Luxury hydrating facial treatment at a spa",
  },
  {
    id: "body-scrub",
    name: "Signature Body Scrub",
    category: "spa",
    description:
      "Full-body exfoliation with natural botanicals, leaving your skin silky smooth and renewed.",
    pricingOptions: pricing,
    image: image("1596755389378-c31d21fd1273"),
    imageAlt: "Body scrub treatment with natural botanical ingredients",
  },
  {
    id: "couples-retreat",
    name: "Couples Spa Retreat",
    category: "spa",
    description:
      "Side-by-side massage and spa experience in our private couples suite with champagne.",
    pricingOptions: pricing,
    image: image("1518611012118-696072aa579a"),
    imageAlt: "Couples spa retreat with side-by-side massage tables",
  },
  {
    id: "yoga-session",
    name: "Private Yoga Session",
    category: "wellness",
    description:
      "One-on-one guided yoga tailored to your level, focusing on flexibility, breath, and mindfulness.",
    pricingOptions: pricing,
    image: image("1544367567-0f2fcb009e0b"),
    imageAlt: "Private yoga session in a peaceful wellness studio",
  },
  {
    id: "meditation",
    name: "Guided Meditation",
    category: "wellness",
    description:
      "A calming guided session to reduce stress, improve focus, and restore inner peace.",
    pricingOptions: pricing,
    image: image("1506126613408-eca07ce68773"),
    imageAlt: "Guided meditation in a tranquil wellness space",
  },
  {
    id: "wellness-package",
    name: "Complete Wellness Package",
    category: "wellness",
    description:
      "Our signature full-day experience: massage, facial, yoga, and a healthy spa lunch.",
    pricingOptions: pricing,
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Complete wellness spa experience with massage and relaxation",
  },
];

export function getServiceById(serviceId: string): Service | undefined {
  return services.find((s) => s.id === serviceId);
}

export function getPricingOption(
  service: Service,
  pricingOptionId: string
): ServicePricingOption | undefined {
  return service.pricingOptions.find((o) => o.id === pricingOptionId);
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
