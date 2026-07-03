import {
  getPricingOption,
  getServiceById,
  standardPricingOptions,
} from "@/data/services";
import type { BookedServiceLine, ServiceSelection } from "@/types/booking";

export function resolveBookedServices(
  selections: ServiceSelection[]
): BookedServiceLine[] | null {
  const lines: BookedServiceLine[] = [];

  for (const selection of selections) {
    const service = getServiceById(selection.serviceId);
    if (!service) return null;

    const option = getPricingOption(service, selection.pricingOptionId);
    if (!option) return null;

    lines.push({
      id: service.id,
      name: service.name,
      duration: option.durationMinutes,
      durationLabel: option.label,
      price: option.price,
      pricingOptionId: option.id,
    });
  }

  return lines;
}

export function encodeSelections(selections: ServiceSelection[]): string {
  return JSON.stringify(selections);
}

export function decodeSelections(raw: string | undefined): ServiceSelection[] | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as ServiceSelection[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    const valid = parsed.every(
      (item) =>
        typeof item.serviceId === "string" &&
        typeof item.pricingOptionId === "string"
    );

    if (!valid) return null;

    const lines = resolveBookedServices(parsed);
    if (!lines || lines.length !== parsed.length) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function decodeLegacyServiceIds(raw: string | undefined): ServiceSelection[] | null {
  if (!raw) return null;

  const serviceIds = raw.split(",").filter(Boolean);
  if (serviceIds.length === 0) return null;

  return serviceIds.map((serviceId) => ({
    serviceId,
    pricingOptionId: standardPricingOptions[0].id,
  }));
}

export function getSelectionTotals(lines: BookedServiceLine[]) {
  return {
    totalPrice: lines.reduce((sum, line) => sum + line.price, 0),
    totalDuration: lines.reduce((sum, line) => sum + line.duration, 0),
  };
}
