"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getBooking } from "@/lib/booking-storage";
import { getSelectionTotals, resolveBookedServices } from "@/lib/service-selection";
import type { BookingData } from "@/types/booking";

function PaymentFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "true";

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const saved = getBooking();
    if (!saved || saved.selections.length === 0) {
      router.replace("/book");
      return;
    }
    setBooking(saved);
  }, [router]);

  if (!booking) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-600" />
      </div>
    );
  }

  const bookedLines = resolveBookedServices(booking.selections) ?? [];
  const { totalPrice, totalDuration } = getSelectionTotals(bookedLines);

  const formattedDate = new Date(booking.date + "T12:00:00").toLocaleDateString(
    "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error ?? "Unable to start checkout. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-sage-200 bg-sage-50 p-6">
          <h3 className="font-serif text-xl font-semibold text-sage-800">
            Order Summary
          </h3>

          <div className="mt-4 space-y-1 text-sm text-sage-600">
            <p>
              <span className="text-sage-500">Guest:</span>{" "}
              {booking.firstName} {booking.lastName}
            </p>
            <p>
              <span className="text-sage-500">Email:</span> {booking.email}
            </p>
            <p>
              <span className="text-sage-500">Date:</span> {formattedDate}
            </p>
            <p>
              <span className="text-sage-500">Time:</span> {booking.time}
            </p>
          </div>

          <div className="mt-6 border-t border-sage-200 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sage-500">
              Services
            </h4>
            <ul className="mt-3 space-y-3">
              {bookedLines.map((line) => (
                <li
                  key={`${line.id}-${line.pricingOptionId}`}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium text-sage-800">{line.name}</p>
                    <p className="text-sage-500">{line.durationLabel}</p>
                  </div>
                  <p className="font-medium text-sage-700">${line.price}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-sage-200 pt-4">
            <div className="text-sm text-sage-600">
              {bookedLines.length} service
              {bookedLines.length > 1 ? "s" : ""} · {totalDuration} min
            </div>
            <p className="font-serif text-2xl font-semibold text-sage-800">
              ${totalPrice}
            </p>
          </div>

          <Link
            href="/book"
            className="mt-6 block text-center text-xs uppercase tracking-wider text-sage-500 hover:text-sage-700"
          >
            ← Edit booking
          </Link>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="font-serif text-xl font-semibold text-sage-800">
            Secure Payment
          </h3>
          <p className="mt-1 text-sm text-sage-500">
            You&apos;ll be redirected to Stripe Checkout to complete your payment
            safely. We accept all major credit and debit cards.
          </p>

          {canceled && (
            <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Payment was canceled. You can try again when you&apos;re ready.
            </p>
          )}

          {submitError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {submitError}
            </p>
          )}

          <div className="mt-6 rounded-xl border border-sage-100 bg-sage-50/50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <svg className="h-5 w-5 text-sage-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-sage-800">Powered by Stripe</p>
                <p className="text-xs text-sage-500">
                  PCI-compliant, encrypted payment processing
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-sage-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Your card details are handled securely by Stripe — never stored on our servers.</span>
          </div>

          <button
            type="button"
            onClick={handleStripeCheckout}
            disabled={isProcessing}
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? "Redirecting to Stripe..." : `Pay $${totalPrice} with Stripe`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentForm() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-600" />
        </div>
      }
    >
      <PaymentFormContent />
    </Suspense>
  );
}
