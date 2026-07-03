import { promises as fs } from "fs";
import path from "path";
import type { AppointmentRecord, AppointmentStatus } from "@/types/appointment";
import type { BookingConfirmation } from "@/types/booking";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "appointments.json");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readAppointments(): Promise<AppointmentRecord[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as AppointmentRecord[];
  } catch {
    return [];
  }
}

async function writeAppointments(appointments: AppointmentRecord[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2), "utf-8");
}

export function confirmationToAppointment(
  confirmation: BookingConfirmation,
  emailSent: boolean
): AppointmentRecord {
  return {
    id: confirmation.confirmationId,
    stripeSessionId: confirmation.stripeSessionId,
    status: "confirmed",
    firstName: confirmation.booking.firstName,
    lastName: confirmation.booking.lastName,
    email: confirmation.booking.email,
    phone: confirmation.booking.phone,
    date: confirmation.booking.date,
    time: confirmation.booking.time,
    notes: confirmation.booking.notes,
    services: confirmation.services,
    totalAmount: confirmation.totalAmount,
    totalDuration: confirmation.totalDuration,
    paymentLast4: confirmation.paymentLast4,
    paidAt: confirmation.paidAt,
    emailSent,
    createdAt: new Date().toISOString(),
  };
}

export async function saveAppointment(
  confirmation: BookingConfirmation,
  emailSent: boolean
): Promise<AppointmentRecord> {
  const appointments = await readAppointments();
  const existingIndex = appointments.findIndex((a) => a.id === confirmation.confirmationId);

  if (existingIndex >= 0) {
    const existing = appointments[existingIndex];
    appointments[existingIndex] = {
      ...existing,
      emailSent: emailSent || existing.emailSent,
    };
    await writeAppointments(appointments);
    return appointments[existingIndex];
  }

  const appointment = confirmationToAppointment(confirmation, emailSent);
  appointments.unshift(appointment);
  await writeAppointments(appointments);
  return appointment;
}

export async function getAllAppointments(): Promise<AppointmentRecord[]> {
  const appointments = await readAppointments();
  return appointments.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<AppointmentRecord | null> {
  const appointments = await readAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index < 0) return null;

  appointments[index] = { ...appointments[index], status };
  await writeAppointments(appointments);
  return appointments[index];
}

function parseTime(time: string): number {
  const twentyFourHour = time.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHour) {
    const hours = parseInt(twentyFourHour[1], 10);
    const minutes = parseInt(twentyFourHour[2], 10);
    return hours * 60 + minutes;
  }

  const twelveHour = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!twelveHour) return 0;
  let hours = parseInt(twelveHour[1], 10);
  const minutes = parseInt(twelveHour[2], 10);
  const period = twelveHour[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function isUpcoming(appointment: AppointmentRecord): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const apptDate = new Date(appointment.date + "T12:00:00");
  if (apptDate > today) return appointment.status === "confirmed";
  if (apptDate < today) return false;

  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  return (
    appointment.status === "confirmed" && parseTime(appointment.time) >= nowMinutes
  );
}

function isToday(appointment: AppointmentRecord): boolean {
  const today = new Date().toISOString().split("T")[0];
  return appointment.date === today;
}

export async function getDashboardStats() {
  const appointments = await getAllAppointments();
  const confirmed = appointments.filter((a) => a.status === "confirmed");
  const serviceMap = new Map<string, { count: number; revenue: number }>();

  for (const appointment of appointments) {
    if (appointment.status === "cancelled") continue;
    for (const service of appointment.services) {
      const current = serviceMap.get(service.name) ?? { count: 0, revenue: 0 };
      serviceMap.set(service.name, {
        count: current.count + 1,
        revenue: current.revenue + service.price,
      });
    }
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return {
    totalAppointments: appointments.length,
    totalRevenue: appointments
      .filter((a) => a.status !== "cancelled")
      .reduce((sum, a) => sum + a.totalAmount, 0),
    upcomingCount: appointments.filter(isUpcoming).length,
    todayCount: appointments.filter(isToday).length,
    completedCount: appointments.filter((a) => a.status === "completed").length,
    cancelledCount: appointments.filter((a) => a.status === "cancelled").length,
    confirmedCount: confirmed.length,
    topServices: Array.from(serviceMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    recentRevenue: appointments
      .filter(
        (a) =>
          a.status !== "cancelled" && new Date(a.paidAt) >= thirtyDaysAgo
      )
      .reduce((sum, a) => sum + a.totalAmount, 0),
  };
}
