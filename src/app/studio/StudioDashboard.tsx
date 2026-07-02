"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppointmentRecord, AppointmentStatus } from "@/types/appointment";

interface DashboardStats {
  totalAppointments: number;
  totalRevenue: number;
  upcomingCount: number;
  todayCount: number;
  completedCount: number;
  cancelledCount: number;
  confirmedCount: number;
  topServices: { name: string; count: number; revenue: number }[];
  recentRevenue: number;
}

type Filter = "all" | "upcoming" | "today" | "completed" | "cancelled";

function formatDate(date: string): string {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function isUpcoming(appointment: AppointmentRecord): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const apptDate = new Date(appointment.date + "T12:00:00");
  if (appointment.status !== "confirmed") return false;
  if (apptDate > today) return true;
  if (apptDate < today) return false;

  const match = appointment.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return true;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  return hours * 60 + minutes >= nowMinutes;
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles = {
    confirmed: "bg-sage-100 text-sage-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function StudioDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const checkAuth = async () => {
    const response = await fetch("/api/studio/auth");
    const data = await response.json();
    setAuthenticated(data.authenticated);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [appointmentsRes, statsRes] = await Promise.all([
        fetch("/api/studio/appointments"),
        fetch("/api/studio/appointments?view=stats"),
      ]);

      if (appointmentsRes.status === 401 || statsRes.status === 401) {
        setAuthenticated(false);
        return;
      }

      const appointmentsData = await appointmentsRes.json();
      const statsData = await statsRes.json();
      setAppointments(appointmentsData.appointments ?? []);
      setStats(statsData.stats ?? null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch("/api/studio/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.error ?? "Login failed");
        return;
      }

      setAuthenticated(true);
      setPassword("");
    } catch {
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/studio/auth", { method: "DELETE" });
    setAuthenticated(false);
    setAppointments([]);
    setStats(null);
  };

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    setUpdatingId(id);
    try {
      const response = await fetch("/api/studio/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        await loadData();
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        `${appointment.firstName} ${appointment.lastName}`.toLowerCase().includes(query) ||
        appointment.email.toLowerCase().includes(query) ||
        appointment.id.toLowerCase().includes(query) ||
        appointment.phone.includes(query);

      if (!matchesSearch) return false;

      switch (filter) {
        case "upcoming":
          return isUpcoming(appointment);
        case "today":
          return appointment.date === new Date().toISOString().split("T")[0];
        case "completed":
          return appointment.status === "completed";
        case "cancelled":
          return appointment.status === "cancelled";
        default:
          return true;
      }
    });
  }, [appointments, filter, search]);

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sage-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-600 border-t-gold-400" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sage-900 via-sage-800 to-sage-900 px-6">
        <div className="w-full max-w-md rounded-2xl border border-sage-700 bg-sage-800/50 p-8 shadow-2xl backdrop-blur">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-400">
              Madison Deluxe
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-cream-50">
              Studio
            </h1>
            <p className="mt-2 text-sm text-sage-300">
              Sign in to manage appointments and monitor your spa.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm text-sage-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-sage-600 bg-sage-900/50 px-4 py-3 text-cream-50 placeholder:text-sage-500 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
                placeholder="Enter studio password"
                required
              />
            </div>

            {loginError && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-full bg-gold-500 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-gold-600 disabled:opacity-60"
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <header className="border-b border-sage-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              Madison Deluxe
            </p>
            <h1 className="font-serif text-2xl font-semibold text-sage-800">
              Studio Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="rounded-lg border border-sage-200 px-4 py-2 text-sm text-sage-600 transition-colors hover:bg-sage-50"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-sage-800 px-4 py-2 text-sm text-cream-50 transition-colors hover:bg-sage-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Appointments", value: stats.totalAppointments },
              { label: "Total Revenue", value: formatCurrency(stats.totalRevenue) },
              { label: "Upcoming", value: stats.upcomingCount },
              { label: "Today", value: stats.todayCount },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-sage-500">{item.label}</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-sage-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {stats && (
            <div className="rounded-2xl border border-sage-200 bg-white p-6 shadow-sm lg:col-span-1">
              <h2 className="font-serif text-xl font-semibold text-sage-800">
                Overview
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-sage-500">Confirmed</dt>
                  <dd className="font-medium text-sage-800">{stats.confirmedCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sage-500">Completed</dt>
                  <dd className="font-medium text-sage-800">{stats.completedCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sage-500">Cancelled</dt>
                  <dd className="font-medium text-sage-800">{stats.cancelledCount}</dd>
                </div>
                <div className="flex justify-between border-t border-sage-100 pt-3">
                  <dt className="text-sage-500">Revenue (30 days)</dt>
                  <dd className="font-medium text-sage-800">
                    {formatCurrency(stats.recentRevenue)}
                  </dd>
                </div>
              </dl>

              {stats.topServices.length > 0 && (
                <div className="mt-6 border-t border-sage-100 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-sage-500">
                    Top Services
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {stats.topServices.map((service) => (
                      <li
                        key={service.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-sage-700">{service.name}</span>
                        <span className="text-sage-500">{service.count} bookings</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-sage-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-sage-100 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-serif text-xl font-semibold text-sage-800">
                  Appointments
                </h2>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or ID..."
                  className="rounded-lg border border-sage-200 px-4 py-2 text-sm text-sage-800 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-100"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  [
                    ["all", "All"],
                    ["upcoming", "Upcoming"],
                    ["today", "Today"],
                    ["completed", "Completed"],
                    ["cancelled", "Cancelled"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
                      filter === key
                        ? "bg-sage-700 text-cream-50"
                        : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredAppointments.length === 0 ? (
                <div className="p-12 text-center text-sage-500">
                  {appointments.length === 0
                    ? "No appointments yet. Bookings will appear here after customers complete payment."
                    : "No appointments match your filters."}
                </div>
              ) : (
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-sage-50 text-xs uppercase tracking-wider text-sage-500">
                    <tr>
                      <th className="px-6 py-3">Guest</th>
                      <th className="px-6 py-3">Date & Time</th>
                      <th className="px-6 py-3">Services</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sage-100">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-sage-50/50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-sage-800">
                            {appointment.firstName} {appointment.lastName}
                          </p>
                          <p className="text-xs text-sage-500">{appointment.email}</p>
                          <p className="text-xs text-sage-400">{appointment.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sage-800">{formatDate(appointment.date)}</p>
                          <p className="text-xs text-sage-500">{appointment.time}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sage-700">
                            {appointment.services.map((s) => s.name).join(", ")}
                          </p>
                          <p className="text-xs text-sage-500">
                            {appointment.totalDuration} min total
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-sage-800">
                            {formatCurrency(appointment.totalAmount)}
                          </p>
                          <p className="text-xs text-sage-500">
                            ···· {appointment.paymentLast4}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <StatusBadge status={appointment.status} />
                            <select
                              value={appointment.status}
                              disabled={updatingId === appointment.id}
                              onChange={(e) =>
                                handleStatusChange(
                                  appointment.id,
                                  e.target.value as AppointmentStatus
                                )
                              }
                              className="rounded border border-sage-200 bg-white px-2 py-1 text-xs text-sage-700"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
