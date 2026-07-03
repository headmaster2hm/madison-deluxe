"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { saveBooking } from "@/lib/booking-storage";
import { getSelectionTotals, resolveBookedServices } from "@/lib/service-selection";
import { services, standardPricingOptions, timeSlots } from "@/data/services";
import type { ServiceSelection } from "@/types/booking";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selections: ServiceSelection[];
  date: string;
  time: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormData | "selections", string>>;

const DEFAULT_PRICING_OPTION_ID = standardPricingOptions[0].id;

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selections: preselectedService
      ? [{ serviceId: preselectedService, pricingOptionId: DEFAULT_PRICING_OPTION_ID }]
      : [],
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const bookedLines = useMemo(
    () => resolveBookedServices(formData.selections) ?? [],
    [formData.selections]
  );
  const { totalPrice, totalDuration } = getSelectionTotals(bookedLines);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.selections.length === 0) {
      newErrors.selections = "Please select at least one service";
    } else if (!resolveBookedServices(formData.selections)) {
      newErrors.selections = "Please choose a duration for each selected service";
    }
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

    saveBooking({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      selections: formData.selections,
      date: formData.date,
      time: formData.time,
      notes: formData.notes.trim(),
    });

    router.push("/payment");
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isServiceSelected = (serviceId: string) =>
    formData.selections.some((s) => s.serviceId === serviceId);

  const getSelectedPricingOptionId = (serviceId: string) =>
    formData.selections.find((s) => s.serviceId === serviceId)?.pricingOptionId ??
    DEFAULT_PRICING_OPTION_ID;

  const toggleService = (serviceId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selections.some((s) => s.serviceId === serviceId);
      const selections = isSelected
        ? prev.selections.filter((s) => s.serviceId !== serviceId)
        : [
            ...prev.selections,
            { serviceId, pricingOptionId: DEFAULT_PRICING_OPTION_ID },
          ];
      return { ...prev, selections };
    });
    if (errors.selections) {
      setErrors((prev) => ({ ...prev, selections: undefined }));
    }
  };

  const setServicePricing = (serviceId: string, pricingOptionId: string) => {
    setFormData((prev) => ({
      ...prev,
      selections: prev.selections.map((selection) =>
        selection.serviceId === serviceId
          ? { ...selection, pricingOptionId }
          : selection
      ),
    }));
    if (errors.selections) {
      setErrors((prev) => ({ ...prev, selections: undefined }));
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <div>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl font-semibold text-sage-800">
            Select Services
          </h3>
          <p className="text-xs text-sage-500">Choose services and duration</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const isSelected = isServiceSelected(service.id);
            const selectedPricingOptionId = getSelectedPricingOptionId(service.id);

            return (
              <div
                key={service.id}
                className={`rounded-xl border p-4 transition-all ${
                  isSelected
                    ? "border-sage-500 bg-sage-50 ring-2 ring-sage-200"
                    : "border-sage-200"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="services"
                    value={service.id}
                    checked={isSelected}
                    onChange={() => toggleService(service.id)}
                    className="mt-1 h-4 w-4 rounded accent-sage-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-sage-800">{service.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-sage-500">
                      From ${standardPricingOptions[0].price}
                    </p>
                  </div>
                </label>

                {isSelected && (
                  <div className="mt-4 border-t border-sage-200 pt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-sage-500">
                      Choose duration
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.pricingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors ${
                            selectedPricingOptionId === option.id
                              ? "border-sage-500 bg-white text-sage-800"
                              : "border-sage-200 bg-white/70 text-sage-600 hover:border-sage-300"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`pricing-${service.id}`}
                              value={option.id}
                              checked={selectedPricingOptionId === option.id}
                              onChange={() => setServicePricing(service.id, option.id)}
                              className="accent-sage-600"
                            />
                            {option.label}
                          </span>
                          <span className="font-semibold">${option.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {errors.selections && (
          <p className="mt-2 text-xs text-red-500">{errors.selections}</p>
        )}
      </div>

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

      {bookedLines.length > 0 && (
        <div className="rounded-xl bg-sage-50 p-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sage-600">
            Booking Summary
          </h4>
          <ul className="mt-4 space-y-3">
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
          <div className="mt-4 flex items-center justify-between border-t border-sage-200 pt-4">
            <div className="text-sm text-sage-600">
              <span>{bookedLines.length} service{bookedLines.length > 1 ? "s" : ""}</span>
              <span className="mx-2">·</span>
              <span>{totalDuration} min total</span>
            </div>
            <p className="font-serif text-2xl font-semibold text-sage-700">
              ${totalPrice}
            </p>
          </div>
        </div>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Continue to Payment
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
