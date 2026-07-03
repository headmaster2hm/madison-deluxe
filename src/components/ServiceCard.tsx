import Image from "next/image";
import Link from "next/link";
import { getStartingPrice } from "@/data/services";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const startingPrice = getStartingPrice(service);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white transition-all duration-300 hover:border-sage-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/20 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-sage-800">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sage-600">
          {service.description}
        </p>
        <div className="mt-4 space-y-2 border-t border-sage-100 pt-4">
          <div className="flex flex-wrap gap-2">
            {service.pricingOptions.map((option) => (
              <span
                key={option.id}
                className="rounded-full bg-sage-50 px-2.5 py-1 text-xs text-sage-600"
              >
                {option.label} · ${option.price}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-sage-700">
              From ${startingPrice}
            </span>
            <Link
              href={`/book?service=${service.id}`}
              className="text-xs font-medium uppercase tracking-wider text-gold-600 transition-colors hover:text-gold-500"
            >
              Book →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
