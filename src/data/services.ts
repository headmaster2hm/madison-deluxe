const image = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;

export interface Service {
  id: string;
  name: string;
  category: "massage" | "spa" | "wellness";
  description: string;
  duration: number;
  price: number;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    category: "massage",
    description:
      "A classic full-body massage using long, flowing strokes to ease tension and promote deep relaxation.",
    duration: 60,
    price: 95,
    image: image("1544161515-4ab6ce6db874"),
    imageAlt: "Swedish massage therapy session in a calm spa setting",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    category: "massage",
    description:
      "Targeted pressure to release chronic muscle tension and knots in deeper layers of muscle tissue.",
    duration: 75,
    price: 120,
    image: image("1571019613454-1cb2f99b2d8b"),
    imageAlt: "Deep tissue back massage with focused therapeutic pressure",
  },
  {
    id: "hot-stone",
    name: "Hot Stone Therapy",
    category: "massage",
    description:
      "Smooth heated stones placed on key points to melt away stress and improve circulation.",
    duration: 90,
    price: 145,
    image: image("1552693673-1bf958298935"),
    imageAlt: "Hot stone massage with heated stones on the back",
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy Massage",
    category: "massage",
    description:
      "Essential oil-infused massage tailored to your mood — calm, energize, or restore balance.",
    duration: 60,
    price: 110,
    image: image("1608571423902-eed4a5ad8108"),
    imageAlt: "Aromatherapy essential oils and herbs for massage",
  },
  {
    id: "luxury-facial",
    name: "Luxury Hydrating Facial",
    category: "spa",
    description:
      "A rejuvenating facial with deep cleansing, exfoliation, and a nourishing mask for radiant skin.",
    duration: 60,
    price: 105,
    image: image("1570172619644-dfd03ed5d881"),
    imageAlt: "Luxury hydrating facial treatment at a spa",
  },
  {
    id: "body-scrub",
    name: "Signature Body Scrub",
    category: "spa",
    description:
      "Full-body exfoliation with natural botanicals, leaving your skin silky smooth and renewed.",
    duration: 45,
    price: 85,
    image: image("1596755389378-c31d21fd1273"),
    imageAlt: "Body scrub treatment with natural botanical ingredients",
  },
  {
    id: "couples-retreat",
    name: "Couples Spa Retreat",
    category: "spa",
    description:
      "Side-by-side massage and spa experience in our private couples suite with champagne.",
    duration: 120,
    price: 280,
    image: image("1518611012118-696072aa579a"),
    imageAlt: "Couples spa retreat with side-by-side massage tables",
  },
  {
    id: "yoga-session",
    name: "Private Yoga Session",
    category: "wellness",
    description:
      "One-on-one guided yoga tailored to your level, focusing on flexibility, breath, and mindfulness.",
    duration: 60,
    price: 75,
    image: image("1544367567-0f2fcb009e0b"),
    imageAlt: "Private yoga session in a peaceful wellness studio",
  },
  {
    id: "meditation",
    name: "Guided Meditation",
    category: "wellness",
    description:
      "A calming guided session to reduce stress, improve focus, and restore inner peace.",
    duration: 45,
    price: 55,
    image: image("1506126613408-eca07ce68773"),
    imageAlt: "Guided meditation in a tranquil wellness space",
  },
  {
    id: "wellness-package",
    name: "Complete Wellness Package",
    category: "wellness",
    description:
      "Our signature full-day experience: massage, facial, yoga, and a healthy spa lunch.",
    duration: 240,
    price: 350,
    image: image("1515377905703-c4788e51af15"),
    imageAlt: "Complete wellness spa experience with massage and relaxation",
  },
];

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
