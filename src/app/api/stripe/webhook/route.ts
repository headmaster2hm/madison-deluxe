import { NextResponse } from "next/server";
import { saveAppointment } from "@/lib/appointments";
import {
  buildConfirmationFromSession,
  getPaymentLast4,
} from "@/lib/booking-confirmation";
import { sendConfirmationEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    if (session.metadata?.email_sent === "true") {
      return NextResponse.json({ received: true });
    }

    try {
      const stripe = getStripe();
      const paymentLast4 = await getPaymentLast4(stripe, session);
      const confirmation = await buildConfirmationFromSession(session, paymentLast4);

      if (!confirmation) {
        console.error("Unable to build confirmation from Stripe session:", session.id);
        return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 });
      }

      const emailResult = await sendConfirmationEmail(confirmation);

      await saveAppointment(confirmation, emailResult.sent);

      if (emailResult.sent) {
        await stripe.checkout.sessions.update(session.id, {
          metadata: {
            ...session.metadata,
            email_sent: "true",
          },
        });
      } else {
        console.warn("Confirmation email not sent:", emailResult.error);
      }
    } catch (error) {
      console.error("Webhook processing error:", error);
      return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
