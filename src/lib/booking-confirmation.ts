import type Stripe from "stripe";
import { services } from "@/data/services";
import type { BookingConfirmation, BookingData } from "@/types/booking";

export function generateConfirmationId(): string {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MD-${datePart}-${random}`;
}

export function validateBooking(booking: BookingData): string | null {
  if (!booking.firstName?.trim()) return "First name is required";
  if (!booking.lastName?.trim()) return "Last name is required";
  if (!booking.email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    return "Please enter a valid email";
  }
  if (!booking.phone?.trim()) return "Phone number is required";
  if (!booking.serviceIds?.length) return "No services selected";
  if (!booking.date) return "Date is required";
  if (!booking.time) return "Time is required";
  return null;
}

export function getBookedServices(serviceIds: string[]) {
  const bookedServices = services
    .filter((s) => serviceIds.includes(s.id))
    .map((s) => ({
      id: s.id,
      name: s.name,
      duration: s.duration,
      price: s.price,
    }));

  if (bookedServices.length !== serviceIds.length) {
    return null;
  }

  return bookedServices;
}

export async function buildConfirmationFromSession(
  session: Stripe.Checkout.Session,
  paymentLast4 = "****"
): Promise<BookingConfirmation | null> {
  const metadata = session.metadata;
  if (!metadata?.confirmation_id || !metadata.service_ids) {
    return null;
  }

  const serviceIds = metadata.service_ids.split(",").filter(Boolean);
  const bookedServices = getBookedServices(serviceIds);
  if (!bookedServices) return null;

  const totalAmount =
    session.amount_total != null
      ? session.amount_total / 100
      : bookedServices.reduce((sum, s) => sum + s.price, 0);

  const booking: BookingData = {
    firstName: metadata.first_name ?? "",
    lastName: metadata.last_name ?? "",
    email: metadata.email ?? session.customer_email ?? "",
    phone: metadata.phone ?? "",
    serviceIds,
    date: metadata.date ?? "",
    time: metadata.time ?? "",
    notes: metadata.notes ?? "",
  };

  return {
    confirmationId: metadata.confirmation_id,
    stripeSessionId: session.id,
    booking,
    services: bookedServices,
    totalAmount,
    totalDuration: bookedServices.reduce((sum, s) => sum + s.duration, 0),
    paidAt: new Date((session.created ?? Date.now() / 1000) * 1000).toISOString(),
    paymentLast4,
  };
}

export async function getPaymentLast4(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<string> {
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  if (!paymentIntentId) return "****";

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["payment_method"],
    });

    const paymentMethod = paymentIntent.payment_method;
    if (paymentMethod && typeof paymentMethod !== "string" && paymentMethod.card) {
      return paymentMethod.card.last4 ?? "****";
    }
  } catch {
    return "****";
  }

  return "****";
}
