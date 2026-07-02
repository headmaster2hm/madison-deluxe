import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-sage-200 bg-sage-800 text-cream-100">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl font-semibold text-cream-50">
              Madison Deluxe
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-400">
              Spa & Wellness Center
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-sage-200">
              Your sanctuary for relaxation, rejuvenation, and holistic wellness.
              We invite you to escape the everyday and discover true tranquility.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Hours
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-sage-200">
              <li>Monday – Friday: 9:00 AM – 8:00 PM</li>
              <li>Saturday: 9:00 AM – 7:00 PM</li>
              <li>Sunday: 10:00 AM – 6:00 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-sage-200">
              <li>123 Wellness Boulevard</li>
              <li>Madison, WI 53703</li>
              <li>
                <a href="tel:+16025550123" className="hover:text-gold-400 transition-colors">
                  (602) 555-0123
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@madisondeluxe.com"
                  className="hover:text-gold-400 transition-colors"
                >
                  hello@madisondeluxe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sage-700 pt-8 md:flex-row">
          <p className="text-xs text-sage-300">
            © {new Date().getFullYear()} Madison Deluxe Spa & Wellness Center. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/book" className="text-xs uppercase tracking-wider text-gold-400 hover:text-gold-500">
              Book Now
            </Link>
            <Link href="/#services" className="text-xs uppercase tracking-wider text-sage-300 hover:text-cream-50">
              Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
