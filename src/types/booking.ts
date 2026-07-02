export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceIds: string[];
  date: string;
  time: string;
  notes: string;
}

export interface BookingConfirmation {
  confirmationId: string;
  stripeSessionId?: string;
  booking: BookingData;
  services: {
    id: string;
    name: string;
    duration: number;
    price: number;
  }[];
  totalAmount: number;
  totalDuration: number;
  paidAt: string;
  paymentLast4: string;
}
