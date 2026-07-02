import { NextResponse } from "next/server";
import { saveAppointment } from "@/lib/appointments";
import {
  buildConfirmationFromSession,
  getPaymentLast4,
} from "@/lib/booking-confirmation";
import { sendConfirmationEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const paymentLast4 = await getPaymentLast4(stripe, session);
    const confirmation = await buildConfirmationFromSession(session, paymentLast4);

    if (!confirmation) {
      return NextResponse.json({ error: "Invalid booking session" }, { status: 400 });
    }

    await saveAppointment(confirmation, session.metadata?.email_sent === "true");

    return NextResponse.json({
      confirmation,
      emailSent: session.metadata?.email_sent === "true",
    });
  } catch (error) {
    console.error("Booking session retrieval error:", error);
    return NextResponse.json({ error: "Unable to load booking details" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    if (session.metadata?.email_sent === "true") {
      const paymentLast4 = await getPaymentLast4(stripe, session);
      const confirmation = await buildConfirmationFromSession(session, paymentLast4);
      if (confirmation) {
        await saveAppointment(confirmation, true);
      }
      return NextResponse.json({ confirmation, emailSent: true });
    }

    const paymentLast4 = await getPaymentLast4(stripe, session);
    const confirmation = await buildConfirmationFromSession(session, paymentLast4);

    if (!confirmation) {
      return NextResponse.json({ error: "Invalid booking session" }, { status: 400 });
    }

    const emailResult = await sendConfirmationEmail(confirmation);

    await saveAppointment(confirmation, emailResult.sent);

    if (emailResult.sent) {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: {
          ...session.metadata,
          email_sent: "true",
        },
      });
    }

    return NextResponse.json({
      confirmation,
      emailSent: emailResult.sent,
      emailWarning: emailResult.error,
    });
  } catch (error) {
    console.error("Booking session confirmation error:", error);
    return NextResponse.json({ error: "Unable to confirm booking" }, { status: 500 });
  }
}
