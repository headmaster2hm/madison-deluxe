import PaymentForm from "@/components/PaymentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | Madison Deluxe Spa & Wellness Center",
  description: "Complete your spa appointment payment at Madison Deluxe Spa & Wellness Center.",
};

export default function PaymentPage() {
  return (
    <section className="section-padding mx-auto max-w-5xl">
      <div className="text-center">
        <p className="subheading">Secure Checkout</p>
        <h1 className="heading-serif mt-3">Complete Your Payment</h1>
        <p className="mx-auto mt-4 max-w-xl text-sage-600">
          Review your booking details, then continue to Stripe Checkout to pay
          securely and confirm your appointment.
        </p>
      </div>

      <div className="mt-12">
        <PaymentForm />
      </div>
    </section>
  );
}
