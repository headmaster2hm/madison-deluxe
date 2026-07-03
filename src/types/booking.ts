export interface ServiceSelection {
  serviceId: string;
  pricingOptionId: string;
}

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selections: ServiceSelection[];
  date: string;
  time: string;
  notes: string;
}

export interface BookedServiceLine {
  id: string;
  name: string;
  duration: number;
  durationLabel: string;
  price: number;
  pricingOptionId: string;
}

export interface BookingConfirmation {
  confirmationId: string;
  stripeSessionId?: string;
  booking: BookingData;
  services: BookedServiceLine[];
  totalAmount: number;
  totalDuration: number;
  paidAt: string;
  paymentLast4: string;
}
