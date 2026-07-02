import type { BookingConfirmation } from "@/types/booking";

export type AppointmentStatus = "confirmed" | "completed" | "cancelled";

export interface AppointmentRecord {
  id: string;
  stripeSessionId?: string;
  status: AppointmentStatus;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
  services: BookingConfirmation["services"];
  totalAmount: number;
  totalDuration: number;
  paymentLast4: string;
  paidAt: string;
  emailSent: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalAppointments: number;
  totalRevenue: number;
  upcomingCount: number;
  todayCount: number;
  completedCount: number;
  cancelledCount: number;
  topServices: { name: string; count: number; revenue: number }[];
  recentRevenue: number;
}
