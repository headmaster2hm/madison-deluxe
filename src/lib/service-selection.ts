import {
  getPricingOption,
  getServiceById,
  HAPPY_ENDING_ADDON_PRICE,
  normalizeServiceId,
  supportsHappyEndingAddon,
  DEFAULT_PRICING_OPTION_ID,
} from "@/data/services";
import type { BookedServiceLine, ServiceSelection } from "@/types/booking";

export function resolveBookedServices(
  selections: ServiceSelection[]
): BookedServiceLine[] | null {
  const lines: BookedServiceLine[] = [];

  for (const selection of selections) {
    const serviceId = normalizeServiceId(selection.serviceId);
    const service = getServiceById(serviceId);
    if (!service) return null;

    const option = getPricingOption(service, selection.pricingOptionId);
    if (!option) return null;

    const happyEndingAddon =
      selection.happyEnding && supportsHappyEndingAddon(serviceId)
        ? HAPPY_ENDING_ADDON_PRICE
        : 0;

    lines.push({
      id: service.id,
      name:
        happyEndingAddon > 0
          ? `${service.name} + Happy ending`
          : service.name,
      duration: option.durationMinutes,
      durationLabel: option.label,
      price: option.price + happyEndingAddon,
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
        typeof item.pricingOptionId === "string" &&
        (item.happyEnding === undefined || typeof item.happyEnding === "boolean")
    );

    if (!valid) return null;

    const normalized = parsed.map((item) => ({
      ...item,
      serviceId: normalizeServiceId(item.serviceId),
    }));

    const lines = resolveBookedServices(normalized);
    if (!lines || lines.length !== normalized.length) return null;

    return normalized;
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
    pricingOptionId: DEFAULT_PRICING_OPTION_ID,
  }));
}

export function getSelectionTotals(lines: BookedServiceLine[]) {
  return {
    totalPrice: lines.reduce((sum, line) => sum + line.price, 0),
    totalDuration: lines.reduce((sum, line) => sum + line.duration, 0),
  };
}
