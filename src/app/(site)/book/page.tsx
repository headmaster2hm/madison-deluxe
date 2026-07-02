import BookingForm from "@/components/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment | Madison Deluxe Spa & Wellness Center",
  description:
    "Schedule your spa, massage, or wellness appointment at Madison Deluxe Spa & Wellness Center.",
};

export default function BookPage() {
  return (
    <section className="section-padding mx-auto max-w-4xl">
      <div className="text-center">
        <p className="subheading">Reserve Your Visit</p>
        <h1 className="heading-serif mt-3">Book an Appointment</h1>
        <p className="mx-auto mt-4 max-w-xl text-sage-600">
          Choose your preferred services, date, and time. You can select multiple
          treatments in one visit, then proceed to secure payment.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-sage-200 bg-white p-6 shadow-sm md:p-10">
        <BookingForm />
      </div>
    </section>
  );
}
