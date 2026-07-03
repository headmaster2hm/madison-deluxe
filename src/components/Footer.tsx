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
            <p className="mt-4 text-sm text-sage-200">Active 24/7</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-sage-200">
              <li>(602) XXX - XXXX</li>
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
            <Link href="/weekend-vibe" className="text-xs uppercase tracking-wider text-gold-400 hover:text-gold-500">
              Weekend Vibe
            </Link>
            <Link href="/book" className="text-xs uppercase tracking-wider text-gold-400 hover:text-gold-500">
              Book Now
            </Link>
            <Link href="/team" className="text-xs uppercase tracking-wider text-sage-300 hover:text-cream-50">
              Team
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
