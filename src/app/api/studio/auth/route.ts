import { NextResponse } from "next/server";
import {
  clearStudioSession,
  createSessionToken,
  isStudioAuthenticated,
  setStudioSession,
  verifyAdminPassword,
} from "@/lib/studio-auth";

export async function GET() {
  const authenticated = await isStudioAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Studio access is not configured" },
        { status: 500 }
      );
    }

    const { password } = await request.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = createSessionToken();
    await setStudioSession(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Studio login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await clearStudioSession();
  return NextResponse.json({ success: true });
}
