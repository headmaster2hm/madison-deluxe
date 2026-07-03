const image = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;

export const WEEKEND_VIBE_ID = "weekend-vibe";

export interface WeekendVibeTreatment {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const weekendVibePackage = {
  id: WEEKEND_VIBE_ID,
  name: "Weekend Vibe",
  tagline: "Our signature escape for Saturdays, Sundays, and every day you deserve more.",
  heroImage: image("1515377905703-c4788e51af15", 1920),
  heroImageAlt: "Luxury weekend spa massage experience in a private suite",
  intro:
    "Leave the week behind. The Weekend Vibe is Madison Deluxe's most indulgent massage experience — a curated journey of deep relaxation, sensual aromatherapy, and expert bodywork that ends with our premium happy ending, included in every session.",
  pricing: [
    { label: "30 min", durationMinutes: 30, price: 289 },
    { label: "1 hr", durationMinutes: 60, price: 419 },
    { label: "2 hr", durationMinutes: 120, price: 549 },
    { label: "3 hr", durationMinutes: 180, price: 689 },
  ],
  highlights: [
    "Happy ending included — no add-ons required",
    "Private suite with ambient lighting & curated playlist",
    "Performed by our senior massage therapists",
    "Premium botanical oils and warm stone elements",
  ],
  treatments: [
    {
      title: "Signature Full Body Massage",
      description:
        "Your session opens with our signature full-body massage — long, flowing strokes from head to toe designed to melt tension and prepare your body for deeper work. Every movement is unhurried, intentional, and tailored to your comfort.",
      image: image("1515377905703-c4788e51af15", 600),
      imageAlt: "Signature full body massage in a private spa suite",
    },
    {
      title: "Hot Stone Warm-Up",
      description:
        "Smooth, heated stones are placed along your spine, shoulders, and legs to open muscles and boost circulation. The gentle warmth penetrates deep tissue, creating a luxurious foundation for the treatments that follow.",
      image: image("1552693673-1bf958298935", 600),
      imageAlt: "Hot stone therapy during weekend vibe massage",
    },
    {
      title: "Aromatherapy Infusion",
      description:
        "A custom blend of calming essential oils — lavender, sandalwood, and ylang-ylang — is worked into your skin throughout the session. Breathe deeply as the aromas quiet your mind and elevate the entire experience.",
      image: image("1608571423902-eed4a5ad8108", 600),
      imageAlt: "Aromatherapy oils for weekend vibe treatment",
    },
    {
      title: "Deep Tissue Release",
      description:
        "Your therapist applies focused deep tissue techniques to the neck, shoulders, lower back, and any areas holding stress from the week. Knots are eased with precision pressure so you leave feeling light and restored.",
      image: image("1571019613454-1cb2f99b2d8b", 600),
      imageAlt: "Deep tissue massage focus during weekend package",
    },
    {
      title: "Holistic Relaxation Finish",
      description:
        "Before the finale, gentle holistic strokes harmonize body and breath. This calming transition prepares you for complete surrender — the perfect bridge to the most relaxing part of your visit.",
      image: image("1544161515-4ab6ce6db874", 600),
      imageAlt: "Holistic relaxation massage strokes",
    },
    {
      title: "Happy Ending — Included",
      description:
        "Every Weekend Vibe session concludes with our premium happy ending — a discreet, expertly delivered finale that leaves you in a state of total bliss. It is always included; never an extra charge.",
      image: image("1540555700478-4be289fbecef", 600),
      imageAlt: "Relaxing conclusion to weekend vibe spa experience",
    },
  ] satisfies WeekendVibeTreatment[],
};

export function getWeekendVibeStartingPrice(): number {
  return weekendVibePackage.pricing[0]?.price ?? 0;
}
