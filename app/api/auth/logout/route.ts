import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";

export async function POST() {
  await destroySession();
  const response = NextResponse.json({ success: true, redirectUrl: "/auth/login" });
  return response;
}
