import Link from "next/link";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white transition-all duration-300 hover:border-sage-300 hover:shadow-lg">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-sage-50 to-sage-100 text-5xl transition-transform duration-300 group-hover:scale-105">
        {service.image}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-sage-800">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sage-600">
          {service.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-sage-100 pt-4">
          <div className="text-sm text-sage-500">
            <span>{service.duration} min</span>
            <span className="mx-2">·</span>
            <span className="font-semibold text-sage-700">${service.price}</span>
          </div>
          <Link
            href={`/book?service=${service.id}`}
            className="text-xs font-medium uppercase tracking-wider text-gold-600 transition-colors hover:text-gold-500"
          >
            Book →
          </Link>
        </div>
      </div>
    </div>
  );
}
