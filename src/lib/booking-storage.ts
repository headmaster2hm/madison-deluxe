import type { BookingConfirmation, BookingData } from "@/types/booking";

const BOOKING_KEY = "madison-deluxe-booking";
const CONFIRMATION_KEY = "madison-deluxe-confirmation";

function normalizeBooking(raw: BookingData & { serviceIds?: string[] }): BookingData | null {
  if (raw.selections?.length) {
    return raw as BookingData;
  }

  if (raw.serviceIds?.length) {
    return {
      ...raw,
      selections: raw.serviceIds.map((serviceId) => ({
        serviceId,
        pricingOptionId: "30min",
      })),
    };
  }

  return null;
}

export function saveBooking(booking: BookingData): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
}

export function getBooking(): BookingData | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(BOOKING_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as BookingData & { serviceIds?: string[] };
    return normalizeBooking(parsed);
  } catch {
    return null;
  }
}

export function clearBooking(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BOOKING_KEY);
}

export function saveConfirmation(confirmation: BookingConfirmation): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify(confirmation));
}

export function getConfirmation(): BookingConfirmation | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(CONFIRMATION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingConfirmation;
  } catch {
    return null;
  }
}

export function clearConfirmation(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CONFIRMATION_KEY);
}
