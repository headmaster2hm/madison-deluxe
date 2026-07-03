"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  clearBooking,
  clearConfirmation,
  getConfirmation,
  saveConfirmation,
} from "@/lib/booking-storage";
import type { BookingConfirmation } from "@/types/booking";

function BookingConfirmedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [emailSent, setEmailSent] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadConfirmation() {
      if (sessionId) {
        try {
          const response = await fetch("/api/booking-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });

          const data = await response.json();

          if (!response.ok) {
            setError(data.error ?? "Unable to load your booking confirmation.");
            return;
          }

          saveConfirmation(data.confirmation);
          clearBooking();
          setConfirmation(data.confirmation);
          setEmailSent(data.emailSent ?? false);
          return;
        } catch {
          setError("Unable to load your booking confirmation.");
          return;
        }
      }

      const saved = getConfirmation();
      if (!saved) {
        router.replace("/book");
        return;
      }
      setConfirmation(saved);
    }

    loadConfirmation();
  }, [router, sessionId]);

  if (error) {
    return (
      <section className="section-padding mx-auto max-w-2xl text-center">
        <p className="text-sage-600">{error}</p>
        <Link href="/book" className="btn-primary mt-6 inline-flex">
          Return to Booking
        </Link>
      </section>
    );
  }

  if (!confirmation) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-600" />
      </div>
    );
  }

  const { booking, services, totalAmount, confirmationId, paymentLast4 } =
    confirmation;

  const formattedDate = new Date(booking.date + "T12:00:00").toLocaleDateString(
    "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <section className="section-padding mx-auto max-w-2xl">
      <div className="rounded-2xl border border-sage-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
          <svg
            className="h-10 w-10 text-sage-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-6 font-serif text-3xl font-semibold text-sage-800 md:text-4xl">
          Booking Confirmed!
        </h1>
        <p className="mt-4 text-sage-600">
          Thank you, {booking.firstName}! Your payment of{" "}
          <strong>${totalAmount}</strong> has been received and your appointment
          is confirmed.
        </p>

        <div className="mt-6 rounded-xl bg-sage-50 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Confirmation Number
          </p>
          <p className="mt-1 font-serif text-2xl font-semibold text-sage-800">
            {confirmationId}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-sage-500">Date</p>
              <p className="font-medium text-sage-800">{formattedDate}</p>
            </div>
            <div>
              <p className="text-xs text-sage-500">Time</p>
              <p className="font-medium text-sage-800">{booking.time}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-sage-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage-500">
              Services
            </p>
            <ul className="mt-2 space-y-2">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-sage-800">{service.name}</span>
                  <span className="text-sage-600">
                    ${service.price} · {service.durationLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-sage-200 pt-4">
            <span className="font-medium text-sage-800">Total Paid</span>
            <span className="font-serif text-xl font-semibold text-sage-800">
              ${totalAmount}
            </span>
          </div>

          <p className="mt-4 text-xs text-sage-500">
            Paid via Stripe · Card ending in {paymentLast4}
          </p>
        </div>

        <p className="mt-6 text-sm text-sage-500">
          {emailSent ? (
            <>
              A confirmation email has been sent to{" "}
              <strong className="text-sage-700">{booking.email}</strong> with your
              appointment and payment details.
            </>
          ) : (
            <>
              Your booking is confirmed. A confirmation email will be sent to{" "}
              <strong className="text-sage-700">{booking.email}</strong> shortly.
            </>
          )}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => {
              clearConfirmation();
              router.push("/book");
            }}
            className="btn-outline"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-600" />
        </div>
      }
    >
      <BookingConfirmedContent />
    </Suspense>
  );
}
