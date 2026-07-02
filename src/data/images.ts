const image = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;

export const siteImages = {
  hero: {
    src: image("1540555700478-4be289fbecef", 1920),
    alt: "Serene luxury spa interior with soft lighting and relaxation area",
  },
  about: {
    src: image("1545389336-cf090694435e", 900),
    alt: "Woman relaxing during a spa wellness treatment",
  },
  cta: {
    src: image("1544161515-4ab6ce6db874", 1920),
    alt: "Relaxing spa massage treatment",
  },
  features: {
    naturalProducts: {
      src: image("1608571423902-eed4a5ad8108", 400),
      alt: "Natural botanical essential oils and spa products",
    },
    expertTherapists: {
      src: image("1544161515-4ab6ce6db874", 400),
      alt: "Professional massage therapist providing treatment",
    },
    luxuriousSetting: {
      src: image("1540555700478-4be289fbecef", 400),
      alt: "Elegant spa treatment room with candles and flowers",
    },
    personalizedCare: {
      src: image("1570172619644-dfd03ed5d881", 400),
      alt: "Therapeutic massage tailored to client needs",
    },
  },
} as const;
