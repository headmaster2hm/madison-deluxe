import Image from "next/image";
import Link from "next/link";
import {
  getWeekendVibeStartingPrice,
  weekendVibePackage,
} from "@/data/weekend-vibe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekend Vibe Package | Madison Deluxe Spa & Wellness Center",
  description:
    "Indulge in the Weekend Vibe — our premium massage package with full body treatment, hot stones, aromatherapy, deep tissue work, and happy ending included.",
};

export default function WeekendVibePage() {
  const startingPrice = getWeekendVibeStartingPrice();

  return (
    <>
      {/* Hero */}
      <section className="hero-section text-cream-50">
        <div className="hero-media">
          <Image
            src={weekendVibePackage.heroImage}
            alt={weekendVibePackage.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-overlay bg-gradient-to-br from-sage-900/85 via-sage-800/75 to-sage-900/90" />

        <div className="hero-content section-padding mx-auto max-w-4xl text-center">
          <p className="subheading text-gold-400">Premium Package</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">
            {weekendVibePackage.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage-100 md:text-xl">
            {weekendVibePackage.tagline}
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gold-400">
            From ${startingPrice} · Happy ending included
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/book?service=${weekendVibePackage.id}`}
              className="btn-primary bg-gold-500 hover:bg-gold-600"
            >
              Book Weekend Vibe
            </Link>
            <a href="#included" className="btn-outline border-cream-200 text-cream-50 hover:bg-cream-50 hover:text-sage-800">
              See What&apos;s Included
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding mx-auto max-w-3xl text-center">
        <p className="text-lg leading-relaxed text-sage-600 md:text-xl">
          {weekendVibePackage.intro}
        </p>
        <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          {weekendVibePackage.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-sage-200 bg-white px-5 py-4 text-sm text-sage-700"
            >
              <span className="mt-0.5 text-gold-500" aria-hidden="true">
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Included treatments */}
      <section id="included" className="bg-sage-100/50 section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="subheading">The Full Experience</p>
            <h2 className="heading-serif mt-3">Massage Services Included</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sage-600">
              Every Weekend Vibe session follows a carefully designed sequence —
              six luxurious treatments woven into one unforgettable visit.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {weekendVibePackage.treatments.map((treatment, index) => (
              <div
                key={treatment.title}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={treatment.image}
                    alt={treatment.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-sage-800">
                    {treatment.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-sage-600">
                    {treatment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding mx-auto max-w-4xl">
        <div className="text-center">
          <p className="subheading">Premium Pricing</p>
          <h2 className="heading-serif mt-3">Choose Your Duration</h2>
          <p className="mx-auto mt-4 max-w-xl text-sage-600">
            The Weekend Vibe is priced above our standard services because every
            session includes the full six-treatment sequence and happy ending,
            no hidden fees, no add-ons.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {weekendVibePackage.pricing.map((tier) => (
            <div
              key={tier.label}
              className="rounded-2xl border border-sage-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-sm font-medium uppercase tracking-wider text-sage-500">
                {tier.label}
              </p>
              <p className="mt-2 font-serif text-4xl font-semibold text-sage-800">
                ${tier.price}
              </p>
              <p className="mt-2 text-xs text-sage-500">All treatments included</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-gold-200 bg-gold-50/50 p-6 text-center">
          <p className="text-sm text-sage-700">
            <span className="font-semibold text-sage-800">Why it costs more:</span>{" "}
            Compared to a standard full body massage with happy ending, the Weekend
            Vibe adds hot stone therapy, aromatherapy, deep tissue focus, and a
            private-suite experience — all in one seamless session.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-image-section bg-sage-800 text-center text-cream-50">
        <div className="hero-content section-padding mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            Ready for Your Weekend Vibe?
          </h2>
          <p className="mt-4 text-lg text-sage-200">
            Reserve your private suite and let our expert therapists take care of
            the rest. You deserve this.
          </p>
          <Link
            href={`/book?service=${weekendVibePackage.id}`}
            className="btn-primary mt-8 bg-gold-500 hover:bg-gold-600"
          >
            Book the Weekend Vibe
          </Link>
        </div>
      </section>
    </>
  );
}
