import { NextResponse } from "next/server";
import {
  generateConfirmationId,
  getBookedServices,
  validateBooking,
} from "@/lib/booking-confirmation";
import { getAppUrl, getStripe } from "@/lib/stripe";
import type { BookingData } from "@/types/booking";

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const booking = body.booking as BookingData;

    if (!booking) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const validationError = validateBooking(booking);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const bookedServices = getBookedServices(booking.serviceIds);
    if (!bookedServices) {
      return NextResponse.json({ error: "Invalid service selection" }, { status: 400 });
    }

    const stripe = getStripe();
    const appUrl = getAppUrl(request);
    const confirmationId = generateConfirmationId();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: booking.email,
      line_items: bookedServices.map((service) => ({
        price_data: {
          currency: "usd",
          unit_amount: service.price * 100,
          product_data: {
            name: service.name,
            description: `${service.duration} minute treatment`,
          },
        },
        quantity: 1,
      })),
      metadata: {
        confirmation_id: confirmationId,
        first_name: booking.firstName,
        last_name: booking.lastName,
        email: booking.email,
        phone: booking.phone,
        date: booking.date,
        time: booking.time,
        notes: booking.notes ?? "",
        service_ids: booking.serviceIds.join(","),
        email_sent: "false",
      },
      success_url: `${appUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment?canceled=true`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create Stripe checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Create checkout session error:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
