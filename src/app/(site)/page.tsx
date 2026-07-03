import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { siteImages } from "@/data/images";
import { services, categoryLabels } from "@/data/services";

export default function HomePage() {
  const categories = ["massage", "spa", "wellness"] as const;

  const features = [
    {
      image: siteImages.features.naturalProducts,
      title: "Natural Products",
      desc: "Premium organic and botanical ingredients in every treatment.",
    },
    {
      image: siteImages.features.expertTherapists,
      title: "Expert Therapists",
      desc: "Licensed professionals with years of specialized training.",
    },
    {
      image: siteImages.features.luxuriousSetting,
      title: "Luxurious Setting",
      desc: "Serene, elegantly designed spaces for complete relaxation.",
    },
    {
      image: siteImages.features.personalizedCare,
      title: "Personalized Care",
      desc: "Every session tailored to your unique needs and preferences.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-section text-cream-50">
        <div className="hero-media">
          <Image
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-overlay bg-gradient-to-br from-sage-900/80 via-sage-800/70 to-sage-900/80" />

        <div className="hero-content section-padding mx-auto flex max-w-7xl flex-col items-center text-center">
          <p className="subheading text-gold-400">Welcome to tranquility</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-7xl lg:text-8xl">
            Madison Deluxe
          </h1>
          <p className="mt-2 text-lg font-light uppercase tracking-[0.3em] text-sage-200 md:text-xl">
            Spa & Wellness Center
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sage-100 md:text-xl">
            Indulge in world-class spa treatments, therapeutic massage, and holistic
            wellness experiences designed to restore your body, mind, and spirit.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/book" className="btn-primary bg-gold-500 hover:bg-gold-600">
              Book Your Appointment
            </Link>
            <Link href="#services" className="btn-outline border-cream-200 text-cream-50 hover:bg-cream-50 hover:text-sage-800">
              Explore Services
            </Link>
          </div>
        </div>

        <div className="hero-content relative mx-auto grid max-w-7xl grid-cols-3 gap-px bg-sage-600/30 px-6 pb-16 md:px-12">
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "10K+", label: "Happy Clients" },
            { value: "20+", label: "Premium Services" },
          ].map((stat) => (
            <div key={stat.label} className="bg-sage-900/50 px-4 py-8 text-center backdrop-blur-sm">
              <p className="font-serif text-3xl font-semibold text-gold-400 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-sage-200">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding mx-auto max-w-7xl">
        <div className="text-center">
          <p className="subheading">Our Offerings</p>
          <h2 className="heading-serif mt-3">Services & Treatments</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sage-600">
            From soothing massages to rejuvenating facials and holistic wellness
            programs — every treatment is crafted to deliver an unforgettable experience.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mt-16">
            <h3 className="mb-8 border-b border-sage-200 pb-3 font-serif text-2xl font-semibold text-sage-700">
              {categoryLabels[category]}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === category)
                .map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center">
          <Link href="/book" className="btn-primary">
            Book a Service
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-sage-100/50 section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="subheading">Why Madison Deluxe</p>
            <h2 className="heading-serif mt-3">The Ultimate Wellness Experience</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-40">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-semibold text-sage-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sage-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={siteImages.about.src}
                alt={siteImages.about.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-gold-500 px-8 py-6 text-white shadow-lg lg:block">
              <p className="font-serif text-3xl font-semibold">Since 2010</p>
              <p className="text-sm opacity-90">Serving Madison with care</p>
            </div>
          </div>

          <div>
            <p className="subheading">Our Story</p>
            <h2 className="heading-serif mt-3">A Sanctuary of Serenity</h2>
            <p className="mt-6 leading-relaxed text-sage-600">
              Madison Deluxe Spa & Wellness Center was founded with a simple vision:
              to create a haven where guests can escape the stresses of daily life
              and reconnect with themselves.
            </p>
            <p className="mt-4 leading-relaxed text-sage-600">
              Our team of skilled therapists and wellness practitioners combine
              time-honored techniques with modern innovations to deliver treatments
              that nurture your body, calm your mind, and uplift your spirit.
            </p>
            <p className="mt-4 leading-relaxed text-sage-600">
              Whether you seek relief from muscle tension, a glowing complexion,
              or a moment of mindful peace — we are here to guide your journey to wellness.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/team" className="btn-outline">
                Meet Our Team
              </Link>
              <Link href="/book" className="btn-primary">
                Schedule Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-image-section bg-sage-700 text-center text-cream-50">
        <div className="hero-media">
          <Image
            src={siteImages.cta.src}
            alt={siteImages.cta.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="hero-content section-padding mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            Ready to Relax?
          </h2>
          <p className="mt-4 text-lg text-sage-200">
            Book your appointment today and take the first step toward complete rejuvenation.
          </p>
          <Link
            href="/book"
            className="btn-primary mt-8 bg-gold-500 hover:bg-gold-600"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
