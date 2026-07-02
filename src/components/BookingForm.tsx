"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { services, timeSlots } from "@/data/services";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceId: preselectedService,
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const selectedService = services.find((s) => s.id === formData.serviceId);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.serviceId) newErrors.serviceId = "Please select a service";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (formData.date && new Date(formData.date) < today) {
      newErrors.date = "Please select a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sage-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-4xl">
          ✓
        </div>
        <h2 className="mt-6 font-serif text-3xl font-semibold text-sage-800">
          Appointment Requested!
        </h2>
        <p className="mt-4 text-sage-600">
          Thank you, {formData.firstName}! We&apos;ve received your booking request for{" "}
          <strong>{selectedService?.name}</strong> on{" "}
          <strong>
            {new Date(formData.date + "T12:00:00").toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </strong>{" "}
          at <strong>{formData.time}</strong>.
        </p>
        <p className="mt-2 text-sm text-sage-500">
          A confirmation email will be sent to {formData.email}. Our team will
          contact you shortly to confirm your appointment.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              serviceId: "",
              date: "",
              time: "",
              notes: "",
            });
          }}
          className="btn-outline mt-8"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Info */}
      <div>
        <h3 className="mb-4 font-serif text-xl font-semibold text-sage-800">
          Your Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-sage-700">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200 ${errors.firstName ? "border-red-400" : "border-sage-200"}`}
              placeholder="Jane"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-sage-700">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200 ${errors.lastName ? "border-red-400" : "border-sage-200"}`}
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-sage-700">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200 ${errors.email ? "border-red-400" : "border-sage-200"}`}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-sage-700">
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200 ${errors.phone ? "border-red-400" : "border-sage-200"}`}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <h3 className="mb-4 font-serif text-xl font-semibold text-sage-800">
          Select Service
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <label
              key={service.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                formData.serviceId === service.id
                  ? "border-sage-500 bg-sage-50 ring-2 ring-sage-200"
                  : "border-sage-200 hover:border-sage-300"
              }`}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={formData.serviceId === service.id}
                onChange={(e) => updateField("serviceId", e.target.value)}
                className="mt-1 accent-sage-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span>{service.image}</span>
                  <span className="font-medium text-sage-800">{service.name}</span>
                </div>
                <p className="mt-1 text-xs text-sage-500">
                  {service.duration} min · ${service.price}
                </p>
              </div>
            </label>
          ))}
        </div>
        {errors.serviceId && (
          <p className="mt-2 text-xs text-red-500">{errors.serviceId}</p>
        )}
      </div>

      {/* Date & Time */}
      <div>
        <h3 className="mb-4 font-serif text-xl font-semibold text-sage-800">
          Date & Time
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-sage-700">
              Preferred Date *
            </label>
            <input
              id="date"
              type="date"
              min={minDate}
              value={formData.date}
              onChange={(e) => updateField("date", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200 ${errors.date ? "border-red-400" : "border-sage-200"}`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date}</p>
            )}
          </div>
          <div>
            <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-sage-700">
              Preferred Time *
            </label>
            <select
              id="time"
              value={formData.time}
              onChange={(e) => updateField("time", e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200 ${errors.time ? "border-red-400" : "border-sage-200"}`}
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-xs text-red-500">{errors.time}</p>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-sage-700">
          Special Requests (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="w-full rounded-lg border border-sage-200 px-4 py-3 text-sage-800 transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200"
          placeholder="Allergies, preferences, or any special requests..."
        />
      </div>

      {/* Summary */}
      {selectedService && (
        <div className="rounded-xl bg-sage-50 p-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-600">
            Booking Summary
          </h4>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-sage-800">{selectedService.name}</p>
              <p className="text-sm text-sage-500">{selectedService.duration} minutes</p>
            </div>
            <p className="font-serif text-2xl font-semibold text-sage-700">
              ${selectedService.price}
            </p>
          </div>
        </div>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Confirm Appointment
      </button>
    </form>
  );
}

export default function BookingFormWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-600" />
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
