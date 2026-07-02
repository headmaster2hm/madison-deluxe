import { NextResponse } from "next/server";
import {
  getAllAppointments,
  getDashboardStats,
  updateAppointmentStatus,
} from "@/lib/appointments";
import { isStudioAuthenticatedFromRequest } from "@/lib/studio-auth";
import type { AppointmentStatus } from "@/types/appointment";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isStudioAuthenticatedFromRequest(request)) {
    return unauthorized();
  }

  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    if (view === "stats") {
      const stats = await getDashboardStats();
      return NextResponse.json({ stats });
    }

    const appointments = await getAllAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Studio appointments GET error:", error);
    return NextResponse.json({ error: "Failed to load appointments" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isStudioAuthenticatedFromRequest(request)) {
    return unauthorized();
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const validStatuses: AppointmentStatus[] = ["confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const appointment = await updateAppointmentStatus(id, status);
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Studio appointments PATCH error:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}
